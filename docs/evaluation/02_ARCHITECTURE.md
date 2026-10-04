# Architecture & Evidence Pipeline

## End-to-end pipeline

```
INGEST
  ↓
NORMALIZE
  ↓
EXTRACT
  ↓
INTERPRET
  ↓
RELATE
  ↓
VERIFICATION MECHANISMS
  ↓
GOVERNANCE / COMPLIANCE
  ↓
CONSENSUS CORE
  ├─ AGREEMENT → UPDATE STATE
  ├─ INSUFFICIENT EVIDENCE → MORE EVIDENCE
  └─ CONFLICT → HUMAN ADJUDICATION → UPDATE STATE
  ↓
ATTEST
  ↓
VERIFY
```

The architecture keeps source material, extraction, interpretation, verification, governance, state, adjudication, and attestation distinguishable.

## Evidence

Evidence must preserve its origin and represent what was actually produced or submitted.

Extraction is kept separate from inference.

Relevant evidence can be related to both:
- the competency;
- the specific criterion it supports.

This makes the path from source material to state inspectable.

## AI interpretation

AI can:
- organize evidence;
- identify relationships;
- map evidence to criteria;
- detect inconsistencies;
- propose classifications;
- identify evidence gaps;
- request additional evidence.

AI output is an interpretation layer, not the final authority over competency state.

## Independent verification

The MVP separates verification mechanisms so that one mechanism does not silently become the authority for the whole decision.

### Evidence / Integrity Check

Checks that evidence exists, has an identifiable origin, is associated with the expected subject, preserves integrity, and contains required minimum elements.

### Deterministic Rule Check

Applies explicit competency requirements directly to the competency contract, activities, evidence types, and evidence present.

**Important implementation property:** the deterministic verifier does not consume AI-generated signals, confidence, or classification.

### Statistical / Robustness Check

When a decision depends on repeated observations or inference, the architecture can evaluate:
- sample size;
- observation period;
- coverage;
- dependence;
- missingness;
- stability;
- baseline or comparison;
- uncertainty;
- source quality and independence.

If evidence is not sufficiently robust, the correct result is insufficient evidence rather than artificial precision.

### AI Interpretation

AI provides an interpretive verification signal. It can be compared with other mechanisms, but it does not independently authorize a demonstrated state.

## Consensus Core

Consensus Core is the normal decision authority for the bounded MVP.

```
Independent verification
        ↓
   Consensus Core
        ├─ AGREEMENT → DEMONSTRATED
        ├─ INSUFFICIENT_EVIDENCE → IN_DEVELOPMENT
        └─ CONFLICT → HUMAN ADJUDICATION
```

Consensus is not simple vote counting. It evaluates whether independently produced verification results satisfy explicit requirements and whether relevant conflicts or insufficiencies exist.

### Human Adjudication

Human adjudication is **not a normal pipeline stage**.

It is an explicit exception path for material conflict, unresolved ambiguity, contestation, high-impact cases, or cases outside the formalized rules.

Adjudication does not replace the evidence or verification results. It resolves a documented conflict and preserves:
- original evidence references;
- verification results;
- adjudicator identity and role;
- decision;
- rationale;
- timestamp;
- applicable rule/version.

## State model

A competency state represents only what the available evidence, verification results, governance rules, and any exceptional adjudication can support.

The system therefore distinguishes:

```
Evidence
  ↓
Verification
  ↓
Governance
  ↓
Consensus
  ↓
Competency State
```

Human adjudication is attached to the conflict branch rather than inserted between interpretation and consensus.

## Provenance

Important information should remain distinguishable by origin, including:
- source evidence;
- deterministic verification;
- AI interpretation;
- statistical validation when applicable;
- consensus decision;
- human adjudication when an exception occurs;
- governance context.

This allows later inspection of how a state was produced rather than only storing the final label.