# LASTRO — Learning Competency Infrastructure

> **From observable evidence to verifiable competency states.**

LASTRO is an infrastructure designed to transform observable work evidence into bounded, verifiable competency states. It connects evidence to explicit criteria, applies independent verification mechanisms, preserves decision context, and produces an auditable state anchored by cryptographic integrity.

---

## 1. The Problem
Work evolves continuously, while organizations report material difficulty keeping workforce capabilities aligned with changing requirements. In the World Economic Forum's 2025 employer survey, **63% of employers identified skills gaps as the leading barrier to business transformation** for 2025–2030. Deloitte's 2026 enterprise AI research similarly identifies **insufficient worker skills as the biggest barrier to integrating AI into existing workflows**. These signals do not validate LASTRO commercially, but they establish the broader capability problem the project addresses. [1]

This creates a critical gap between **what someone claims they can do** and **what an organization can actually verify**.


### Research references

[1] World Economic Forum, *Future of Jobs Report 2025* — https://www.weforum.org/publications/the-future-of-jobs-report-2025/; Deloitte, *State of AI in the Enterprise 2026* — https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html

## 2. The LASTRO Approach
We do not automate human judgment; we make it more evidence-based, traceable, and resilient to single points of failure (human or AI). 

The current MVP demonstrates a strict, traceable pipeline:
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
  ├─ AGREEMENT → DEMONSTRATED STATE
  ├─ INSUFFICIENT EVIDENCE → IN_DEVELOPMENT
  └─ CONFLICT → HUMAN ADJUDICATION (Explicit Exception Path)
   ↓
ATTESTATION & PUBLIC VERIFICATION
```

## 3. Core Architecture & Security Boundaries
The architecture defines a strict boundary between public interface contracts and private verification heuristics. 

The Consensus Core evaluates convergence across **three distinct mechanisms**:
1. **Evidence Integrity Check (Structural)**: Verifies cryptographic integrity and preserved provenance metadata (`sha256` is recalculated and strictly matched against `contentHash`). The pipeline is **fail-closed** on any post-ingestion tampering attempt.
2. **Deterministic Criteria Check (Structural)**: Applies objective, pre-defined rules directly to the canonical evidence metadata (e.g., "Does activity C2 possess the required artifact type?"). *Crucially, this verifier does NOT consume AI-generated signals, summaries, or confidence scores.*
3. **AI Interpretation (Semantic)**: Provides semantic analysis of the evidence content (e.g., "Does the briefing clearly formulate an analytical question?"). This is treated strictly as an interpretive signal, never as the final authority.

> **Note on Statistical / Robustness Checks**: While the architecture allows for future statistical validation (e.g., sample size, baseline comparison, stability), this layer is explicitly classified as **Future Research / M4+** and is intentionally excluded from the current MVP scope to maintain a focused, verifiable vertical slice.

## 4. For Evaluators — Recommended Reading Path

If you are evaluating LASTRO for the first time, use this path instead of reading the repository in arbitrary order:

| Step | Read | Purpose |
|---|---|---|
| 1 | [Current project status](docs/PROJECT_STATUS.md) | Understand what is implemented, what is frozen, and what remains for M4. |
| 2 | [MVP use case](docs/product/USE_CASE.md) | Understand the concrete problem and the bounded product scenario. |
| 3 | [Technical architecture](docs/architecture/TECHNICAL_ARCHITECTURE.md) | See how evidence becomes a competency state. |
| 4 | [Consensus Core](docs/architecture/CONSENSUS_CORE.md) | Understand how independent mechanisms converge, conflict, or remain insufficient. |
| 5 | [Demo & technical proof](docs/evaluation/04_DEMO_AND_PROOF.md) | Follow the reproducible end-to-end demonstration and verification path. |
| 6 | [Claims & limitations](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md) | See exactly what the MVP proves — and what it deliberately does not claim. |
| 7 | [Source code & tests](src/README.md) / [tests](tests/) | Inspect the implementation and automated evidence behind the documented behavior. |

**If you only have 5 minutes:** read this README → [Demo & technical proof](docs/evaluation/04_DEMO_AND_PROOF.md) → [Claims & limitations](docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md).

This path is the recommended evaluation route. The repository contains additional research, governance, product, brand, and execution documents for deeper review.

## 5. Current Status & Execution Roadmap
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

## 6. What the MVP Proves
- Structured learning evidence with cryptographic boundary hardening (`structuredClone` isolation pre-AI processing).
- Strict, enforced separation between structural deterministic verification and semantic AI interpretation.
- A Consensus Core that evaluates convergence between these distinct layers, preventing any single mechanism from becoming the absolute authority.
- Governance-aware state transitions, routing conflicts exclusively to an auditable Human Adjudication path (preserving full provenance).
- Solana Devnet integrity anchoring with a resilient demonstration fallback protocol.

## 7. What the MVP Does NOT Claim
- Universal competency assessment or the replacement of human evaluation in high-stakes contexts.
- That blockchain proves "truth" or "merit" (it only anchors the cryptographic integrity of the state generated by the system).
- Validated commercial pricing, market traction, or recurring adoption.
- That the physical Public/Private Vault migration is complete (the logical architecture and publication policy are strictly defined, but physical repository separation is pending execution).

## 8. Quick Start & Resilient Demo
```bash
npm install
npm run typecheck
npm test
npm run demo
```

**Attestation & Verification (with Fallback Protocol):**
```bash
# Attempt live Devnet attestation
npm run m3:attest

# Independently verify the integrity of the anchored record.
# Note: If the live Devnet write is unavailable, the demo can switch to a previously validated synthetic transaction registered as a fallback fixture.
npm run m3:verify <tx_signature> [record_hash]
```

## 9. Repository Structure
- `src/` : Core implementation and hardened pipelines.
- `tests/` : Automated coverage (including adversarial tampering and malicious provider tests).
- `docs/` : Product, architecture, evaluation, and operational documentation.
- `research/` : Future hypotheses (e.g., Dynamic Role Architecture, Statistical Robustness).

## 10. Team
| Contributor | Primary Contribution |
|---|---|
| Erick | Research, market context, and operations |
| JP Carvalho | Evidence pipeline, AI, and verification mechanisms |
| JP Fernandes | Branding, UX/UI, and interface specification |
| JX | Architecture, evidence, cryptographic attestation, and Solana integration |

---
**LASTRO** — Evidence-backed competency.  
*From a subjective claim to a verifiable, understandable, and buildable state.*
