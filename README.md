# LASTRO — Capability Evidence & Verification Infrastructure

> **From work evidence to verifiable capability.**

LASTRO is infrastructure for organizations that need better evidence for capability decisions. It connects observable work to explicit competency criteria, applies independent verification mechanisms, and produces a bounded competency state with an auditable integrity and attestation layer.

**LASTRO is not another credentialing platform.** It is an evidence and verification layer for demonstrated capability.

---

## 1. The Problem

Organizations have more information about people's skills than ever — certificates, profiles, job titles, course completions, portfolios, assessments and AI-generated signals. But these sources are often fragmented, indirect, and difficult to verify against observable work.

This creates a gap between:

> **what someone claims they can do**

and

> **what an organization can reliably verify.**

That gap affects decisions around capability development, internal mobility, workforce planning, learning and other people-related workflows.

## 2. External Evidence of the Pain

The capability problem is not unique to LASTRO. Independent workforce research points to a widening gap between changing work, changing skills, and organizational ability to respond.

### Three signals

**Skills gaps are already a business-transformation barrier.**  
The World Economic Forum's *Future of Jobs Report 2025*, based on more than 1,000 employers, found that **63% of surveyed employers** identify skills gaps as a primary barrier to business transformation for 2025–2030. Employers also expect **39% of workers' core skills to change by 2030**. citeturn0search7turn0search14

**AI is accelerating the rate of skill change.**  
PwC's *2026 Global AI Jobs Barometer*, based on more than one billion job postings across six continents, reports that the skills needed for the most AI-exposed jobs are changing **more than twice as fast** as those in the least AI-exposed jobs. citeturn0search10turn0search38

**Organizations are struggling to close the capability gap.**  
Deloitte's *State of AI in the Enterprise 2026* reports that **insufficient worker skills are the biggest barrier** identified by surveyed leaders to integrating AI into existing workflows. Organizations report responding through workforce AI education (53%) and upskilling/reskilling strategies (48%). citeturn0search0turn0search1

### What these signals establish — and what they do not

Together, these sources establish an external market signal:

```text
WORK IS CHANGING
      ↓
SKILLS ARE CHANGING
      ↓
ORGANIZATIONS NEED NEW CAPABILITIES
      ↓
CAPABILITY DEVELOPMENT BECOMES A BUSINESS PROBLEM
```

They **do not establish that LASTRO is already commercially validated**.

Our thesis begins at the next gap:

> **If organizations need people to develop new capabilities, they also need stronger evidence that those capabilities have actually been demonstrated.**

That evidence-and-verification gap is the problem LASTRO is designed to address.

### Source discipline

These sources validate the **existence and urgency of the broader pain**, not customer demand for LASTRO, willingness to pay, product-market fit, or ROI.

Research sources: [WEF — Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/); [PwC — 2026 Global AI Jobs Barometer](https://www.pwc.com/gx/en/issues/artificial-intelligence/publications/artificial-intelligence-study.html); [Deloitte — State of AI in the Enterprise 2026](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html).

---

## 3. The LASTRO Insight

A certificate can show that something was completed. A profile can state what someone has done. A job title can describe a role.

**None of these, by themselves, creates a reliable evidence trail from observable work to a bounded capability decision.**

LASTRO explores a different model:

```text
OBSERVABLE WORK
      ↓
EVIDENCE
      ↓
INDEPENDENT VERIFICATION
      ↓
CONSENSUS
      ↓
VERIFIED CAPABILITY STATE
      ↓
ATTESTATION / PUBLIC VERIFICATION
```

The product does not attempt to automate human judgment. It makes the decision process more evidence-based, traceable, and resilient to a single human or AI signal becoming the sole authority.

## 4. What LASTRO Does

LASTRO turns evidence of work into a competency state that can be independently verified.

The current MVP demonstrates:

```text
EVIDENCE
   ↓
┌───────────────────────────────┐
│ VERIFICATION & INTERPRETATION │
│                               │
│ Structural                   │
│ • Evidence Integrity         │
│ • Deterministic Criteria     │
│                               │
│ Semantic                     │
│ • AI Interpretation          │
└───────────────────────────────┘
   ↓
CONSENSUS CORE
  ├─ AGREEMENT → DEMONSTRATED
  ├─ INSUFFICIENT EVIDENCE → IN_DEVELOPMENT
  └─ CONFLICT → HUMAN ADJUDICATION
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
   ↓
PUBLIC VERIFICATION
```

### AI-assisted, verification-led

AI interprets evidence. It does **not** decide competency by itself.

Deterministic checks evaluate objective conditions independently of AI-generated signals. When relevant mechanisms converge, the Consensus Core can advance the bounded competency state. Conflicts enter an explicit human adjudication path.

This separation is a core product principle, not an implementation detail.

## 5. The MVP — What We Actually Built

The product narrative is broader than the current implementation. **The MVP is intentionally narrow:** it proves one complete vertical slice from observable work to a bounded, independently verifiable competency state.

### The concrete MVP

The canonical demonstration covers:

```text
ONE PERSON
    ↓
ONE COMPETENCY
    ↓
FOUR ACTIVITIES
    ↓
FOUR EVIDENCE TYPES
    ↓
AI INTERPRETATION
    ↓
INDEPENDENT VERIFICATION
    ↓
CONSENSUS
    ↓
COMPETENCY STATE
    ↓
SOLANA ATTESTATION
    ↓
INDEPENDENT VERIFICATION
```

The scenario is **Ana**, a synthetic professional participating in an applied-AI learning program. She develops one defined competency: using AI tools as support to transform a business question into a reproducible data analysis and communicate evidence-supported conclusions.

Her short trail produces four evidence artifacts:

1. **Briefing** — the analytical question and objective.
2. **Analysis artifact** — data preparation and exploration.
3. **Analysis result** — reproducible analysis and results.
4. **Communication** — synthesis, conclusions and limitations.

Those artifacts are related to explicit competency criteria. AI interprets the evidence, while deterministic and integrity checks operate independently. The Consensus Core then produces a bounded outcome: **DEMONSTRATED**, **IN_DEVELOPMENT**, or an explicit conflict requiring human adjudication.

The resulting demonstrated state can then be anchored through the current Solana Devnet attestation path and independently checked for integrity.

### What this means

**We did not build the entire enterprise capability platform.** We built and proved the narrow verification flow that the broader LASTRO product thesis depends on.

The distinction is deliberate:

| Layer | Current MVP | Future product hypothesis |
|---|---|---|
| Evidence | Structured work evidence | Evidence across broader organizational workflows |
| Verification | Independent mechanisms + Consensus Core | Broader capability decision workflows |
| Competency | One bounded canonical competency | Multiple competencies and evolving capability models |
| Attestation | Solana Devnet integrity anchor | Production-grade public verification infrastructure |
| Product value | Technical proof of the verification mechanism | Capability development, mobility, planning and requalification |
| Market | Synthetic demonstration | External validation, pricing, adoption and ROI |

The **MVP is the proof**. The broader product narrative is the **hypothesis to validate**.

---

## 6. Why This Matters

The long-term value of LASTRO is not another place to store credentials.

It is an evidence layer that can eventually support better capability decisions:

```text
OBSERVABLE WORK
      ↓
BETTER EVIDENCE
      ↓
VERIFIED CAPABILITY
      ↓
BETTER DECISION
```

Potential decisions include capability development, internal mobility, workforce planning, learning and other organizational workflows.

**These commercial applications remain hypotheses until validated externally.** The MVP proves the technical mechanism, not market demand or economic impact.

## 7. The Role of Blockchain

Blockchain is infrastructure for the proof layer, not the product authority.

LASTRO's competency state is produced by evidence, verification, governance and the Consensus Core.

Solana provides the current MVP's integrity / attestation anchor:

```text
VERIFIED CAPABILITY STATE
        ↓
INTEGRITY / ATTESTATION REFERENCE
        ↓
PUBLIC VERIFICATION
```

The blockchain does **not** prove that a person is universally competent, truthful, or professionally qualified. It anchors the integrity of a defined state produced by the system.

## 8. What the MVP Proves

- Evidence can be structured and linked to activities and competency criteria.
- Source evidence can remain separate from AI interpretation.
- Deterministic verification can operate independently of AI signals.
- Independent mechanisms can converge, remain insufficient, or conflict.
- Conflict can enter an explicit, auditable human adjudication path.
- A bounded competency state can be represented deterministically.
- The resulting state can be anchored through the current Solana Devnet attestation path.
- The integrity relationship can be independently verified.

## 9. What the MVP Does NOT Claim

- Universal competency assessment.
- Replacement of human evaluation in high-stakes decisions.
- That blockchain proves truth, merit, or professional mastery.
- Validated commercial pricing, market traction, recurring adoption, or product-market fit.
- Quantified ROI or economic impact.
- Superiority over existing alternatives.
- A universal credentialing, recruiting, LMS, or workforce-management platform.
- That strategic extensions such as Dynamic Role Architecture are currently implemented or commercially validated.

## 10. For Evaluators — Recommended Reading Path

If you are evaluating LASTRO for the first time, use this path:

| Step | Read | Purpose |
|---|---|---|
| 1 | [Current project status](docs/PROJECT_STATUS.md) | Understand what is implemented, frozen, and still open. |
| 2 | [MVP use case](docs/product/USE_CASE.md) | Understand the concrete organizational scenario and bounded competency. |
| 3 | [Technical architecture](docs/architecture/TECHNICAL_ARCHITECTURE.md) | Understand how evidence becomes a competency state. |
| 4 | [Consensus Core](docs/architecture/CONSENSUS_CORE.md) | Understand independent verification and decision convergence. |
| 5 | [Demo & technical proof](docs/evaluation/04_DEMO_AND_PROOF.md) | Follow the reproducible technical demonstration and proof path. |
| 6 | [Claims & limitations](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md) | See exactly what the MVP proves and does not prove. |
| 7 | [Source code & tests](src/README.md) / [tests](tests/) | Inspect the implementation and automated evidence. |

**If you only have 5 minutes:** README → [Demo & technical proof](docs/evaluation/04_DEMO_AND_PROOF.md) → [Claims & limitations](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md).

The repository contains additional research, governance, product, brand, and execution documents for deeper review.

## 11. Current Status & Execution Roadmap

The core M1–M3 vertical slice is implemented. The project is now in the **M4 execution / closing phase**, focused on reproducible proof, demonstration, external validation, communication, and final submission.

Canonical execution order:

```text
PROVE → DEMONSTRATE → VALIDATE → COMMUNICATE → FINAL SUBMISSION
```

For the authoritative project status and execution roadmap, see:
- `docs/PROJECT_STATUS.md`
- `docs/product/VICTORY_EXECUTION.md`
- `tasks/CURRENT_EXECUTION_001.md`

The repository is under **Feature Freeze** and **Documentation Freeze** except for explicit proof, validation, interface, or submission work.

## 12. Quick Start & Resilient Demo

```bash
npm install
npm run typecheck
npm test
npm run demo
```

**Attestation & Verification:**

```bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
```

If a live Devnet write is unavailable, the presentation can use the previously validated synthetic fallback fixture described in [Demo & Technical Proof](docs/evaluation/04_DEMO_AND_PROOF.md).

## 13. Repository Structure

- `src/` — Core implementation and hardened pipelines.
- `tests/` — Automated coverage, including adversarial integrity tests.
- `docs/` — Product, architecture, evaluation, governance and operational documentation.
- `research/` — Future hypotheses and research extensions.

## 14. Team

| Contributor | Primary Contribution |
|---|---|
| Erick | Research, market context, and operations |
| JP Carvalho | Evidence pipeline, AI, and verification mechanisms |
| JP Fernandes | Branding, UX/UI, and interface specification |
| JX | Architecture, evidence, cryptographic attestation, and Solana integration |

---

**LASTRO** — From work evidence to verifiable capability.

*Evidence-backed capability infrastructure.*