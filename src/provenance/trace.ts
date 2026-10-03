/**
 * M2.6 — Provenance.
 * Done when: the system can show what came from evidence, what came from AI and what was decided by the reviewer.
 *
 * Also builds the M2 → M3 handoff record (input proposal for M3.2 — the final attestation payload is owned by M3).
 */
import { EVIDENCE_CONTRACT } from "../domain/useCase.js";
import type { CriterionId, Evidence, ExtractionResult, Origin } from "../domain/types.js";
import type { AIInterpretation } from "../ai/contract.js";
import type { RelationResult } from "../relation/relate.js";
import type { ReviewOutcome } from "../review/review.js";
import type { ConsensusResult } from "../consensus/consensus.js";
import { canonicalJSON, sha256 } from "../util.js";

export interface TraceNode {
  origin: Origin;
  kind: "evidence" | "extracted_field" | "ai_signal" | "review_decision" | "consensus_decision" | "final";
  ref: string;
  detail: string;
}

export interface CriterionTrace {
  criterion_id: CriterionId;
  chain: TraceNode[];
}

export interface ProvenanceTrace {
  subject: string;
  interpretation: { id: string; model: string };
  criteria: CriterionTrace[];
  rejected_ai_citations: Array<{ signal_id: string; evidence_id: string; reason: string }>;
  invalid_ai_signals: RelationResult["invalid_signals"];
}

export function buildTrace(
  evidences: Evidence[],
  extractions: ExtractionResult[],
  interp: AIInterpretation,
  relation: RelationResult,
  outcome: ReviewOutcome | undefined,
  consensus?: ConsensusResult,
): ProvenanceTrace {
  const evById = new Map(evidences.map((e) => [e.evidence_id, e]));
  const exById = new Map(extractions.map((x) => [x.evidence_id, x]));

  const criteria = (outcome?.criteria ?? consensus?.criteria.map((c) => ({
    criterion_id: c.criterion_id,
    final_assessment: c.status === "AGREEMENT" ? "supports" : "not_assessed",
    evidence_refs: [],
  })) ?? []).map<CriterionTrace>((cr) => {
    const chain: TraceNode[] = [];
    const sigs = relation.signals.filter((s) => s.criterion_id === cr.criterion_id);
    const citedEvidence = new Set(sigs.flatMap((s) => s.evidence_refs.map((r) => r.evidence_id)));
    for (const id of citedEvidence) {
      const ev = evById.get(id)!;
      chain.push({ origin: "evidence", kind: "evidence", ref: id, detail: `${ev.type} (${ev.activity_id}) · ${ev.source_ref} · ${ev.content_ref}` });
      const cited = new Set(sigs.flatMap((s) => s.evidence_refs.filter((r) => r.evidence_id === id && r.field).map((r) => r.field!)));
      for (const f of exById.get(id)?.fields ?? []) {
        if (cited.size && !cited.has(f.name)) continue;
        chain.push({ origin: "evidence", kind: "extracted_field", ref: `${id}#${f.name}`, detail: `${f.source.locator}: "${f.source.excerpt}"` });
      }
    }
    for (const s of sigs) {
      chain.push({
        origin: "ai",
        kind: "ai_signal",
        ref: s.signal_id,
        detail: `${s.support} (confiança ${s.confidence}) — ${s.rationale} [${interp.model.provider}/${interp.model.name}]`,
      });
      const d = outcome?.review.decisions.find((x) => x.signal_id === s.signal_id);
      if (d)
        chain.push({
          origin: "reviewer",
          kind: "review_decision",
          ref: `${outcome.review.review_id}:${s.signal_id}`,
          detail: `${d.action}${d.corrected_support ? ` → ${d.corrected_support}` : ""}${d.note ? ` — "${d.note}"` : ""} · ${outcome.review.reviewer.name}`,
        });
    }
    if (outcome) {
      chain.push({ origin: "reviewer", kind: "final", ref: cr.criterion_id, detail: `avaliação final: ${cr.final_assessment}` });
    } else {
      const cc = consensus!.criteria.find((x) => x.criterion_id === cr.criterion_id)!;
      chain.push({
        origin: "consensus",
        kind: "consensus_decision",
        ref: `consensus:${cr.criterion_id}`,
        detail: `resultado: ${cc.status}; ${cc.verifications.map((v) => `${v.mechanism}=${v.status}`).join(", ")}`,
      });
      chain.push({ origin: "consensus", kind: "final", ref: cr.criterion_id, detail: `avaliação final: ${cr.final_assessment}` });
    }
    return { criterion_id: cr.criterion_id, chain };
  });

  return {
    subject: interp.subject,
    interpretation: { id: interp.interpretation_id, model: `${interp.model.provider}/${interp.model.name}` },
    criteria,
    rejected_ai_citations: relation.signals.flatMap((s) => s.rejected_refs.map((r) => ({ signal_id: s.signal_id, evidence_id: r.evidence_id, reason: r.reason }))),
    invalid_ai_signals: relation.invalid_signals,
  };
}

/**
 * M2 → M3 handoff. Contains only references and hashes — never raw evidence content.
 * M3.2 decides what part of this goes into the attestation payload.
 */
export interface ReviewedStateRecord {
  record_version: "m2.reviewed-state.v1";
  synthetic: boolean;
  subject: string;
  competency_id: string;
  state: string;
  state_history: ReviewOutcome["state"]["history"];
  criteria: Array<{ criterion_id: CriterionId; final_assessment: string; evidence_ids: string[] }>;
  evidence: Array<{ evidence_id: string; type: string; activity_id: string; content_hash: string; trust_level: string }>;
  interpretation: { id: string; model: string; contract_version: string };
  decision: { mode: "human_review" | "consensus"; review_id?: string; reviewer_id?: string; reviewer_role?: string; decided_at: string; confirm_demonstrated: boolean };
  record_hash: string;
}

export function buildHandoff(evidences: Evidence[], interp: AIInterpretation, outcome: ReviewOutcome | undefined, consensus?: ConsensusResult): ReviewedStateRecord {
  if (!outcome && !consensus) throw new Error("handoff exige decisão humana ou consenso");
  const used = new Set(outcome ? outcome.criteria.flatMap((c) => c.evidence_refs.map((r) => r.evidence_id)) : evidences.map((e) => e.evidence_id));
  const body: Omit<ReviewedStateRecord, "record_hash"> = {
    record_version: "m2.reviewed-state.v1",
    synthetic: evidences.some((e) => e.provenance.synthetic),
    subject: outcome?.state.subject ?? interp.subject,
    competency_id: outcome?.state.competency_id ?? "comp:data-analysis-reproducible",
    state: outcome?.state.value ?? "DEMONSTRATED",
    state_history: outcome?.state.history ?? [],
    criteria: outcome ? outcome.criteria.map((c) => ({
      criterion_id: c.criterion_id,
      final_assessment: c.final_assessment,
      evidence_ids: [...new Set(c.evidence_refs.map((r) => r.evidence_id))],
    })) : consensus!.criteria.map((c) => ({
      criterion_id: c.criterion_id,
      final_assessment: c.status === "AGREEMENT" ? "supports" : "not_assessed",
      evidence_ids: [...new Set(relationEvidenceIds(evidences, c.criterion_id))],
    })),
    evidence: evidences
      .filter((e) => used.has(e.evidence_id))
      .map((e) => ({ evidence_id: e.evidence_id, type: e.type, activity_id: e.activity_id, content_hash: e.provenance.contentHash, trust_level: e.trust_level })),
    interpretation: { id: interp.interpretation_id, model: `${interp.model.provider}/${interp.model.name}`, contract_version: interp.contract_version },
    decision: outcome ? {
      mode: "human_review",
      review_id: outcome.review.review_id,
      reviewer_id: outcome.review.reviewer.id,
      reviewer_role: outcome.review.reviewer.role,
      decided_at: outcome.review.reviewed_at,
      confirm_demonstrated: outcome.review.confirm_demonstrated,
    } : {
      mode: "consensus",
      decided_at: new Date().toISOString(),
      confirm_demonstrated: true,
    },
  };
  return { ...body, record_hash: sha256(canonicalJSON(body)) };
}

function relationEvidenceIds(evidences: Evidence[], criterionId: CriterionId): string[] {
  return evidences.filter((e) => EVIDENCE_CONTRACT[e.type].criteria.includes(criterionId)).map((e) => e.evidence_id);
}

export function verifyHandoff(rec: ReviewedStateRecord): boolean {
  const { record_hash, ...body } = rec;
  return sha256(canonicalJSON(body)) === record_hash;
}
