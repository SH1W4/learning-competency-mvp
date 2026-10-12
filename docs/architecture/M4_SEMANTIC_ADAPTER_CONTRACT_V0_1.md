# M4 Semantic Adapter Contract — Public Implementation Boundary

**Status:** Implementation-level contract for the public MVP.  
**Scope:** Describes this adapter's bounded runtime behavior; it is not a full protocol specification or conformance certification.  
**Implementation:** `src/http/semantic-contract.ts`  
**Tests:** `tests/semantic-contract.test.ts`

## 1. Scope and non-claims

This adapter translates an explicit, already-recorded resolution into the competency profile's bounded state vocabulary. It does not itself verify evidence, create a resolution, attest a state, prove verifier independence, or certify the entire MVP. It is a semantic boundary guard, not a substitute for the full evidence pipeline.

## 2. Canonical profile states

The profile vocabulary is:
- `ESTABLISHED`
- `NOT_ESTABLISHED`
- `INSUFFICIENT_EVIDENCE`
- `CONFLICT`
- `REQUIRES_VERIFICATION`

The adapter returns one of these states only when an explicit resolution is supplied. Absence of a resolution returns `NO_STATE`, unless source acquisition is explicitly unavailable, in which case it returns `SOURCE_UNAVAILABLE`. These are adapter outcomes, not extra competency states.

## 3. Concept separation

- Product labels (`NOT_STARTED`, `IN_DEVELOPMENT`, `UNDER_REVIEW`, `DEMONSTRATED`) are not independent semantic authority.
- Consensus outcomes are limited to `AGREEMENT`, `INSUFFICIENT_EVIDENCE`, and `CONFLICT`.
- Human adjudication is a resolution mechanism/exception path, never a consensus outcome.
- Verifier result, resolution, competency state, workflow status, and attestation remain distinct.
- AI interpretation or confidence alone cannot establish a state.
- Source unavailable, no state, insufficient evidence, not established, and conflict remain distinct.

## 4. Explicit mapping rules

1. Canonical competency state is derived from the explicit resolution field, not from the product label.
2. `DEMONSTRATED` requires explicit resolution `ESTABLISHED`; otherwise the adapter raises a typed contract error.
3. `ESTABLISHED` cannot be emitted while the product label is not `DEMONSTRATED`. A future product contract may relax this only through a versioned decision and new tests.
4. `CONFLICT` consensus cannot be silently mapped to any non-conflict resolution.
5. `INSUFFICIENT_EVIDENCE` consensus cannot be silently mapped to `NOT_ESTABLISHED` or `ESTABLISHED`.
6. `AGREEMENT` is not itself a resolution. An explicit resolution is still required and may be `ESTABLISHED` or `NOT_ESTABLISHED`, subject to product-state consistency.
7. If no resolution exists and the source is unavailable, return `SOURCE_UNAVAILABLE`; if no resolution exists and the source is available, return `NO_STATE`.
8. Human adjudication requires an attributable actor, rationale/basis, evidence references, applicable rules, and prior verifier results. Missing fields fail closed.
9. The adapter never creates attestation or treats attestation as semantic authority.

## 5. Explicitly unresolved / out of scope

- This adapter does not decide whether the evidence set satisfies the competency contract.
- It does not determine whether verifiers are genuinely independent.
- It does not define source freshness, authorization, privacy, or cross-profile mappings.
- It does not establish whether every existing `IN_DEVELOPMENT`, `UNDER_REVIEW`, or `NOT_STARTED` UI use should be a workflow field or a state field; it only prevents those labels from becoming a canonical state without an explicit resolution.
- It does not certify the complete product or protocol for universal conformance.

## 6. Acceptance criteria

- `npm test -- tests/semantic-contract.test.ts` passes.
- `npm run typecheck` passes.
- No test equates source outage with insufficiency, no-state with false, conflict with agreement, or adjudication with consensus.
- Runtime/UI integration and the full conformance matrix remain open until separately tested.
