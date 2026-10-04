# Research

This directory contains exploratory research, external evidence, architectural benchmarks, and future product hypotheses that inform LASTRO without silently changing the current MVP contract.

Research is **not the source of truth for current runtime behavior**. The current implementation, canonical product/architecture documentation, and governance records take precedence where they conflict.

## Research boundary

Research material must preserve the distinction between:

- **Observed** — supported by a source, experiment, implementation artifact, or documented observation.
- **Interpreted** — a conclusion drawn from one or more observations.
- **Adopted** — a project decision that has been explicitly promoted into product, architecture, governance, or execution.
- **Hypothesis** — a proposition that still requires validation.
- **Open** — a question for which the current evidence is insufficient.
- **Deferred** — a direction intentionally kept outside the current MVP.

> **Hypothesis must not become fact through repetition.**

For the research-to-decision chain, see [Research Decisions](./06_DECISIONS.md).

## Active research tracks

### Product thesis & future platform

Research on the broader product opportunity beyond the current MVP.

- [Product Thesis](./product/PRODUCT_THESIS.md)
- [Applied AI Workforce Capability](./product/APPLIED_AI_WORKFORCE_CAPABILITY.md)
- [Future Platform Vision](./product/FUTURE_PLATFORM_VISION.md)
- [Research Agenda](./product/RESEARCH_AGENDA.md)

### Market & ecosystem evidence

External evidence and competitive/ecosystem research.

- [Market Validation Evidence](./04_MARKET_VALIDATION_EVIDENCE.md)
- [Colosseum Ecosystem Benchmark](./05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md)
- [Winning Pattern Audit](./08_WINNING_PATTERN_AUDIT.md)

These documents support problem context, ecosystem interpretation, and strategic hypotheses. They do **not** by themselves establish product-market fit, willingness to pay, commercial demand, or market uniqueness.

### Architecture & verification infrastructure

Research into methodological robustness, verification substrates, and future governance mechanisms.

- [Data & Statistical Robustness](./03_DATA_STATISTICAL_ROBUSTNESS.md)
- [Verification Infrastructure Benchmark](./07_VERIFICATION_INFRASTRUCTURE_BENCHMARK.md)
- [Ethical Compliance Layer](./ETHICAL_COMPLIANCE_LAYER.md)

These documents are research foundations or future extensions. They are not current MVP capabilities unless explicitly promoted elsewhere in the canonical documentation.

### Dynamic Role Architecture

Future research on deriving role and competency changes from observable changes in work.

- [Dynamic Role Architecture](./01_DYNAMIC_ROLE_ARCHITECTURE.md)
- [Role Delta Model](./02_ROLE_DELTA_MODEL.md)

The current project does **not** claim Dynamic Role Architecture as an implemented or commercially validated capability.

## Research → evidence → decision

The intended flow is:

```
RESEARCH
   ↓
EVIDENCE
   ↓
INTERPRETATION
   ↓
DECISION
   ↓
PROMOTION
```

A research artifact may influence the project only when the relevant conclusion is explicitly promoted into the appropriate canonical layer.

For current decision status, see [Research Decisions](./06_DECISIONS.md).

## What research currently supports

The current research library supports several bounded conclusions:

1. **The broader workforce/capability problem is materially relevant.** External sources support the existence of skills gaps, changing work, and AI-driven capability pressure.
2. **The ecosystem is populated by adjacent solutions.** Credentialing, verified talent, matching, performance verification, and attestation already exist in adjacent forms.
3. **The evidence-backed competency workflow is a defensible differentiation hypothesis.** Public ecosystem research did not identify the complete LASTRO workflow as the central product model of a reviewed project, but this does not prove market uniqueness.
4. **The MVP should remain narrow.** Research does not justify expanding the current MVP into a general LMS, universal credentialing platform, recruiting system, or workforce-management suite.
5. **Dynamic Role Architecture remains future research.** The evidence is insufficient to promote it into the current commercial wedge.
6. **External verification infrastructure may become an adapter/substrate.** It should not replace the LASTRO semantic Consensus Core.

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
- privacy-preserving transfer of arbitrary human knowledge;
- that blockchain makes a competency claim true;
- that Dynamic Role Architecture is the highest-value commercial wedge.

These remain hypotheses, unknowns, or future research directions.

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
- [Research Decisions](./06_DECISIONS.md)
- [Project Journal](../docs/project-journal/README.md)
