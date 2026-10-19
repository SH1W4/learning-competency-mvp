# M4 attestation closure runbook

Status: **open — public end-to-end attestation is not implemented or deployment-verified**.

This runbook records the actual repository behavior, the root cause, and the implementation gates. It is not a release authorization or a claim of production readiness.

## Confirmed current behavior

- `GET /health` is the lightweight runtime health check.
- `GET /api/m4/competency?scenario=synthetic-ana` rebuilds the synthetic competency session on every request and returns its `reviewed_state_record`.
- The runtime reads `out/m4-attestation-verification.json` from its own filesystem. It exposes the attestation only when the report says `verified: true`, identifies `devnet`, contains a non-empty signature, and has a `record_hash` matching the freshly generated record.
- `npm run m4:e2e:devnet` fetches the record from the configured runtime, validates its handoff, signs that exact record, independently verifies the Solana transaction and writes two local files: `out/reviewed-state.json` and `out/m4-attestation-verification.json`.
- The frontend API route no longer contains a hardcoded transaction signature in its built-in fixture. A missing proof is represented as missing.

## Root cause

There are two separate gaps; adding a database alone does not solve both.

### 1. Record identity is not stable across requests

The runtime constructs a new `CompetencySession` on every GET. The reviewed-state hash covers the complete handoff, including generated identifiers and decision timestamps. Therefore, a record generated on a later request must not be assumed to have the same hash as the one signed earlier.

The API must not generate a new record and then try to attach an older attestation to it. The signed reviewed-state must become an immutable persisted object, addressed by its exact `record_hash`. Reads should return that persisted record when it has been attested, not regenerate a substitute record.

### 2. The E2E report is never published to the runtime

The E2E command writes to the machine where the command runs. Running it on a workstation does not place those files on Render. The current `render.yaml` uses the free plan and declares no persistent disk, so the local-file lookup is not a durable public storage mechanism.

The frontend's built-in synthetic fallback is also not an authoritative source of attestation evidence. Its fixture must never be treated as interchangeable with the full, hash-verifiable `ReviewedStateRecord` returned by the runtime.

## Required correction architecture

Implement this as one coherent lifecycle, not as isolated changes to the UI:

1. **Create once:** build and validate the synthetic session; verify that the full `ReviewedStateRecord` passes `verifyHandoff` and that the handoff metadata matches it.
2. **Persist immutable record:** store the complete record keyed by `record_hash`. Reusing a hash with different record content must be rejected. Store no personal evidence on-chain; this MVP path is synthetic.
3. **Attest exact record:** sign the persisted record, then independently verify the Devnet transaction, expected signer, payload binding, and exact record hash.
4. **Persist verified result:** save the transaction signature and verification report against the same `record_hash`. Do not store a `verified: true` claim unless independent verification succeeded.
5. **Publish through the runtime:** GET retrieves the persisted record and its matching verified report. If there is no record or no verified matching attestation, return the record with `attestation: null` and `public_verification: null`.
6. **Protect writes:** any ingestion/signing endpoint must be authenticated server-to-server, validate the full input, reject duplicate/conflicting writes safely, and never expose `SOLANA_PRIVATE_KEY` to the browser.
7. **Fail closed:** absent database configuration, database/RPC errors, malformed data, wrong network, wrong signer, mismatched hashes, or failed verification must never produce a public explorer link.

A managed PostgreSQL database is a suitable persistence choice, but no provider or database has been provisioned yet. Do not pretend persistence is available before `DATABASE_URL` is configured and the schema is applied. A process-memory cache is not a durable substitute. Do not select or create paid infrastructure without explicit confirmation.

## Required tests before closure

- [ ] Record persistence and retrieval preserve the exact serialized reviewed-state and hash.
- [ ] A record can be retrieved after a process restart.
- [ ] A matching, independently verified Devnet attestation is exposed for the exact persisted hash.
- [ ] Missing report, malformed report, wrong network, wrong signer, and mismatched hash all return no public attestation.
- [ ] Invalid/unauthorized ingestion is rejected; private signing keys are never accepted from client payloads.
- [ ] Duplicate requests and conflicting writes are handled safely.
- [ ] Database unavailable, Solana RPC unavailable, transaction missing, and verification failure do not create a false verified state.
- [ ] Frontend shows an explorer link only when the runtime returns a verified attestation for the exact persisted record.
- [ ] Unit/type tests pass, followed by deployed Render/Vercel checks and an independently verified Devnet transaction.

## Operator checks

From PowerShell, check the public runtime without exposing secrets:

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
- the complete `reviewed_state_record` passes `verifyHandoff`;
- `attestation` and `public_verification` remain null unless a verified report for that exact hash is available.

For local code validation:

```powershell
npm ci
npm run typecheck
npm test
```

For the current operator-side Devnet flow, configure `SOLANA_PRIVATE_KEY` only in a secure local environment, ensure the signer has Devnet SOL, and set `M4_RUNTIME_URL` to the canonical runtime endpoint:

```powershell
$env:M4_RUNTIME_URL = "https://lastro-m4-runtime-n9gi.onrender.com/api/m4/competency?scenario=synthetic-ana"
npm run m4:e2e:devnet
```

This command currently creates local artifacts only. It does **not** publish them to Render. Do not mark the public attestation gate complete until immutable record persistence, verified-attestation persistence, public retrieval, and deployment checks have all passed.
