# Publication Classification Matrix

**Status:** operational classification baseline  
**Date:** 2026-10-04  
**Scope:** current LASTRO repository

## Purpose

Classify tracked material by the information it contains, not by its directory name.

This matrix is a publication decision aid. It does not perform a physical vault migration.

## Classes

| Class | Meaning | Default handling |
|---|---|---|
| PUBLIC | Safe and intentionally useful for evaluation, understanding or reproduction | May remain in the public repository |
| RESTRICTED | Controlled disclosure; useful to evaluators, partners or diligence under review | Keep outside public publication until approved/redacted |
| PRIVATE | Core-team strategic or operational material | Keep in controlled team workspace |
| SECRET STORE | Credentials, signing material or secrets | Never commit; use a secret manager |

## Current file-level baseline

| Path / area | Class | Publication rationale |
|---|---|---|
| `README.md` | PUBLIC | Public product and technical entry point |
| `src/` | PUBLIC | Reproducibility and technical auditability are part of the MVP proof |
| `tests/` | PUBLIC | Reproducible verification |
| `fixtures/synthetic/` | PUBLIC | Synthetic proof material; must not contain real sensitive evidence |
| `docs/architecture/` | PUBLIC | Canonical technical architecture |
| `docs/evaluation/` | PUBLIC | Evaluation, governance, proof and claims discipline |
| `docs/product/USE_CASE.md` | PUBLIC | Canonical MVP use case |
| `docs/product/PITCH_ARCHITECTURE.md` | PUBLIC | Product narrative and technical demo contract; no confidential data identified |
| `docs/product/VICTORY_EXECUTION.md` | RESTRICTED | Internal execution priorities, readiness scoring and competitive submission strategy |
| `docs/governance/` | PUBLIC | Publication policy, source-of-truth and vault boundary |
| `docs/brand/` | PUBLIC | Brand/interface handoff |
| `docs/market/COMPETITIVE_LANDSCAPE.md` | PUBLIC | Public research framework; no confidential evidence identified |
| `docs/go-to-market/GTM.md` | PUBLIC | Deliberately public hypothesis-level framing; explicitly excludes sensitive commercial details |
| `research/05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` | PUBLIC | Based on public ecosystem research and explicitly bounded claims |
| `research/04_MARKET_VALIDATION_EVIDENCE.md` | RESTRICTED | Contains validation gaps, wedge hypotheses and market-evidence strategy |
| `research/06_DECISIONS.md` | RESTRICTED | Records strategic decisions derived from research |
| `research/08_WINNING_PATTERN_AUDIT.md` | RESTRICTED | Internal competitive/readiness scoring and submission strategy |
| `docs/diario-de-bordo/` | PRIVATE | Internal operational history and team process |
| `docs/decisions/` | RESTRICTED by default | Decision records may expose internal trade-offs; individual files can be promoted after review |
| `.env.example` | PUBLIC only after secret-pattern review | Template is public-safe only if it contains placeholders and no credentials |
| real `.env`, keys, tokens, signing material | SECRET STORE | Never commit or publish |

## Important non-rules

- A directory named `research/` is not automatically private.
- A strategic document is not automatically private if it contains only public, already-disclosed reasoning.
- Source code is not automatically restricted merely because it has competitive value.
- `.gitignore` does not retroactively make tracked content private.
- `RESTRICTED` does not imply a third Git repository before the hackathon.

## Review triggers

Reclassify a file when it gains:

- real customer/interview data;
- non-public partner information;
- pricing or buyer experiments;
- negotiation details;
- unpublished competitive intelligence;
- private security findings;
- proprietary implementation details;
- credentials or signing material.

## Migration rule

No physical file movement is authorized by this matrix.

Before any Public/Private split:
1. complete file-level review;
2. run dedicated secret scanning;
3. verify public claims against implementation;
4. identify every RESTRICTED/PRIVATE destination;
5. prepare a reviewable migration commit/PR.

## Decision

**Current repository remains physically unchanged.**

The objective now is correct classification and controlled disclosure, not premature repository restructuring.
