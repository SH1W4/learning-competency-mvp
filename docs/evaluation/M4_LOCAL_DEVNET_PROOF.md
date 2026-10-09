# M4 local Devnet proof — operator runbook

This runbook produces one fresh, reproducible trace for the **synthetic Ana scenario**:

`M4 read-only API → exact ReviewedStateRecord → Solana Devnet Memo attestation → independent verification of the same record and signer`.

It does not attest real learner data. The signing key stays on the operator's machine and must never be committed, pasted into chat, sent to a frontend, or added to GitHub Actions.

## Requirements

- Node.js 20 or newer and npm.
- A Solana **Devnet-only** wallet with a small amount of Devnet SOL for transaction fees.
- Network access to the M4 API (localhost) and Solana Devnet RPC.

## 1. Get the branch and install dependencies

If you do not already have the branch locally:

```bash
git clone https://github.com/SH1W4/learning-competency-mvp.git
cd learning-competency-mvp
git fetch origin
git switch --track origin/feat/m4-canonical-attestation-e2e
```

If the repository already exists locally, run `git fetch origin` and switch to `feat/m4-canonical-attestation-e2e`.

Then:

```bash
node --version
npm install
npm run typecheck
npm test
```

Node must report v20 or newer. Do not continue to a transaction if typecheck or tests fail.

## 2. Configure the local signer

Create a local environment file:

```bash
cp .env.example .env
```

Edit `.env` and set `SOLANA_PRIVATE_KEY` to the **base58-encoded secret key of a Devnet wallet**. Do not use a mainnet wallet. Keep `.env` local; it is gitignored.

Optional:
- `SOLANA_RPC_URL=https://api.devnet.solana.com`
- `M4_RUNTIME_URL=http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana`

The default RPC and runtime URL are already set in the script. You do not need an AI provider key: the synthetic scenario may use the deterministic heuristic provider when no supported provider is configured. The report records the interpretation model actually returned by the runtime.

### Fund the Devnet wallet

Use the public key corresponding to the secret in `.env`. If you use Solana CLI, you can request Devnet SOL with:

```bash
solana airdrop 1 <SUA_CHAVE_PUBLICA> --url devnet
solana balance <SUA_CHAVE_PUBLICA> --url devnet
```

Alternatively use an official Solana Devnet faucet. Devnet tokens have no mainnet value. If the wallet already has enough Devnet SOL, skip this step. The E2E script checks the balance before it submits anything.

## 3. Start the canonical M4 API

Open **Terminal 1**, from the repository root:

```bash
npm run api:m4
```

Wait for the message that the adapter is listening on port 8787. Leave this terminal running.

In **Terminal 2**, from the same repository root, check the API:

```bash
curl -fsS 'http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana' -o /tmp/lastro-m4-response.json
node -e "const x=require('/tmp/lastro-m4-response.json'); if(!x.synthetic || !x.reviewed_state_record) process.exit(1); console.log(JSON.stringify({synthetic:x.synthetic,state:x.handoff.state,record_hash:x.handoff.record_hash,model:x.interpretation?.model},null,2))"
```

Proceed only if the request succeeds and the state is `DEMONSTRATED`.

## 4. Generate and verify the fresh Devnet proof

Still in Terminal 2:

```bash
npm run m4:e2e:devnet
```

The command:
1. fetches the current runtime response;
2. verifies the complete handoff hash and checks that its summary metadata matches the exact record;
3. refuses non-synthetic, non-`DEMONSTRATED`, or unconfirmed records;
4. checks the Devnet wallet balance;
5. writes the exact record to `out/reviewed-state.json`;
6. submits a new `m3.attestation.v2` Memo transaction to the configured Solana RPC;
7. independently fetches and verifies that transaction, including record binding and expected signer;
8. writes the evidence report.

A successful run exits with code 0 and prints JSON containing `verified: true`, the `record_hash`, signer, transaction signature, checks and Explorer URL.

## 5. Evidence artifacts

After a successful run, preserve these files locally:

- `out/reviewed-state.json` — the exact canonical record returned by M4.
- `out/m4-attestation-verification.json` — verification report and fresh transaction signature.

Open the `explorer_url` in the report and confirm the transaction is visible on **Devnet**. The JSON report plus the on-chain transaction is the proof bundle. The `out/` directory is gitignored; do not commit the report or private key. Share only the report fields needed for review, never `.env`.

## Failure handling

- `SOLANA_PRIVATE_KEY is required`: configure the local `.env` and retry.
- `M4 runtime returned HTTP`: ensure Terminal 1 is still running and the URL is correct.
- `insufficient Devnet SOL`: fund the same wallet whose secret is in `.env`.
- `record is not confirmed DEMONSTRATED` or handoff verification fails: stop; do not bypass the guard or attest a different/stale record.
- RPC/network errors: retry only after checking Devnet connectivity. A failed run is not proof.
- If transaction submission succeeds but independent verification fails, preserve the terminal output and transaction signature for diagnosis; do not claim success.

## Acceptance criteria

The proof is complete only when all are true:

- automated tests and typecheck pass locally;
- runtime response is the synthetic scenario and returns a valid canonical record;
- a **fresh** Devnet transaction is created from that exact runtime record;
- independent verification returns `verified: true` with record-integrity, payload-binding and signer checks passing;
- the transaction is visible in Solana Explorer on Devnet;
- both JSON artifacts are present locally.

Until those checks are captured, the E2E remains pending and the PR/issue should not be represented as fully proven.
