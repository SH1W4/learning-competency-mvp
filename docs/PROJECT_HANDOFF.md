# Project Handoff

## Purpose

This document records the current handoff point of the MVP before validation, demo, and submission.

## Current state

- M1: DONE
- M2: DONE
- M3: DONE
- M4: IN PROGRESS — PROVE & DEMONSTRATE validated (Render runtime live, Vercel frontend live at `lastro-learn.vercel.app`, on-chain Devnet attestation verified)
- Research / Product layer: established
- Consensus Core: implemented for the covered scenario
- Frontend vertical slice: implemented and deployed (Next.js read-only projection)
- Demo and pitch: active focus

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
- Solana Memo attestation capability on Devnet;
- on-chain payload binding and verification;
- bounded claim/provenance layer;
- canonical M4 runtime HTTP server (`GET /health`, `GET /api/m4/competency`);
- public read-only Next.js frontend vertical slice connected via HTTPS proxy;
- pre-validated Solana Devnet fallback fixture (`fixtures/solana/devnet-fallback.json`);
- automated tests (13 test files, 80 tests passing) and full TypeScript type checking.

## Final validation

Before demo/submission, validate from a clean environment:

```bash
# Core engine validation (13 files, 80 tests)
npm ci
npm test
npm run typecheck
npm audit --omit=dev --audit-level=high
npm run demo

# Frontend validation
cd frontend
pnpm install
pnpm run typecheck
pnpm run build
cd ..
```

The dependency audit is a controlled security follow-up when remaining findings are transitive dependency issues; breaking dependency upgrades are not part of stabilization unless required by the audit policy.

For a new public Devnet proof, configure `SOLANA_PRIVATE_KEY` as a GitHub Actions secret and run the manual `solana-devnet.yml` workflow. Register the resulting `m3.attestation.v2` transaction in evaluator documentation only after verification.

## Verification infrastructure boundary

- Verification infrastructure is adapter-based.
- Local verifiers remain the MVP baseline.
- CRE is the first external infrastructure candidate for experimentation, not a hard dependency.
- External infrastructure produces verifier results; it does not replace the LASTRO Consensus Core.
- CRE/DON consensus and LASTRO competency consensus remain distinct.
- Human adjudication remains an exception path for unresolved conflict or ambiguity.

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

## Layer-specific handoffs

The detailed Integrity Layer handoff is maintained privately. The public integration contract is defined by the current Integrity Layer implementation, `docs/evaluation/04_DEMO_AND_PROOF.md`, and the architecture documents referenced from the public evaluator path.
