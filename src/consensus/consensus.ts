/**
 * Consensus Core — executable, non-mutating evaluation.
 *
 * The first implementation intentionally does not change competency state.
 * It produces an auditable decision that can later be wired to state transitions
 * after the rules are validated.
 */
import { ALL_CRITERIA, EVIDENCE_CONTRACT } from "../domain/useCase.js";
import type { CriterionId, Evidence } from "../domain/types.js";
import type { RelationResult } from "../relation/relate.js";

export type ConsensusStatus = "AGREEMENT" | "INSUFFICIENT_EVIDENCE" | "CONFLICT";

export type VerificationStatus = "PASS" | "FAIL";

export interface VerificationResult {
  mechanism: "evidence_integrity" | "deterministic_criteria" | "ai_interpretation";
  criterion_id: CriterionId;
  status: VerificationStatus;
  rationale: string;
}

export interface CriterionConsensus {
  criterion_id: CriterionId;
  status: ConsensusStatus;
  verifications: VerificationResult[];
}

export interface ConsensusResult {
  status: ConsensusStatus;
  criteria: CriterionConsensus[];
  can_auto_advance: boolean;
}

function criterionEvidence(evidences: Evidence[], criterionId: CriterionId): Evidence[] {
  return evidences.filter((e) => EVIDENCE_CONTRACT[e.type].criteria.includes(criterionId));
}

function evaluateCriterion(criterionId: CriterionId, evidences: Evidence[], relation: RelationResult): CriterionConsensus {
  const eligibleEvidence = criterionEvidence(evidences, criterionId);
  const coverage = relation.coverage.find((c) => c.criterion_id === criterionId)!;
  const signals = relation.signals.filter((s) => s.criterion_id === criterionId);

  const evidenceIntegrity: VerificationResult = {
    mechanism: "evidence_integrity",
    criterion_id: criterionId,
    status: eligibleEvidence.length > 0 && eligibleEvidence.every((e) => Boolean(e.provenance.contentHash)),
    rationale:
      eligibleEvidence.length > 0
        ? `há ${eligibleEvidence.length} evidência(s) elegível(is) com hash de conteúdo`
        : "não há evidência elegível para o critério",
  };

  const deterministic: VerificationResult = {
    mechanism: "deterministic_criteria",
    criterion_id: criterionId,
    status: signals.length > 0 && signals.every((s) => s.evidence_refs.length > 0 && s.rejected_refs.length === 0),
    rationale:
      signals.length > 0
        ? "há sinal(is) relacionado(s) exclusivamente a evidências aceitas pelo contrato"
        : "não há sinal relacionado ao critério",
  };

  const interpretation: VerificationResult = {
    mechanism: "ai_interpretation",
    criterion_id: criterionId,
    status: coverage.ai_assessment === "supports",
    rationale: `avaliação interpretativa: ${coverage.ai_assessment}`,
  };

  const verifications = [evidenceIntegrity, deterministic, interpretation];
  const passed = verifications.filter((v) => v.status === "PASS").length;

  let status: ConsensusStatus;
  if (passed === verifications.length) status = "AGREEMENT";
  else if (evidenceIntegrity.status === "FAIL") status = "INSUFFICIENT_EVIDENCE";
  else status = "CONFLICT";

  return { criterion_id: criterionId, status, verifications };
}

export function evaluateConsensus(evidences: Evidence[], relation: RelationResult): ConsensusResult {
  const criteria = ALL_CRITERIA.map((criterionId) => evaluateCriterion(criterionId, evidences, relation));
  const status: ConsensusStatus = criteria.every((c) => c.status === "AGREEMENT")
    ? "AGREEMENT"
    : criteria.some((c) => c.status === "CONFLICT")
      ? "CONFLICT"
      : "INSUFFICIENT_EVIDENCE";

  return {
    status,
    criteria,
    can_auto_advance: status === "AGREEMENT",
  };
}
