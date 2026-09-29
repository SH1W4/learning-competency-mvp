# Team Roles & Decision Governance

> **Status:** working team operating model. Roles can evolve with demonstrated contribution and validated project needs.

## Purpose

Make ownership explicit without creating unnecessary hierarchy or blocking contribution.

## Current role model

### João / JX — Architecture, AI & Systems

Primary responsibility:

- system architecture;
- AI/evidence pipeline;
- data and integration design;
- technical coherence;
- attestation/verification architecture;
- technical decisions affecting the MVP contract;
- implementation or review of critical technical paths.

### Erick — Research, Operations & Validation

Primary responsibility:

- research organization;
- documentation;
- spreadsheets and operational material;
- market/demand research;
- interview coordination;
- validation evidence;
- commercial/operational support.

### JP Carvalho — Technical Implementation

GitHub: `Joaopedro0s`

Primary responsibility:

- implementation tasks assigned through the technical backlog;
- evidence ingestion and normalization;
- AI output contract and competency relation;
- human review flow;
- provenance and critical pipeline tests;
- feature development;
- technical investigation;
- pull requests and implementation documentation.

**M3 support:** JP Carvalho may support the M3 technical execution when requested, including integration, implementation, debugging and tests. M3 ownership and final technical responsibility remain with **JX / SH1W4**.

### JP Fernandes — UX/UI, Interface & Product Presentation

Primary responsibility:

- UX/UI of the vertical slice;
- mapping screens and navigation flow;
- interface for evidence submission;
- interface for AI interpretation and human review;
- visualization of competency state;
- attestation and verification result presentation;
- frontend implementation where assigned;
- visual/brand consistency of the product experience.

The interface materializes the product and architecture already defined by the team. It does not create parallel product logic or expand the MVP scope.

## Decision classes

| Class | Examples | Required handling |
| --- | --- | --- |
| Product | target user, use case, MVP scope | team decision before implementation |
| Architecture | data model, pipeline, attestation design | technical review + documented decision |
| Implementation | code, tests, refactors | issue/PR workflow |
| Validation | interviews, experiments | record evidence and outcome |
| Documentation | guides, wording, diagrams | maintain consistency with current decisions |
| Future hypothesis | ideas outside MVP | document without treating as requirement |

## Decision rule

A contributor may propose any change.

A proposal becomes a project requirement only after the appropriate decision is recorded.

No individual assumption should silently become:

- a product requirement;
- a market fact;
- traction;
- an architectural constraint;
- a claim in the hackathon pitch.

## GitHub operating rule

Use issues for scoped work and pull requests for implementation when practical.

Prefer small, reviewable commits.

Critical changes should reference the relevant product/architecture decision or issue.

## Responsibility principle

Ownership means responsibility for keeping a domain coherent, not unilateral authority over unrelated domains.

## Conflict resolution

When two proposals conflict:

1. identify the decision class;
2. return to the current source of truth;
3. separate validated facts from hypotheses;
4. document the decision or unresolved question;
5. update affected implementation/docs.

The goal is traceability, not hierarchy.
