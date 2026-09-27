# Learning Competency MVP

> Experimental MVP for development of competencies, organization of learning evidence, AI-assisted interpretation, and verifiable attestation on Solana.

**Primary language:** Portuguese (Brazil) · [English version](README.en.md)

## Purpose

This repository is the **technical execution base** for the Learning Competency MVP.

The project is intentionally small: it exists to turn the current product thesis into a working end-to-end prototype that can be run, inspected, tested, and demonstrated.

The repository should answer one practical question:

> **Can we transform a desired competency into a short development path, collect evidence produced by a person, interpret that evidence with AI and human review, represent a competency state, and preserve a verifiable proof of that state?**

## MVP flow

    ORGANIZATION / PROGRAM
            ↓
    DESIRED COMPETENCY
            ↓
    SHORT TRAIL
            ↓
    PERSON
            ↓
    ACTIVITIES
            ↓
    EVIDENCE
            ↓
    AI INTERPRETATION
            ↓
    HUMAN REVIEW
            ↓
    COMPETENCY STATE
            ↓
    ATTESTATION / PROOF
            ↓
    SOLANA
            ↓
    VERIFICATION

This flow is the current implementation target. Product ideas outside this path should not enter the codebase automatically.

## MVP boundaries

### Build now

- one concrete competency;
- one short, controlled development trail;
- one person;
- a small number of evidence types;
- evidence ingestion and normalization;
- AI-assisted evidence interpretation;
- human review;
- a minimal competency-state representation;
- a minimal attestation/proof object;
- Solana integration for integrity/attestation/verifiability;
- a simple verification path;
- tests for the critical flow.

### Do not build now

- full LMS;
- course marketplace;
- recruitment platform;
- broad course catalog;
- extensive institutional integrations;
- definitive competency methodology;
- multiple markets at once;
- definitive monetization;
- sensitive personal documents directly on-chain.

These may remain product vision or future hypotheses, but they are not implementation requirements for the current MVP.

## Technical principles

### 1. Evidence is not interpretation

Keep these states distinct:

evidence → extraction → interpretation → human review → competency state → verification

The system must preserve what came from the evidence versus what was inferred by AI.

### 2. AI is not institutional authority

AI may:

- structure evidence;
- extract fields;
- relate evidence to competencies;
- synthesize development signals;
- flag inconsistencies or items for review.

AI must not independently declare official recognition or institutional verification.

### 3. Human review is explicit

The prototype should make review visible in the state transition. A reviewer can accept, correct, or reject AI-produced interpretation.

### 4. Verification is stronger than inference

Use an explicit trust model:

- **N1 — Self-declared**
- **N2 — Evidence presented**
- **N3 — Evidence analyzed**
- **N4 — Source verified**

The AI may support N1–N3. N4 requires an external authenticated verification mechanism.

### 5. Solana is an integrity layer

Solana is used to explore:

- attestation;
- integrity;
- state/event registration;
- verifiability.

Sensitive documents and raw personal data stay off-chain.

The exact attestation schema/mechanism must be validated against the chosen implementation before being treated as final.

## Implementation rule

A feature belongs in the MVP only if it helps prove the central flow.

For each proposed change, ask:

1. What part of the MVP flow does this enable?
2. What evidence will show that it works?
3. Does it introduce a product assumption that has not been validated?
4. Can it be postponed without breaking the demonstration?

If the answer is unclear, keep the change out of the MVP.

## Repository structure

    .
    ├── docs/
    │   ├── product/
    │   ├── architecture/
    │   ├── decisions/
    │   ├── hackathon/
    │   ├── validation/
    │   ├── demo/
    │   └── PROJECT_STATUS.md
    ├── skills/
    │   └── learning-competency/
    │       └── SKILL.md
    ├── src/
    ├── tests/
    └── CONTRIBUTING.md

- src/ — implementation.
- tests/ — automated tests.
- docs/ — product contracts, architecture, decisions, hackathon execution, validation and demo material.
- skills/ — reusable project intelligence and operating instructions for AI-assisted development.
- CONTRIBUTING.md — contribution and scope rules for the team.

## Development workflow

1. Read the project skill before making architectural or product-sensitive changes.
2. Check the current MVP flow and boundaries.
3. Implement the smallest change that advances the flow.
4. Add or update tests.
5. Document important architectural decisions.
6. Keep speculative features outside the implementation.
7. Prefer small, reviewable commits.

## Source of truth

The project has two complementary knowledge spaces:

**Drive — product context and governance**
- research;
- meeting records;
- thesis evolution;
- product analysis;
- references;
- team decisions and alignment material.

**GitHub — technical execution**
- code;
- tests;
- implementation specifications;
- validated architecture;
- issues and pull requests;
- technical history.

The rule is:

> **Research informs the implementation. A validated decision authorizes the implementation.**

## Current status

**Phase:** MVP definition → technical implementation.

**Repository status:** execution foundation established; vertical slice not yet implemented.

**Immediate target:** close the concrete competency/trail decision, validate demand, and implement the first complete evidence → interpretation → review → state → attestation → verification path.

Current status is tracked in [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).

Key execution documents:\n- [MVP Contract](docs/product/MVP_CONTRACT.md)\n- [Hackathon Execution Framework](docs/hackathon/README.md)\n- [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md)\n- [Attestation Model](docs/architecture/ATTESTATION_MODEL.md)\n- [Demand Validation](docs/validation/DEMAND_VALIDATION.md)\n- [Demo Script](docs/demo/DEMO_SCRIPT.md)

For project intelligence and AI-assisted development guidance, read [skills/learning-competency/SKILL.md](skills/learning-competency/SKILL.md).
