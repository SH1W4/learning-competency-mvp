# LASTRO Competency Profile v0.1 — Runtime Conformance Evidence

Date: 2026-10-05
Implementation: SH1W4/learning-competency-mvp
Profile: lastro-competency-v0.1
Protocol: LASTRO Protocol v0.1

## Result

Runtime adapter executed against the actual MVP code path.

**4 PASS / 1 BLOCKED / 3 NOT_EVALUATED / 0 FAIL.**

| Fixture | Result | Evidence |
|---|---|---|
| CF-C-001 | NOT_EVALUATED | MVP does not expose CREDENTIAL evidence. |
| CF-C-002 | PASS | AI output is proposal-only; unauthorized authority field is rejected; deterministic verification participates before consensus. |
| CF-C-003 | PASS | Adapter preserves verifier result and explicit resolution as distinct objects. |
| CF-C-004 | PASS | Consensus Core produces CONFLICT while preserving individual verifier results. |
| CF-C-005 | NOT_EVALUATED | No explicit freshness contract. |
| CF-C-006 | NOT_EVALUATED | No explicit withholding semantics. |
| CF-C-007 | BLOCKED | MVP state lacks target/contract/resolution-ground/profile fields required by the profile observation surface. |
| CF-C-008 | PASS | Attestation payload is built only from a DEMONSTRATED reviewed state with a valid record hash. |

## Interpretation

This is runtime evidence of bounded compatibility, not a statement that the MVP conforms to the complete competency profile.

The key finding is CF-C-007: the MVP state machine is operationally strong, but its canonical state object is not sufficient to reconstruct the profile's bounded semantic state without adapter-invented fields.

## Reproduction

npm run conformance:competency

Normative fixture source: SH1W4/lastro-protocol@main, conformance/profiles/competency/fixtures-v0.1.json.