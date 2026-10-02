# Project Handoff

## Purpose

This document records the current handoff point of the MVP before validation, demo and submission.

## Current state

- M1: DONE
- M2: DONE
- M3: DONE
- M4: IN PROGRESS
- M4.7 repository audit: in progress

## What is already implemented

- competency → learning trail → activities → evidence flow;
- evidence normalization and provenance;
- AI interpretation with human review boundary;
- reviewed competency state machine;
- DEMONSTRATED state requires explicit reviewer confirmation;
- deterministic record hashing;
- Solana Memo attestation on Devnet;
- on-chain payload binding and verification;
- bounded claim/provenance layer;
- CI and manual Solana Devnet workflows.

## Final validation

Before demo/submission, validate from a clean environment:

```bash
npm ci
npm test
npm run typecheck
npm audit --audit-level=high
npm run demo
```

For the real Devnet flow, configure `SOLANA_PRIVATE_KEY` as a GitHub Actions secret and run the manual `solana-devnet.yml` workflow.

## Repository note

A significant portion of the implementation and documentation was added directly to the repository before being consistently organized as small reviewable PRs. This handoff does not rewrite that history. From this point forward, changes should follow the repository's PR/review workflow.

## Remaining external setup

- GitHub branch protection/ruleset for `main`;
- Devnet secret configuration;
- final validation evidence;
- demo/submission preparation.

## Scope boundary

No new product features are required for this handoff. The immediate objective is to validate, document and submit the existing vertical slice.
