import { describe, expect, it } from "vitest";
import { buildM4SyntheticProjection } from "../src/http/m4.js";

describe("M4 read-only projection", () => {
  it("projects the canonical synthetic session without inventing state", async () => {
    const view = await buildM4SyntheticProjection();

    expect(view.synthetic).toBe(true);
    expect(view.consensus.status).toBe("AGREEMENT");
    expect(view.state.value).toBe("DEMONSTRATED");
    expect(view.verification.mechanisms.map((m) => m.mechanism).sort()).toEqual([
      "ai_interpretation",
      "deterministic_criteria",
      "evidence_integrity",
    ]);
    expect(view.handoff.record_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(view.attestation).toBeNull();
    expect(view.public_verification).toBeNull();
  });
});
