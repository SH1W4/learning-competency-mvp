/**
 * Versioned adapter between product workflow states and the normative competency profile.
 *
 * Semantic contract v0.1:
 * - consensus outcome, resolution, product workflow state, competency state and attestation are distinct;
 * - a product label alone never establishes a canonical competency state;
 * - canonical state is exposed only from an explicit completed resolution backed by verification;
 * - conflict requires an explicit resolution and is never treated as agreement;
 * - this adapter does not create or imply an attestation.
 */
export const COMPETENCY_ADAPTER_VERSION = "lastro-competency-adapter/0.1.0" as const;

export type ProductState =
  | "NOT_STARTED"
  | "IN_DEVELOPMENT"
  | "UNDER_REVIEW"
  | "DEMONSTRATED";

export type ConsensusOutcome =
  | "AGREEMENT"
  | "INSUFFICIENT_EVIDENCE"
  | "CONFLICT";

export type ProfileCompetencyState =
  | "ESTABLISHED"
  | "NOT_ESTABLISHED"
  | "INSUFFICIENT_EVIDENCE"
  | "CONFLICT"
  | "REQUIRES_VERIFICATION";

export type ResolutionMechanism = "consensus" | "human_adjudication" | "none";
export type ResolutionStatus = "NOT_REQUIRED" | "PENDING" | "RESOLVED";

export interface SemanticAdapterInput {
  productState: ProductState;
  consensusOutcome: ConsensusOutcome | null;
  resolution: {
    status: ResolutionStatus;
    mechanism: ResolutionMechanism;
    outcome: ProfileCompetencyState | null;
  };
  verificationCompleted: boolean;
}

export interface SemanticAdapterResult {
  adapterVersion: typeof COMPETENCY_ADAPTER_VERSION;
  productState: ProductState;
  consensusOutcome: ConsensusOutcome | null;
  resolution: SemanticAdapterInput["resolution"];
  competencyState: ProfileCompetencyState | null;
  mappingStatus: "MAPPED" | "UNMAPPED" | "INCONSISTENT";
  reason:
    | "explicit_resolution"
    | "verification_missing"
    | "resolution_pending"
    | "resolution_missing"
    | "conflict_unresolved"
    | "insufficient_evidence_not_resolved"
    | "consensus_resolution_mismatch"
    | "product_state_mismatch"
    | "product_state_is_not_a_canonical_state";
  attestation: null;
}

export function adaptCompetencyState(input: SemanticAdapterInput): SemanticAdapterResult {
  const base = {
    adapterVersion: COMPETENCY_ADAPTER_VERSION,
    productState: input.productState,
    consensusOutcome: input.consensusOutcome,
    resolution: input.resolution,
    attestation: null,
  } as const;

  if (!input.verificationCompleted) {
    return { ...base, competencyState: null, mappingStatus: "UNMAPPED", reason: "verification_missing" };
  }

  if (input.resolution.status === "PENDING") {
    return { ...base, competencyState: null, mappingStatus: "UNMAPPED", reason: "resolution_pending" };
  }

  if (input.resolution.status === "NOT_REQUIRED" || input.resolution.mechanism === "none" || input.resolution.outcome === null) {
    return { ...base, competencyState: null, mappingStatus: "UNMAPPED", reason: "resolution_missing" };
  }

  if (input.consensusOutcome === "CONFLICT" && input.resolution.mechanism !== "human_adjudication") {
    return { ...base, competencyState: "CONFLICT", mappingStatus: "UNMAPPED", reason: "conflict_unresolved" };
  }

  if (input.consensusOutcome === "INSUFFICIENT_EVIDENCE" && input.resolution.outcome !== "INSUFFICIENT_EVIDENCE") {
    return { ...base, competencyState: null, mappingStatus: "INCONSISTENT", reason: "insufficient_evidence_not_resolved" };
  }

  if (input.consensusOutcome === "AGREEMENT" && input.resolution.mechanism === "human_adjudication") {
    return { ...base, competencyState: null, mappingStatus: "INCONSISTENT", reason: "consensus_resolution_mismatch" };
  }

  if (input.resolution.mechanism === "consensus" && input.consensusOutcome !== "AGREEMENT" && input.resolution.outcome === "ESTABLISHED") {
    return { ...base, competencyState: null, mappingStatus: "INCONSISTENT", reason: "consensus_resolution_mismatch" };
  }

  if (input.productState === "DEMONSTRATED" && input.resolution.outcome !== "ESTABLISHED") {
    return { ...base, competencyState: null, mappingStatus: "INCONSISTENT", reason: "product_state_mismatch" };
  }

  if (input.productState !== "DEMONSTRATED" && input.resolution.outcome === "ESTABLISHED") {
    return { ...base, competencyState: null, mappingStatus: "INCONSISTENT", reason: "product_state_mismatch" };
  }

  // Product workflow states NOT_STARTED, IN_DEVELOPMENT and UNDER_REVIEW are not
  // canonical competency states; the explicit resolution outcome is the source.
  if (input.productState !== "DEMONSTRATED" && input.resolution.outcome === "REQUIRES_VERIFICATION") {
    return { ...base, competencyState: "REQUIRES_VERIFICATION", mappingStatus: "MAPPED", reason: "explicit_resolution" };
  }

  return {
    ...base,
    competencyState: input.resolution.outcome,
    mappingStatus: "MAPPED",
    reason: "explicit_resolution",
  };
}
