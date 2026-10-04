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
  ↓
UPDATE STATE
  ↓
ATTEST
  ↓
VERIFY
```

The architecture keeps source material, extraction, interpretation, verification, governance, state, and attestation distinguishable.

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

## State model

A competency state represents only what the available evidence, verification results, and governance rules can support.

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

## Provenance

Important information should remain distinguishable by origin, including:

- source evidence;
- deterministic verification;
- AI interpretation;
- statistical validation when applicable;
- human adjudication when an exception requires contextual resolution;
- consensus decision;
- governance context.

This allows later inspection of how a state was produced rather than only storing the final label.
