# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Aprendizado em competências com evidências reais" width="100%" />
</p>

> **Aprender → produzir evidências → interpretar → revisar → representar o estado → verificar.**

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

## Documentation map

### Product

- [MVP Contract](docs/product/MVP_CONTRACT.md)
- [User Journeys](docs/product/USER_JOURNEYS.md)
- [MVP Use Case](docs/product/USE_CASE.md)

### Architecture

- [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md)
- [Attestation Model](docs/architecture/ATTESTATION_MODEL.md)
- [Technical Architecture](docs/architecture/TECHNICAL_ARCHITECTURE.md)

### Market & GTM

- [Competitive Landscape](docs/market/COMPETITIVE_LANDSCAPE.md)
- [Go-To-Market Working Model](docs/go-to-market/GTM.md)
- [Demand Validation](docs/validation/DEMAND_VALIDATION.md)

### Governance & Execution

- [Project Status](docs/PROJECT_STATUS.md)
- [Team Roles & Decision Governance](docs/governance/TEAM_ROLES.md)
- [Contributing](CONTRIBUTING.md)
- [Project Skill](skills/learning-competency/SKILL.md)

### Hackathon & Demo

- [Hackathon Execution Framework](docs/hackathon/README.md)
- [Demo Script](docs/demo/DEMO_SCRIPT.md)

### Brand

- [Brand README](docs/brand/README.md)
- [Brandbook Draft](docs/brand/BRANDBOOK_DRAFT.md)
- [Naming Exploration](docs/brand/NAMING_EXPLORATION.md)

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
    │   ├── market/
    │   ├── go-to-market/
    │   ├── governance/
    │   ├── decisions/
    │   ├── hackathon/
    │   ├── validation/
    │   ├── demo/
    │   ├── brand/
    │   └── PROJECT_STATUS.md
    ├── skills/
    │   └── learning-competency/
    │       └── SKILL.md
    ├── src/
    ├── tests/
    └── CONTRIBUTING.md

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

**Immediate target:** select and validate the concrete use case, then implement the first complete evidence → interpretation → review → state → attestation → verification path.

Current status is tracked in [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).
