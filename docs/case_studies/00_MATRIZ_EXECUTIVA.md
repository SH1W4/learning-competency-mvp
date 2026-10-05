# 00 — Case Study Portfolio Matrix

> **Project:** Learning Competency MVP (LASTRO)  
> **Source:** Case-study portfolio supplied in the project dataroom, dated 1 October 2026  
> **Purpose:** Show how the same evidence-to-competency pattern can be instantiated across distinct operating environments without presenting future scenarios as current product capability.

## Portfolio thesis

The portfolio explores a common problem across enterprise work and talent-development contexts: **completion signals and generic credentials are weaker evidence of practical capability than inspectable work artifacts**.

The four cases below test the same conceptual chain across different domains. Only Case 01 is tied to the current public MVP fixture set. Cases 02–04 are expansion blueprints and should be read as **application hypotheses**, not deployed customer evidence.

| # | Vertical | Persona | Competency focus | Public status |
|---|---|---|---|---|
| 01 | FinTech / AI Finance | Ana — Data Scientist | Prompt engineering, hallucination mitigation, traceability | **MVP anchor — synthetic, reproducible** |
| 02 | HealthTech / AI governance | Gabriel — Data & AI Governance | De-identification, re-identification risk, prompt traffic controls, regulatory documentation | **B2B expansion blueprint** |
| 03 | DevSecOps | Mariana — Backend Engineer | AI-generated code security, prompt-injection defenses, security testing, secrets management | **B2B expansion blueprint** |
| 04 | Reskilling / Social Impact | Rafael — AI developer trainee | RAG ingestion, retrieval, evaluation, API deployment | **Funding / employability blueprint** |

## Common architectural pattern

The source portfolio describes a common chain:

```
Work Artifacts
    ↓
Deterministic Hashing
    ↓
AI Analysis / Recommendation
    ↓
Human Review / Adjudication
    ↓
Attestation / Verification Record
```

For LASTRO, the important product boundary is that **cryptographic integrity does not establish competency by itself**. The evidence must still be interpreted against explicit competency criteria, reviewed under the project's decision model, and represented with its uncertainty and provenance.

## How evaluators should read this portfolio

1. Start with [Case 01 — FinTech / Ana](./01_FINTECH_ANA.md).
2. Reproduce the scenario using [`fixtures/synthetic/ana/`](../../fixtures/synthetic/ana/).
3. Inspect the public evaluation pipeline and attestation implementation.
4. Treat Cases 02–04 as verticalization hypotheses rather than customer proof.
5. Use the research track to inspect the external foundations and limitations behind the thesis.

## Related public evidence

- [Article Research Track](../../research/article/README.md)
- [Research Map](../../research/RESEARCH_MAP.md)
- [Reproducible Demo Contract](../demo/REPRODUCIBLE_DEMO_CONTRACT.md)
- [Project Status](../PROJECT_STATUS.md)
- [Technical Architecture](../architecture/TECHNICAL_ARCHITECTURE.md)
- [Consensus Core](../architecture/CONSENSUS_CORE.md)

## External frameworks referenced by the portfolio

- [W3C Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [ANPD — RIPD guidance](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd)
- [WEF — Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/)

## Evidence & status boundary

This document is a **case-study artifact**, not evidence of a completed customer deployment unless explicitly stated otherwise.

The case studies distinguish:

- **Implemented / reproducible** — supported by the public MVP code and fixtures.
- **Scenario / blueprint** — a structured application hypothesis derived from the research and product model.
- **External evidence** — claims supported by an identified external source.
- **Illustrative claim** — content supplied by the case-study scenario that still requires external validation.

The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes, or ROI.