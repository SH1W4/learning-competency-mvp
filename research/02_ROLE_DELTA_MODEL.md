# Role Delta Model

**Status:** Research hypothesis  
**Track:** Dynamic Role Architecture  
**Version:** v0.1  
**Date:** 2026-10-03

## 1. Purpose

The Role Delta Model defines how the system can represent the transition from an existing organizational role to a candidate future role when workflows, automation or AI change the composition of work.

The model is intended to answer:

> Given an existing role and observable changes in the work performed, which responsibilities and competencies are removed, retained, transformed or introduced, and what candidate role definition follows?

This is a research model. It is not an automated employment decision mechanism.

---

## 2. Core abstraction

A role is represented as a structured set of work responsibilities and competency requirements.

```
ROLE = {
  responsibilities,
  tasks,
  competencies,
  tools,
  constraints,
  outcomes,
  evidence_requirements
}
```

A role transition is represented as:

```
ROLE(t0) + WORK_CHANGE(t1) -> ROLE_DELTA -> ROLE_CANDIDATE(t1)
```

The system must preserve the distinction between:

- observed facts;
- inferred changes;
- proposed role requirements;
- human-approved decisions.

---

## 3. Role Delta

For two role states, the delta is:

```
ΔROLE = {
  Δtasks,
  Δresponsibilities,
  Δcompetencies,
  Δtools,
  Δconstraints,
  Δoutcomes,
  Δevidence
}
```

Each element is classified into one of four transitions:

| Transition | Meaning |
|---|---|
| REMOVED | Existing element is no longer required or observed |
| RETAINED | Element remains substantially unchanged |
| TRANSFORMED | Existing element remains but its nature, complexity or execution changes |
| ADDED | New element appears in the future role |

A fifth state, **UNCERTAIN**, should be available when evidence is insufficient.

---

## 4. Task Delta

Tasks are the lowest-level work units considered by the first version of the model.

Each task should have:

```
Task = {
  id,
  description,
  frequency,
  effort,
  criticality,
  automation_level,
  evidence
}
```

A task transition can therefore be represented as:

```
Task(t0) -> {REMOVED | RETAINED | TRANSFORMED | ADDED | UNCERTAIN}
```

### Example

Before AI assistance:

```
Operator
├── manually classify requests
├── enter data
├── validate records
└── resolve exceptions
```

After AI assistance:

```
Operator
├── review AI classifications
├── validate records
├── resolve exceptions
├── handle ambiguous cases
└── monitor AI output quality
```

The important observation is that automation does not imply that the role disappears.

It can change the composition of work.

---

## 5. Competency Delta

Task changes are mapped to competency requirements.

```
ΔTASK
  ↓
COMPETENCY IMPACT
  ↓
ΔCOMPETENCY
```

Each competency transition is classified as:

| Transition | Meaning |
|---|---|
| DEPRECATED | Competency is no longer materially required |
| MAINTAINED | Existing competency remains required |
| DEEPENED | Existing competency requires greater proficiency |
| TRANSFORMED | Competency remains but its application changes |
| NEW | New competency becomes necessary |
| UNCERTAIN | Evidence does not support a confident classification |

Example:

```
Manual data entry
      ↓
DEPRECATED

Exception handling
      ↓
MAINTAINED + DEEPENED

AI output validation
      ↓
NEW

Operational monitoring
      ↓
NEW
```

---

## 6. Role Candidate Derivation

A candidate role is not created directly from an AI-generated label.

The proposed derivation is:

```
Observed Work
     +
Validated Task Delta
     +
Competency Delta
     +
Organizational Constraints
     ↓
Candidate Role Definition
```

The candidate role should contain:

```
CandidateRole = {
  title,
  purpose,
  responsibilities,
  tasks,
  required_competencies,
  proficiency_levels,
  tools,
  constraints,
  expected_outcomes,
  evidence_requirements,
  uncertainty,
  provenance
}
```

The **title is an output**, not the starting point.

This prevents the system from generating attractive job titles without a defensible underlying work model.

---

## 7. Provenance requirement

Every derived role element should retain provenance.

```
Role Requirement
      ↓
Competency
      ↓
Task
      ↓
Observed Evidence
      ↓
Source
```

A minimal provenance record:

```yaml
provenance:
  source_type: operational_record
  source_id: internal-reference
  observation_period: 2026-Q4
  transformation: task_to_competency
  confidence: bounded
  reviewer_status: pending
```

The exact source identifier can remain private to the organization.

---

## 8. Human review boundary

AI may propose:

- task classifications;
- competency mappings;
- role deltas;
- candidate role structures;
- uncertainty indicators.

AI should not autonomously determine:

- employment status;
- termination;
- promotion;
- compensation;
- legal eligibility;
- human worth;
- final organizational role assignment.

The role engineering pipeline therefore terminates in:

```
AI PROPOSAL
    ↓
EVIDENCE REVIEW
    ↓
HUMAN DECISION
    ↓
APPROVED ROLE STATE
```

This follows the existing Learning Competency MVP principle that AI assists interpretation while human review controls the competency decision.

---

## 9. Role Delta Matrix

A practical first implementation can use the following matrix:

| Dimension | Current State | Future State | Delta | Evidence | Confidence | Review |
|---|---|---|---|---|---|---|
| Task | manual classification | AI-assisted review | TRANSFORMED | workflow records | bounded | human |
| Task | data entry | automated | REMOVED | execution logs | bounded | human |
| Task | exception handling | complex exception handling | DEEPENED | case history | bounded | human |
| Competency | data entry | — | DEPRECATED | task delta | derived | human |
| Competency | exception handling | advanced exception handling | DEEPENED | task delta | derived | human |
| Competency | AI validation | required | NEW | workflow change | derived | human |
| Responsibility | execute procedure | supervise + validate | TRANSFORMED | role evidence | bounded | human |

---

## 10. Example: Operator -> AI Operations Specialist

### Current role

```
OPERATOR

Tasks:
- classify requests
- enter records
- execute standard procedures
- resolve exceptions

Competencies:
- procedural execution
- data entry
- basic exception handling
```

### Work transformation

```
AI introduced
+
standard classification automated
+
human review retained
+
exception complexity increased
+
AI quality monitoring required
```

### Role Delta

```
REMOVED
- repetitive classification
- repetitive data entry

RETAINED
- operational context
- exception handling

TRANSFORMED
- procedural execution
  -> AI-assisted workflow supervision

DEEPENED
- exception handling
  -> complex exception analysis

ADDED
- AI output validation
- AI workflow monitoring
- escalation judgment
```

### Candidate role

```
AI OPERATIONS SPECIALIST

Purpose:
Supervise AI-assisted operational workflows,
validate outputs and resolve cases requiring
human judgment.

Core competencies:
- operational domain knowledge
- exception analysis
- AI output validation
- workflow monitoring
- escalation judgment
```

The candidate role is therefore derived from the work transformation rather than invented independently.

---

## 11. Requalification linkage

Once a candidate role exists:

```
CURRENT COMPETENCY STATE
          ↓
TARGET ROLE COMPETENCIES
          ↓
COMPETENCY GAP
          ↓
REQUALIFICATION PATH
          ↓
NEW EVIDENCE
          ↓
PROOF OF COMPETENCY
```

For each person, the system can represent:

```
Gap(person, role) =
RequiredCompetencies(role)
-
VerifiedCompetencies(person)
```

The result should not be treated as a simplistic numerical score.

Competency is contextual and may require different evidence thresholds depending on the role.

---

## 12. From role engineering to AI skills

A future research extension is to identify competencies that can be partially operationalized by software or AI.

The transformation is:

```
Human Competency
      ↓
Observable behaviors
      ↓
Decision criteria
      ↓
Procedures
      ↓
Tool interactions
      ↓
Constraints / guardrails
      ↓
AI Skill Specification
```

This does **not** imply copying an individual worker's private knowledge into a model.

The research question is whether validated competency structures can become reusable capability specifications while preserving organizational and personal boundaries.

---

## 13. Privacy-preserving competency exchange

A later research direction is:

```
Organization A
   │
   │ proprietary evidence
   ↓
Competency derivation
   │
   ↓
Verified competency representation
   │
   ↓
Privacy-preserving proof
   │
   └───────────────┐
                   ↓
              Organization B
                   │
                   ↓
       Verify required capability
```

The target is not unrestricted transfer of organizational memory.

The target is potentially:

> prove that a competency condition was satisfied without disclosing the underlying proprietary evidence.

Zero-knowledge proofs may be investigated for specific predicates, but no claim is made here that arbitrary human knowledge can be encoded or transferred as a ZK proof.

---

## 14. Auditability properties

A valid Role Delta implementation should make it possible to answer:

1. What changed?
2. Which evidence supports the change?
3. Which competencies were affected?
4. Why was a competency classified as new, retained, transformed or deprecated?
5. Which role requirements were derived?
6. Which parts were AI-generated?
7. Which parts were human-reviewed?
8. What remains uncertain?
9. Which requalification path follows from the gap?
10. Which proof supports the resulting competency state?

If these questions cannot be answered, the role proposal should remain provisional.

---

## 15. Research acceptance criteria

The model becomes technically meaningful if a prototype can demonstrate:

- deterministic representation of a role before and after change;
- explicit task-level deltas;
- traceable task-to-competency mappings;
- provenance for derived requirements;
- human review of AI-generated proposals;
- reproducible candidate role generation;
- explicit uncertainty;
- connection to competency gaps;
- connection to requalification;
- connection to Proof-of-Competency.

The first experiment should use synthetic or explicitly authorized organizational data.

---

## 16. Next experiments

### Experiment A — Role Delta extraction

Input:
- two versions of a workflow.

Output:
- task delta matrix.

### Experiment B — Task → Competency mapping

Input:
- validated task delta.

Output:
- competency delta.

### Experiment C — Candidate role derivation

Input:
- task delta + competency delta.

Output:
- candidate role definition with provenance.

### Experiment D — Human review

Input:
- candidate role.

Output:
- approved / modified / rejected role state.

### Experiment E — Requalification

Input:
- approved role + current competency state.

Output:
- competency gap and learning path.

### Experiment F — Proof

Input:
- completed requalification evidence.

Output:
- updated verifiable competency state.

---

## 17. Current conclusion

The Role Delta Model establishes a research bridge between the existing Learning Competency MVP and a possible future Dynamic Role Architecture.

The proposed chain is:

```
Evidence
  ↓
Competency State
  ↓
Work Change
  ↓
Role Delta
  ↓
Competency Delta
  ↓
Candidate Role
  ↓
Human Review
  ↓
Requalification
  ↓
Proof of Competency
  ↓
Human + AI Work Design
```

The key architectural principle is:

> **Do not predict the future job title first. Derive the candidate role from observable changes in work and the competencies required to perform that changed work.**

This principle is the main hypothesis to validate in the next research stage.
