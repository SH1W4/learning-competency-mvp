# M2 — Evidence, AI & Consensus

Owner: JP Carvalho / Joaopedro0s
Status: DONE
Priority: P0

## Objective

Implement the smallest reliable pipeline that transforms submitted evidence into a reviewable competency-state proposal while keeping AI interpretation separate from independent verification and consensus.

## Tasks

### M2.1 — Implement evidence ingestion
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M1.4
Deliverable: ingestion interface for the selected evidence types.
Done when: evidence enters the system with source/provenance metadata.

### M2.2 — Implement normalization/extraction
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M2.1
Deliverable: structured representation of evidence.
Done when: extracted fields can be traced back to source material.

### M2.3 — Define AI output contract
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M1.2 + M1.5
Deliverable: structured AI response schema.
Done when: output separates extraction, interpretation, competency signals, gaps and confidence/uncertainty.

### M2.4 — Implement competency relation
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M2.2 + M2.3
Deliverable: evidence-to-competency mapping.
Done when: every proposed signal identifies which competency criterion it supports or fails to support.

### M2.5 — Integrate independent verification and consensus
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M2.4
Deliverable: reviewable consensus inputs and decision path.
Done when: AI interpretation is evaluated independently against deterministic/integrity checks and the resulting consensus outcome is explicit.

### M2.6 — Preserve provenance
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M2.2–M2.5
Deliverable: traceable evidence → extraction → interpretation → independent verification → consensus chain.
Done when: system can show what came from evidence, what came from AI, what was independently verified and what decision resulted.

### M2.7 — Test critical pipeline
Owner: JP Carvalho / Joaopedro0s
Status: DONE
Dependency: M2.1–M2.6
Deliverable: automated tests for the critical flow and failure cases.
Done when: tests cover valid evidence, missing evidence, AI uncertainty, verification disagreement and conflict handling.

## Human Adjudication

Human Adjudication is not a normal M2 review stage.

It is an exceptional path after a CONFLICT outcome or other explicitly defined ambiguity requiring human resolution. It must not be represented as an additional independent verifier or as the routine authority replacing the Consensus Core.

## Exit criteria

evidence → extraction → AI interpretation → independent verification → consensus works with the canonical demo scenario, with Human Adjudication available only for the exceptional conflict path.