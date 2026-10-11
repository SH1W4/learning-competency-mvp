import { describe, expect, it } from "vitest";
import { isConsensusOutcome, isResolutionMechanism, projectProductState, validateResolutionRecord, type EstablishmentGrounds, type ProductWorkflowState } from "../src/protocol/competency-state-adapter.js";

const complete: EstablishmentGrounds = { claimOrContractBound: true, canonicalEvidencePresent: true, attributableVerificationPresent: true, explicitResolutionPresent: true, unresolvedConflict: false, evidenceInsufficient: false };

describe("LASTRO v0.1 competency adapter", () => {
  it("maps DEMONSTRATED to ESTABLISHED only with bounded evidence and explicit verification/resolution", () => {
    expect(projectProductState("DEMONSTRATED", complete)).toMatchObject({ kind: "MAPPED", competencyState: "ESTABLISHED", protocolVersion: "0.1.0" });
  });
  it("keeps workflow-only states out of the canonical competency vocabulary", () => {
    const states: ProductWorkflowState[] = ["NOT_STARTED", "IN_DEVELOPMENT", "UNDER_REVIEW"];
    for (const workflowState of states) expect(projectProductState(workflowState, complete)).toMatchObject({ kind: "WORKFLOW_ONLY", workflowState, competencyState: null });
  });
  it("preserves conflict and blocks establishment", () => {
    expect(projectProductState("DEMONSTRATED", { ...complete, unresolvedConflict: true })).toMatchObject({ competencyState: "CONFLICT" });
  });
  it("distinguishes insufficient evidence from missing verification", () => {
    expect(projectProductState("DEMONSTRATED", { ...complete, evidenceInsufficient: true })).toMatchObject({ competencyState: "INSUFFICIENT_EVIDENCE" });
    expect(projectProductState("DEMONSTRATED", { ...complete, attributableVerificationPresent: false })).toMatchObject({ competencyState: "REQUIRES_VERIFICATION" });
  });
  it("does not establish competency from interpretation/confidence alone", () => {
    expect(projectProductState("DEMONSTRATED", { ...complete, attributableVerificationPresent: false })).not.toMatchObject({ competencyState: "ESTABLISHED" });
  });
  it("does not infer a bounded state without a claim/contract", () => {
    expect(projectProductState("DEMONSTRATED", { ...complete, claimOrContractBound: false })).toMatchObject({ competencyState: "REQUIRES_VERIFICATION" });
  });
  it("separates consensus outcome from adjudication mechanism", () => {
    expect(isConsensusOutcome("AGREEMENT")).toBe(true);
    expect(isConsensusOutcome("INSUFFICIENT_EVIDENCE")).toBe(true);
    expect(isConsensusOutcome("CONFLICT")).toBe(true);
    expect(isConsensusOutcome("HUMAN_ADJUDICATION")).toBe(false);
    expect(isResolutionMechanism("HUMAN_ADJUDICATION")).toBe(true);
  });
  it("requires human adjudication attribution and preserved evidence/verifier references", () => {
    expect(validateResolutionRecord({ mechanism: "HUMAN_ADJUDICATION", outcome: "CONFLICT", actorId: "", basis: "", evidenceRefs: [], verifierResultRefs: [], ruleVersion: "" })).toEqual([
      "resolution basis is required", "applicable rule version is required", "evidence references must be preserved", "prior verifier result references must be preserved", "human adjudication requires attributable actorId"
    ]);
  });
  it("accepts a fully attributable adjudication record", () => {
    expect(validateResolutionRecord({ mechanism: "HUMAN_ADJUDICATION", outcome: "CONFLICT", actorId: "reviewer-17", basis: "Review under contract CC-1", evidenceRefs: ["evidence-1"], verifierResultRefs: ["result-1", "result-2"], ruleVersion: "CC-1@1.0.0" })).toEqual([]);
  });
});
