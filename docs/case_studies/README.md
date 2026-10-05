# LASTRO — Case Studies

This directory contains curated case studies showing how the LASTRO evidence-to-capability pattern can be applied across organizational contexts.

## Portfolio

| # | Case | Vertical | Status |
|---|---|---|---|
| 01 | [FinTech — Ana](./01_FINTECH_ANA.md) | Financial AI | **MVP anchor — synthetic/reproducible** |
| 02 | [HealthTech — Gabriel](./02_HEALTHTECH_GABRIEL.md) | Health / regulated AI | **B2B expansion blueprint** |
| 03 | [DevSecOps — Mariana](./03_DEVSECOPS_MARIANA.md) | Software / security | **Engineering expansion blueprint** |
| 04 | [Reskilling — Rafael](./04_RESKILLING_RAFAEL.md) | Education / social impact | **Funding & impact blueprint** |

See the [Executive Matrix](./00_MATRIZ_EXECUTIVA.md) for the complete portfolio and the separate B2B reskilling/hiring strategic track.

## How to read these cases

### Implemented MVP

**Case 01** is the canonical demonstration scenario. The repository's actual synthetic fixtures, tests, CLI and attestation path are the source of truth for implementation.

### Expansion blueprints

**Cases 02–04** demonstrate how the same architectural pattern could be adapted to regulated healthcare, software security, and funded reskilling.

They are **not presented as deployed customer implementations or independent market validation**.

## Common pattern

```text
OBSERVABLE WORK
      ↓
EVIDENCE
      ↓
INTEGRITY / PROVENANCE
      ↓
AI INTERPRETATION
      +
INDEPENDENT VERIFICATION
      ↓
CONSENSUS / HUMAN ADJUDICATION
      ↓
BOUNDED COMPETENCY STATE
      ↓
ATTESTATION
      ↓
PUBLIC VERIFICATION
```

The canonical MVP documentation defines the exact semantics and implementation boundaries.

## Evaluator path

1. Read [Case 01](./01_FINTECH_ANA.md).
2. Inspect the [synthetic fixtures](../../fixtures/synthetic/ana/).
3. Run `npm run demo`.
4. Read [Demo & Technical Proof](../evaluation/04_DEMO_AND_PROOF.md).
5. Read [Claims & Limitations](../evaluation/05_LIMITATIONS_AND_CLAIMS.md).
6. Use Cases 02–04 to understand potential vertical expansion.

## Evidence discipline

A case study is not automatically evidence of customer validation.

The repository distinguishes:

- **implementation evidence** — executable code, fixtures and tests;
- **research evidence** — external sources and prior art;
- **scenario evidence** — designed case-study workflows;
- **market validation** — external customer/pilot evidence, which remains a separate claim.
