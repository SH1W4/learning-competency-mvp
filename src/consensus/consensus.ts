/**
 * Consensus Core — executable, non-mutating evaluation.
 *
 * The first implementation intentionally does not change competency state.
 * It produces an auditable decision that can later be wired to state transitions
 * after the rules are validated.
 */
import { ALL_CRITERIA, EVIDENCE_CONTRACT, TRAIL } from "../domain/useCase.js";
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

function deterministicCriteriaCheck(evidences: Evidence[], criterionId: CriterionId): VerificationResult {
  const eligible = criterionEvidence(evidences, criterionId);
  const requiredActivities = TRAIL.activities.filter((a) => a.criteria.includes(criterionId)).map((a) => a.id);
  const coveredActivities = new Set(eligible.map((e) => e.activity_id));
  const missingActivities = requiredActivities.filter((id) => !coveredActivities.has(id));
  return {
    mechanism: "deterministic_criteria",
    criterion_id: criterionId,
    status: missingActivities.length === 0 ? "PASS" : "FAIL",
    rationale: missingActivities.length === 0
      ? `todas as atividades exigidas pelo contrato possuem evidência elegível: ${requiredActivities.join(", ")}`
      : `atividades exigidas sem evidência elegível: ${missingActivities.join(", ")}`,
  };
}

function evaluateCriterion(criterionId: CriterionId, evidences: Evidence[], relation: RelationResult): CriterionConsensus {
  const eligibleEvidence = criterionEvidence(evidences, criterionId);
  const coverage = relation.coverage.find((c) => c.criterion_id === criterionId)!;
  const evidenceIntegrity: VerificationResult = {
    mechanism: "evidence_integrity",
    criterion_id: criterionId,
    status: eligibleEvidence.length > 0 && eligibleEvidence.every((e) => Boolean(e.provenance.contentHash)) ? "PASS" : "FAIL",
    rationale: eligibleEvidence.length > 0
      ? `há ${eligibleEvidence.length} evidência(s) elegível(is) com hash de conteúdo`
      : "não há evidência elegível para o critério",
  };
  const deterministic = deterministicCriteriaCheck(evidences, criterionId);
  const interpretation: VerificationResult = {
    mechanism: "ai_interpretation",
    criterion_id: criterionId,
    status: coverage.ai_assessment === "supports" ? "PASS" : "FAIL",
    rationale: `avaliação interpretativa: ${coverage.ai_assessment}`,
  };
  const verifications = [evidenceIntegrity, deterministic, interpretation];
  const passed = verifications.filter((v) => v.status === "PASS").length;
  const status: ConsensusStatus =
    passed === verifications.length ? "AGREEMENT" :
    evidenceIntegrity.status === "FAIL" || deterministic.status === "FAIL" ? "INSUFFICIENT_EVIDENCE" :
    "CONFLICT";
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
