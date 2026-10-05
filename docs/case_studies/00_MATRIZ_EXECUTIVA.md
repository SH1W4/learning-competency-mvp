# LASTRO — Case Study Portfolio

> **Source:** Executive Case Study Matrix, dated 2026-10-01.  
> **Classification:** Public product / market narrative artifact.  
> **Important:** The portfolio distinguishes the implemented MVP anchor from expansion blueprints. It is not evidence of customer validation by itself.

## Purpose

The case-study portfolio translates the LASTRO verification pattern into concrete organizational scenarios.

The source matrix identifies four case studies and a separate strategic B2B track covering reskilling and hiring.  

## Portfolio

| # | Vertical | Persona | Competency audited | Status |
|---|---|---|---|---|
| 01 | FinTech & AI | Ana — Junior Data Scientist | Financial prompt engineering & hallucination prevention | **MVP anchor — implemented in synthetic fixtures** |
| 02 | HealthTech & Regulation | Gabriel — Data Governance Analyst | Medical-data anonymization & LGPD/HIPAA-oriented LLM governance | **B2B expansion blueprint** |
| 03 | DevSecOps & Software | Mariana — Backend Engineer | Security review of AI-generated code & injection prevention | **Engineering expansion blueprint** |
| 04 | Reskilling & Social Impact | Rafael — Bootcamp fellow | RAG agent development & evidenced employability | **Funding / impact blueprint** |
| 05 | B2B Reskilling & Hiring | CHROs, CTOs & recruiters | Evidence-based reskilling and hiring workflows | **Strategic monetization track — not a case study** |

## Shared architectural pattern

The source matrix describes the common custody chain as:

```
Work Artifacts
    ↓
SHA-256
    ↓
AI Suggestion — non-binding
    ↓
Human Arbitration
    ↓
Solana Devnet Attestation
```

This is the portfolio's **scenario-level narrative**. The canonical MVP architecture and implementation documentation remain authoritative for what is actually implemented. 

## Evidence boundary

### Case 01

Case 01 is the canonical MVP scenario. The source identifies it as 100% implemented in `fixtures/synthetic/ana/` and validated by 44 Vitest tests. 

### Cases 02–04

These documents describe expansion scenarios. They should be read as **application blueprints**, not as evidence that LASTRO has already deployed these workflows with the named organizations or people.

### Strategic track

The B2B reskilling/hiring row is a commercial direction rather than a fifth implementation case. 

## Recommended reading order

1. [Case 01 — FinTech / Ana](./01_FINTECH_ANA.md)
2. [Case 02 — HealthTech / Gabriel](./02_HEALTHTECH_GABRIEL.md)
3. [Case 03 — DevSecOps / Mariana](./03_DEVSECOPS_MARIANA.md)
4. [Case 04 — Reskilling / Rafael](./04_RESKILLING_RAFAEL.md)

For implementation truth, return to the main README, the canonical MVP documentation, source code, tests and reproducible demo.
