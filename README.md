# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Competency development with real evidence" width="100%" />
</p>

> **Learn → produce evidence → interpret → review → represent state → verify.**

**Experimental MVP for competency development, learning-evidence organization, AI-assisted interpretation, and verifiable attestation on Solana.**

**Primary language:** English · [Versão em Português](README.pt.md)

---

## Overview

The **Learning Competency MVP** investigates a central question:

> **How does an organization transform a competency need into a development trail, capture evidence produced by a person, interpret that evidence with AI and human review, and represent — in a verifiable way — the state of that evolution?**

This repository is the **technical execution base** of the MVP.

The project is deliberately small: the goal is not to build a complete learning platform, but to prove a vertical, traceable, and end-to-end verifiable flow.

---

## The Central Flow

```text
ORGANIZATION / PROGRAM
        ↓
DESIRED COMPETENCY
        ↓
SHORT DEVELOPMENT TRAIL
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
```

This is the **flow the MVP must prove**.

Any feature that does not directly contribute to demonstrating it remains out of scope until there is an explicit decision to include it.

---

## What We Built

The MVP connects five elements that normally appear separately:

- **Organizational need** — which competency needs to be developed.
- **Development** — a short trail with concrete activities.
- **Evidence** — what the person actually produces during the process.
- **Interpretation and review** — AI organizes and relates the evidence; a human reviews the interpretation.
- **Verifiable state** — the review result can generate a state representation and a verifiable attestation.

The central hypothesis is that the value lies not only in recording courses or certificates, but in **closing the loop between competency need, development, evidence, interpretation, review, and verification**.

---

## Core Principles

### 1. Evidence is not interpretation

The system keeps separate:

```text
evidence
   ↓
extraction
   ↓
interpretation
   ↓
human review
   ↓
competency state
   ↓
verification
```

The origin of data must remain distinguishable from what was inferred or organized by the AI.

### 2. AI is not institutional authority

AI may:
- structure evidence;
- extract information;
- relate evidence to competencies;
- synthesize development signals;
- identify inconsistencies;
- flag items requiring review.

AI must **not** independently declare official recognition, accreditation, or institutional verification.

### 3. Human review is explicit

The reviewer can:
- accept an interpretation;
- correct an interpretation;
- reject an interpretation;
- request additional evidence.

### 4. Verification is different from inference

The MVP uses a conceptual trust scale:

- **N1 — Self-declared**
- **N2 — Evidence presented**
- **N3 — Evidence analyzed**
- **N4 — Source verified**

AI can support levels N1–N3. Level N4 requires an external authenticated verification mechanism.

### 5. Solana is an integrity layer

Solana is used as infrastructure for:
- attestation;
- integrity;
- state/event recording;
- verifiability.

Sensitive documents and raw personal data remain off-chain.

---

## MVP Scope

### In scope

- one concrete competency;
- one short, controlled trail;
- one person;
- a small set of evidence types;
- evidence ingestion and normalization;
- AI-assisted interpretation;
- human review;
- minimal competency state representation;
- minimal attestation/proof object;
- Solana integration;
- simple verification path;
- critical flow tests.

### Out of scope

- complete LMS;
- course marketplace;
- recruitment platform;
- broad course catalog;
- extensive institutional integrations;
- universal competency methodology;
- multiple markets simultaneously;
- definitive monetization model;
- sensitive personal documents directly on-chain;
- automations not necessary to prove the flow.

---

## Architecture

### Evidence Pipeline

```text
INGEST
   ↓
NORMALIZE
   ↓
EXTRACT
   ↓
INTERPRET (AI)
   ↓
RELATE TO COMPETENCY
   ↓
HUMAN REVIEW
   ↓
STATE UPDATE
   ↓
ATTESTATION
   ↓
SOLANA
   ↓
VERIFICATION
```

The pipeline preserves provenance and differentiates:
- source data;
- extracted information;
- AI-produced interpretation;
- human review decision;
- resulting state;
- registered attestation.

---

## Implementation Status

### M1 — Concrete Use Case ✅ DONE
- Canonical use case: data analysis competency in a corporate L&D program.
- Short trail: A1 (formulate question) → A2 (prepare data) → A3 (reproduce analysis) → A4 (communicate results).
- Four observable criteria: C1 (formulation), C2 (treatment/analysis), C3 (evidence), C4 (communication).

### M2 — Evidence, AI and Review ✅ DONE
- Full TypeScript/Node pipeline: ingest → normalize → extract → interpret → relate → review → state.
- Strict AI contract via `zod`: AI proposes, never decides `DEMONSTRATED`.
- 39 tests covering the critical path (all passing).
- Handoff (`ReviewedStateRecord`) ready for M3 consumption.

### M3 — State, Attestation and Solana ✅ DONE (Devnet)
- `src/solana/attest.ts`: records attestation via SPL Memo Program (off-chain storage pattern).
- `src/solana/verify.ts`: given a `record_hash` and `tx_signature`, confirms on-chain proof.
- Live Devnet transaction confirmed:  
  [`27hwuMb...3y3U`](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

### Interface — UX/UI ⏳ IN PROGRESS
- Owner: JP Fernandes.
- Must materialize the flow without creating parallel logic.

### M4 — Validation, Demo and Submission ⏳ IN PROGRESS
- Demand validation: Erick.
- Demo script: [`docs/demo/DEMO_SCRIPT.md`](docs/demo/DEMO_SCRIPT.md).

---

## Running the Project

```bash
npm install

# Run all 39 tests
npm test

# Type check
npm run typecheck

# Run synthetic demo (Ana → DEMONSTRATED)
npm run demo

# Run demo with partial review scenario
npm run demo:revisao-parcial

# M3: Register attestation on Solana Devnet
npm run m3:attest

# M3: Verify attestation on-chain
npm run m3:verify <record_hash> <tx_signature>
```

> **No API key required:** AI runs with a deterministic heuristic provider by default.  
> **For LLM demo:** set `AI_PROVIDER=anthropic`, `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` in `.env` (see `.env.example`).

---

## Documentation

### Product
- [MVP Contract](docs/product/MVP_CONTRACT.md)
- [User Journeys](docs/product/USER_JOURNEYS.md)
- [Use Case](docs/product/USE_CASE.md)

### Architecture
- [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md)
- [Attestation Model](docs/architecture/ATTESTATION_MODEL.md)
- [Technical Architecture](docs/architecture/TECHNICAL_ARCHITECTURE.md)
- [M2 Implementation](docs/architecture/M2_IMPLEMENTATION.md)

### Market and Go-to-Market
- [Competitive Landscape](docs/market/COMPETITIVE_LANDSCAPE.md)
- [GTM Model](docs/go-to-market/GTM.md)
- [Demand Validation](docs/validation/DEMAND_VALIDATION.md)

### Governance and Execution
- [Project Status](docs/PROJECT_STATUS.md)
- [Team Roles](docs/governance/TEAM_ROLES.md)
- [Evaluation (Red-Team)](docs/evaluation/HACKATHON_EVALUATION_01.md)
- [Contributing](CONTRIBUTING.md)

### Hackathon and Demo
- [Demo Script](docs/demo/DEMO_SCRIPT.md)
- [Hackathon Structure](docs/hackathon/README.md)
- [Development Log (Diário de Bordo)](docs/diario-de-bordo/)

### Brand
- [Brand Guidelines](docs/brand/README.md)
- [Brand Book Draft](docs/brand/BRANDBOOK_DRAFT.md)

---

## Repository Structure

```text
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
│   ├── evaluation/
│   ├── demo/
│   ├── brand/
│   ├── diario-de-bordo/
│   └── PROJECT_STATUS.md
├── fixtures/
│   └── synthetic/ana/          # Synthetic scenario: Ana, Junior Data Analyst
├── skills/
│   └── learning-competency/
│       └── SKILL.md
├── src/
│   ├── ai/                     # AI contract and provider (zod-validated)
│   ├── cli/                    # Demo CLI
│   ├── domain/                 # Types and use case definitions
│   ├── evidence/               # Ingest, normalize, extract
│   ├── provenance/             # Trace and handoff (M2 → M3)
│   ├── relation/               # Relate evidence to competency criteria
│   ├── review/                 # Human review engine
│   ├── solana/                 # Attestation (attest.ts) and Verification (verify.ts)
│   └── state/                  # Competency state machine
├── tasks/
├── tests/                      # 39 tests — all passing
├── .env.example
├── .gitattributes
└── CONTRIBUTING.md
```

---

## Team

The team was deliberately formed with complementary profiles:

| Person | Core Contribution | Why It Matters |
|---|---|---|
| **Erick** | Research, context, market and operations | Translates external signals into requirements; ensures the product stays connected to the real problem |
| **JP Carvalho** | M2 — evidence pipeline, AI and review | Materializes the central flow in testable, traceable code |
| **JP Fernandes** | Branding, UX/UI and interface | Makes the product visible and understandable to those who won't clone the repository |
| **JX** | Architecture, AI, evidence, attestation and Solana | Connects the technical thesis to the integrity and on-chain verifiability model |

No contribution replaces the others. The value lies in the combination.

---

## Hackathon History

**Started:** September 25, 2026.

**What existed before the hackathon:** only the initial idea of a microcredential platform.

**What was built during the hackathon:**
- M1: canonical use case definition and evidence contracts
- M2: full TypeScript pipeline (ingest → AI → human review → state), 39 tests
- M3: Solana attestation infrastructure (Memo Program, off-chain storage pattern, on-chain verification)
- Operational governance v1.0
- Development Log (Diário de Bordo) with decision traceability
- Red-team evaluation via `hackathon-evaluator` skill

---

## Implementation Rule

A feature belongs to the MVP only if it helps prove the central flow.

Before implementing a change, answer:

1. **Which part of the flow does it enable?**
2. **What evidence will demonstrate it works?**
3. **Which product hypothesis does it introduce?**
4. **Can it be deferred without compromising the demonstration?**

If the answer is not clear, the change stays out of the MVP.

---

## License

License and distribution terms will be defined before a final version is published.