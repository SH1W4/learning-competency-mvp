# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Competency development with real evidence" width="100%" />
</p>

> **Learn → produce evidence → interpret → review → represent state → verify.**

**Experimental MVP for competency development, learning-evidence organization, AI-assisted interpretation, and verifiable attestation on Solana.**

**Primary language:** English · [Versão em Português](README.pt.md)

---

## Quick Start

```bash
npm install
npm test                          # 52 tests — all passing
npm run demo                      # Synthetic scenario: Ana → DEMONSTRATED
npm run m3:attest                 # Register attestation on Solana Devnet
npm run m3:verify <tx_signature> [record_hash] # Verify attestation on-chain
```

> No API key required. AI runs with a deterministic heuristic provider by default.  
> For an LLM demo: set `AI_PROVIDER=anthropic`, `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` in `.env`.

---

## What We Proved

### M1 — Concrete Use Case ✅ DONE
- Canonical use case: data analysis competency in a corporate L&D program.
- Short trail: A1 (formulate question) → A2 (prepare data) → A3 (reproduce analysis) → A4 (communicate results).
- Four observable criteria: C1 (formulation), C2 (treatment/analysis), C3 (evidence), C4 (communication).

### M2 — Evidence, AI and Review ✅ DONE
- Full TypeScript/Node pipeline: ingest → normalize → extract → interpret → relate → review → state.
- Strict AI contract via `zod`: AI proposes, **never** decides `DEMONSTRATED`.
- **52 tests** covering the critical path, attestation, verification and handoff hardening — all passing.
- Handoff (`ReviewedStateRecord`) is consumed directly by M3.

### M3 — State, Attestation and Solana ✅ DONE (Devnet)
- `src/solana/attest.ts`: records an attestation through the Solana Memo Program.
- `src/solana/verify.ts`: verifies the on-chain `record_hash`, optional handoff integrity, expected signer and pseudonymous subject reference.
- M2 → M3 handoff is hardened:
  - `verifyHandoff()` rejects tampered `reviewed-state.json` content;
  - the expected attester can be validated through `ATTESTER_PUBKEY`;
  - the on-chain payload uses `subject_ref` instead of the subject in clear text;
  - attestation creation refuses an inconsistent `record_hash`.
- Dedicated M3 tests cover positive verification, tampering, signer mismatch, subject-reference mismatch, malformed memos and compatibility with legacy payloads.

> 🔗 **Reference proof on Solana Devnet:**  
> [Transaction](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

> The Devnet transaction above is a reference proof from the M3 implementation. The current attestation payload is versioned as `m3.attestation.v2` and keeps sensitive evidence off-chain.

### Interface — UX/UI ⏳ IN PROGRESS
- Owner: [JP Fernandes](https://github.com/JpFernandes77).

### M4 — Validation, Demo and Submission ⏳ IN PROGRESS
- Demand validation: [Erick](https://github.com/erickandregarcia-ai).
- Demo script: [`docs/demo/DEMO_SCRIPT.md`](docs/demo/DEMO_SCRIPT.md).

---

## Overview

The **Learning Competency MVP** investigates a central question:

> **How does an organization transform a competency need into a development trail, capture evidence produced by a person, interpret that evidence with AI and human review, and represent — in a verifiable way — the state of that evolution?**

The project is deliberately small: the goal is not to build a complete learning platform, but to prove a vertical, traceable, and end-to-end verifiable flow.

The central hypothesis is that the value lies not only in recording courses or certificates, but in **closing the loop between competency need, development, evidence, interpretation, review, and verification**.

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

---

## Core Principles

1. **Evidence ≠ Interpretation.** Source data, AI extraction, and human decisions are kept separate and traceable at every step.
2. **AI proposes, humans decide.** AI may structure, relate, and synthesize evidence — but only a human reviewer can transition state to `DEMONSTRATED`.
3. **Human review is a product mechanism, not a checkbox.** The reviewer accepts, corrects, rejects, or requests new evidence. Every decision is recorded.
4. **Verification ≠ inference.** The trust scale goes N1 (self-declared) → N2 (evidence presented) → N3 (evidence analyzed) → N4 (source verified). AI supports N1–N3. N4 requires external authenticated verification.
5. **Solana is an integrity layer, not decoration.** The `record_hash` and minimal attestation metadata go on-chain. Sensitive evidence remains off-chain.

---

## Architecture — Evidence Pipeline

```text
INGEST → NORMALIZE → EXTRACT → INTERPRET (AI) → RELATE TO COMPETENCY
                                                        ↓
                                               HUMAN REVIEW
                                                        ↓
                                               STATE UPDATE
                                                        ↓
                                          ATTESTATION → SOLANA → VERIFICATION
```

The pipeline preserves provenance and differentiates: source data, extracted information, AI-produced interpretation, human review decision, resulting state, and registered attestation.

---

## MVP Scope

### In scope
- one concrete competency; one short trail; one person; a small set of evidence types;
- evidence ingestion, normalization, AI-assisted interpretation, human review;
- minimal competency state representation and attestation object;
- Solana integration and verification path; critical flow tests.

### Out of scope
- complete LMS; course marketplace; recruitment platform; broad course catalog;
- extensive institutional integrations; universal competency methodology;
- definitive monetization model; sensitive data directly on-chain.

---

## Documentation

### Product
- [MVP Contract](docs/product/MVP_CONTRACT.md) · [User Journeys](docs/product/USER_JOURNEYS.md) · [Use Case](docs/product/USE_CASE.md)

### Architecture
- [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md) · [Attestation Model](docs/architecture/ATTESTATION_MODEL.md) · [M2 Implementation](docs/architecture/M2_IMPLEMENTATION.md)

### Market and Validation
- [Competitive Landscape](docs/market/COMPETITIVE_LANDSCAPE.md) · [GTM Model](docs/go-to-market/GTM.md) · [Demand Validation](docs/validation/DEMAND_VALIDATION.md)

### Governance and Execution
- [Project Status](docs/PROJECT_STATUS.md) · [Team Roles](docs/governance/TEAM_ROLES.md) · [Contributing](CONTRIBUTING.md)

### Demo and Development
- [Demo Script](docs/demo/DEMO_SCRIPT.md) · [Development Log](docs/diario-de-bordo/)

---

## Repository Structure

```text
.
├── docs/
│   ├── product/ · architecture/ · market/ · go-to-market/
│   ├── governance/ · decisions/ · validation/
│   ├── demo/ · brand/ · diario-de-bordo/
│   └── PROJECT_STATUS.md
├── fixtures/
│   └── synthetic/ana/          # Synthetic scenario: Ana, Junior Data Analyst
├── src/
│   ├── ai/                     # AI contract and provider (zod-validated)
│   ├── evidence/               # Ingest, normalize, extract
│   ├── relation/               # Relate evidence to competency criteria
│   ├── review/                 # Human review engine
│   ├── state/                  # Competency state machine
│   ├── provenance/             # Trace and handoff (M2 → M3)
│   ├── solana/                 # attest.ts + verify.ts
│   ├── domain/                 # Types and use case definitions
│   └── cli/                    # Demo CLI
├── tests/                      # 52 tests — all passing
├── .env.example · .gitattributes · CONTRIBUTING.md
```

---

## Team

| Person | Core Contribution | Why It Matters |
|---|---|---|
| **[Erick](https://github.com/erickandregarcia-ai)** | Research, context, market and operations | Translates external signals into requirements; ensures the product stays connected to the real problem |
| **[JP Carvalho](https://github.com/Joaopedro0s)** | M2 — evidence pipeline, AI and review | Materializes the central flow in testable, traceable code |
| **[JP Fernandes](https://github.com/JpFernandes77)** | Branding, UX/UI and interface | Makes the product visible and understandable to those who won't clone the repository |
| **[JX](https://github.com/SH1W4)** | Architecture, AI, evidence, attestation and Solana | Connects the technical thesis to the integrity and on-chain verifiability model |

No contribution replaces the others. The value lies in the combination.

---

## Hackathon History

**Started:** September 25, 2026. **What existed before:** only the initial idea of a microcredential platform.

**Built during the hackathon:**
- M1: canonical use case definition and evidence contracts
- M2: full TypeScript pipeline (ingest → AI → human review → state), with a 52-test suite
- M3: Solana attestation infrastructure (Memo Program, off-chain evidence pattern, on-chain verification)
- M2 → M3 handoff hardening: integrity checks, signer validation and pseudonymous subject reference
- Operational governance v1.0 and Development Log with decision traceability

---

## Current Technical Status

**M1 → M2 → M3 vertical slice: complete and validated.**

The technical MVP is in **feature freeze**. Current work is focused on:
- UX/UI implementation;
- reproducible demo and pitch;
- external demand validation.

Future architecture work may include decentralized attestation schemas, distributed verification, structured off-chain persistence and refined off-chain/on-chain boundaries.

---

## License

License and distribution terms will be defined before a final version is published.
