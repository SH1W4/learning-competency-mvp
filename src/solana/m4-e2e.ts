/**
 * M4→M3 operator-side E2E:
 * canonical read-only runtime → exact ReviewedStateRecord → on-chain attestation
 * → independent verification of the same record and expected signer.
 *
 * Run the M4 server separately, then: npm run m4:e2e:devnet
 * Signing keys remain server/operator-side and are never sent to the frontend.
 */
import "dotenv/config";
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import bs58 from "bs58";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ReviewedStateRecord } from "../provenance/trace.js";
import { verifyHandoff } from "../provenance/trace.js";
import { createAttestationOnChain } from "./attest.js";
import { verifyAttestation } from "./verify.js";

const NETWORK = process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
const RUNTIME_URL =
  process.env.M4_RUNTIME_URL ??
  "http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana";

interface RuntimeResponse {
  synthetic: boolean;
  handoff: {
    record_version: string;
    record_hash: string;
    competency_id: string;
    state: string;
    decision_mode: string;
  };
  reviewed_state_record: ReviewedStateRecord;
  interpretation?: { model?: string };
}

async function main() {
  const secret = process.env.SOLANA_PRIVATE_KEY;
  if (!secret) {
    throw new Error("SOLANA_PRIVATE_KEY is required. Configure it locally; never commit it or expose it to the browser.");
  }

  const signer = Keypair.fromSecretKey(bs58.decode(secret));
  const response = await fetch(RUNTIME_URL, { headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`M4 runtime returned HTTP ${response.status}; start the canonical API and retry.`);
  }

  const runtime = (await response.json()) as RuntimeResponse;
  const record = runtime.reviewed_state_record;
  if (!runtime.synthetic) throw new Error("Refusing attestation: this E2E path is restricted to the explicitly synthetic scenario.");
  if (!record || !verifyHandoff(record)) throw new Error("Runtime did not return a valid, hash-verifiable ReviewedStateRecord.");
  if (
    runtime.handoff.record_hash !== record.record_hash ||
    runtime.handoff.record_version !== record.record_version ||
    runtime.handoff.competency_id !== record.competency_id ||
    runtime.handoff.state !== record.state ||
    runtime.handoff.decision_mode !== record.decision.mode
  ) {
    throw new Error("Runtime projection metadata does not match the complete ReviewedStateRecord.");
  }
  if (record.state !== "DEMONSTRATED" || record.decision.confirm_demonstrated !== true) {
    throw new Error("Refusing attestation: the exact runtime record is not confirmed DEMONSTRATED.");
  }

  const connection = new Connection(NETWORK, "confirmed");
  const balance = await connection.getBalance(signer.publicKey);
  if (balance < 100_000) {
    throw new Error(`Signer ${signer.publicKey.toBase58()} has insufficient Devnet SOL (${balance / LAMPORTS_PER_SOL}). Fund it before retrying.`);
  }

  mkdirSync("out", { recursive: true });
  writeFileSync(join("out", "reviewed-state.json"), JSON.stringify(record, null, 2) + "\n");

  const signature = await createAttestationOnChain(record, secret, NETWORK);
  const result = await verifyAttestation(record.record_hash, signature, NETWORK, {
    record,
    expectedSigner: signer.publicKey.toBase58(),
  });
  if (!result.verified) {
    throw new Error(`Independent Devnet verification failed: ${result.error ?? "unknown error"}; checks=${JSON.stringify(result.checks)}`);
  }

  const report = {
    verified: true,
    network: "devnet",
    runtime_url: RUNTIME_URL,
    synthetic: true,
    interpretation_model: runtime.interpretation?.model ?? "not supplied",
    record_hash: record.record_hash,
    record_version: record.record_version,
    competency_id: record.competency_id,
    state: record.state,
    decision_mode: record.decision.mode,
    signer: signer.publicKey.toBase58(),
    signature,
    explorer_url: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
    checks: result.checks,
    payload: result.payload,
  };
  writeFileSync(join("out", "m4-attestation-verification.json"), JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
