import { describe, expect, it } from "vitest";
import {
  projectCanonicalCompetencyState,
  SemanticContractError,
  type SemanticAdapterInput,
} from "../src/http/semantic-contract.js";

const base = (overrides: Partial<SemanticAdapterInput> = {}): SemanticAdapterInput => ({
  productState: "IN_DEVELOPMENT",
  sourceStatus: "AVAILABLE",
  consensus: null,
  resolution: null,
  resolutionMechanism: null,
  ...overrides,
});

const completeAdjudication = {
  actorId: "reviewer:human-01",
  basis: "Reviewed the conflicting verifier results under the competency contract.",
  evidenceRefs: ["evidence:01", "evidence:02"],
  applicableRules: ["LASTRO-PROTOCOL-v0.1:R8"],
  priorVerifierResults: ["verifier-A:CONFLICT", "verifier-B:PASS"],
};

function expectContractError(input: SemanticAdapterInput, code: string) {
  try {
    projectCanonicalCompetencyState(input);
    throw new Error("Expected SemanticContractError, but call succeeded.");
  } catch (error) {
    expect(error).toBeInstanceOf(SemanticContractError);
    expect((error as SemanticContractError).code).toBe(code);
  }
}

describe("LASTRO Protocol v0.1 semantic adapter", () => {
  it("maps only an explicit ESTABLISHED resolution for DEMONSTRATED", () => {
    expect(projectCanonicalCompetencyState(base({
      productState: "DEMONSTRATED",
      consensus: "AGREEMENT",
      resolution: "ESTABLISHED",
      resolutionMechanism: "AUTOMATED",
    }))).toEqual({ kind: "BOUNDED_STATE", state: "ESTABLISHED" });
  });

  it.each(["NOT_STARTED", "IN_DEVELOPMENT", "UNDER_REVIEW"] as const)(
    "%s without a resolution remains NO_STATE, not NOT_ESTABLISHED",
    (productState) => {
      expect(projectCanonicalCompetencyState(base({ productState }))).toEqual({ kind: "NO_STATE" });
    },
  );

  it("keeps source unavailability distinct from insufficient evidence", () => {
    expect(projectCanonicalCompetencyState(base({
      productState: "IN_DEVELOPMENT",
      sourceStatus: "UNAVAILABLE",
    }))).toEqual({ kind: "SOURCE_UNAVAILABLE" });

    expect(projectCanonicalCompetencyState(base({
      productState: "IN_DEVELOPMENT",
      consensus: "INSUFFICIENT_EVIDENCE",
      resolution: "INSUFFICIENT_EVIDENCE",
      resolutionMechanism: "AUTOMATED",
    }))).toEqual({ kind: "BOUNDED_STATE", state: "INSUFFICIENT_EVIDENCE" });
  });

  it("does not infer a competency state from DEMONSTRATED alone", () => {
    expectContractError(base({ productState: "DEMONSTRATED" }), "DEMONSTRATED_WITHOUT_RESOLUTION");
  });

  it("rejects DEMONSTRATED when the explicit resolution is not ESTABLISHED", () => {
    expectContractError(base({
      productState: "DEMONSTRATED",
      consensus: "AGREEMENT",
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: "AUTOMATED",
    }), "PRODUCT_CANONICAL_STATE_MISMATCH");
  });

  it("rejects ESTABLISHED when the product state is not DEMONSTRATED", () => {
    expectContractError(base({
      productState: "IN_DEVELOPMENT",
      consensus: "AGREEMENT",
      resolution: "ESTABLISHED",
      resolutionMechanism: "AUTOMATED",
    }), "PRODUCT_CANONICAL_STATE_MISMATCH");
  });

  it("preserves conflict instead of collapsing it into agreement or establishment", () => {
    expect(projectCanonicalCompetencyState(base({
      productState: "UNDER_REVIEW",
      consensus: "CONFLICT",
      resolution: "CONFLICT",
      resolutionMechanism: "AUTOMATED",
    }))).toEqual({ kind: "BOUNDED_STATE", state: "CONFLICT" });

    expectContractError(base({
      productState: "DEMONSTRATED",
      consensus: "CONFLICT",
      resolution: "ESTABLISHED",
      resolutionMechanism: "AUTOMATED",
    }), "CONFLICT_COLLAPSED");
  });

  it("preserves insufficiency instead of collapsing it into NOT_ESTABLISHED", () => {
    expectContractError(base({
      productState: "IN_DEVELOPMENT",
      consensus: "INSUFFICIENT_EVIDENCE",
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: "AUTOMATED",
    }), "INSUFFICIENCY_COLLAPSED");
  });

  it("does not treat agreement as the resolution itself", () => {
    expect(projectCanonicalCompetencyState(base({
      productState: "IN_DEVELOPMENT",
      consensus: "AGREEMENT",
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: "AUTOMATED",
    }))).toEqual({ kind: "BOUNDED_STATE", state: "NOT_ESTABLISHED" });
  });

  it("requires an explicit resolution record for human adjudication", () => {
    expectContractError(base({
      productState: "UNDER_REVIEW",
      consensus: null,
      resolution: "CONFLICT",
      resolutionMechanism: "HUMAN_ADJUDICATION",
    }), "INCOMPLETE_ADJUDICATION");
  });

  it("accepts attributable adjudication only when its basis and history are preserved", () => {
    expect(projectCanonicalCompetencyState(base({
      productState: "UNDER_REVIEW",
      consensus: "CONFLICT",
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: "HUMAN_ADJUDICATION",
      adjudication: completeAdjudication,
    }))).toEqual({ kind: "BOUNDED_STATE", state: "NOT_ESTABLISHED" });
  });

  it("rejects human adjudication without a prior CONFLICT consensus", () => {
    expectContractError(base({
      productState: "UNDER_REVIEW",
      consensus: null,
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: "HUMAN_ADJUDICATION",
      adjudication: completeAdjudication,
    }), "ADJUDICATION_WITHOUT_CONFLICT");
  });

  it("rejects an explicit resolution without a declared mechanism", () => {
    expectContractError(base({
      productState: "IN_DEVELOPMENT",
      consensus: "AGREEMENT",
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: null,
    }), "MISSING_RESOLUTION_MECHANISM");
  });

  it("rejects malformed adjudication arrays with a stable contract error", () => {
    expectContractError(base({
      productState: "UNDER_REVIEW",
      resolution: "NOT_ESTABLISHED",
      resolutionMechanism: "HUMAN_ADJUDICATION",
      adjudication: {
        actorId: "reviewer:01",
        basis: "Reviewed evidence.",
        evidenceRefs: ["evidence:01", "  "],
        applicableRules: ["LASTRO-PROTOCOL-v0.1:R8"],
        priorVerifierResults: ["verifier-A:CONFLICT"],
      },
    }), "INCOMPLETE_ADJUDICATION");
  });

  it("rejects adjudication data that is not declared as the resolution mechanism", () => {
    expectContractError(base({
      productState: "IN_DEVELOPMENT",
      resolutionMechanism: "AUTOMATED",
      adjudication: completeAdjudication,
    }), "UNDECLARED_ADJUDICATION");
  });

  it.each([
    ["resolutionMechanism", { resolutionMechanism: "BOGUS", resolution: "ESTABLISHED", productState: "DEMONSTRATED" }, "INVALID_RESOLUTION_MECHANISM"],
    ["resolution", { resolution: "BOGUS", resolutionMechanism: "AUTOMATED", productState: "DEMONSTRATED" }, "INVALID_RESOLUTION"],
    ["productState", { productState: "BOGUS" }, "INVALID_PRODUCT_STATE"],
    ["sourceStatus", { sourceStatus: "BOGUS" }, "INVALID_SOURCE_STATUS"],
  ] as const)("rejects invalid runtime enum: %s", (_field, overrides, code) => {
    // Simulate an untyped JavaScript/JSON caller bypassing TypeScript's unions.
    expectContractError(
      base(overrides as unknown as Partial<SemanticAdapterInput>),
      code,
    );
  });

  it("does not expose human adjudication as a consensus outcome", () => {
    // The type excludes HUMAN_ADJUDICATION from ConsensusOutcome. This runtime
    // guard also protects untyped JSON/JavaScript callers.
    expectContractError(base({
      productState: "UNDER_REVIEW",
      consensus: "HUMAN_ADJUDICATION" as unknown as "CONFLICT",
      resolution: "CONFLICT",
      resolutionMechanism: "HUMAN_ADJUDICATION",
      adjudication: completeAdjudication,
    }), "INVALID_CONSENSUS_OUTCOME");
  });
});
