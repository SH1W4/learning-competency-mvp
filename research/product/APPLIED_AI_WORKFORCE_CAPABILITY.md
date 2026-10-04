# Applied AI — Workforce Capability

> **Status:** Product research / future hypothesis. Outside the current MVP.

## Question

How might AI help organizations translate changing work into structured competency requirements, development paths, and observable evidence without becoming the authority that decides a person's capability?

## Investigated chain

`WORK / ROLE → RESPONSIBILITIES → TASKS → CANDIDATE COMPETENCIES → OBSERVABLE CRITERIA → DEVELOPMENT → ACTIVITIES → EVIDENCE → VERIFICATION → STATE`

This extends the current LASTRO core rather than replacing it.

## Potential AI roles

### 1. Structure work

Analyze role descriptions, workflows, operational records, and examples of work to propose structured representations of responsibilities and tasks.

### 2. Propose competency hypotheses

Suggest candidate competencies associated with observed responsibilities and tasks.

Outputs remain hypotheses with provenance and uncertainty.

### 3. Define observable criteria

Help translate abstract competencies into observable work behaviors.

For example, “applied data analysis” may be decomposed into:

- formulate a useful question;
- prepare relevant data;
- execute reproducible analysis;
- interpret results;
- communicate evidence-supported conclusions.

### 4. Identify candidate gaps

Compare required competency criteria with available evidence and propose areas for development.

A proposed gap is not a definitive judgment about a person.

### 5. Design evidence-producing activities

Investigate activities that allow a person to practice a competency and produce evidence that can enter the existing verification pipeline.

### 6. Detect work-model change

Use evidence about changing tasks and workflows to propose when a role or competency model may need revision.

## Trust boundary

The current MVP establishes a stronger separation than the earlier research wording suggested:

```
AI INTERPRETATION
       ↓
INDEPENDENT VERIFICATION
       ↓
CONSENSUS CORE
       ↓
COMPETENCY STATE
       ↓
ATTESTATION
```

AI may interpret, extract, relate, summarize, and propose.

AI does **not** independently establish the final competency state.

Independent verification and Consensus Core remain the decision mechanism for the current MVP, with human adjudication reserved for explicit conflict or exceptional ambiguity.

## Relationship to current MVP

The MVP primarily demonstrates:

> **How can evidence become a bounded, independently verifiable competency state?**

This research investigates the preceding question:

> **How can organizations define and evolve the competencies worth demonstrating as work changes?**

The two layers are complementary but must not be conflated.

## Research boundary

This document does not establish:

- autonomous hiring, firing, promotion, or compensation;
- universal competency taxonomies;
- universal people scoring;
- validated commercial demand;
- that AI can correctly define competencies without human governance;
- that changing work automatically implies a new role.

Those remain research questions.
