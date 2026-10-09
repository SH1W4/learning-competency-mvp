import { describe, expect, it } from "vitest";
import { buildM4SyntheticProjection } from "./m4.js";
import { verifyHandoff } from "../provenance/trace.js";

describe("M4 canonical projection", () => {
  it("exposes the exact complete handoff and keeps summary metadata bound to it", async () => {
    const projection = await buildM4SyntheticProjection();
    const record = projection.reviewed_state_record;

    expect(projection.synthetic).toBe(true);
    expect(record).toBeDefined();
    expect(verifyHandoff(record)).toBe(true);
    expect(projection.handoff).toEqual({
      record_version: record.record_version,
      record_hash: record.record_hash,
      competency_id: record.competency_id,
      state: record.state,
      decision_mode: record.decision.mode,
    });
    expect(record.state).toBe("DEMONSTRATED");
    expect(record.decision.confirm_demonstrated).toBe(true);
    expect(projection.attestation).toBeNull();
    expect(projection.public_verification).toBeNull();
  });
});
