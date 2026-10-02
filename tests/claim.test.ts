import { describe, expect, it } from "vitest";
import { buildVerifiableClaim, verifyClaimSupport } from "../src/provenance/claim.js";
import { reviewFor, underReview } from "./helpers.js";

describe("verifiable claim layer — additive to M2/M3 handoff", () => {
  it("derives a bounded claim from the existing ReviewedStateRecord", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));

    const record = s.handoff();
    const claim = buildVerifiableClaim(record);

    expect(claim.competency_id).toBe(record.competency_id);
    expect(claim.state).toBe("DEMONSTRATED");
    expect(claim.scope.evidence_bound).toBe(true);
    expect(claim.scope.reviewer_confirmed).toBe(true);
    expect(claim.review_ref).toBe(record.review.review_id);
    expect(new Set(claim.evidence_refs).size).toBeGreaterThan(0);
  });

  it("accepts the original record as the support context", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));

    const record = s.handoff();
    const claim = buildVerifiableClaim(record);

    expect(verifyClaimSupport(claim, record)).toBe(true);
  });

  it("rejects claim references that are not present in the record", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));

    const record = s.handoff();
    const claim = buildVerifiableClaim(record);
    claim.evidence_refs.push("ev_not_in_record");

    expect(verifyClaimSupport(claim, record)).toBe(false);
  });


  it("rejects a claim that omits criterion support", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));

    const record = s.handoff();
    const claim = buildVerifiableClaim(record);
    claim.criterion_support = claim.criterion_support.slice(1);

    expect(verifyClaimSupport(claim, record)).toBe(false);
  });

  it("rejects a claim whose reviewer confirmation was changed", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));

    const record = s.handoff();
    const claim = buildVerifiableClaim(record);
    claim.scope.reviewer_confirmed = false;

    expect(verifyClaimSupport(claim, record)).toBe(false);
  });

  it("does not alter the existing handoff contract", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));

    const record = s.handoff();

    expect(record.record_version).toBe("m2.reviewed-state.v1");
    expect(record.record_hash).toMatch(/^[0-9a-f]{64}$/);
  });
});
