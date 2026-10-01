# Dataroom Systematic Analysis & MVP Integration

**Document:** Dataroom Analysis & Strategic Alignment  
**Origin:** Google Drive Dataroom (`HACK_Plataforma_Microcredenciais`)  
**Base Date:** October 1, 2026  
**Status:** Consolidated Strategic Analysis · Ready for Team Alignment  
**Competition Context:** Colosseum — Crypto World's Fair 2026 (Track Solana · Deadline: October 12, 2026)

---

## 1. Objective

This document systematically consolidates all research, governance, meeting notes, funding/grant analyses, and market hypotheses stored in the project's Google Drive Dataroom (`HACK_Plataforma_Microcredenciais`), cross-referencing it directly with the technical implementation in this GitHub repository.

The goal is to:
1. **Validate coherence** between external research (led by Erick) and the implemented code (by JX and JP Carvalho).
2. **Prevent scope creep**, strictly maintaining the MVP boundaries and falsification tests defined in documents 04 and 09.
3. **Map the exact remaining tasks** for submission to Colosseum's Crypto World's Fair 2026.

---

## 2. Thesis Evolution (The Critical Pivot)

Historical meeting notes and foundational documents reveal exceptional product maturity driven by conscious elimination of vanity features:

```text
Sept 25, 2026 - INITIAL PROPOSAL
"Microcredential Platform"
(Risk: Becoming yet another issuer of unverified PDF certificates or vanity badges)
         ↓ (MEETING MINUTES 02 - Sept 26, 2026)
PRODUCT PIVOT
"Competency Development with Verifiable Real Evidence"
(Value is not in the certificate, but in closing the entire evolution loop)
         ↓ (STRATEGIC ALIGNMENT - Sept 28, 2026)
LAYERED ARCHITECTURE
Reusable Infrastructure vs. Application Program
(Infrastructure is the technical engine; Program is the social/L&D intervention)
         ↓ (TECHNICAL EXECUTION - Sept 29 to Oct 1, 2026)
TECHNICAL DELIVERY (M1, M2, M3)
44 vitest tests passing + strict Zod AI contracts + verified Solana Devnet attestation
```

### The Fundamental Shift
Issuing PDF certificates or digital badges does not prove competency. The product was redefined around a full vertical slice:
$$\text{Need} \to \text{Competency} \to \text{Trail} \to \text{Activities} \to \text{Evidence} \to \text{AI} \to \text{Human Review} \to \text{State} \to \text{Attestation} \to \text{Verification}$$

---

## 3. Four Core Conceptual Pillars

### Pillar 1: 4-Level Trust Framework (DOC_01)
Strict differentiation between claims and proven facts:
* **Level 1 (Self-Declared):** User-submitted text without supporting attachments.
* **Level 2 (Evidence Presented):** File, link, repository, or document attached.
* **Level 3 (Evidence Analyzed):** AI structured the evidence, correlated it with observable criteria, and flagged gaps/consistency.
* **Level 4 (Source Verified):** Authenticated public query, external cryptographic signature, or direct issuer verification.

### Pillar 2: Strict AI Boundaries and Human Reviewer Sovereignty
* AI **never** autonomously grants the `DEMONSTRATED` state.
* AI handles ingestion, normalization, extraction, and criteria mapping (`src/ai/contract.ts`).
* The human reviewer maintains final authority and recorded accountability (accept, adjust, reject, or request new evidence).

### Pillar 3: Purposeful Solana Integration (No "Blockchain for Decoration")
* **Off-chain (Privacy & GDPR/LGPD):** Personal documents, student data, code artifacts, and feedback stay strictly off-chain.
* **On-chain (Integrity):** Only the cryptographic digest (`record_hash` SHA-256 of the reviewed state payload) and minimal metadata via the **SPL Memo Program**.
* Solana serves as an **immutable, publicly verifiable integrity anchor**, proving that a competency state existed at a specific point in time.

### Pillar 4: Operational Brakes on the "Snowball Effect" (DOC_09)
Market research naturally sparks dozens of ideas (mentoring, grants, 50+ retraining, recruitment). The Dataroom enforces clear MVP entrance filters:
1. *What did we discover?*
2. *What does it mean?* (hypothesis, evidence, benchmark, or decision?)
3. *What changes in the demonstrable flow?* (if it does not impact the demonstration slice, it stays out of the MVP).
4. *What action do we take?* (keep market knowledge broad in the Dataroom, but the MVP narrow in the codebase).

---

## 4. The Three Application Domains

The strategic alignment documents demonstrated that the same technical engine serves three distinct environments without rewriting core logic:

| Domain | Object | Relationship to Infrastructure |
|---|---|---|
| **1. Corporate / L&D / HR** | Organizational competency development. | Direct applied infrastructure; optional internal mentoring. |
| **2. R&D / Tech Grants (PD&I)** | Experimental development and novel technology. | The technology itself is the funded object (Finep, CNPq). |
| **3. Education / Social Impact** | Formative intervention with specific groups (youth, 50+). | Mentoring, community, and support are layers added by the program. |

---

## 5. Funding & Grant Mapping Post-Hackathon

The Dataroom mapped clear financing and viability paths beyond hackathon prize money:

1. **Colosseum (Crypto World's Fair 2026):**
   - $100k Solana Track; $840k global prizes; $2.5M seed funding; Colosseum Accelerator ($250k pre-seed).
   - Deadline: **October 12, 2026**.
2. **CNPq/MCTI nº 29/2026 — RHAE IA (Open until Oct 9, 2026):**
   - Up to R$ 300k in technological development grants for researchers in startups. Ideal for hiring applied AI researchers to advance evidence parsing models.
3. **Finep Mais Inovação Brasil (Digital Technologies):**
   - Economic subsidy for innovative enterprises (TRL 3 to 8).
4. **FAPESB 017/2026 (Bahia):**
   - Intelligent systems for public administration and workforce training.

---

## 6. Primary Go-To-Market Wedge: Applied AI Competencies

Synthesizing Erick's research notes on applied AI, we established the commercial entry wedge:

* **The "AI Bluff" Problem:** Enterprises invest heavily in AI tools and video courses, but completion certificates only prove watch-time. The market is full of employees claiming AI proficiency without proof of practical capability, critical thinking, or hallucination prevention.
* **Our Positioning:** Rather than a generic "microcredentials platform", Learning Competency is the **verifiable audit and attestation layer for Applied AI competencies in enterprise L&D**.

### Does the MVP codebase need changes?
**NO. The MVP codebase is in total FEATURE FREEZE.**
* The canonical Junior Data Analyst scenario (`Ana`) already models real-world data analysis supported by modern AI tooling.
* The pipeline (`src/evidence/`, `src/ai/contract.ts`, `src/review/`, `src/solana/`) is domain-agnostic, backed by 44 passing tests, and confirmed on Solana Devnet.
* **The adjustment is 100% focused on framing/narrative for the Pitch video and customer interview scripts.**

---

## 7. Systematic Cross-Reference: Dataroom vs. Technical Repository

| Front / Topic | Dataroom Specification | Status in Repository (`learning-competency-mvp`) |
|---|---|---|
| **M1: Canonical Use Case** | Junior Data Analyst (A1–A4, C1–C4). | ✅ **100% Done.** Implemented in `src/domain/` and synthetic scenario `fixtures/synthetic/ana/`. |
| **M2: Evidence Pipeline** | Ingest, normalize, extract, AI, and human review. | ✅ **100% Done.** TypeScript pipeline with **44 vitest tests passing**. |
| **M3: Attestation & Solana** | Off-chain hash, SPL Memo Program, verification. | ✅ **100% Done.** Live Devnet transaction confirmed ([`27hwuMbf5SxA...3y3U`](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)) and CLI verification via `npm run m3:verify`. |
| **GTM Wedge (Applied AI)** | Enterprise AI reskilling wedge. | ✅ **100% Documented.** Integrated into `docs/go-to-market/GTM.md` and `docs/validation/DEMAND_VALIDATION.md`. |
| **Governance & Traceability** | Governance v1.0 and decision log. | ✅ **100% Done.** `docs/governance/TEAM_ROLES.md` and 5 entries in `docs/diario-de-bordo/`. |
| **README & Presentation** | Primary English version with Portuguese support. | ✅ **100% Done.** `README.md` (EN) and `README.pt.md` (PT) synchronized with all 4 team profiles. |
| **Branding & UI (JP Fernandes)** | Visual materialization and UI of Ana's flow. | ⏳ **In Progress.** Detailed brief in `docs/brand/DESIGN_BRIEF_JP_FERNANDES.md`. |
| **M4: Demand Validation (Erick)** | 3–5 interviews focused on the AI Bluff (5 questions). | ⏳ **In Progress.** 5 golden questions ready in Document 11. |

---

## 8. Action Plan for the Final Stretch (Until October 12)

The technical infrastructure is 100% built, verified, and test-covered. Winning the hackathon and earning an Accelerator interview depends on three complementary deliveries:

```text
[ TECHNICAL INFRASTRUCTURE (JX + JP Carvalho) ]   → 100% DONE (44 tests + Devnet live) [FEATURE FREEZE]
                     +
[ EXTERNAL DEMAND VALIDATION (Erick) ]          → Conduct 3 to 5 interviews on the "AI Bluff"
                     +
[ VISUAL UI & BRANDING (JP Fernandes) ]          → Screen flows for Ana's journey (Briefing ready)
                     ↓
[ PITCH (2-3 min) & DEMO (≤3 min) RECORDINGS ]  → Based on docs/demo/DEMO_SCRIPT.md
                     ↓
[ WINNING SUBMISSION ON COLOSSEUM ]
```

### Team Immediate Action Items:
1. **Erick:** Conduct and document 3 to 5 concise interviews (15–20 min) with L&D or engineering leads using the 5 golden questions from Document 11.
2. **JP Fernandes:** Complete the UI layout for Ana's evidence journey so the demo video showcases an intuitive product experience alongside the CLI/test suite.
3. **Team:** Record the product demo ($\le 3$ min) and pitch video (2–3 min) and submit on the Colosseum platform before October 12.
