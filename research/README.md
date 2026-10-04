# Research

This directory contains exploratory research, external evidence, architectural benchmarks, and future product hypotheses that inform LASTRO without silently changing the current MVP contract.

Research is **not the source of truth for current runtime behavior**. The current implementation, canonical product/architecture documentation, and governance records take precedence where they conflict.

## Research boundary

Research material must preserve the distinction between:

- **Observed** — supported by a source, experiment, implementation artifact, or documented observation.
- **Interpreted** — a conclusion drawn from one or more observations.
- **Adopted** — a project decision explicitly promoted into product, architecture, governance, or execution.
- **Hypothesis** — a proposition that still requires validation.
- **Open** — a question for which the current evidence is insufficient.
- **Deferred** — a direction intentionally kept outside the current MVP.

> **Hypothesis must not become fact through repetition.**

## Active research tracks

### Product thesis & future platform

Research on the broader product opportunity beyond the current MVP.

- [Product Thesis](./product/PRODUCT_THESIS.md)
- [Applied AI Workforce Capability](./product/APPLIED_AI_WORKFORCE_CAPABILITY.md)
- [Research Agenda](./product/RESEARCH_AGENDA.md)

Future-platform material may exist in the private Vault and is not assumed to be a public capability.

### Market, related work & ecosystem evidence

External evidence, foundational standards, related work, and competitive/ecosystem research.

- [Related Work, Prior Art & External Evidence](./RELATED_WORK_AND_EVIDENCE.md)
- [Colosseum Ecosystem Benchmark](./05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md)

Some historical or internal market/strategy research is retained in the private Vault and is not linked from the public index.

### Architecture & verification infrastructure

Research into methodological robustness, verification substrates, and future governance mechanisms.

- [Data & Statistical Robustness](./03_DATA_STATISTICAL_ROBUSTNESS.md)
- [Ethical Compliance Layer](./ETHICAL_COMPLIANCE_LAYER.md)

Verification-infrastructure benchmark material is maintained in the private Vault unless a public derivative is explicitly promoted.

### Dynamic Role Architecture

Future research on deriving role and competency changes from observable changes in work.

- [Dynamic Role Architecture](./01_DYNAMIC_ROLE_ARCHITECTURE.md)
- [Role Delta Model](./02_ROLE_DELTA_MODEL.md)

The current project does **not** claim Dynamic Role Architecture as an implemented or commercially validated capability.

### Article research — evidence to competency verification

The article research track is intentionally public because its literature foundations, counterexamples, methodological limits, and unresolved research questions are relevant to understanding and challenging LASTRO's public thesis.

- [Article Research Track](./article/README.md)
- [09 — Work Evidence → Competency Inference](./article/09_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md)
- [10 — Verification, Consensus, Provenance & Attestation](./article/10_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md)
- [Related Work Matrix](./article/RELATED_WORK_MATRIX.md)
- [Literature Closure Protocol](./article/LITERATURE_CLOSURE_PROTOCOL.md)

**Status:** scoped review / research hypothesis. These documents are not a systematic review, legal novelty analysis, or proof of academic novelty.

## Research → evidence → decision

The intended flow is:

`RESEARCH → EVIDENCE → INTERPRETATION → DECISION → PROMOTION`

A research artifact may influence the project only when the relevant conclusion is explicitly promoted into the appropriate canonical layer.

For current decision status, consult the project's decision/governance records where available.

## What research currently supports

The current research library supports several bounded conclusions:

1. **The broader workforce/capability problem is materially relevant.**
2. **The ecosystem is populated by adjacent solutions.**
3. **Observable work/performance evidence and multiple observations provide established foundations for bounded competency inference.**
4. **Provenance and verifiable-credential standards provide traceability, integrity and machine verification, while distinguishing verification from truth.**
5. **LASTRO's evidence → independent verification → consensus → competency state → attestation composition remains a research hypothesis.**
6. **The MVP should remain narrow and verifiable.**
7. **Dynamic Role Architecture and broader future-platform concepts remain research.**

These are bounded conclusions, not universal claims.

## What research does not currently prove

The research library does **not** establish:

- product-market fit;
- willingness to pay;
- a definitive primary buyer;
- pricing or commercial model;
- universal competency taxonomy;
- superiority over all competing systems;
- universal automated competency assessment;
- autonomous hiring, promotion, compensation, or termination;
- that blockchain makes a competency claim true;
- academic or patent novelty of the complete LASTRO architecture.

## Promotion rule

Before promoting a research conclusion into product or architecture, record:

1. the observation/evidence;
2. the interpretation;
3. the uncertainty that remains;
4. the resulting decision;
5. the target canonical document or implementation boundary.

This keeps the repository auditable and prevents research language from silently becoming product claims.

## Related governance

- [Source of Truth](../docs/governance/SOURCE_OF_TRUTH.md)
- [Repository Information Boundary](../docs/REPOSITORY_INFORMATION_BOUNDARY.md)
- [Publication Classification Matrix](../docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md)
