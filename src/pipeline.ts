/**
 * M2 orchestration: INGEST → NORMALIZE → EXTRACT → INTERPRET → RELATE → REVIEW (+ provenance, handoff to M3).
 * Each stage stays separate so provenance and review remain possible (SKILL.md §5).
 */
import { COMPETENCY, TRAIL } from "./domain/useCase.js";
import type { CompetencyState, Evidence, EvidenceSubmission, ExtractionResult, ReviewRecord } from "./domain/types.js";
import { ingestEvidence } from "./evidence/ingest.js";
import { normalizeEvidence } from "./evidence/normalize.js";
import { extractFields } from "./evidence/extract.js";
import { parseAIOutput, type AIInterpretation } from "./ai/contract.js";
import type { InterpretationProvider } from "./ai/provider.js";
import { relateToCompetency, type RelationResult } from "./relation/relate.js";
import { applyReview, type ReviewOutcome } from "./review/review.js";
import { initialState, transition, TransitionError } from "./state/state.js";
import { buildHandoff, buildTrace, type ProvenanceTrace, type ReviewedStateRecord } from "./provenance/trace.js";
import { defaultEnv, type Env } from "./util.js";

export class InterpretationRejected extends Error {
  constructor(public readonly errors: string[]) {
    super(`Saída da IA rejeitada pelo contrato: ${errors.join("; ")}`);
    this.name = "InterpretationRejected";
  }
}

export class CompetencySession {
  readonly evidences: Evidence[] = [];
  readonly extractions: ExtractionResult[] = [];
  interpretation?: AIInterpretation;
  relation?: RelationResult;
  outcome?: ReviewOutcome;
  state: CompetencyState;

  constructor(
    readonly subject: string,
    private env: Env = defaultEnv,
  ) {
    this.state = initialState(subject, COMPETENCY.id);
  }

  /** M2.1 + M2.2 */
  submit(sub: EvidenceSubmission): Evidence {
    if (this.state.value === "UNDER_REVIEW" || this.state.value === "DEMONSTRATED")
      throw new TransitionError(`não é possível enviar evidência com o estado em ${this.state.value}`);
    const ev = ingestEvidence(sub, this.evidences, this.env);
    this.evidences.push(ev);
    this.extractions.push(extractFields(normalizeEvidence(ev)));
    if (this.state.value === "NOT_STARTED")
      this.state = transition(this.state, "IN_DEVELOPMENT", "system", "pipeline", `primeira evidência recebida (${ev.evidence_id})`, this.env.now());
    // New evidence invalidates any previous interpretation.
    this.interpretation = undefined;
    this.relation = undefined;
    return ev;
  }

  /** M2.3 + M2.4. Invalid AI output is rejected, not patched. */
  async interpret(provider: InterpretationProvider): Promise<RelationResult> {
    if (!this.evidences.length) throw new TransitionError("não há evidências para interpretar");
    const raw = await provider.interpret({ subject: this.subject, evidences: this.evidences, extractions: this.extractions });
    const check = parseAIOutput(raw, this.evidences.map((e) => e.evidence_id), {
      subject: this.subject,
      competency_id: COMPETENCY.id,
      extraction_refs: this.extractions.map((x) => x.evidence_id),
    });
    if (!check.ok) throw new InterpretationRejected(check.errors);
    this.interpretation = check.value!;
    this.relation = relateToCompetency(this.interpretation, this.evidences);
    // Evidence that went through analysis moves N2 → N3. Never to N4 (requires external authenticated source).
    const analyzed = new Set(this.relation.signals.flatMap((s) => s.evidence_refs.map((r) => r.evidence_id)));
    for (const ev of this.evidences) if (analyzed.has(ev.evidence_id) && ev.trust_level === "N2_EVIDENCE_PRESENTED") ev.trust_level = "N3_EVIDENCE_ANALYZED";
    return this.relation;
  }

  /** Activities of the trail that still have no evidence. */
  missingActivities(): string[] {
    const have = new Set(this.evidences.map((e) => e.activity_id));
    return TRAIL.activities.filter((a) => !have.has(a.id)).map((a) => `${a.id} — ${a.title}`);
  }

  /** IN_DEVELOPMENT → UNDER_REVIEW (system), only with complete trail + valid interpretation. */
  submitForReview(): CompetencyState {
    if (!this.relation || !this.interpretation) throw new TransitionError("interprete as evidências antes de enviar para revisão");
    const missing = this.missingActivities();
    if (missing.length) throw new TransitionError(`atividades sem evidência: ${missing.join("; ")}`);
    this.state = transition(this.state, "UNDER_REVIEW", "system", "pipeline", `trilha completa; interpretação ${this.interpretation.interpretation_id} pronta para revisão`, this.env.now());
    return this.state;
  }

  /** M2.5 */
  review(record: ReviewRecord): ReviewOutcome {
    if (!this.relation) throw new TransitionError("não há interpretação para revisar");
    this.outcome = applyReview(this.state, this.relation, record);
    this.state = this.outcome.state;
    return this.outcome;
  }

  /** M2.6 */
  trace(): ProvenanceTrace {
    if (!this.outcome || !this.interpretation || !this.relation) throw new TransitionError("trace disponível após a revisão");
    return buildTrace(this.evidences, this.extractions, this.interpretation, this.relation, this.outcome);
  }

  /** Handoff to M3 (attestation). Only meaningful after review. */
  handoff(): ReviewedStateRecord {
    if (!this.outcome || !this.interpretation) throw new TransitionError("handoff disponível após a revisão");
    return buildHandoff(this.evidences, this.interpretation, this.outcome);
  }
}
