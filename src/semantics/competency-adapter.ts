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

export interface AdjudicationRecord {
  actorId: string;
  basis: string;
  evidenceRefs: string[];
  applicableRules: string[];
  priorVerifierResults: string[];
}

export interface SemanticAdapterInput {
  productState: ProductState;
  consensusOutcome: ConsensusOutcome | null;
  resolution: {
    status: ResolutionStatus;
    mechanism: ResolutionMechanism;
    outcome: ProfileCompetencyState | null;
  };
  verificationCompleted: boolean;
  adjudication?: AdjudicationRecord | null;
}

export class SemanticAdapterError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "SemanticAdapterError";
  }
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateInput(input: SemanticAdapterInput): void {
  const isOneOf = <T extends string>(value: unknown, allowed: readonly T[]): value is T =>
    typeof value === "string" && allowed.includes(value as T);

  if (!input || typeof input !== "object") {
    throw new SemanticAdapterError("INVALID_INPUT", "Semantic adapter input must be an object.");
  }
  if (!isOneOf(input.productState, ["NOT_STARTED", "IN_DEVELOPMENT", "UNDER_REVIEW", "DEMONSTRATED"] as const)) {
    throw new SemanticAdapterError("INVALID_PRODUCT_STATE", "Unknown product/workflow state.");
  }
  if (input.consensusOutcome !== null && !isOneOf(input.consensusOutcome, ["AGREEMENT", "INSUFFICIENT_EVIDENCE", "CONFLICT"] as const)) {
    throw new SemanticAdapterError("INVALID_CONSENSUS_OUTCOME", "Unknown canonical consensus outcome.");
  }
  if (typeof input.verificationCompleted !== "boolean") {
    throw new SemanticAdapterError("INVALID_VERIFICATION_STATUS", "Verification completion must be boolean.");
  }
  if (!input.resolution || typeof input.resolution !== "object") {
    throw new SemanticAdapterError("INVALID_RESOLUTION", "Resolution must be an object.");
  }
  if (!isOneOf(input.resolution.status, ["NOT_REQUIRED", "PENDING", "RESOLVED"] as const)) {
    throw new SemanticAdapterError("INVALID_RESOLUTION_STATUS", "Unknown resolution status.");
  }
  if (!isOneOf(input.resolution.mechanism, ["consensus", "human_adjudication", "none"] as const)) {
    throw new SemanticAdapterError("INVALID_RESOLUTION_MECHANISM", "Unknown resolution mechanism.");
  }
  if (input.resolution.outcome !== null && !isOneOf(input.resolution.outcome, [
    "ESTABLISHED", "NOT_ESTABLISHED", "INSUFFICIENT_EVIDENCE", "CONFLICT", "REQUIRES_VERIFICATION",
  ] as const)) {
    throw new SemanticAdapterError("INVALID_RESOLUTION_OUTCOME", "Unknown canonical resolution outcome.");
  }

  const { status, mechanism, outcome } = input.resolution;
  if (status === "RESOLVED" && (mechanism === "none" || outcome === null)) {
    throw new SemanticAdapterError("INCOMPLETE_RESOLUTION", "A resolved outcome must declare a mechanism and outcome.");
  }
  if (status !== "RESOLVED" && (mechanism !== "none" || outcome !== null)) {
    throw new SemanticAdapterError("INCONSISTENT_RESOLUTION", "Pending or not-required resolution cannot carry a final mechanism or outcome.");
  }

  if (mechanism === "human_adjudication") {
    const record = input.adjudication;
    const nonEmptyArray = (value: unknown): value is string[] =>
      Array.isArray(value) && value.length > 0 && value.every(nonEmptyString);
    if (
      input.consensusOutcome !== "CONFLICT" ||
      !record ||
      !nonEmptyString(record.actorId) ||
      !nonEmptyString(record.basis) ||
      !nonEmptyArray(record.evidenceRefs) ||
      !nonEmptyArray(record.applicableRules) ||
      !nonEmptyArray(record.priorVerifierResults)
    ) {
      throw new SemanticAdapterError(
        "INCOMPLETE_ADJUDICATION",
        "Human adjudication requires a prior CONFLICT and a non-empty actor, basis, evidence references, applicable rules, and prior verifier results.",
      );
    }
  } else if (input.adjudication) {
    throw new SemanticAdapterError(
      "UNDECLARED_ADJUDICATION",
      "An adjudication record is only valid when the resolution mechanism is human_adjudication.",
    );
  }
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
  validateInput(input);
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

  if (input.consensusOutcome === "AGREEMENT" && input.resolution.outcome !== "ESTABLISHED") {
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
