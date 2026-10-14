import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { createM4Server } from "../../src/http/server.js";

describe("M4 runtime HTTP integration", () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = createM4Server();
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    if (server?.listening) await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });

  it("exposes a health endpoint without exposing a competency decision", async () => {
    const response = await fetch(`${baseUrl}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ status: "ok", service: "lastro-m4-runtime" });
  });

  it("rejects unsupported scenarios instead of returning a fixture", async () => {
    const response = await fetch(`${baseUrl}/api/m4/competency?scenario=unknown`);
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({ error: "not_found" });
  });

  it("returns distinct consensus, resolution, product state and canonical competency state", async () => {
    const response = await fetch(`${baseUrl}/api/m4/competency?scenario=synthetic-ana`);
    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body.synthetic).toBe(true);
    expect(["AGREEMENT", "INSUFFICIENT_EVIDENCE", "CONFLICT"]).toContain(body.consensus.status);
    expect(body.consensus.status).not.toBe("HUMAN_ADJUDICATION");
    expect(body.resolution).toEqual({
      status: "RESOLVED",
      mechanism: "consensus",
      outcome: "ESTABLISHED",
    });
    expect(body.state.value).toBe("DEMONSTRATED");
    expect(body.competency_state).toMatchObject({
      adapter_version: "lastro-competency-adapter/0.1.0",
      value: "ESTABLISHED",
      mapping_status: "MAPPED",
      reason: "explicit_resolution",
    });
    expect(body.attestation).toBeNull();
    expect(body.public_verification).toBeNull();
  });
});
