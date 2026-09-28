# M2 — Evidence, AI & Human Review

Owner: Joaopedro0s
Status: IN PROGRESS
Priority: P0

## Objective

Implement the smallest reliable pipeline that transforms submitted evidence into a reviewable competency-state proposal.

## Tasks

### M2.1 — Implement evidence ingestion
Owner: Joaopedro0s
Status: IN PROGRESS
Dependency: M1.4
Deliverable: ingestion interface for the selected evidence types.
Done when: evidence enters the system with source/provenance metadata.

### M2.2 — Implement normalization/extraction
Owner: Joaopedro0s
Status: TODO
Dependency: M2.1
Deliverable: structured representation of evidence.
Done when: extracted fields can be traced back to source material.

### M2.3 — Define AI output contract
Owner: Joaopedro0s
Status: TODO
Dependency: M1.2 + M1.5
Deliverable: structured AI response schema.
Done when: output separates extraction, interpretation, competency signals, gaps and confidence/uncertainty.

### M2.4 — Implement competency relation
Owner: Joaopedro0s
Status: TODO
Dependency: M2.2 + M2.3
Deliverable: evidence-to-competency mapping.
Done when: every proposed signal identifies which competency criterion it supports or fails to support.

### M2.5 — Implement human review
Owner: Joaopedro0s
Status: TODO
Dependency: M2.4
Deliverable: review interface/state transition.
Done when: reviewer can accept, correct, reject or request additional evidence.

### M2.6 — Preserve provenance
Owner: Joaopedro0s
Status: TODO
Dependency: M2.2–M2.5
Deliverable: traceable evidence → extraction → interpretation → review chain.
Done when: system can show what came from evidence, what came from AI and what was decided by the reviewer.

### M2.7 — Test critical pipeline
Owner: Joaopedro0s
Status: TODO
Dependency: M2.1–M2.6
Deliverable: automated tests for the critical flow and failure cases.
Done when: tests cover valid evidence, missing evidence, AI uncertainty and reviewer correction/rejection.

## Exit criteria

evidence → extraction → interpretation → competency relation → human review works with the canonical demo scenario.
