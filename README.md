# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency" width="100%" />
</p>

<h3 align="center">From learning evidence to verifiable competency state.</h3>

<p align="center">
  <strong>Evidence → AI interpretation → Human review → State → Proof</strong>
</p>

<p align="center">
  <a href="#the-problem">Problem</a> ·
  <a href="#the-proof">Proof</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#current-status">Status</a>
</p>

---

## The Problem

> **A certificate tells you what someone completed.  
> It does not necessarily show what they can demonstrate.**

Learning Competency explores a simple shift:

**from recording completion → to representing evidence of demonstrated competency.**

The system connects the entire path:

\x60\x60\x60mermaid
flowchart LR
    A["Competency need"] --> B["Development trail"]
    B --> C["Real evidence"]
    C --> D["AI interpretation"]
    D --> E["Human review"]
    E --> F["Competency state"]
    F --> G["Verifiable proof"]
\x60\x60\x60

---

## The Core Idea

### AI does not decide competency.

**AI proposes. Humans decide. Evidence supports the state.**

The architecture deliberately separates:

| Evidence | Interpretation | Decision | Proof |
|---|---|---|---|
| What was produced | What AI extracts/relates | What the reviewer accepts | What can be verified |
| Source data | AI proposal | Human review | Attestation |
| Off-chain | Off-chain | Off-chain | Minimal on-chain record |

That separation is the foundation of the MVP.

---

# What We Built

## 01 — M1 · Concrete Use Case

A corporate L&D scenario for a **data-analysis competency**.

\x60\x60\x60text
A1  Formulate question
 ↓
A2  Prepare data
 ↓
A3  Reproduce analysis
 ↓
A4  Communicate results
\x60\x60\x60

Four observable criteria connect the activities to the competency.

---

## 02 — M2 · Evidence → AI → Human Review

A complete TypeScript/Node pipeline:

\x60\x60\x60mermaid
flowchart LR
    A["INGEST"] --> B["NORMALIZE"]
    B --> C["EXTRACT"]
    C --> D["AI INTERPRET"]
    D --> E["RELATE"]
    E --> F["HUMAN REVIEW"]
    F --> G["COMPETENCY STATE"]
\x60\x60\x60

**Key constraint:** the AI layer cannot independently transition a person to \x60DEMONSTRATED\x60.

The reviewed result becomes a deterministic:

\x60ReviewedStateRecord\x60

---

## 03 — M3 · State → Attestation → Solana

The real M2 handoff is consumed by M3.

\x60\x60\x60mermaid
flowchart LR
    A["ReviewedStateRecord"] --> B["record_hash"]
    B --> C["Attestation"]
    C --> D["Solana Devnet"]
    D --> E["Verification"]
\x60\x60\x60

### On-chain

- \x60record_hash\x60
- minimal attestation metadata
- pseudonymous \x60subject_ref\x60
- transaction signer

### Off-chain

- evidence
- interpretation
- human review
- complete state record
- provenance
- sensitive subject information

**Solana is an integrity layer — not the learning-data store.**

---

# The Proof

<div align="center">

### 52 tests · M1 → M2 → M3 · Devnet attestation · Hardened handoff

</div>

| Proof point | Status |
|---|:---:|
| Evidence pipeline | ✅ |
| AI contract | ✅ |
| Human review | ✅ |
| Deterministic handoff | ✅ |
| Tamper detection | ✅ |
| Signer validation | ✅ |
| Subject not exposed in clear text | ✅ |
| Solana attestation | ✅ |
| On-chain verification | ✅ |
| Test suite | **52/52** |

### Live Devnet proof

**[View the reference transaction on Solana Explorer →](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)**

> The transaction is a reference proof from the M3 implementation.  
> The current attestation payload is versioned as \x60m3.attestation.v2\x60.

---

# What Makes the Vertical Slice Matter

The value is not any single component.

It is the **traceability between the components**:

\x60\x60\x60mermaid
flowchart TB
    A["Evidence"] --> B["AI interpretation"]
    B --> C["Human review"]
    C --> D["Competency state"]
    D --> E["Provenance"]
    E --> F["Attestation"]
    F --> G["Verification"]

    A -. "source" .-> E
    C -. "decision" .-> E
    D -. "state" .-> E
\x60\x60\x60

A verifier can therefore ask:

> **What state was registered?**  
> **What record produced it?**  
> **Was the record altered?**  
> **Who anchored it?**

The blockchain does **not** independently prove that the underlying competency is true. It provides a verifiable integrity layer around the registered state.

---

# M2 → M3 Hardening

The handoff was reviewed and hardened around three boundaries:

<table>
<tr>
<td width="33%" align="center">

### Integrity

\x60verifyHandoff()\x60

Detects tampering in the reviewed state before verification.

</td>
<td width="33%" align="center">

### Authenticity

\x60ATTESTER_PUBKEY\x60

Can validate the expected transaction signer.

</td>
<td width="33%" align="center">

### Privacy

\x60subject_ref\x60

Avoids exposing the subject in clear text on-chain.

</td>
</tr>
</table>

Dedicated tests cover tampering, signer mismatch, subject-reference mismatch and malformed payloads.

---

# Architecture at a Glance

\x60\x60\x60mermaid
flowchart TB
    subgraph OFF["OFF-CHAIN"]
        A["Evidence"]
        B["AI"]
        C["Human review"]
        D["Competency state"]
        E["Provenance"]
        A --> B --> C --> D --> E
    end

    E --> H["record_hash"]

    subgraph ON["ON-CHAIN · SOLANA"]
        H --> I["Attestation"]
        I --> J["Verification"]
    end
\x60\x60\x60

**Sensitive learning data stays off-chain.**

Only the minimum required representation crosses the boundary.

---

# Current Status

| Layer | Status |
|---|:---:|
| M1 — Concrete Use Case | ✅ DONE |
| M2 — Evidence, AI & Review | ✅ DONE |
| M3 — Attestation & Solana | ✅ DONE |
| M2 → M3 Hardening | ✅ DONE |
| 52-test suite | ✅ PASSING |
| Technical vertical slice | ✅ COMPLETE |
| Feature freeze | 🔒 ACTIVE |
| UX/UI | 🔄 IN PROGRESS |
| M4 — Validation / Demo | 🔄 IN PROGRESS |

### The next frontier

The technical foundation is frozen.

The project is now moving outward:

**interface → demonstration → external demand validation**

That separation is intentional: prove the core before expanding it.

---

# What This MVP Does — and Does Not — Claim

### It proves

> A competency development trail can produce structured evidence that is interpreted, reviewed, represented as a state, and anchored so that the resulting record can later be independently verified.

### It does not claim

- to be a complete LMS;
- to replace human assessment;
- to be a universal competency framework;
- to put sensitive learning data on-chain;
- that blockchain itself validates competency;
- to have a definitive monetization model.

---

# Quick Start

\x60\x60\x60bash
npm install
npm test
npm run demo
\x60\x60\x60

The default demo uses a deterministic heuristic AI provider.

### Solana Devnet

\x60\x60\x60bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
\x60\x60\x60

### Optional LLM provider

\x60\x60\x60bash
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=...
\x60\x60\x60

---

# Repository

\x60\x60\x60text
src/
├── ai/            AI contract + provider
├── evidence/      ingest + normalize + extract
├── relation/      evidence → competency
├── review/        human review
├── state/         competency state machine
├── provenance/    trace + M2 → M3 handoff
├── solana/        attestation + verification
├── domain/        core types
└── cli/           demo

tests/             52 tests
fixtures/          synthetic Ana scenario
docs/              product + architecture + validation + development log
\x60\x60\x60

---

# Documentation

| Area | Resources |
|---|---|
| **Product** | [MVP Contract](docs/product/MVP_CONTRACT.md) · [User Journeys](docs/product/USER_JOURNEYS.md) · [Use Case](docs/product/USE_CASE.md) |
| **Architecture** | [Evidence Pipeline](docs/architecture/EVIDENCE_PIPELINE.md) · [Attestation Model](docs/architecture/ATTESTATION_MODEL.md) · [M2 Implementation](docs/architecture/M2_IMPLEMENTATION.md) |
| **Market** | [Competitive Landscape](docs/market/COMPETITIVE_LANDSCAPE.md) · [GTM](docs/go-to-market/GTM.md) · [Demand Validation](docs/validation/DEMAND_VALIDATION.md) |
| **Execution** | [Project Status](docs/PROJECT_STATUS.md) · [Team Roles](docs/governance/TEAM_ROLES.md) · [Development Log](docs/diario-de-bordo/) |
| **Demo** | [Demo Script](docs/demo/DEMO_SCRIPT.md) |

---

# Team

| Person | Core contribution |
|---|---|
| **Erick** | Research, context, market and operations |
| **JP Carvalho** | M2 — evidence pipeline, AI and review |
| **JP Fernandes** | Branding, UX/UI and interface |
| **JX** | Architecture, AI, evidence, attestation and Solana |

The project is cross-functional by design: **research, product, interface and technical architecture converge in one vertical slice.**

---

## Hackathon History

**Started:** September 25, 2026.

The project evolved from an initial microcredential-platform idea into a concrete, traceable and verifiable competency vertical slice.

Built during the hackathon:

**M1 → M2 → M3 → Hardening → Feature Freeze**

---

## License

License and distribution terms will be defined before a final version is published.
