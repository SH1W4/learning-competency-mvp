import { describe, expect, it } from "vitest";
import { buildM4SyntheticProjection } from "../src/http/m4.js";
import { createM4Server } from "../src/http/server.js";

/**
 * Cross-layer contract tests: canonical pipeline -> semantic adapter ->
 * HTTP projection. These assert consistency, not independent verifier validity.
 */
describe("M4 semantic contract integration", () => {
  it("keeps consensus, explicit resolution, state, and handoff distinct but consistent", async () => {
    const projection = await buildM4SyntheticProjection();

    expect(projection.consensus.status).toBe("AGREEMENT");
    expect(projection.resolution).toMatchObject({
      outcome: "ESTABLISHED",
      mechanism: "AUTOMATED",
      projection: "BOUNDED_STATE",
    });
    expect(projection.state.value).toBe("DEMONSTRATED");
    expect(projection.handoff.state).toBe("DEMONSTRATED");
    expect(projection.handoff.decision_mode).toBe("consensus");
    expect(projection.handoff.record_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(projection.reviewed_state_record.record_hash).toBe(projection.handoff.record_hash);
    expect(projection.reviewed_state_record.state).toBe(projection.state.value);
    expect(projection.state.history.at(-1)).toMatchObject({
      to: "DEMONSTRATED",
      by: "consensus",
    });
    expect(projection.resolution.verifier_results.length).toBeGreaterThan(0);
    expect(projection.attestation).toBeNull();
    expect(projection.public_verification).toBeNull();
  });

  it("serves the same semantic contract over HTTP without deriving state in the client", async () => {
    const server = createM4Server();
    await new Promise<void>((resolve) => server.listen(0, resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server address unavailable");

    try {
      const response = await fetch(
        `http://127.0.0.1:${address.port}/api/m4/competency?scenario=synthetic-ana`,
      );
      expect(response.status).toBe(200);
      const body = await response.json() as Awaited<ReturnType<typeof buildM4SyntheticProjection>>;

      expect(body.consensus.status).toBe("AGREEMENT");
      expect(body.resolution.outcome).toBe("ESTABLISHED");
      expect(body.resolution.projection).toBe("BOUNDED_STATE");
      expect(body.state.value).toBe("DEMONSTRATED");
      expect(body.handoff.state).toBe(body.state.value);
      expect(body.reviewed_state_record.record_hash).toBe(body.handoff.record_hash);
      expect(body.attestation).toBeNull();
      expect(body.public_verification).toBeNull();
    } finally {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => error ? reject(error) : resolve()),
      );
    }
  });
});
