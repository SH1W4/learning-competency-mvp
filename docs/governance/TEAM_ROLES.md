# LASTRO — Contribution and Decision Model

> **Purpose:** describe how project work and decisions are governed without exposing person-by-person operational assignments.

## Contribution areas

The MVP brings together four complementary areas:

- **Architecture and systems:** coherence of the evidence, verification, consensus, state, and attestation model.
- **Implementation and quality:** code, tests, API contracts, integrations, and failure behavior.
- **Research and validation:** bounded research, evidence organization, validation methods, and documentation of findings.
- **Product design and UX:** interface, information hierarchy, accessibility, and visual consistency with the implemented system.

These are contribution areas, not a statement that every area is complete or that any individual has unilateral authority over the whole product.

## Decision classes

| Class | Examples | Required handling |
| --- | --- | --- |
| Product | target user, use case, MVP scope | record the decision before implementation |
| Architecture | data model, pipeline, attestation design | technical review and documented rationale |
| Implementation | code, tests, refactors | scoped issue and reviewable pull request where practical |
| Validation | interviews, experiments, evaluation | record evidence, method, and outcome |
| Documentation | guides, wording, diagrams | align with current implementation and evidence |
| Future hypothesis | ideas outside the bounded MVP | label as hypothesis, not as a requirement or demonstrated capability |

## Decision rule

A proposal becomes a project requirement only after the appropriate decision is recorded. Assumptions must not silently become product requirements, market facts, traction, architectural constraints, or public claims.

## Working principles

- Prefer small, reviewable changes and traceable decisions.
- Distinguish implemented behavior from plans and hypotheses.
- Keep source evidence, AI interpretation, deterministic verification, consensus, competency state, and attestation conceptually distinct.
- Treat human adjudication as an exception path, not the default pipeline.
- Do not claim customer adoption, product-market fit, ROI, production readiness, or protocol conformance without corresponding evidence and authorization.

The goal is traceability and product coherence, not hierarchy.
