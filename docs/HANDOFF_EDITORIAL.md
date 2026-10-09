# LASTRO — Editorial & Thesis Handoff

> Source map for documentation, commercial communication, and visual narrative.

This index is intentionally lightweight. It does not define new product behavior or architecture. It points to the canonical sources already maintained in the repository.

## Como ler este documento se você não é técnico

Você **não precisa entender programação para entender o LASTRO**.

A ordem recomendada é:

1. **Entenda o problema** — por que empresas precisam saber se as competências que declaram possuir realmente existem na prática.
2. **Entenda a tese de produto** — como mudanças no trabalho geram novas necessidades de competências, lacunas e desenvolvimento.
3. **Entenda o produto** — como o LASTRO transforma trabalho real em evidência e evidência em um estado de competência verificável.
4. **Veja as aplicações** — como a mesma arquitetura pode ser aplicada em diferentes contextos, distinguindo o que já é implementado do que ainda é blueprint.
5. **Veja a prova** — o que já funciona e pode ser demonstrado hoje.
6. **Entenda os limites** — o que é fato, o que é hipótese e o que ainda precisa ser validado.
7. **Só depois, se necessário, entre na parte técnica** — os documentos de arquitetura explicam como o sistema foi construído, não são pré-requisito para entender a proposta.

### O que você precisa sair entendendo

Ao final da leitura, você deve conseguir explicar o LASTRO em uma frase:

> **LASTRO transforma evidências de trabalho real em estados de competência que podem ser verificados de forma independente.**

E deve conseguir distinguir três camadas:

- **O que já provamos:** o MVP transforma evidência em estado de competência verificável e possui o caminho de atestação.
- **O que estamos demonstrando agora:** interface, fluxo ponta a ponta e prova pública em Devnet.
- **O que estamos investigando para o futuro:** usar competências verificadas para entender gaps, apoiar requalificação, mobilidade interna e a criação de novos papéis.

### Tradução rápida dos termos

| Termo | Significado no projeto |
|---|---|
| **Evidência** | Trabalho observável produzido por uma pessoa. |
| **Competência** | Capacidade que queremos verificar a partir dessa evidência. |
| **Verificação** | Checagens usadas para avaliar se a evidência sustenta a competência. |
| **Consensus** | Mecanismo que combina os sinais de verificação dentro das regras definidas pelo sistema. |
| **Estado de competência** | Resultado atual do processo, como uma competência demonstrada ou ainda em desenvolvimento. |
| **Atestação** | Registro verificável que representa o estado produzido pelo processo. |
| **Role Engineering** | Hipótese de usar competências verificadas como blocos para desenhar funções que estão mudando ou surgindo. |
| **Devnet** | Ambiente público de testes da Solana usado para demonstrar a atestação sem confundir a prova com produção financeira. |

**Importante:** você pode compreender o produto sem estudar API_CONTRACT, CANONICALIZATION, CONSENSUS_CORE ou o código-fonte. Esses documentos existem para permitir auditoria e implementação.

## 00. Start here

1. [Project Handoff](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/PROJECT_HANDOFF.md) — general project transition and orientation.
2. [Source of Truth](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/governance/SOURCE_OF_TRUTH.md) — canonical-source rules and documentation authority.
3. [Publication Classification Matrix](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md) — what belongs in public, restricted, or controlled communication.
4. [Project Status](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/PROJECT_STATUS.md) — current frozen state and documentation freeze.

## 01. Understand the problem and thesis

- [Research Map](https://github.com/SH1W4/learning-competency-mvp/blob/main/research/RESEARCH_MAP.md) — current research map, evidence boundaries, and the distinction between established foundations, hypotheses, and open questions.
- [Related Work & Evidence](https://github.com/SH1W4/learning-competency-mvp/blob/main/research/RELATED_WORK_AND_EVIDENCE.md) — related work, external foundations, and the boundary between prior art and the LASTRO composition hypothesis.
- [Competitive Landscape](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/market/COMPETITIVE_LANDSCAPE.md) — positioning and the credential/evidence trust boundary.
- [Product Thesis](https://github.com/SH1W4/learning-competency-mvp/blob/main/research/product/PRODUCT_THESIS.md) — product thesis and underlying rationale.
- [GTM](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/go-to-market/GTM.md) — current commercial framing and initial wedge hypothesis.
- [Pitch Strategy](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/go-to-market/01_PITCH_STRATEGY.md) — investor/client narrative, pitch structure, and explicit claim discipline.
- [Reproducible Demo Contract](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md) — minimum public contract for reproducing and evaluating the MVP demonstration from a clean checkout.

### Positioning validation path

For commercial and visual communication, use the following path rather than treating any single document as proof of positioning:

**External Evidence → Related Work / Prior Art → Competitive Landscape → Product Thesis → Case Studies → GTM Hypothesis → Pitch / Positioning → Limitations & Claims**

- External evidence establishes the broader problem and relevant foundations.
- Related work and the competitive landscape establish what is already adjacent and where the differentiation hypothesis sits.
- The Product Thesis states the proposed LASTRO composition.
- The Case Studies show how that composition can be instantiated across concrete contexts, while preserving the distinction between implementation, scenario and hypothesis.
- GTM and Pitch translate that thesis into a commercial narrative.
- Limitations & Claims prevents the narrative from becoming stronger than the evidence.

This path supports positioning analysis; it does **not** establish market uniqueness, PMF, willingness to pay, or customer validation.

[Reproducible Demo Contract](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md) — minimum public contract for reproducing and evaluating the MVP demonstration from a clean checkout.

Future research and planning material that was deliberately moved to the private Vault is intentionally omitted from this public handoff. The [Research Map](https://github.com/SH1W4/learning-competency-mvp/blob/main/research/RESEARCH_MAP.md) is the public boundary for that material.

## 02. Case studies & applications

The case-study portfolio is the bridge between **product thesis** and **proof**. It shows where the evidence → independent verification → consensus → competency state → attestation pattern may be applied without treating every application as validated market traction.

**Start with the [Case Studies Overview](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/README.md).**

| Case | Status | Why it matters |
|---|---|---|
| [01 — FinTech / Ana](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/01_FINTECH_ANA.md) | **Implemented synthetic scenario** | Canonical reproducible scenario tied directly to the public MVP fixtures. |
| [02 — HealthTech / Gabriel](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/02_HEALTHTECH_GABRIEL.md) | **B2B blueprint** | Tests applicability in a sensitive, regulated-context workflow. |
| [03 — DevSecOps / Mariana](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/03_DEVSECOPS_MARIANA.md) | **B2B blueprint** | Tests applicability to engineering and application-security evidence. |
| [04 — Reskilling / Rafael](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/04_RESKILLING_RAFAEL.md) | **Funding / employability blueprint** | Tests evidence-backed competency assessment in education and impact programs. |
| [05 — Corporate Competency Trails / B2B](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/05_TRILHAS_CORPORATIVAS_B2B.md) | **Commercialization blueprint** | Connects the technical thesis to the current enterprise operating and monetization hypotheses. |

### How to interpret the portfolio

- **Case 01 is the proof anchor:** it is synthetic but reproducible through the public MVP fixtures and tests.
- **Cases 02–04 are application blueprints:** they demonstrate plausible verticalization, not customer deployments or regulatory/commercial validation.
- **Case 05 is the commercial bridge:** it translates the architecture into a B2B operating model, but buyer, pricing, adoption, ROI and hiring outcomes remain hypotheses.
- Across all cases, **Human Adjudication remains an exception path** for material conflict; it is not a fourth verifier.
- The existence of a case study does not imply customer validation, production deployment, regulatory approval, hiring outcomes or ROI.

Use the [Case Studies Overview](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/case_studies/README.md) as the entry point before reading individual cases.

## 03. Understand the product

- [Domain Model](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/DOMAIN_MODEL.md) — competency, criteria, evidence, states, decisions, and core semantics.
- [API Contract](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/API_CONTRACT.md) — product/system contract.
- [Frontend Product Spec](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/product/FRONTEND_PRODUCT_SPEC.md) — product surface, user-facing semantics, and current behavior.
- [Product Evaluation](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/evaluation/01_PRODUCT.md) — product evaluation framing.

## 04. Understand the technical system

- [Technical Architecture](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/TECHNICAL_ARCHITECTURE.md) — system structure and frozen pipeline.
- [Evidence Pipeline](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/EVIDENCE_PIPELINE.md) — evidence processing path.
- [Consensus Core](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/CONSENSUS_CORE.md) — AI interpretation, independent verification, consensus boundaries, and conflict handling.
- [Verification Adapter Boundary](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/VERIFICATION_ADAPTER_BOUNDARY.md) — verification boundary and adapter model.
- [M2 implementation history](https://github.com/SH1W4/learning-competency-mvp/pull/4) — public GitHub history of the original M2 implementation; detailed historical execution material remains archived privately.
- [Canonicalization](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/CANONICALIZATION.md) — deterministic representation and hashing.
- [Attestation Model](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/ATTESTATION_MODEL.md) — attestation semantics.

## 05. Understand the proof

- [Evaluation — Architecture](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/evaluation/02_ARCHITECTURE.md) — architecture evaluation.
- [Evaluation — Verification & Governance](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md) — verification and governance claims.
- [Evaluation — Demo & Proof](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/evaluation/04_DEMO_AND_PROOF.md) — what can actually be demonstrated.
- [Evaluation — Limitations & Claims](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md) — explicit boundaries on what LASTRO can and cannot claim.

## 06. Understand governance, trust and publication boundaries

- [Security Threat Model](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/governance/SECURITY_THREAT_MODEL.md) — trust assumptions, threats, and security boundaries.
- [Ethical Compliance Layer](https://github.com/SH1W4/learning-competency-mvp/blob/main/research/02_ETHICAL_COMPLIANCE_LAYER.md) — AI evaluation limitations, fairness, oversight, and governance context.
- [Governance / Compliance Layer](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/architecture/GOVERNANCE_COMPLIANCE_LAYER.md) — governance boundary.
- [Team Roles](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/governance/TEAM_ROLES.md) — responsibilities and ownership.
- [Vault Boundary](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/governance/VAULT_BOUNDARY.md) — protected/private information boundary.

## 07. Implementation / proof references

- [Repository](https://github.com/SH1W4/learning-competency-mvp) — canonical source code and documentation.
- [Consensus implementation](https://github.com/SH1W4/learning-competency-mvp/tree/main/src/consensus) — executable consensus core.
- [Evidence implementation](https://github.com/SH1W4/learning-competency-mvp/tree/main/src/evidence) — evidence ingestion, extraction, and normalization.
- [Provenance implementation](https://github.com/SH1W4/learning-competency-mvp/tree/main/src/provenance) — provenance and claim tracing.
- [Solana attestation implementation](https://github.com/SH1W4/learning-competency-mvp/tree/main/src/solana) — M3 attestation/provenance implementation.
- [Synthetic fixtures / evidence examples](https://github.com/SH1W4/learning-competency-mvp/tree/main/fixtures) — controlled examples used to exercise the pipeline.

## 08. Brand and commercial execution

- [Brand README](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/brand/README.md) — brand documentation entry point.
- [Brandbook Draft](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/brand/BRANDBOOK_DRAFT.md) — brand foundations.
- [Visual System Spec](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/brand/VISUAL_SYSTEM_SPEC.md) — visual language and system.
- [Design Brief](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/brand/DESIGN_BRIEF_JP_FERNANDES.md) — design direction.
- [Naming Exploration](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/brand/NAMING_EXPLORATION.md) — naming exploration.
- [LASTRO Identity v0.2](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/brand/LASTRO_IDENTIDADE_v0.2.html) — current identity artifact.
- [PR #12 — Brand / Interface baseline](https://github.com/SH1W4/learning-competency-mvp/pull/12) — brand/interface implementation baseline.
- [Pitch Strategy](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/go-to-market/01_PITCH_STRATEGY.md) — communication artifact for M4.

## Core narrative

**Evidence → AI Interpretation → Independent Verification → Consensus → Competency State → Attestation → Public Verification**

The current implementation distinguishes three Consensus Core outcomes: **AGREEMENT**, **INSUFFICIENT EVIDENCE**, and **CONFLICT**. Human Adjudication is entered only from the conflict path and is not a fourth verifier.

Human Adjudication is an exceptional conflict-resolution path, not a normal pipeline stage.

## Current verification snapshot

The current `main` snapshot contains **11 test files and 76 active test cases**. The latest CI run completed successfully for the technical test/typecheck workflow. This is a point-in-time repository snapshot and must be regenerated when the test suite changes.

## External evidence and standards

- [WEF — Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) — structural skills-gap evidence.
- [Deloitte — State of AI in the Enterprise 2026](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html) — workforce capability barrier to AI adoption.
- [W3C — Verifiable Credentials Data Model v2.0](https://www.w3.org/TR/vc-data-model/) — credential/evidence trust boundary.
- [ACL 2024 — Large Language Models are not Fair Evaluators](https://aclanthology.org/2024.acl-long.511/) — evidence of evaluation bias in LLM-based assessment.
- [UNESCO — AI Competency Framework for Teachers](https://www.unesco.org/en/articles/ai-competency-framework-teachers) — competency structure and progression.
- [NIST — AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — governance and risk-management context.
- [EU — Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) — regulatory context for AI systems and oversight.

## Editorial rule

Use the sources above as the evidence base for external communication.

Translate:

**evidence → narrative → visual language → commercial artifact**

Do not convert:
- market statistics into customer validation;
- credential authenticity into proof of competency;
- AI interpretation into final truth;
- competency declaration into demonstrated competency.

The external research validates the problem space and architectural rationale. It does **not** establish PMF, willingness to pay, or that LASTRO is uniquely correct.

## Scope

This handoff index adds no runtime functionality and does not modify the frozen architecture or domain semantics.
