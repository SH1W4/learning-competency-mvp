# Research Map

**Status:** Active research index  
**Date:** 2026-10-04

This map makes the epistemic status of the research library explicit: what is observed, what is interpreted, what has been adopted, and what remains hypothetical.

## Research register

| Artifact | Primary question | Current conclusion | Status | Promotion target |
|---|---|---|---|---|
| `01_DYNAMIC_ROLE_ARCHITECTURE.md` | Can changing work be translated into emerging role requirements and requalification paths? | Plausible future extension; not commercially validated | **HYPOTHESIS / DEFERRED** | Future product / architecture |
| `02_ROLE_DELTA_MODEL.md` | How should changes in tasks and competencies be represented? | Candidate representation requiring empirical testing | **HYPOTHESIS** | Future architecture |
| `03_DATA_STATISTICAL_ROBUSTNESS.md` | What controls are required before organizational observations support inference? | Provenance, quality, uncertainty and source independence should constrain inference | **RESEARCH FOUNDATION** | Future architecture |
| `04_MARKET_VALIDATION_EVIDENCE.md` | Is the broader capability problem materially relevant? | Broad problem is supported; commercial demand remains unproven | **SUPPORTED / LIMITED** | Product / GTM |
| `05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` | What adjacent solutions already exist? | Adjacent solutions exist; complete workflow differentiation remains a hypothesis | **OBSERVED / INFERRED** | Positioning |
| `06_DECISIONS.md` | Which project decisions were derived from research? | Records adopted boundaries and unresolved questions | **ADOPTED REGISTER** | Governance |
| `07_VERIFICATION_INFRASTRUCTURE_BENCHMARK.md` | Could external infrastructure strengthen future verification? | Potential adapter/substrate; not required for current MVP | **RESEARCH / DEFERRED** | Future architecture |
| `08_WINNING_PATTERN_AUDIT.md` | What patterns characterize strong hackathon projects? | Technical proof + clear problem/user/value linkage are strategically important | **OBSERVED / INFERRED** | Submission strategy |
| `RELATED_WORK_AND_EVIDENCE.md` | What prior standards, research and adjacent systems support or bound LASTRO's argument? | Foundational work and adjacent systems support parts of the thesis; the full composition remains a bounded differentiation hypothesis | **FOUNDATION / SUPPORT / ADJACENT** | Argument / positioning |
| `09_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | What does academic literature establish about work/performance evidence → competency inference/state? | Strong academic foundation for the inference and longitudinal state; full independent-verification → consensus → attestation composition remains a research hypothesis | **FOUNDATION / SUPPORT / GAP** | Argument / architecture |
| `10_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | How should validity, verification, provenance, consensus and attestation be separated? | They are distinct functions; cryptographic verifiability does not imply truth, and provenance supports trust/auditability without establishing competency validity | **FOUNDATION / GAP** | Argument / architecture |
| `ETHICAL_COMPLIANCE_LAYER.md` | Can competency rules receive explicit governance constraints? | Interesting future mechanism; cannot claim universal fairness | **HYPOTHESIS / DEFERRED** | Future governance |
| `product/PRODUCT_THESIS.md` | What broader product thesis follows from the evidence and MVP? | Evidence-backed capability verification is the current strategic thesis | **THESIS** | Product narrative |
| `product/APPLIED_AI_WORKFORCE_CAPABILITY.md` | What organizational capability problem does applied AI create? | Broader context for the capability-verification wedge | **THESIS / CONTEXT** | Product / GTM |
| `product/FUTURE_PLATFORM_VISION.md` | What could the platform become beyond the MVP? | Future vision, not current capability | **HYPOTHESIS** | Future product |
| `product/RESEARCH_AGENDA.md` | What should be investigated next? | Defines future investigation priorities | **OPEN** | Research |

## Evidence status model

- **OBSERVED** — directly supported by a source, experiment, implementation artifact, or documented observation.
- **INFERRED** — conclusion derived from observations.
- **SUPPORTED** — bounded conclusion materially supported by available evidence, with limitations.
- **ADOPTED** — explicitly promoted into current product, architecture, governance, or execution.
- **THESIS** — strategic synthesis organizing evidence and decisions into a product hypothesis.
- **HYPOTHESIS** — proposition requiring further validation.
- **OPEN** — material question with insufficient current evidence.
- **DEFERRED** — intentionally excluded from the current MVP or commercial wedge.
- **FOUNDATION** — established external standard, framework, or body of work used as conceptual/technical context.
- **SUPPORT** — external evidence that strengthens a bounded project argument without validating the product itself.
- **ADJACENT** — existing system or architecture that occupies a neighboring problem space.

## Promotion rule

Research follows:

```
OBSERVATION
    ↓
EVIDENCE
    ↓
INTERPRETATION
    ↓
DECISION
    ↓
CANONICAL PROMOTION
```

Promotion is not automatic. A research artifact may remain useful without becoming product behavior.

## Current boundary

The research library currently supports these bounded conclusions:

1. The workforce/capability problem is materially relevant.
2. Explicit competency frameworks, provenance models, machine-verifiable claims, AI evaluation frameworks and distributed verification systems provide established external foundations or adjacent prior art.
3. Academic research strongly supports using observable performance/work evidence and multiple longitudinal observations to infer bounded competency states; the full LASTRO verification composition remains unestablished by this focused review.
4. Provenance and verifiable-credential standards establish useful mechanisms for traceability, integrity and machine verification, while explicitly distinguishing verification from truth of claims.
5. Adjacent credential, talent, matching, performance-verification and attestation solutions exist.
6. LASTRO's evidence → independent verification → consensus → competency state → attestation composition is a defensible differentiation hypothesis.
7. The MVP should remain narrow and verifiable.
8. Dynamic Role Architecture and related future-platform concepts remain research.
9. External verification infrastructure may become an adapter or substrate, not LASTRO's semantic authority.

These do **not** establish product-market fit, willingness to pay, market uniqueness, legal/patent novelty, or universal competency assessment.

## Do not promote by repetition

Unless new evidence changes the decision register, keep these explicitly bounded:

- universal competency claims;
- definitive primary buyer;
- pricing;
- willingness to pay;
- autonomous employment decisions;
- universal competency taxonomy;
- Dynamic Role Architecture as the initial commercial wedge;
- privacy-preserving transfer of arbitrary human knowledge;
- blockchain as a source of competency truth;
- external verification infrastructure as a replacement for the Consensus Core;
- legal/patent novelty claims.

## Relationship to governance

- `research/06_DECISIONS.md` — research-to-decision genealogy.
- `docs/governance/SOURCE_OF_TRUTH.md` — authoritative repository layers.
- `docs/project-journal/` — historical project evolution.

Research answers **what we investigated and what remains uncertain**. Governance answers **what the project currently decides**. Implementation answers **what the system actually does**.
