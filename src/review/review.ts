/**
 * M2.5 — Human review.
 * Done when: reviewer can accept, correct, reject or request additional evidence.
 *
 * The reviewer decision is stored separately from the AI output (USE_CASE.md §5).
 * DEMONSTRATED requires: explicit confirmation + all C1–C4 supported + evidence references (USE_CASE.md §6).
 */
import { ALL_CRITERIA } from "../domain/useCase.js";
import type { CompetencyState, CriterionId, EvidenceRef, ReviewDecision, ReviewRecord, SignalSupport } from "../domain/types.js";
import type { RelationResult } from "../relation/relate.js";
import { transition } from "../state/state.js";
import { ValidationError } from "../util.js";

export type CriterionFinal = SignalSupport | "pending_more_evidence" | "not_assessed";

export interface CriterionResult {
  criterion_id: CriterionId;
  ai_assessment: RelationResult["coverage"][number]["ai_assessment"];
  final_assessment: CriterionFinal;
  decided_by: "reviewer";
  evidence_refs: EvidenceRef[];
  notes: string[];
}

export interface ReviewOutcome {
  review: ReviewRecord;
  criteria: CriterionResult[];
  evidence_requests: Array<{ criterion_id: CriterionId; note: string }>;
  state: CompetencyState;
}

const RANK: Record<SignalSupport, number> = { supports: 2, partially_supports: 1, does_not_support: 0 };

export function validateReview(review: ReviewRecord, relation: RelationResult): string[] {
  const issues: string[] = [];
  if (!review.reviewer?.id || !review.reviewer?.name) issues.push("reviewer precisa de id e nome");
  if (review.interpretation_id !== relation.interpretation_id) issues.push("review não corresponde a esta interpretação");
  const signals = new Map(relation.signals.map((s) => [s.signal_id, s]));
  const seen = new Set<string>();
  for (const d of review.decisions) {
    const s = signals.get(d.signal_id);
    if (!s) {
      issues.push(`decisão para sinal inexistente: ${d.signal_id}`);
      continue;
    }
    if (seen.has(d.signal_id)) issues.push(`mais de uma decisão para ${d.signal_id}`);
    seen.add(d.signal_id);
    if (d.criterion_id !== s.criterion_id) issues.push(`${d.signal_id}: critério ${d.criterion_id} diferente do sinal (${s.criterion_id})`);
    if (d.action === "correct") {
      if (!d.corrected_support) issues.push(`${d.signal_id}: "correct" exige corrected_support`);
      if (!d.note?.trim()) issues.push(`${d.signal_id}: "correct" exige uma nota do revisor`);
      if (d.corrected_support === "supports" && !d.evidence_refs?.length)
        issues.push(`${d.signal_id}: corrigir para "supports" exige evidence_refs`);
    }
    if ((d.action === "reject" || d.action === "request_more_evidence") && !d.note?.trim())
      issues.push(`${d.signal_id}: "${d.action}" exige uma nota explicando o motivo`);
  }
  for (const s of relation.signals) if (!seen.has(s.signal_id)) issues.push(`sinal sem decisão do revisor: ${s.signal_id}`);
  return issues;
}

function finalFor(d: ReviewDecision, aiSupport: SignalSupport): SignalSupport | "pending_more_evidence" {
  switch (d.action) {
    case "accept":
      return aiSupport;
    case "correct":
      return d.corrected_support!;
    case "reject":
      return "does_not_support";
    case "request_more_evidence":
      return "pending_more_evidence";
  }
}

export function applyReview(state: CompetencyState, relation: RelationResult, review: ReviewRecord): ReviewOutcome {
  if (state.value !== "UNDER_REVIEW") throw new ValidationError([`revisão só pode ser aplicada em UNDER_REVIEW (estado atual: ${state.value})`]);
  const issues = validateReview(review, relation);
  if (issues.length) throw new ValidationError(issues);

  const signals = new Map(relation.signals.map((s) => [s.signal_id, s]));
  const requests: ReviewOutcome["evidence_requests"] = [];

  const criteria: CriterionResult[] = ALL_CRITERIA.map((cid) => {
    const decisions = review.decisions.filter((d) => d.criterion_id === cid);
    const cov = relation.coverage.find((c) => c.criterion_id === cid)!;
    let final: CriterionFinal = "not_assessed";
    const refs: EvidenceRef[] = [];
    const notes: string[] = [];
    for (const d of decisions) {
      const s = signals.get(d.signal_id)!;
      const f = finalFor(d, s.support);
      if (d.note) notes.push(d.note);
      if (f === "pending_more_evidence") {
        requests.push({ criterion_id: cid, note: d.note! });
        if (final === "not_assessed") final = f;
        continue;
      }
      if (final === "not_assessed" || final === "pending_more_evidence" || RANK[f] > RANK[final as SignalSupport]) final = f;
      if (f === "supports") refs.push(...(d.evidence_refs?.length ? d.evidence_refs : s.evidence_refs));
    }
    // An open evidence request keeps the criterion pending unless another decision already fully supports it.
    if (requests.some((r) => r.criterion_id === cid) && final !== "supports") final = "pending_more_evidence";
    return { criterion_id: cid, ai_assessment: cov.ai_assessment, final_assessment: final, decided_by: "reviewer", evidence_refs: refs, notes };
  });

  const allSupported = criteria.every((c) => c.final_assessment === "supports" && c.evidence_refs.length > 0);
  const actor = `${review.reviewer.name} (${review.reviewer.id})`;
  let next = state;

  if (review.confirm_demonstrated) {
    if (!allSupported) {
      const bad = criteria.filter((c) => c.final_assessment !== "supports").map((c) => `${c.criterion_id}=${c.final_assessment}`);
      throw new ValidationError([`confirm_demonstrated exige C1–C4 sustentados com evidência; pendentes: ${bad.join(", ")}`]);
    }
    const used = [...new Set(criteria.flatMap((c) => c.evidence_refs.map((r) => r.evidence_id)))];
    next = transition(state, "DEMONSTRATED", "reviewer", actor, `Revisor confirmou C1–C4 com base nas evidências ${used.join(", ")}`, review.reviewed_at);
  } else if (criteria.some((c) => c.final_assessment !== "supports")) {
    const open = criteria.filter((c) => c.final_assessment !== "supports").map((c) => c.criterion_id);
    next = transition(state, "IN_DEVELOPMENT", "reviewer", actor, `Critérios não sustentados após revisão: ${open.join(", ")}`, review.reviewed_at);
  }
  // All supported but not confirmed → remains UNDER_REVIEW (reviewer has not made the explicit decision yet).

  return { review, criteria, evidence_requests: requests, state: next };
}
