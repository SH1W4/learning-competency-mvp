# Research Decisions

**Status:** research decisions / consolidated  
**Track:** Learning Competency  
**Date:** 2026-10-04  
**Scope:** Decisions derived from the research library through Phase #0, market evidence, and Colosseum ecosystem benchmark

---

## 1. Purpose

This document records decisions made because of research evidence.

It is not:

- a product roadmap;
- an implementation plan;
- a pitch;
- a market-validation report;
- a list of unresolved hypotheses.

Its purpose is to preserve the transition:

RESEARCH → EVIDENCE → INTERPRETATION → DECISION

A decision recorded here must remain traceable to the evidence that motivated it.

---

## 2. Decision discipline

The project distinguishes:

### Observed
A fact supported by a source, implementation artifact, experiment or documented observation.

### Interpreted
A conclusion drawn from one or more observations.

### Hypothesis
A proposition that remains to be validated.

### Decision
A project choice made using the available evidence.

### Unknown
A question for which the current evidence is insufficient.

The existence of a decision does not turn an underlying hypothesis into a fact.

---

# 3. Decisions

## D-001 — Preserve the evidence / competency distinction

**Decision:** Evidence and competency state remain separate domain objects.

**Rationale:** The research identified a recurring distinction between a person claiming something, presenting evidence, having that evidence analyzed, and having a source verified.

**Consequence:**

Evidence ≠ Competency State

Evidence supports interpretation and verification; it does not automatically become a competency claim.

**Source basis:**

- Phase #0 research library;
- current MVP architecture;
- docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md.

**Status:** Adopted.

---

## D-002 — Make evidence-backed competency the core research wedge

**Decision:** The MVP and its research framing will center on:

> **Evidence → Verification → Competency State**

rather than on credentials, certificates, profiles or talent matching.

**Rationale:** The ecosystem benchmark found meaningful adjacent projects around credentials, verified talent, profiles, skills and matching. Those primitives are therefore not sufficient differentiation.

**Source basis:**

- research/05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md;
- Phase #0 benchmark research.

**Status:** Adopted.

---

## D-003 — Do not claim an empty competitive landscape

**Decision:** The project will explicitly acknowledge adjacent Colosseum projects.

**Rationale:** The public ecosystem scan identified LearnProof, VeriCred, Solana Matcher, SpineDAO and Strikesense as relevant adjacent references.

**Consequence:** The project will not claim:

> "Nobody is solving competency verification."

Instead, the research record will state that the reviewed public material did not identify the complete combination of:

evidence of work → independent verification → consensus → competency state → attestation

**Status:** Adopted.

---

## D-004 — Treat the complete trust pipeline as a hypothesis of differentiation

**Decision:** The composition of evidence, independent verification, consensus, competency state and attestation is treated as a differentiation hypothesis, not as proven market uniqueness.

**Rationale:** The Colosseum benchmark supports the existence of adjacent solutions but cannot prove the absence of equivalent private, unpublished or poorly indexed systems.

**Status:** Adopted.

---

## D-005 — Keep market validation separate from ecosystem research

**Decision:** Ecosystem overlap and customer pain will remain separate evidence tracks.

**Rationale:** The market-validation research supports the existence and material relevance of broad workforce/skills problems, but does not yet establish a primary buyer, willingness to pay, a quantified recurring workflow, pilot commitment or commercial adoption.

Likewise, the existence of competing or adjacent projects does not prove customer demand.

**Source basis:**

- research/04_MARKET_VALIDATION_EVIDENCE.md;
- research/05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md.

**Status:** Adopted.

---

## D-006 — Keep Dynamic Role Architecture as research

**Decision:** Dynamic Role Architecture remains a research extension and is not treated as a validated commercial wedge.

**Rationale:** External evidence supports changing skills and work, but does not establish that Dynamic Role Architecture is the highest-value initial product or that customers will provide the required organizational data.

**Consequence:**

Current MVP:
Evidence → Verification → Competency State → Proof

Research extension:
Work Change → Role Delta → Competency Gap → Requalification

**Source basis:**

- research/01_DYNAMIC_ROLE_ARCHITECTURE.md;
- research/04_MARKET_VALIDATION_EVIDENCE.md.

**Status:** Adopted.

---

## D-007 — Keep the MVP technically bounded

**Decision:** The MVP remains centered on the verifiable competency vertical slice.

**Current boundary:**

Evidence → Independent Verification → Consensus → Competency State → Attestation → Public Verification

**Rationale:** The research does not yet justify expanding the MVP into a full LMS, universal competency framework, talent marketplace, recruiting platform or multi-organization system.

**Source basis:**

- docs/PROJECT_STATUS.md;
- docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md.

**Status:** Adopted.

---

## D-008 — Do not treat AI as the competency authority

**Decision:** AI interpretation remains an assistance/proposal layer and cannot by itself determine competency state.

**Rationale:** The trust model requires evidence, verification and governance. The current architecture also separates AI interpretation from deterministic verification.

**Consequence:** AI may extract, interpret, relate and propose. AI does not independently establish the final competency state.

**Source basis:**

- current MVP architecture;
- docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md;
- docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md.

**Status:** Adopted.

---

## D-009 — Preserve independent verification

**Decision:** Verification mechanisms must remain meaningfully independent from the AI interpretation layer.

**Rationale:** A system cannot demonstrate convergence if every verification mechanism simply consumes the same AI judgment.

**Consequence:** The deterministic mechanism must evaluate explicit criteria and eligible evidence independently of AI confidence/classification.

**Source basis:**

- current consensus architecture;
- implementation hardening and verification tests.

**Status:** Adopted.

---

## D-010 — Reserve human adjudication for uncertainty and conflict

**Decision:** Human review remains an explicit governance path for insufficient, ambiguous or conflicting evidence.

**Rationale:** The research and architecture do not support the claim that automated systems can eliminate human judgment.

**Supported consensus outcomes include:**

- AGREEMENT;
- INSUFFICIENT_EVIDENCE;
- CONFLICT;
- HUMAN_ADJUDICATION.

**Status:** Adopted.

---

## D-011 — Keep sensitive evidence off-chain

**Decision:** On-chain infrastructure is used as an integrity/provenance anchor, not as the storage layer for sensitive learning or organizational evidence.

**Rationale:** The current architecture separates evidence from its attestation and treats blockchain as an integrity mechanism rather than a truth oracle.

**Consequence:**

Sensitive evidence → Off-chain

Verified state / integrity reference → On-chain attestation

**Status:** Adopted.

---

## D-012 — Treat attestation as an output, not the product

**Decision:** Attestation remains the representation of a verified state rather than the primary product object.

**Rationale:** The benchmark shows that blockchain credentials and on-chain records already exist in adjacent projects. The research differentiation is upstream: how evidence becomes a bounded competency state.

**Consequence:**

Evidence → Verification → Consensus → Competency State → Attestation

**Status:** Adopted.

---

## D-013 — Keep frontend downstream of the domain model

**Decision:** The frontend must expose existing domain and consensus results rather than introduce a second architecture.

**Rationale:** The product research established the frontend as a projection of the underlying evidence/verification model.

**Consequence:** The frontend may visualize evidence, provenance, verification, consensus, competency state, attestation and strategic research flows. It must not invent backend capabilities that do not exist.

**Source basis:**

- docs/product/FRONTEND_PRODUCT_SPEC.md;
- docs/product/USER_JOURNEYS.md;
- docs/architecture/CONSENSUS_CORE.md.

**Status:** Adopted.

---

# 4. Decisions not yet authorized

The following remain open and must not be silently converted into decisions:

- definitive primary buyer;
- pricing;
- commercial model;
- willingness to pay;
- universal competency taxonomy;
- Dynamic Role Architecture as the initial commercial wedge;
- multi-organization deployment;
- recruiting as the primary downstream use case;
- privacy-preserving cross-organization competency exchange;
- long-term token economics;
- universal automated competency assessment.

These require additional evidence.

---

# 5. Decision dependency map

PHASE #0 — Research baseline
↓
04 — Market Validation Evidence
Broad problem materially relevant
↓
05 — Colosseum Ecosystem Benchmark
Adjacent solutions already exist
↓
06 — Research Decisions
Narrow differentiation around evidence-backed competency
↓
MVP
Evidence → Verification → State → Proof

The chain should not be read backwards.

For example:

> The existence of the MVP does not prove that the market needs it.

---

# 6. Decision register

| ID | Decision | Status | Evidence source |
|---|---|---|---|
| D-001 | Evidence and competency state remain separate | Adopted | Phase #0 + architecture |
| D-002 | Evidence-backed competency is the core wedge | Adopted | Ecosystem benchmark |
| D-003 | Do not claim an empty competitive landscape | Adopted | Colosseum benchmark |
| D-004 | Full trust pipeline is a differentiation hypothesis | Adopted | Colosseum benchmark |
| D-005 | Market validation stays separate from ecosystem research | Adopted | Market validation |
| D-006 | Dynamic Role Architecture remains research | Adopted | Market validation + DRA research |
| D-007 | MVP remains technically bounded | Adopted | Project status |
| D-008 | AI is not competency authority | Adopted | Governance/claims |
| D-009 | Verification must remain independent | Adopted | Consensus architecture |
| D-010 | Human adjudication remains explicit | Adopted | Governance/claims |
| D-011 | Sensitive evidence remains off-chain | Adopted | Architecture |
| D-012 | Attestation is an output, not the product | Adopted | Ecosystem benchmark |
| D-013 | Frontend remains downstream of domain model | Adopted | Frontend specification |

---

# 7. Governance rule

A future proposal should not be treated as a project decision merely because it appears repeatedly in a pitch, mockup, conversation, README, implementation or research hypothesis.

A material decision should identify:

1. the decision;
2. the evidence supporting it;
3. the uncertainty that remains;
4. the consequence;
5. the date/status.

This preserves the original Phase #0 principle:

> **Hypothesis must not become fact through repetition.**

---

## Status

**Decision register:** consolidated.

**Research-to-decision boundary:** defined.

**Open commercial questions:** preserved as open.

**Next decision updates:** only when new evidence materially changes the current assumptions.
