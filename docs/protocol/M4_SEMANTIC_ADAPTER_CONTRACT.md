# M4 Semantic Adapter Contract — Drafted for Executable Tests

**Contract ID:** `lastro-competency-adapter-v0.1`  
**Protocol/profile baseline:** LASTRO Protocol v0.1.0 / competency profile v0.1.0  
**Status:** Implementation contract candidate; review required before merge.  
**Authority:** The private normative Protocol and competency profile remain authoritative. This file documents the public adapter behavior; it does not publish or replace the private normative documents.

## 1. Separation of concepts

The adapter keeps distinct:
- product workflow state;
- canonical competency state;
- consensus outcome;
- resolution mechanism/result;
- evidence acquisition status;
- attestation.

The adapter does not itself perform evidence canonicalization, verification, or resolution. It only projects an existing product workflow label when the supplied grounds are explicit.

## 2. Product workflow mapping

| Product workflow label | Canonical competency state | Contract |
|---|---|---|
| `NOT_STARTED` | none | Workflow-only. No claim/state is inferred; absence is not falsehood. |
| `IN_DEVELOPMENT` | none | Workflow-only. Progress is not competency state. |
| `UNDER_REVIEW` | none | Workflow-only. Review queue status is not a resolution. |
| `DEMONSTRATED` | conditional | May project to a canonical state only when semantic grounds are supplied. |

For `DEMONSTRATED`, projection precedence is:
1. unresolved material conflict → `CONFLICT`;
2. explicit insufficiency or no canonical evidence → `INSUFFICIENT_EVIDENCE`;
3. missing claim/contract binding, attributable verification, or explicit resolution → `REQUIRES_VERIFICATION`;
4. all required grounds present and no unresolved conflict → `ESTABLISHED`.

This is a conservative adapter contract. It does not infer `NOT_ESTABLISHED` from workflow status or missing evidence. A future explicit negative resolution may emit `NOT_ESTABLISHED`, but it requires a separate contract-defined pathway and tests.

## 3. Consensus and resolution

Canonical consensus outcomes in this adapter are:
- `AGREEMENT`
- `INSUFFICIENT_EVIDENCE`
- `CONFLICT`

`HUMAN_ADJUDICATION` is a resolution mechanism, not a consensus outcome. A human adjudication record requires actor attribution, basis, evidence references, prior verifier-result references, and applicable rule version. Validation is structural; it does not prove that the adjudication was substantively correct.

## 4. Negative distinctions

- source unavailable/timeout is an acquisition status, not a competency state;
- insufficient evidence is not competency failure;
- no state is not false;
- conflict is not agreement;
- interpretation is not verification;
- verifier result is not resolution;
- resolution is not state;
- state is not attestation.

## 5. Executable tests

The contract's initial executable tests are in `tests/competency-state-adapter.test.ts`, using the existing Vitest runner (`npm test`). They cover conditional establishment, workflow-only states, conflict precedence, insufficiency vs missing verification, interpretation non-authority, claim/contract binding, consensus/adjudication separation, and adjudication provenance fields.

## 6. Explicit limitations

- This contract does not change the existing M4 projection or its API payload yet.
- It does not validate actual runtime evidence or the production response schema.
- It does not prove independent verification, on-chain attestation E2E, or protocol conformance.
- It does not map source-unavailable or timeout into a competency state; these must remain separate transport/acquisition outcomes.
- Merge requires review, CI on the exact branch head, and compatibility review against the existing public API.
