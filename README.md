# LASTRO — Learning Competency Infrastructure

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="LASTRO" width="100%" />
</p>

<p align="center"><strong>LASTRO</strong></p>

<p align="center"><strong>Learning Competency Infrastructure</strong></p>

<p align="center">Evidence-backed competency.</p>

<p align="center"><strong>From evidence to verifiable competency.</strong></p>

[![CI](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml/badge.svg)](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml)
![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)

## Work is changing. Competency systems are not.

Organizations are continuously changing how work gets done.

Tasks change. Tools change. Responsibilities change. New capabilities emerge while existing ones become less relevant.

Yet competency systems still tend to rely on **self-reports, static profiles, certificates, and subjective evaluation**.

The result is a gap between:

**what someone says they can do**

and

**what the organization can actually verify.**

## LASTRO

LASTRO is infrastructure for turning **evidence of work into verifiable competency states**.

It connects observable evidence to competency criteria, applies independent verification mechanisms, preserves decision context, and produces a bounded state that can be independently verified.

**Evidence → Verification → Competency State → Proof**

The current MVP demonstrates the narrowest version of this idea:

> **A demonstrated competency does not have to remain a claim inside a system. It can become a verifiable state backed by evidence.**

## How it works

A competency claim moves through a traceable process:

```text
WORK
  ↓
EVIDENCE
  ↓
INTERPRETATION
  ↓
INDEPENDENT VERIFICATION
  ↓
CONSENSUS
  ↓
COMPETENCY STATE
  ↓
PROOF
```

### 1. Evidence

The system captures evidence generated during learning and applied work.

Evidence retains its origin, context, relationship to activities, and provenance.

### 2. Interpretation

AI helps structure and interpret evidence against competency criteria.

**AI does not independently decide competency.**

### 3. Independent verification

Different mechanisms examine the evidence from different perspectives:

- evidence and integrity checks;
- deterministic criteria verification;
- statistical or robustness checks where applicable;
- AI-assisted interpretation;
- governance and compliance rules.

The deterministic criteria verifier is intentionally independent from AI interpretation.

### 4. Consensus

The **Consensus Core** reduces dependence on individual judgment by requiring convergence across verification mechanisms.

Possible outcomes include:

- **AGREEMENT** — evidence and verification converge;
- **INSUFFICIENT EVIDENCE** — the system does not have enough support;
- **CONFLICT** — verification mechanisms disagree;
- **HUMAN ADJUDICATION** — an exception requires contextual judgment.

Human judgment is not eliminated. It becomes an explicit, traceable exception layer.

### 5. Competency state

Only what the evidence and verification process supports becomes state.

The system does not pretend certainty where evidence is insufficient.

### 6. Proof

The resulting state can be represented as a deterministic record with provenance and an integrity reference.

In the current MVP, that integrity reference can be anchored on **Solana Devnet** using the Memo Program.

Blockchain does not determine whether someone is competent.

It helps prove that a particular state and its referenced record existed in a verifiable form.

## The bigger opportunity

The current MVP starts with competency evidence.

The larger product vision is to understand how competency requirements change as work changes:

```text
WORK CHANGE
    ↓
ROLE DELTA
    ↓
COMPETENCY GAP
    ↓
REQUALIFICATION
    ↓
EVIDENCE
    ↓
VERIFICATION
    ↓
PROOF OF COMPETENCY
```

This creates a potential bridge between **organizational change, workforce intelligence, requalification, and verifiable competency**.

This broader layer is a research and validation hypothesis, not a claim that the current MVP already solves organizational workforce planning.

## Why this is different

LASTRO is not simply another learning platform.

It is built around the question:

> **What evidence supports the competency state we are claiming?**

That leads to a different architecture:

| Conventional approach | LASTRO approach |
|---|---|
| Completion | Demonstrated competency |
| Self-report | Evidence-backed state |
| Single evaluation | Independent verification mechanisms |
| Opaque score | Traceable decision context |
| Static record | State with provenance |
| Certificate | Verifiable proof |

The goal is not to automate every human decision.

The goal is to make competency decisions **more evidence-based, more traceable, and less dependent on a single judgment**.

## What the MVP proves

The current implementation demonstrates a complete technical vertical slice:

**evidence → interpretation → independent verification → consensus → competency state → attestation → verification**

It demonstrates:

- structured learning evidence;
- AI-assisted evidence interpretation;
- deterministic verification independent of AI signals;
- governance-aware state transitions;
- conflict and insufficient-evidence handling;
- provenance and deterministic record hashing;
- Solana Devnet integrity anchoring;
- independent verification of the resulting proof.

It does **not** claim:

- universal competency assessment;
- replacement of human evaluation in every context;
- a complete LMS;
- autonomous hiring or firing decisions;
- blockchain-based proof of truth or merit;
- validated final pricing, traction, or recurring commercial adoption.

## See the evidence behind the narrative

The repository separates the product story from the technical and research evidence.

### Product

- **[Product Overview](docs/evaluation/01_PRODUCT.md)** — product thesis, wedge, differentiation, user journey, and current boundary.
- **[Pitch Architecture](docs/product/PITCH_ARCHITECTURE.md)** — the product narrative from work change to proof of competency.

### Technical proof

- **[Architecture & Evidence Pipeline](docs/evaluation/02_ARCHITECTURE.md)** — end-to-end architecture and evidence flow.
- **[Verification, Governance & Attestation](docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md)** — Consensus Core, governance, human adjudication, and attestation model.
- **[Demo & Technical Proof](docs/evaluation/04_DEMO_AND_PROOF.md)** — reproducible demo path and what the implementation actually demonstrates.
- **[Limitations & Claims](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md)** — explicit boundary between implementation, evidence, and hypothesis.

### Research / future opportunity

- **[Dynamic Role Architecture](research/01_DYNAMIC_ROLE_ARCHITECTURE.md)** — research hypothesis for deriving emerging competency requirements from changes in work.
- **[Role Delta Model](research/02_ROLE_DELTA_MODEL.md)** — formal model for representing how tasks, responsibilities, competencies, and tools change.
- **[Data & Statistical Robustness](research/03_DATA_STATISTICAL_ROBUSTNESS.md)** — evidence-quality and statistical requirements for organizational inference.
- **[Market Validation Evidence](research/04_MARKET_VALIDATION_EVIDENCE.md)** — what is supported by market signals and what still requires customer validation.

**[Full Evaluation Documentation →](docs/evaluation/README.md)**

## Technical stack

- TypeScript / Node.js
- AI-assisted evidence interpretation
- deterministic verification
- governance and provenance layer
- Consensus Core
- Solana Devnet integrity anchoring

Sensitive learning data remains off-chain.

## Quick start

```bash
npm install
npm test
npm run typecheck
npm run demo
```

For a current Solana Devnet attestation:

```bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
```

## Repository structure

```text
src/          implementation
tests/        automated coverage
docs/         product, architecture, evaluation, and operational docs
research/     research hypotheses and validation work
```

## Team

| Contributor | Primary contribution |
|---|---|
| Erick | Research, context, market, and operations |
| JP Carvalho | Evidence pipeline, AI, and review |
| JP Fernandes | Branding, UX/UI, and interface |
| JX | Architecture, AI, evidence, attestation, and Solana |

---

**LASTRO — Evidence-backed competency.**

From evidence to a competency state that can be understood, verified, and built upon.

