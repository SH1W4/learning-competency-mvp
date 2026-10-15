# LASTRO — Capability Evidence & Verification Infrastructure

> **From work evidence to verifiable capability.**

LASTRO is an evidence and verification layer for bounded capability claims. It connects observable work to explicit competency criteria, separates AI interpretation from deterministic checks, and records a bounded state that can be independently verified.

**The central question:** not just *what someone claims they can do*, but *what defined capability can be demonstrated from evidence in a defined context?*

> [!IMPORTANT]
> The current MVP is a narrow, synthetic proof of the verification mechanism—not a deployed enterprise platform, customer pilot, or evidence of product-market fit.

---

## The problem

Organizations rely on certificates, profiles, job titles, course completions, portfolios, assessments, and AI-generated signals to understand people's skills. Those sources can be useful, but they do not automatically provide a traceable path from observable work to a verifiable capability decision.

External research supports the broader urgency of the capability problem:

- The [World Economic Forum's *Future of Jobs Report 2025*](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) reports that 63% of surveyed employers identify skills gaps as a major barrier to business transformation, and expects 39% of workers' core skills to change by 2030.
- PwC's [2026 Global AI Jobs Barometer](https://www.pwc.com/gx/en/issues/artificial-intelligence/publications/artificial-intelligence-study.html) reports faster skill change in the most AI-exposed jobs.
- Deloitte's [*State of AI in the Enterprise 2026*](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html) identifies worker skills as a major barrier to integrating AI into workflows.

These sources establish context for the broader problem. **They do not establish demand for LASTRO, willingness to pay, product-market fit, or ROI.**

## From claim to verifiable state

```text
OBSERVABLE WORK
      ↓
    EVIDENCE
      ↓
AI INTERPRETATION + DETERMINISTIC CHECKS
      ↓
CONSENSUS
      ↓
BOUNDED COMPETENCY STATE
      ↓
ATTESTATION
      ↓
INDEPENDENT VERIFICATION
```

The diagram describes the conceptual verification flow. The current implementation demonstrates a bounded synthetic scenario and a recorded Devnet proof; it does not mean every step is already connected in the currently published public frontend journey.

LASTRO is not another credentialing platform. It investigates the layer connecting evidence of demonstrated work to a bounded, verifiable capability state.

## How the mechanism works

The MVP keeps distinct concepts distinct:

1. **Evidence integrity** — checks the structure and integrity of submitted evidence.
2. **Deterministic criteria checks** — evaluate defined objective conditions.
3. **AI interpretation** — interprets evidence as a signal; it is not the decision authority.
4. **Consensus Core** — combines verification outcomes into a canonical result.
5. **Competency state** — records a bounded outcome under a defined evidence contract and context.
6. **Attestation and independent verification** — make the integrity relationship of the resulting record inspectable.

### Outcomes are explicit

| Consensus outcome | Meaning | State / next step |
|---|---|---|
| `AGREEMENT` | Verification signals meet the defined contract | May produce `DEMONSTRATED` |
| `INSUFFICIENT_EVIDENCE` | The evidence does not satisfy the contract | `IN_DEVELOPMENT` |
| `CONFLICT` | Verification signals materially disagree | Explicit human adjudication path |

A demonstrated state is not a universal judgment about a person. It means a defined capability was demonstrated under a defined evidence contract and context. Human adjudication is an exception path for conflict, not the normal route.

## What we built: the MVP

The current vertical slice uses **Ana**, a synthetic participant in an applied-AI learning scenario. The competency is bounded: using AI tools to turn a business question into a reproducible data analysis and communicate evidence-supported conclusions.

The demonstration links four evidence artifacts to explicit criteria:

- **Briefing** — analytical question and objective.
- **Analysis artifact** — data preparation and exploration.
- **Analysis result** — reproducible analysis and results.
- **Communication** — synthesis, conclusions, and limitations.

The flow separates source evidence, AI interpretation, deterministic checks, consensus, state, and attestation. The synthetic scenario is a technical demonstration—not customer, pilot, adoption, or market-validation evidence.

### What the MVP demonstrates

- Structured evidence can be linked to activities and competency criteria.
- AI interpretation can remain separate from source evidence.
- Deterministic checks can evaluate defined conditions independently of AI output.
- The system can represent agreement, insufficient evidence, and conflict as distinct outcomes.
- Conflict can enter an explicit human adjudication path.
- A bounded state can be represented in a deterministic record.
- A record can be anchored on Solana Devnet and its integrity relationship independently checked when the transaction is available.

## Why Solana—and what blockchain does not do

Blockchain is the proof-layer anchor, not the competency authority.

```text
CONSENSUS CORE PRODUCES A BOUNDED STATE
                  ↓
          RECORD / HASH
                  ↓
       SOLANA DEVNET ATTESTATION
                  ↓
       INDEPENDENT INTEGRITY CHECK
```

Solana Devnet anchors an integrity reference for a defined record. It does **not** establish that a person is universally competent, truthful, fair, or professionally qualified. Sensitive learning evidence is not meant to be placed on-chain.

### Recorded Devnet proof

The repository documents a verified synthetic Ana attestation:

- **Competency:** `comp:data-analysis-reproducible`
- **State:** `DEMONSTRATED`
- **Record hash:** `7fccd028f193e63d7c4fcd9010cb8fd74c4a2d7d9ebbda32004ec57151f310d9`
- **Verification:** the recorded evidence reports all five checks passing: `hash_on_chain`, `record_integrity`, `subject_ref`, `payload_binding`, and `signer`.
- **Transaction:** [Inspect the recorded attestation on Solana Explorer](https://explorer.solana.com/tx/2cgWUT2MH8i67m4B5xeRRHHPEkXrCYAH28yP1Erg1JReLXbwdEE6bFzMZnAMS51cWnmfibEiTxTNKFE8K8cpoSDK?cluster=devnet)
- **Reproducibility record:** [Issue #21 / execution evidence](https://github.com/SH1W4/learning-competency-mvp/issues/21)
- **Demo and verification runbook:** [Demo & Technical Proof](docs/evaluation/04_DEMO_AND_PROOF.md) · [Local Devnet Proof Runbook](docs/evaluation/M4_LOCAL_DEVNET_PROOF.md)

This is recorded proof of an integrity/attestation path for one bounded synthetic state. It is **not** proof of universal competency or completion of the public frontend's end-to-end journey.

**Current integration limitation:** the recorded Devnet attestation demonstrates verification for one specific synthetic record. The currently published runtime does not yet provide durable persistence and retrieval of the complete record and its verification report, so the recorded proof must not be interpreted as a fully integrated, persistent public frontend-to-attestation workflow. The historical proof and the current public integration status are separate claims.

For the distinction between recorded proof and current implementation status, see [Public Project Status](docs/PROJECT_STATUS.md). A historical success does not validate a later code candidate unless that candidate is tested separately.

## Scope and limits

| Demonstrated by the current MVP | Not established by the current MVP |
|---|---|
| A bounded synthetic competency workflow | Customer adoption or a live customer deployment |
| Evidence integrity, AI interpretation, and deterministic criteria checks | Universal or bias-free competency assessment |
| Explicit consensus outcomes and bounded state | Product-market fit or willingness to pay |
| A recorded Solana Devnet attestation and verification path | Validated pricing, ROI, or economic impact |
| An auditable conflict path to human adjudication | Superiority over all alternatives or legal/academic novelty |

Broader workforce planning, role evolution, and cross-organization applications remain product hypotheses until implemented and externally validated. The system is not intended to autonomously hire or fire people, replace all human assessment, or assign a universal score of human worth.

## Research and prior art

LASTRO builds on existing work in competency frameworks, provenance, machine-verifiable claims, AI evaluation, and distributed verification. It does not claim those primitives as novel. The composition being tested remains a bounded research hypothesis, not a claim of market uniqueness or legal novelty.

- [Public Research Map](research/RESEARCH_MAP.md)
- [Related Work, Prior Art & External Evidence](research/RELATED_WORK_AND_EVIDENCE.md)
- [Article Research Track](research/article/README.md)

## Evaluator path

For a focused technical review:

1. [Product & MVP Scope](docs/evaluation/01_PRODUCT.md) — the bounded product claim.
2. [Architecture](docs/evaluation/02_ARCHITECTURE.md) — the technical model.
3. [Verification & Governance](docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md) — the decision boundaries.
4. [Demo & Technical Proof](docs/evaluation/04_DEMO_AND_PROOF.md) — scenario, recorded evidence, and reproduction.
5. [Limitations & Claims](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md) — what the evidence does and does not support.
6. [Public Project Status](docs/PROJECT_STATUS.md) — remaining integration and validation gates.
7. [Source code](src/) · [Automated tests](tests/).

## Quick start

The following commands run the local demonstration and automated checks:

```bash
npm install
npm run typecheck
npm test
npm run demo
```

This Quick Start does not, by itself, reproduce a Solana Devnet attestation. Reproducing that proof requires the separate runbook, a Devnet wallet, and a locally configured signing key.

Attestation and verification commands:

```bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
```

For a reproducible Devnet run, follow the [M4 Local Devnet Proof Runbook](docs/evaluation/M4_LOCAL_DEVNET_PROOF.md). Never commit or expose the signing key.

## Team

| Contributor | Primary contribution |
|---|---|
| Erick | Research, market context, and operations |
| JP Carvalho | Evidence pipeline, AI, and verification mechanisms |
| JP Fernandes | Branding, UX/UI, and interface specification |
| JX | Architecture, evidence, cryptographic attestation, and Solana integration |

---

**LASTRO — From work evidence to verifiable capability.**

*Evidence-backed capability infrastructure.*
