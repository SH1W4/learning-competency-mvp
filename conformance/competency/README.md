# LASTRO Competency Profile v0.1 — MVP Runtime Conformance

This directory records the first runtime evaluation of the real LASTRO MVP against the lastro-competency-v0.1 profile.

## Boundary

Implementation → adapter → canonical semantic observations → profile evaluation.

The adapter is intentionally conservative: missing semantics remain NOT_EVALUATED; insufficient observation surface remains BLOCKED; implementation behavior is not silently promoted into protocol semantics.

## Runtime posture

| Fixture | Result |
|---|---|
| CF-C-001 | NOT_EVALUATED |
| CF-C-002 | PASS |
| CF-C-003 | PASS |
| CF-C-004 | PASS |
| CF-C-005 | NOT_EVALUATED |
| CF-C-006 | NOT_EVALUATED |
| CF-C-007 | BLOCKED |
| CF-C-008 | PASS |

**4 PASS / 1 BLOCKED / 3 NOT_EVALUATED / 0 FAIL.**

This is runtime evidence, not conformance certification.

## Next gaps

1. expose a canonical observation surface;
2. expose target/contract/resolution-ground/profile fields;
3. define freshness semantics;
4. define withholding semantics;
5. decide credential evidence scope;
6. rerun the complete profile suite after each gap is closed.