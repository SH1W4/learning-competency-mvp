import { describe, expect, it } from "vitest";
import { buildM4SyntheticProjection } from "../src/http/m4.js";
import { createM4Server } from "../src/http/server.js";

describe("M4 read-only projection", () => {
  it("projects the canonical synthetic session without inventing state", async () => {
    const view = await buildM4SyntheticProjection();

    expect(view.synthetic).toBe(true);
    expect(view.consensus.status).toBe("AGREEMENT");
    expect(view.state.value).toBe("DEMONSTRATED");
    expect(view.verification.mechanisms).toHaveLength(12);
    expect(new Set(view.verification.mechanisms.map((m) => m.mechanism))).toEqual(
      new Set(["ai_interpretation", "deterministic_criteria", "evidence_integrity"]),
    );
    expect(new Set(view.verification.mechanisms.map((m) => m.criterion_id))).toEqual(
      new Set(["C1", "C2", "C3", "C4"]),
    );
    expect(view.handoff.record_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(view.attestation).toBeNull();
    expect(view.public_verification).toBeNull();
  });

  it("serves the same canonical projection over HTTP", async () => {
    const server = createM4Server();
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server address unavailable");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/api/m4/competency?scenario=synthetic-ana`);
      expect(response.status).toBe(200);
      const body = await response.json() as {
        synthetic: boolean;
        consensus: { status: string };
        state: { value: string };
        verification: { mechanisms: Array<{ mechanism: string; criterion_id: string }> };
      };
      expect(body.synthetic).toBe(true);
      expect(body.consensus.status).toBe("AGREEMENT");
      expect(body.state.value).toBe("DEMONSTRATED");
      expect(body.verification.mechanisms).toHaveLength(12);
      expect(new Set(body.verification.mechanisms.map((m) => m.criterion_id))).toEqual(
        new Set(["C1", "C2", "C3", "C4"]),
      );
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });

  it("serves a lightweight health endpoint for deployment probes", async () => {
    const server = createM4Server();
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server address unavailable");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/health`);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        status: "ok",
        service: "lastro-m4-runtime",
      });
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });

  it("rejects unsupported routes", async () => {
    const server = createM4Server();
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("server address unavailable");

    try {
      const response = await fetch(`http://127.0.0.1:${address.port}/api/m4/competency`);
      expect(response.status).toBe(404);
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });
});
