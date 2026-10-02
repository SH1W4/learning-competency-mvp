# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Competency development with real evidence" width="100%" />
</p>

<p align="center">
  <strong>Turn real learning evidence into a reviewable, traceable and verifiable competency state.</strong>
</p>

<p align="center">
  Evidence → AI interpretation → Human review → Competency state → Verifiable proof
</p>

---

## The Problem

Organizations can record courses completed, certificates issued and activities performed.

But those records do not, by themselves, answer a more useful question:

> **What can this person actually demonstrate — and what evidence supports that conclusion?**

Learning Competency explores a different model:

**competency is represented through evidence produced during a development trail, interpreted with AI, reviewed by a human, and anchored as a verifiable state.**

The goal is not to replace human judgment with AI or to put learning records on-chain.

The goal is to make the path from **competency need → evidence → interpretation → review → state → verification** explicit and traceable.

---

## The Core Idea

\`\`\`text
ORGANIZATION / PROGRAM
          ↓
   DESIRED COMPETENCY
          ↓
  DEVELOPMENT TRAIL
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
     ATTESTATION
          ↓
       SOLANA
          ↓
     VERIFICATION
\`\`\`

### The important distinction

> **AI proposes. Humans decide. Evidence supports the state.**

The system does not allow the AI layer to independently transition a person to \`DEMONSTRATED\`.

---

# What We Actually Built

This repository contains a working **vertical slice** of the concept.

### M1 — Concrete Use Case ✅

A concrete corporate L&D scenario for a data-analysis competency:

\`\`\`text
A1 — formulate question
A2 — prepare data
A3 — reproduce analysis
A4 — communicate results
\`\`\`

With four observable criteria covering formulation, analysis/treatment, evidence and communication.

### M2 — Evidence, AI & Human Review ✅

A complete TypeScript/Node pipeline:

\`\`\`text
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
COMPETENCY STATE
\`\`\`

The AI layer is constrained by a typed \`zod\` contract and produces proposals/interpretations. The human review layer is responsible for the state transition.

The M2 handoff is represented as a deterministic \`ReviewedStateRecord\`.

### M3 — Attestation & Verification on Solana ✅

The reviewed state is handed directly from M2 into the attestation layer.

The system:

- computes and preserves a deterministic \`record_hash\`;
- creates a minimal attestation through the Solana Memo Program;
- keeps evidence and sensitive data off-chain;
- verifies the on-chain record against the expected hash;
- can validate the expected attester through \`ATTESTER_PUBKEY\`;
- uses a pseudonymous \`subject_ref\` instead of exposing the subject in clear text.

### M2 → M3 Hardening ✅

The handoff was explicitly hardened after cross-review:

- \`verifyHandoff()\` detects tampering in \`reviewed-state.json\`;
- attestation creation rejects an inconsistent \`record_hash\`;
- verification can reject an unexpected transaction signer;
- the on-chain payload does not contain the subject in clear text;
- dedicated tests cover tampering, signer mismatch, subject-reference mismatch and malformed payloads.

---

# The Proof

The current technical vertical slice is backed by a **52-test suite**, covering the critical path plus attestation, verification and handoff hardening.

\`\`\`text
M1
 ↓
M2
 ↓
ReviewedStateRecord
 ↓
record_hash
 ↓
M3 Attestation
 ↓
Solana Devnet
 ↓
Verification
\`\`\`

### Live Devnet proof

[View the reference transaction on Solana Explorer](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

> The transaction is a reference proof from the M3 implementation. The current attestation payload is versioned as \`m3.attestation.v2\`.

---

# Why the Architecture Matters

The project deliberately separates layers that are often collapsed together:

| Layer | Responsibility |
|---|---|
| **Evidence** | What was actually produced or submitted |
| **AI** | Extract, structure, interpret and relate evidence |
| **Human review** | Accept, correct, reject or request evidence |
| **Competency state** | Represent what the reviewed evidence supports |
| **Provenance** | Preserve how the state was produced |
| **Attestation** | Register a verifiable representation of that state |
| **Solana** | Provide an integrity and verification layer |

This separation is central to the design.

**Verification is not inference.**

A blockchain record can help prove that a particular state record existed and was anchored by an expected signer. It does not independently prove that the underlying competency is true.

---

# What Stays Off-Chain

The architecture intentionally avoids putting sensitive learning evidence directly on-chain.

\`\`\`text
OFF-CHAIN
─────────────────────────────────
Evidence
Interpretation
Review
State record
Provenance
Sensitive subject information
─────────────────────────────────
             │
             │ deterministic hash +
             │ minimal attestation metadata
             ▼
ON-CHAIN
─────────────────────────────────
Solana attestation
record_hash
minimal metadata
pseudonymous subject_ref
signer
─────────────────────────────────
\`\`\`

This makes Solana an **integrity layer**, rather than the storage layer for the learning system.

---

# The Technical Vertical Slice

\`\`\`text
┌──────────────────────────────────────────────┐
│              LEARNING COMPETENCY             │
└──────────────────────────────────────────────┘
                     │
                     ▼
              Evidence Ingestion
                     │
                     ▼
             Normalization
                     │
                     ▼
                Extraction
                     │
                     ▼
              AI Interpretation
                     │
                     ▼
          Competency Relationship
                     │
                     ▼
              Human Review
                     │
                     ▼
           Competency State
                     │
                     ▼
             Provenance Trace
                     │
                     ▼
            ReviewedStateRecord
                     │
                     ▼
              record_hash
                     │
                     ▼
             Solana Attestation
                     │
                     ▼
               Verification
\`\`\`

The important property is not any individual component.

It is the **traceable connection between them**.

---

# Current Status

## Technical foundation

| Milestone | Status |
|---|---|
| M1 — Concrete Use Case | ✅ DONE |
| M2 — Evidence, AI & Review | ✅ DONE |
| M3 — State, Attestation & Solana | ✅ DONE |
| M2 → M3 hardening | ✅ DONE |
| 52-test suite | ✅ PASSING |
| Technical vertical slice | ✅ COMPLETE |
| Feature freeze | ✅ ACTIVE |

## Current work

### UX/UI
**In progress — JP Fernandes**

The interface is being built around the already-defined technical flow rather than introducing parallel product logic.

### M4 — Validation, Demo & Submission
**In progress — Erick**

Current focus:

- external demand validation;
- reproducible demonstration;
- pitch alignment with what is actually implemented.

The technical foundation is intentionally frozen while these external-facing layers progress.

---

# What This MVP Does Not Claim

This is intentionally **not**:

- a complete LMS;
- a course marketplace;
- a recruitment platform;
- a universal competency framework;
- a definitive monetization model;
- a replacement for human assessment;
- a claim that blockchain itself validates competency.

The MVP proves a narrower proposition:

> **A competency development trail can produce structured evidence that is interpreted, reviewed, represented as a state, and anchored in a way that can later be independently verified.**

---

# Quick Start

\`\`\`bash
npm install
npm test
npm run demo
\`\`\`

The default demo uses a deterministic heuristic AI provider and does not require an API key.

### M3 — Solana Devnet

\`\`\`bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
\`\`\`

For an LLM-backed demo, configure:

\`\`\`bash
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=...
\`\`\`

---

# Repository Structure

\`\`\`text
.
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── market/
│   ├── go-to-market/
│   ├── governance/
│   ├── decisions/
│   ├── validation/
│   ├── demo/
│   ├── brand/
│   └── diario-de-bordo/
├── fixtures/
│   └── synthetic/ana/
├── src/
│   ├── ai/
│   ├── evidence/
│   ├── relation/
│   ├── review/
│   ├── state/
│   ├── provenance/
│   ├── solana/
│   ├── domain/
│   └── cli/
├── tests/
├── .env.example
├── CONTRIBUTING.md
└── README.md
\`\`\`

---

# Documentation

### Product
- [MVP Contract](docs/product/MVP_CONTRACT.md)
- [User Journeys](docs/product/USER_JOURNEYS.md)
- [Use Case](docs/product/USE_CASE.md)

### Architecture
- [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md)
- [Attestation Model](docs/architecture/ATTESTATION_MODEL.md)
- [M2 Implementation](docs/architecture/M2_IMPLEMENTATION.md)

### Market & Validation
- [Competitive Landscape](docs/market/COMPETITIVE_LANDSCAPE.md)
- [GTM Model](docs/go-to-market/GTM.md)
- [Demand Validation](docs/validation/DEMAND_VALIDATION.md)

### Governance & Execution
- [Project Status](docs/PROJECT_STATUS.md)
- [Team Roles](docs/governance/TEAM_ROLES.md)
- [Contributing](CONTRIBUTING.md)

### Demo & Development
- [Demo Script](docs/demo/DEMO_SCRIPT.md)
- [Development Log](docs/diario-de-bordo/)

---

# Team

| Person | Core Contribution |
|---|---|
| **Erick** | Research, context, market and operations |
| **JP Carvalho** | M2 — evidence pipeline, AI and review |
| **JP Fernandes** | Branding, UX/UI and interface |
| **JX** | Architecture, AI, evidence, attestation and Solana |

The project is deliberately cross-functional: research, product, interface and technical architecture converge in the same vertical slice.

---

# Hackathon History

**Started:** September 25, 2026.

The project evolved from an initial microcredential-platform idea into a concrete, traceable and verifiable competency vertical slice.

Built during the hackathon:

- M1 — concrete use case and evidence contracts;
- M2 — evidence → AI → human review → state;
- M3 — state → attestation → Solana → verification;
- M2 → M3 hardening for integrity, signer validation and privacy;
- operational governance and development traceability.

---

## License

License and distribution terms will be defined before a final version is published.
