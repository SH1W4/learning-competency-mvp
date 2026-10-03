# Project Handoff

## Purpose

This document records the current handoff point of the MVP before validation, demo, and submission.

## Current state

- M1: DONE
- M2: DONE
- M3: DONE
- Research / Product layer: established
- Consensus Core: implemented for the covered scenario
- Frontend narrative: defined
- Demo and pitch: next focus

## What is implemented

- competency → learning trail → activities → evidence flow;
- evidence normalization and provenance;
- AI-assisted evidence interpretation;
- independent verification mechanisms;
- deterministic criteria verification independent of AI signals;
- Consensus Core with agreement, insufficient-evidence, and conflict outcomes;
- human adjudication as an exception layer;
- competency state transitions;
- deterministic record hashing;
- Solana Memo attestation on Devnet;
- on-chain payload binding and verification;
- bounded claim/provenance layer;
- automated tests and type checking.

## Final validation

Before demo/submission, validate from a clean environment:

```bash
npm ci
npm test
npm run typecheck
npm audit --audit-level=high
npm run demo
```

The dependency audit is currently treated as a controlled security follow-up because the remaining findings are transitive dependency issues; breaking dependency upgrades are not part of the stabilization step.

For the real Devnet flow, configure `SOLANA_PRIVATE_KEY` as a GitHub Actions secret and run the manual `solana-devnet.yml` workflow.

## Product boundary

The current MVP demonstrates the evidence → verification → consensus → state → attestation path.

Broader organizational intelligence, Dynamic Role Architecture, market validation, pricing, recurring adoption, and commercial scale remain hypotheses under validation.

## Submission focus

The next work should prioritize:

1. frontend implementation of the defined product narrative;
2. end-to-end demo;
3. pitch clarity;
4. market-validation evidence.

No additional abstract architecture is required unless it directly supports one of these goals.
