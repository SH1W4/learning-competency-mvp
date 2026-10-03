# LASTRO — Learning Competency Infrastructure

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency" width="100%" />
</p>

<h3 align="center">LASTRO</h3>

<p align="center"><strong>Learning Competency Infrastructure</strong></p>

<p align="center">Evidence-backed competency.</p>

<p align="center"><strong>Evidence → Independent Verification → Consensus → State → Proof</strong></p>

[![CI](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml/badge.svg)](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml)
![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)

## The Problem

A certificate can show completion. It does not necessarily preserve what a person actually demonstrated.

Learning Competency explores a different model:

**development activity → evidence → interpretation → independent verification → competency state → verifiable proof**

The current MVP focuses on the narrowest technically demonstrable wedge: turning learning evidence into a reviewed, verifiable competency state.

## Core Principle

### AI does not decide competency.

AI assists with evidence interpretation. The system separates interpretation, verification, governance, and state transition.

The **Consensus Core** reduces dependence on individual judgment by requiring convergence across independent verification mechanisms. Conflicting, ambiguous, or insufficient cases can be routed to human adjudication.

| Evidence | Interpretation | Verification | State / Proof |
|---|---|---|---|
| What was produced | AI-assisted | Independent mechanisms | Verifiable state |

## What We Built

### M1 — Concrete competency scenario

A corporate learning scenario centered on an applied data-analysis competency.

### M2 — Evidence and AI interpretation

A TypeScript/Node pipeline that receives evidence, extracts observable information, relates evidence to competency criteria, and produces AI-assisted interpretation.

### M3 — State, attestation, and verification

A competency state is represented as a deterministic record. Its integrity can be anchored to Solana Devnet and subsequently verified.

    Evidence
       ↓
    Integrity Check
       ↓
    Deterministic Rule Check
       ↓
    AI Interpretation
       ↓
    Governance / Compliance
       ↓
    Consensus Core
       ↓
    Competency State
       ↓
    Attestation
       ↓
    Verification

### Human adjudication is an exception layer

Human review is not removed. It is preserved for conflicts, ambiguity, insufficient evidence, contextual criteria, contestation, or other governance-defined exceptions.

### Blockchain is an integrity layer

Solana does **not** independently determine whether a person has a competency.

It provides an integrity and verification layer for a state produced by the defined evidence and verification process.

Sensitive learning data remains off-chain.

## Technical Proof

- automated test suite and type checking;
- M1 → M2 → M3 vertical slice implemented;
- M2 → M3 handoff hardened;
- Consensus Core with a deterministic verifier independent of AI signals;
- Solana Devnet attestation demonstrated;
- tamper detection, signer validation, and payload binding covered by tests;
- synthetic demonstration data explicitly identified as synthetic.

**Live proof:** generate a current `m3.attestation.v2` Devnet attestation with `npm run m3:attest`, then verify it with `npm run m3:verify <tx_signature> [record_hash]`.

## What This MVP Claims — and Does Not Claim

The MVP demonstrates that a competency-development workflow can:

- structure learning evidence;
- assist evidence interpretation with AI;
- apply independent verification mechanisms;
- preserve provenance and decision context;
- produce a bounded competency state;
- create a verifiable integrity reference.

It does **not** claim to:

- replace human evaluation in every case;
- operate as a complete LMS;
- define a universal competency framework;
- prove the truth or merit of a competency through blockchain;
- place sensitive learning data on-chain;
- have validated final pricing, traction, or a definitive commercial model.

## Documentation

### For Hackathon Evaluators

**[LASTRO — Evaluation Documentation](docs/evaluation/README.md)**

Start here. This is the curated evaluator layer and should be read in this order:

1. [Product Overview](docs/evaluation/01_PRODUCT.md) — what LASTRO is and why it matters
2. [Architecture & Evidence Pipeline](docs/evaluation/02_ARCHITECTURE.md) — how the system works
3. [Consensus, Governance & Attestation](docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md) — why the state is trustworthy and bounded
4. [Demo & Technical Proof](docs/evaluation/04_DEMO_AND_PROOF.md) — what is actually demonstrated
5. [Limitations & Claims](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md) — what is implemented versus still a hypothesis

### Working Documentation

The project's operational architecture, implementation notes, and research remain in Portuguese under `docs/` and `research/`.

## Quick Start

    npm install
    npm test
    npm run typecheck
    npm run demo

For Solana Devnet attestation:

    npm run m3:attest
    npm run m3:verify <tx_signature> [record_hash]

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
    research/

## Team

| Contributor | Primary contribution |
|---|---|
| Erick | Research, context, market, and operations |
| JP Carvalho | M2 — evidence pipeline, AI, and review |
| JP Fernandes | Branding, UX/UI, and interface |
| JX | Architecture, AI, evidence, attestation, and Solana |

## Hackathon History

Started on September 25, 2026.

The project evolved from an initial micro-credential concept into a focused, traceable, and verifiable competency vertical slice.

**M1 → M2 → M3 → Hardening → Feature Freeze**

## License

License and distribution terms will be defined before a final public release.
