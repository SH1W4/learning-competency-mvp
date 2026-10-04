# Project Journal — Entry 01: M2 Merge and Decisions

**Date:** October 1, 2026  
**Phase:** M2 finalization and M3 start

## What happened

- M2 was integrated into the main branch.
- The ingestion, normalization, assisted interpretation, human review, and testing foundation became part of the MVP flow.
- The M2 → M3 handoff was prepared to preserve traceability of the reviewed state.

## Decisions

1. The MVP keeps a deterministic provider for local execution and tests, with optional LLM provider support.
2. Persistence for the vertical slice remains deliberately simple.
3. The M3 handoff must preserve the integrity of the reviewed state without transferring unnecessary sensitive data to the chain.
4. Conflicts between evidence signals remain subject to human review.

## Next step

Implement and validate the M3 attestation and verification layer.
