/**
 * LASTRO Protocol v0.1 competency adapter.
 *
 * This module is deliberately pure: it maps only explicit resolution outcomes,
 * never infers a competency state from a product/workflow label or AI confidence.
 * It does not claim that the underlying evidence or verification is independently
 * valid; callers must supply the already-recorded resolution and its provenance.
 */

export type ProductState =
  | "NOT_STARTED"
  | "IN_DEVELOPMENT"
  | "UNDER_REVIEW"
  | "DEMONSTRATED";

export type CanonicalResolution =
  | "ESTABLISHED"
  | "NOT_ESTABLISHED"
  | "INSUFFICIENT_EVIDENCE"
  | "CONFLICT"
  | "REQUIRES_VERIFICATION";

export type ConsensusOutcome =
  | "AGREEMENT"
  | "INSUFFICIENT_EVIDENCE"
  | "CONFLICT";

export type ResolutionMechanism = "AUTOMATED" | "HUMAN_ADJUDICATION";

export interface AdjudicationRecord {
  actorId: string;
  basis: string;
  evidenceRefs: string[];
  applicableRules: string[];
  priorVerifierResults: string[];
}

export interface SemanticAdapterInput {
  productState: ProductState;
  sourceStatus: "AVAILABLE" | "UNAVAILABLE";
  consensus: ConsensusOutcome | null;
  resolution: CanonicalResolution | null;
  resolutionMechanism: ResolutionMechanism | null;
  adjudication?: AdjudicationRecord | null;
}

export type SemanticAdapterResult =
  | { kind: "BOUNDED_STATE"; state: CanonicalResolution }
  | { kind: "NO_STATE" }
  | { kind: "SOURCE_UNAVAILABLE" };

export class SemanticContractError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "SemanticContractError";
  }
}

function requireAdjudicationRecord(record: AdjudicationRecord | null | undefined): void {
  if (
    !record ||
    !record.actorId.trim() ||
    !record.basis.trim() ||
    record.evidenceRefs.length === 0 ||
    record.applicableRules.length === 0 ||
    record.priorVerifierResults.length === 0
  ) {
    throw new SemanticContractError(
      "INCOMPLETE_ADJUDICATION",
      "Human adjudication must preserve actor, basis, evidence references, applicable rules, and prior verifier results.",
    );
  }
}

export function projectCanonicalCompetencyState(
  input: SemanticAdapterInput,
): SemanticAdapterResult {
  const {
    productState,
    sourceStatus,
    consensus,
    resolution,
    resolutionMechanism,
    adjudication,
  } = input;

  if (resolutionMechanism === "HUMAN_ADJUDICATION") {
    requireAdjudicationRecord(adjudication);
  } else if (adjudication) {
    throw new SemanticContractError(
      "UNDECLARED_ADJUDICATION",
      "An adjudication record cannot be attached unless the resolution mechanism is HUMAN_ADJUDICATION.",
    );
  }

  if (consensus === "CONFLICT" && resolution !== null && resolution !== "CONFLICT") {
    throw new SemanticContractError(
      "CONFLICT_COLLAPSED",
      "A conflict cannot be silently resolved into a non-conflict state by the adapter.",
    );
  }

  if (
    consensus === "INSUFFICIENT_EVIDENCE" &&
    resolution !== null &&
    resolution !== "INSUFFICIENT_EVIDENCE"
  ) {
    throw new SemanticContractError(
      "INSUFFICIENCY_COLLAPSED",
      "Insufficient evidence must remain distinct from competency failure or establishment.",
    );
  }

  if (consensus === "AGREEMENT" && resolution === "CONFLICT") {
    throw new SemanticContractError(
      "CONSENSUS_RESOLUTION_MISMATCH",
      "Agreement cannot simultaneously be projected as an unresolved conflict without an explicit resolution path.",
    );
  }

  if (resolution === null) {
    if (productState === "DEMONSTRATED") {
      throw new SemanticContractError(
        "DEMONSTRATED_WITHOUT_RESOLUTION",
        "DEMONSTRATED requires an explicit canonical resolution; product state is not semantic authority.",
      );
    }
    if (sourceStatus === "UNAVAILABLE") {
      return { kind: "SOURCE_UNAVAILABLE" };
    }
    return { kind: "NO_STATE" };
  }

  if (productState === "DEMONSTRATED" && resolution !== "ESTABLISHED") {
    throw new SemanticContractError(
      "PRODUCT_CANONICAL_STATE_MISMATCH",
      "DEMONSTRATED requires the explicit canonical resolution ESTABLISHED.",
    );
  }

  if (productState !== "DEMONSTRATED" && resolution === "ESTABLISHED") {
    throw new SemanticContractError(
      "PRODUCT_CANONICAL_STATE_MISMATCH",
      "ESTABLISHED cannot be silently projected while the product state is not DEMONSTRATED.",
    );
  }

  return { kind: "BOUNDED_STATE", state: resolution };
}
