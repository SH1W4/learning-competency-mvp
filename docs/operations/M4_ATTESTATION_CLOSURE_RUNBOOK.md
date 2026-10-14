# M4 attestation closure runbook

Status: **open — implementation/deployment proof is not yet end-to-end**.

This runbook records the current operational truth for the synthetic M4 path. It is not a release authorization or a claim of production readiness.

## Current verified repository behavior

- `GET /health` is the lightweight runtime health check.
- `GET /api/m4/competency?scenario=synthetic-ana` builds a synthetic projection and includes the complete `reviewed_state_record`.
- The runtime only exposes an attestation when `out/m4-attestation-verification.json` is present on the runtime filesystem, reports `verified: true`, specifies `network: "devnet"`, has a non-empty signature, and its `record_hash` exactly matches the projection's current hash.
- The frontend development fixture no longer includes a hardcoded transaction signature. Missing proof is represented as missing, not simulated.
- `npm run m4:e2e:devnet` signs the exact record returned by the configured runtime and independently verifies the transaction, signer, payload, and hash before writing local reports.

## Important deployment boundary

The current `m4:e2e:devnet` command writes `out/reviewed-state.json` and `out/m4-attestation-verification.json` to the machine where the command runs. If it runs on a developer's workstation while the M4 API runs on Render, those files do **not** appear on Render. Render's current blueprint also uses the free plan and does not declare a persistent disk. Therefore, a successful local E2E transaction alone cannot make the Render API return a public attestation.

The M4 projection is rebuilt for each request. A newly generated `record_hash` must not be assumed to equal a previously attested hash. The API must keep returning no attestation unless the stored verified report is for the exact record currently being served.

## Required gates before claiming public end-to-end attestation

- [ ] Confirm the deployed Render runtime is reachable and healthy.
- [ ] Confirm the runtime response is synthetic, `DEMONSTRATED`, and consensus is `AGREEMENT`.
- [ ] Confirm the returned `reviewed_state_record` passes `verifyHandoff` and matches the handoff metadata.
- [ ] Run the Devnet signing and independent verification path using a server/operator-side secret. Never place `SOLANA_PRIVATE_KEY` in source control, browser code, or client-visible environment variables.
- [ ] Choose and configure an explicit persistence path for the verified attestation report (for example, a managed database or an appropriately configured persistent disk). Do not rely on ephemeral process memory or a local workstation file for public retrieval.
- [ ] Ensure the persisted report is keyed to the exact `record_hash`, and that reads fail closed for absent, malformed, unverified, wrong-network, or hash-mismatched reports.
- [ ] Add automated tests for authorization, invalid input, duplicate requests, RPC failures, verification failures, persistence failures, and hash mismatch.
- [ ] Confirm the public frontend displays the explorer link only after independent verification of the exact reviewed-state record.
- [ ] Record the deployed commit, test outputs, transaction signature, record hash, signer public key, and explorer link as separate evidence. Do not reuse a historical transaction as proof for a new record.

## Operator checks

From PowerShell, test the deployed service without exposing secrets:

```powershell
curl.exe -i https://lastro-m4-runtime-n9gi.onrender.com/health
curl.exe -i "https://lastro-m4-runtime-n9gi.onrender.com/api/m4/competency?scenario=synthetic-ana"
```

Inspect the JSON response and confirm at minimum:

- `synthetic` is `true`;
- `state.value` is `DEMONSTRATED`;
- `consensus.status` is `AGREEMENT`;
- `verification.mechanisms` contains 12 checks across C1–C4;
- `handoff.record_hash` matches `reviewed_state_record.record_hash`;
- `attestation` and `public_verification` are null unless a verified report for that exact hash is available to the runtime.

For local code validation:

```powershell
npm ci
npm run typecheck
npm test
```

To execute the operator-side Devnet flow, configure `SOLANA_PRIVATE_KEY` only in a secure local environment, ensure the signer has Devnet SOL, and set `M4_RUNTIME_URL` to the canonical runtime endpoint. The command produces local artifacts; it does not publish them to Render:

```powershell
$env:M4_RUNTIME_URL = "https://lastro-m4-runtime-n9gi.onrender.com/api/m4/competency?scenario=synthetic-ana"
npm run m4:e2e:devnet
```

Do not mark the public attestation gate complete until the persistence and public-read path has been implemented and independently tested.
