# LASTRO Competency Profile v0.1 — Runtime Conformance Evidence

Date: 2026-10-05
Implementation: SH1W4/learning-competency-mvp
Profile: lastro-competency-v0.1
Protocol: LASTRO Protocol v0.1

## Result

Runtime adapter executed against the actual MVP code path.

**5 PASS / 0 BLOCKED / 3 NOT_EVALUATED / 0 FAIL.**

| Fixture | Result | Evidence |
|---|---|---|
| CF-C-001 | NOT_EVALUATED | MVP does not expose CREDENTIAL evidence. |
| CF-C-002 | PASS | AI output is proposal-only; unauthorized authority field is rejected; deterministic verification participates before consensus. |
| CF-C-003 | PASS | Adapter preserves verifier result and explicit resolution as distinct objects. |
| CF-C-004 | PASS | Consensus Core produces CONFLICT while preserving individual verifier results. |
| CF-C-005 | NOT_EVALUATED | No explicit freshness contract. |
| CF-C-006 | NOT_EVALUATED | No explicit withholding semantics. |
| CF-C-007 | PASS | Canonical observation adapter reconstructs bounded state from explicit target, contract, resolution and verifier grounds. |
| CF-C-008 | PASS | Attestation payload is built only from a DEMONSTRATED reviewed state with a valid record hash. |

## Interpretation

This is runtime evidence of bounded compatibility, not a statement that the MVP conforms to the complete competency profile.

CF-C-007 is now PASS through an explicit semantic adapter. The adapter does not alter the MVP state model; it reconstructs the profile observation surface from existing target, contract, consensus, verifier-result and history objects.

## Reproduction

npm run conformance:competency

Normative fixture source: SH1W4/lastro-protocol@main, conformance/profiles/competency/fixtures-v0.1.json.
## Executed evidence

- Branch: conformance/competency-profile-v0-1
- Head commit: a26099129d2a980ce421c65eb9a87c7289a58ba4
- GitHub Actions workflow: LASTRO Competency Profile Conformance
- Run: 37398262079
- Job: 112059316641
- Result: success
- Typecheck: PASS
- Unit tests: 76 passed across 11 test files
- Runtime conformance: PASS (runner execution)

The runner's semantic result is now 5 PASS / 0 BLOCKED / 3 NOT_EVALUATED / 0 FAIL; complete profile conformance remains NOT AUTHORIZED because three profile semantics are still outside the MVP observation scope.
