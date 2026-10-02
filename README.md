# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency" width="100%" />
</p>

<h3 align="center">From learning evidence to verifiable competency state.</h3>

<p align="center"><strong>Evidence → AI interpretation → Human review → State → Proof</strong></p>

[![CI](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml/badge.svg)](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-70%20passing-success)
![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)

## The Problem

A certificate can show completion. It does not necessarily preserve what a person actually demonstrated.

Learning Competency explores a different model:

**development activity → evidence → interpretation → human review → competency state → verifiable proof**

## The Core Principle

### AI does not decide competency.

AI assists with evidence interpretation. A human reviewer is responsible for the decision.

| Evidence | Interpretation | Decision | Proof |
|---|---|---|---|
| What was produced | AI-assisted analysis | Human review | Verifiable attestation |

## What We Built

### M1 — Concrete use case

A focused corporate learning scenario for applied data-analysis competency.

### M2 — Evidence, AI and review

A TypeScript/Node pipeline that ingests evidence, extracts observable information, relates it to competency criteria, produces an AI-assisted interpretation and records human review.

### M3 — State, attestation and verification

The reviewed state is represented by a deterministic record. Its integrity can be anchored on Solana Devnet and independently checked later.

    Evidence
       ↓
    AI interpretation
       ↓
    Human review
       ↓
    Competency state
       ↓
    Record integrity
       ↓
    Attestation
       ↓
    Verification

### Important boundary

Solana does **not** independently determine whether a person has a competency.

It provides an integrity and verification layer around a previously reviewed state.

Sensitive learning data remains off-chain.

## Proof

- 70 automated tests passing
- M1 → M2 → M3 vertical slice implemented
- M2 → M3 handoff hardened
- Devnet attestation demonstrated
- tamper detection, signer validation and payload binding covered by tests
- synthetic demonstration data clearly identified as synthetic

[View the reference Devnet transaction →](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

## What This MVP Does — and Does Not — Claim

It demonstrates that a competency-development workflow can produce structured evidence, assist interpretation, record human review, represent a bounded state and preserve a verifiable integrity reference.

It does **not** claim to:

- replace human assessment;
- be a complete LMS;
- define a universal competency framework;
- prove the truth or merit of a competency through blockchain;
- place sensitive learning data on-chain;
- have validated pricing, traction or a definitive commercial model.

## Quick Start

    npm install
    npm test
    npm run typecheck
    npm run demo

For the Solana Devnet demonstration:

    npm run m3:attest
    npm run m3:verify <tx_signature> [record_hash]

## Documentation

| Area | Resource |
|---|---|
| Product | [MVP Contract](docs/product/MVP_CONTRACT.md) · [User Journeys](docs/product/USER_JOURNEYS.md) · [Use Case](docs/product/USE_CASE.md) |
| Architecture | [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md) · [Attestation Model](docs/architecture/ATTESTATION_MODEL.md) · [Canonicalization](docs/architecture/CANONICALIZATION.md) |
| Execution | [Project Status](docs/PROJECT_STATUS.md) · [Development Log](docs/diario-de-bordo/) |
| Demo | [Demo Overview](docs/demo/DEMO_SCRIPT.md) |

Detailed market, demand-validation and operating strategy is intentionally maintained separately from this public repository.

## Repository Structure

    src/
    ├── ai/
    ├── evidence/
    ├── relation/
    ├── review/
    ├── state/
    ├── provenance/
    ├── solana/
    ├── domain/
    └── cli/

    tests/
    fixtures/
    docs/

## Team

| Person | Core contribution |
|---|---|
| Erick | Research, context, market and operations |
| JP Carvalho | M2 — evidence pipeline, AI and review |
| JP Fernandes | Branding, UX/UI and interface |
| JX | Architecture, AI, evidence, attestation and Solana |

## Hackathon History

Started September 25, 2026.

The project evolved from an initial microcredential concept into a focused, traceable and verifiable competency vertical slice.

**M1 → M2 → M3 → Hardening → Feature Freeze**

## License

License and distribution terms will be defined before a final version is published.
