# 08 — Semantic Hardening & CI Recovery

**Date:** October 2026  
**Phase:** M4 preparation

## Context

After the M2 → M3 technical closure, the repository exposed a set of CI failures caused by tests and fixtures that still reflected earlier semantic contracts. The failures were not treated as isolated test maintenance.

## What changed

- Restored CI through PR #17.
- Aligned claims, handoffs, adjudication, provenance, M3 fixtures, and pipeline tests with the frozen Consensus Core contract.
- Removed remaining legacy review terminology.
- Updated the claim decision reference to match the handoff contract.
- Corrected post-consensus evidence rejection and adjudication preconditions.
- Accounted for trust promotion after AI interpretation.

## Decision

The repository should treat semantic drift against the frozen architecture as an architectural maintenance problem, not merely as broken tests.

Tests are part of the executable specification: when a test contradicts the current canonical contract, the contract and intended behavior must be evaluated first, then the test or implementation corrected deliberately.

## Result

CI returned to alignment with the current architecture, while the core model remained unchanged:

**Evidence → AI Interpretation → Independent Verification → Consensus → Competency State → Attestation**

This round strengthened confidence that the implementation, tests, and documentation describe the same system.
