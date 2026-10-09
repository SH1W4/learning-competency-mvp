# Demo & Technical Proof

## Demonstration scenario

The MVP uses a synthetic competency-development scenario centered on one person and one short learning trail.

The data is explicitly synthetic. It is not presented as customer, pilot, traction, or market-validation evidence.

## Canonical demo flow

```
Competency
   ↓
Activities
   ↓
Evidence
   ↓
AI interpretation
   ↓
Independent verification
   ↓
Consensus
   ↓
DEMONSTRATED
   ↓
Attestation
   ↓
Public verification
```

## Exceptional conflict flow

```
Independent verification
   ↓
CONFLICT
   ↓
Human adjudication
   ↓
DEMONSTRATED or IN_DEVELOPMENT
```

Human adjudication is not part of the normal demonstration path.

## Technical path

Local demonstration:

```bash
npm install
npm test
npm run typecheck
npm run demo
```

Exceptional adjudication demonstration:

```bash
npm run demo:adjudication
```

Attestation:

```bash
npm run m3:attest
```

Verification:

```bash
npm run m3:verify <tx_signature> [record_hash]
```

## What the demo proves

The vertical slice demonstrates that:
1. evidence can be structured and linked to activities;
2. AI interpretation can be kept separate from source evidence;
3. deterministic criteria can be evaluated independently of AI signals;
4. verification results can produce agreement, insufficient-evidence, or conflict outcomes;
5. agreement can update the competency state automatically;
6. conflict can enter an explicit human adjudication path;
7. the resulting state can be represented by a deterministic record;
8. the record can be anchored on Solana Devnet;
9. the integrity relationship can later be verified when a current Devnet transaction is available.

## What the demo does not prove

The demo does not prove:
- commercial demand;
- customer adoption;
- pricing;
- generalized competency assessment across domains;
- absence of bias;
- universal truth of a competency;
- production-scale reliability.

## Test evidence

The repository maintains automated coverage for the core flow, including:
- Consensus Core agreement;
- insufficient evidence;
- deterministic verifier independence from AI signals;
- explicit conflict routing to human adjudication;
- rejection of human adjudication outside the conflict path;
- invalidation of prior interpretation when new evidence arrives;
- provenance and consensus handoff.

Dependency security audit remains a separate follow-up item and is not treated as a functional correctness claim.

### Current automated verification snapshot

An earlier `main` CI run on 2026-10-05 completed successfully for test, typecheck, and dependency-audit steps. The repository currently contains **11 test files and 76 active test cases** according to the documented snapshot; this count must be regenerated if the suite changes. This earlier CI run should not be presented as verification of the current HEAD.

## Current public-proof status

The repository contains the attestation and verification path. A fresh `m3.attestation.v2` attestation was generated and verified on Solana Devnet on 2026-10-08. The recorded execution evidence is in [Issue #21](https://github.com/SH1W4/learning-competency-mvp/issues/21); the current fallback fixture and transaction details are documented below. This closes the fresh Devnet proof step, not the remaining visual frontend/E2E product integration.

## Demo resilience protocol

The live attestation path is:

```bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
```

The presentation must not depend exclusively on a fresh Devnet write. Before public submission, the team must register a **previously validated synthetic Ana transaction** and store its transaction signature and corresponding record hash in a reviewable fallback fixture.

If the live write fails because of Devnet availability, the presenter switches to the pre-validated transaction and runs the same verification command. The fallback is an operational resilience measure; it does not create a second proof or alter the attestation semantics.

**Important:** no placeholder transaction or unverified historical transaction should be presented as the fallback. The fixture is considered ready only after the transaction has been independently verified with the current `m3:verify` path.

### Current fallback fixture

A pre-validated fallback fixture is available at `fixtures/solana/devnet-fallback.json`.

**Fallback verification command:**

```bash
npm run m3:verify 2cgWUT2MH8i67m4B5xeRRHHPEkXrCYAH28yP1Erg1JReLXbwdEE6bFzMZnAMS51cWnmfibEiTxTNKFE8K8cpoSDK 7fccd028f193e63d7c4fcd9010cb8fd74c4a2d7d9ebbda32004ec57151f310d9
```

**Transaction details:**
- **Explorer:** https://explorer.solana.com/tx/2cgWUT2MH8i67m4B5xeRRHHPEkXrCYAH28yP1Erg1JReLXbwdEE6bFzMZnAMS51cWnmfibEiTxTNKFE8K8cpoSDK?cluster=devnet
- **Record hash:** `7fccd028f193e63d7c4fcd9010cb8fd74c4a2d7d9ebbda32004ec57151f310d9`
- **Competency:** `comp:data-analysis-reproducible`
- **State:** `DEMONSTRATED`
- **Verified:** All checks passing (hash_on_chain, record_integrity, subject_ref, payload_binding, signer)
- **Generated:** 2026-10-08T13:11:46.986Z
- **Payload:** `m3.attestation.v2`
- **Commit:** `015e6878cfd163c69ce7f295c2117c743e0652df`
- **Verification evidence:** `verified=true`; `hash_on_chain=true`; `record_integrity=true`; `subject_ref=true`; `payload_binding=true`; `signer=true`.
- **Recorded execution:** Issue #21 reports `npm test` 76/76, `npm run typecheck` without errors, and `npm run demo` generating `DEMONSTRATED` state on 2026-10-08.
