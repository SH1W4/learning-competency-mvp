# Project Journal — Entry 06: MVP Technical Closure

**Date:** October 1, 2026  
**Status:** DONE

## Context

After M1 (Use Case Specification) and M2 (Evidence, AI, and Review) were completed, one final dependency remained to connect the full vertical slice: ensuring that M3 (Solana Attestation and Verification) consumed the real M2 output (`ReviewedStateRecord`) rather than synthetic dummy records.

## Decision and implementation

1. **Removed `dummyRecord`:** `src/solana/demo.ts` was refactored to actively consume `out/reviewed-state.json`, produced by the complete M2 pipeline.
2. **Preserved the cryptographic hash:** `record_hash`, generated and signed in M2 through `src/provenance/trace.ts`, is preserved through M3 until it is registered in the Solana Memo Program payload.
3. **M3 verification:** `src/solana/verify.ts` was adjusted to automatically obtain the `record_hash` from the M2 pipeline when executed, or accept it as an argument. Local-versus-on-chain verification is validated and functional.
4. **M3 tests:** Unit coverage was introduced in `tests/m3.test.ts`, including positive and negative verification conditions, invalid payload handling, and `record_hash` preservation.
5. **Hardening cycle:** Integrity gaps at the handoff were addressed with payload-generation tests, tampering tests in `provenance.test.ts`, and a fail-fast check in `demo.ts` when `SOLANA_PRIVATE_KEY` is absent.

## Consequences

- **Vertical slice completed:** M1 → M2 → M3 is implemented, testable, and demonstrable end to end.
- **Solana as anchor, not merit validator:** Solana does not validate whether a learner “has the competency”; it anchors the `record_hash` of the reviewed state produced off-chain.
- **Code freeze:** The base product layer is frozen. Remaining work is focused on UI/UX, external validation, proof, communication, and submission.
