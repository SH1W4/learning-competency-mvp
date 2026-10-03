# Dynamic Role Architecture

**Status:** Research hypothesis  
**Track:** Learning Competency  
**Date:** 2026-10-03

## 1. Hypothesis

Organizations do not only need to measure existing competencies. As workflows, automation and AI change, they need a system capable of deriving **emerging role requirements** from observed work, evidence and competency gaps.

The proposed capability is **Dynamic Role Architecture (Role Engineering)**:

> derive candidate future roles from changes in tasks, workflows and competency requirements, then connect those roles to human requalification and verifiable competency states.

This is a research direction, not yet an MVP claim.

## 2. Problem

Organizational evidence is fragmented across HR systems, operational systems, spreadsheets, XML exports, training records, attendance records, evaluations and local workflows.

The same worker can therefore have different representations across organizational domains.

The research question is whether a common evidence and competency layer can produce a more coherent representation of:

- observed work;
- demonstrated competencies;
- competency gaps;
- changing task composition;
- emerging responsibilities;
- candidate role definitions.

## 3. Proposed chain

```
Organizational Data
      ↓
Evidence Normalization
      ↓
Evidence / Competency Graph
      ↓
Current Competency State
      ↓
Task & Workflow Change
      ↓
Competency Gap Analysis
      ↓
Emerging Role Definition
      ↓
Requalification Path
      ↓
Proof of Competency
      ↓
Human + AI Work Design
```

## 4. Relationship to the current MVP

The current MVP already establishes a bounded vertical slice:

```
Evidence
  ↓
AI interpretation
  ↓
Human review
  ↓
Competency state
  ↓
Attestation
  ↓
Verification
```

Dynamic Role Architecture should build **above** this foundation rather than modify the trust boundary of the MVP.

The important extension is:

```
Verified Competency State
        +
Observed Work / Task Changes
        ↓
Role Engineering
```

## 5. Core objects to investigate

### Competency

A structured capability with criteria, evidence requirements, context and state.

### Evidence

An observable artifact or event supporting interpretation of a competency.

### Role

A bundle of responsibilities, tasks, competencies, constraints and expected outcomes.

### Role Delta

The difference between an existing role and a candidate future role.

### Competency Gap

A missing or insufficient competency required by a target role.

### Requalification Path

A sequence of learning, practice and assessment activities intended to close a competency gap.

### Proof of Competency

A verifiable record connecting competency state to evidence and review.

## 6. Research questions

1. Can role requirements be derived reliably from changes in task composition?
2. Which evidence is sufficient to infer a competency requirement without overclaiming?
3. How should human review constrain AI-generated role proposals?
4. Can role proposals be deterministic enough to audit?
5. How should uncertainty be represented?
6. How can existing workers be matched to emerging roles without turning the system into an opaque ranking engine?
7. Which parts of a validated competency can be operationalized as an AI skill?
8. Can competency patterns be shared across organizations without exposing proprietary source data?
9. What cryptographic or privacy-preserving mechanisms are appropriate for that exchange?
10. What belongs in the MVP, and what must remain future research?

## 7. Non-goals

This research does not currently claim:

- autonomous hiring or firing;
- automated determination of human worth or employability;
- replacement of human assessment;
- universal occupational taxonomy;
- transfer of proprietary organizational data between companies;
- zero-knowledge proof of arbitrary human knowledge.

## 8. Initial architecture

```
                    ┌─────────────────────┐
                    │ Organizational Data │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Evidence Layer      │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Competency Graph    │
                    └──────────┬──────────┘
                               ↓
                  ┌────────────┴────────────┐
                  ↓                         ↓
          Current Roles              Work Changes
                  │                         │
                  └────────────┬────────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Role Engineering    │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Competency Gaps     │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Requalification     │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Proof of Competency │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Human + AI Design   │
                    └─────────────────────┘
```

## 9. Innovation hypothesis

The differentiating hypothesis is not merely "AI for HR".

It is:

> **A verifiable competency layer can become an organizational substrate for discovering emerging roles, guiding human requalification and, later, defining bounded AI capabilities without exposing the proprietary evidence from which those capabilities were learned.**

This must be validated empirically before becoming a product claim.

## 10. Next research artifacts

1. Role Delta formal model.
2. Competency Graph schema.
3. Evidence-to-Role derivation matrix.
4. Human-review and uncertainty model.
5. Proof-of-Competency extension model.
6. Privacy-preserving competency exchange hypothesis.
7. MVP boundary analysis.
