import { describe, expect, it } from "vitest";
import {
  adaptCompetencyState,
  COMPETENCY_ADAPTER_VERSION,
  type SemanticAdapterInput,
} from "../../src/semantics/competency-adapter.js";

const agreement: SemanticAdapterInput = {
  productState: "DEMONSTRATED",
  consensusOutcome: "AGREEMENT",
  resolution: { status: "RESOLVED", mechanism: "consensus", outcome: "ESTABLISHED" },
  verificationCompleted: true,
};

describe("LASTRO competency semantic adapter v0.1", () => {
  it("declares a versioned adapter contract", () => {
    expect(COMPETENCY_ADAPTER_VERSION).toBe("lastro-competency-adapter/0.1.0");
  });

  it("maps DEMONSTRATED to ESTABLISHED only with verification and explicit resolution", () => {
    expect(adaptCompetencyState(agreement)).toMatchObject({
      competencyState: "ESTABLISHED", mappingStatus: "MAPPED", reason: "explicit_resolution",
    });
  });

  it("does not map a product state before verification", () => {
    expect(adaptCompetencyState({ ...agreement, verificationCompleted: false })).toMatchObject({
      competencyState: null, mappingStatus: "UNMAPPED", reason: "verification_missing",
    });
  });

  it("does not expose a canonical state while resolution is pending", () => {
    expect(adaptCompetencyState({
      ...agreement, resolution: { status: "PENDING", mechanism: "none", outcome: null },
    })).toMatchObject({ competencyState: null, mappingStatus: "UNMAPPED", reason: "resolution_pending" });
  });

  it("does not infer a state when resolution is not required or absent", () => {
    expect(adaptCompetencyState({
      ...agreement, resolution: { status: "NOT_REQUIRED", mechanism: "none", outcome: null },
    })).toMatchObject({ competencyState: null, mappingStatus: "UNMAPPED", reason: "resolution_missing" });
  });

  it("preserves unresolved conflict and never converts it to agreement", () => {
    expect(adaptCompetencyState({
      productState: "UNDER_REVIEW",
      consensusOutcome: "CONFLICT",
      resolution: { status: "PENDING", mechanism: "none", outcome: null },
      verificationCompleted: true,
    })).toMatchObject({ consensusOutcome: "CONFLICT", competencyState: null, mappingStatus: "UNMAPPED", reason: "resolution_pending" });
  });

  it("allows an explicit human resolution after conflict without rewriting consensus", () => {
    expect(adaptCompetencyState({
      productState: "DEMONSTRATED",
      consensusOutcome: "CONFLICT",
      resolution: { status: "RESOLVED", mechanism: "human_adjudication", outcome: "ESTABLISHED" },
      verificationCompleted: true,
    })).toMatchObject({ consensusOutcome: "CONFLICT", competencyState: "ESTABLISHED", mappingStatus: "MAPPED" });
  });

  it("maps insufficient evidence only to the matching explicit outcome", () => {
    expect(adaptCompetencyState({
      productState: "IN_DEVELOPMENT",
      consensusOutcome: "INSUFFICIENT_EVIDENCE",
      resolution: { status: "RESOLVED", mechanism: "consensus", outcome: "INSUFFICIENT_EVIDENCE" },
      verificationCompleted: true,
    })).toMatchObject({ competencyState: "INSUFFICIENT_EVIDENCE", mappingStatus: "MAPPED" });
  });

  it("rejects insufficient evidence silently becoming established", () => {
    expect(adaptCompetencyState({
      productState: "DEMONSTRATED",
      consensusOutcome: "INSUFFICIENT_EVIDENCE",
      resolution: { status: "RESOLVED", mechanism: "consensus", outcome: "ESTABLISHED" },
      verificationCompleted: true,
    })).toMatchObject({ competencyState: null, mappingStatus: "INCONSISTENT", reason: "insufficient_evidence_not_resolved" });
  });

  it("rejects human adjudication when there was no conflict", () => {
    expect(adaptCompetencyState({
      ...agreement,
      resolution: { status: "RESOLVED", mechanism: "human_adjudication", outcome: "ESTABLISHED" },
    })).toMatchObject({ competencyState: null, mappingStatus: "INCONSISTENT", reason: "consensus_resolution_mismatch" });
  });

  it("rejects a resolved outcome that contradicts the current AGREEMENT semantics", () => {
    expect(adaptCompetencyState({
      ...agreement,
      resolution: { status: "RESOLVED", mechanism: "consensus", outcome: "NOT_ESTABLISHED" },
    })).toMatchObject({ competencyState: null, mappingStatus: "INCONSISTENT", reason: "consensus_resolution_mismatch" });
  });

  it("rejects DEMONSTRATED when the resolved outcome is not ESTABLISHED", () => {
    expect(adaptCompetencyState({
      ...agreement,
      resolution: { status: "RESOLVED", mechanism: "consensus", outcome: "REQUIRES_VERIFICATION" },
    })).toMatchObject({ competencyState: null, mappingStatus: "INCONSISTENT", reason: "consensus_resolution_mismatch" });
  });

  it("does not turn NOT_STARTED into NOT_ESTABLISHED", () => {
    expect(adaptCompetencyState({
      productState: "NOT_STARTED",
      consensusOutcome: null,
      resolution: { status: "PENDING", mechanism: "none", outcome: null },
      verificationCompleted: false,
    })).toMatchObject({ competencyState: null, mappingStatus: "UNMAPPED" });
  });

  it("keeps UNDER_REVIEW as a product workflow label while requiring explicit canonical resolution", () => {
    expect(adaptCompetencyState({
      productState: "UNDER_REVIEW",
      consensusOutcome: null,
      resolution: { status: "RESOLVED", mechanism: "consensus", outcome: "REQUIRES_VERIFICATION" },
      verificationCompleted: true,
    })).toMatchObject({ competencyState: "REQUIRES_VERIFICATION", mappingStatus: "MAPPED" });
  });

  it("never creates or implies an attestation", () => {
    expect(adaptCompetencyState(agreement).attestation).toBeNull();
  });
});
