# LASTRO — Protocol Extraction Audit

**Status:** completed extraction pass — proposal boundary only
**Date:** 2026-10-05
**Repository:** SH1W4/learning-competency-mvp
**Source commit:** c7518e770c03d7ecfe219b26862128d68613fdc4

## Executive conclusion

The current MVP already contains a coherent implicit protocol kernel.

It is not yet a public protocol specification.

The extraction identifies strong protocol-level families:

1. Evidence identity and provenance
2. Independent verifier results
3. Consensus semantics
4. State-transition authority
5. Exceptional human adjudication
6. Provenance / decision records
7. Attestation and independent verification
8. Canonicalization, versioning and conformance

The current MVP also contains many decisions that must NOT be promoted directly into the protocol:

- the learning/data-analysis competency;
- C1–C4;
- A1–A4;
- briefing / analysis_artifact / analysis_result / communication;
- the current AI contract;
- the current Solana Memo implementation;
- learning-competency as MVP identifier;
- TypeScript and CLI structures;
- local content limits.

Therefore:

> The MVP is a reference implementation containing a protocol kernel, not the protocol itself.

## 1. Extraction rule

Each candidate was evaluated for:

- domain independence;
- implementation independence;
- interoperability value;
- verification necessity;
- existing executable/documentary support.

Classification:

- PROTOCOL CORE
- PROTOCOL PROFILE
- REFERENCE IMPLEMENTATION
- RESEARCH / FUTURE

## 2. PROTOCOL CORE

### Evidence identity and provenance

Current Evidence already carries identity, source reference, activity context, submitter, timestamps, content reference, related evidence, trust metadata, provenance and content hash.

**Classification: PROTOCOL CORE**

Protocol requirement:

Evidence must be identifiable, referenceable and provenance-aware.

### Evidence is not interpretation

The MVP explicitly preserves:

Evidence ≠ Interpretation

AI receives detached snapshots and cannot mutate canonical evidence.

**Classification: PROTOCOL CORE**

Protocol principle:

> An interpretation MUST NOT silently become evidence.

### Evidence references

The relation layer requires signals to cite evidence and validates citations against the evidence contract.

**Classification: PROTOCOL CORE + PROFILE**

The protocol should define evidence references generically. Eligibility rules belong to a profile.

## 3. VERIFIER RESULT

The MVP already represents independent results with mechanism, criterion, status and rationale.

The adapter boundary adds version, evidence reference, execution reference, provenance and timestamp.

**Classification: PROTOCOL CORE**

Candidate generic object:

VerifierResult
- mechanism_id
- mechanism_version
- evidence_refs
- scope / criterion refs
- result
- rationale
- execution reference
- provenance
- timestamp

The protocol should not require the current three mechanisms forever.

## 4. CONSENSUS CORE

The MVP explicitly states that consensus is not vote counting.

Canonical semantic outcomes are:

- AGREEMENT
- INSUFFICIENT_EVIDENCE
- CONFLICT

**Classification: PROTOCOL CORE**

Important extraction finding:

The current TypeScript enum also contains HUMAN_ADJUDICATION as a ConsensusStatus value, but the canonical architecture treats human adjudication as an exceptional path rather than a fourth consensus outcome.

For protocol extraction, normalize this as:

Consensus Outcome
→ AGREEMENT
→ INSUFFICIENT_EVIDENCE
→ CONFLICT

CONFLICT
→ Human Adjudication Event

This should be treated as a protocol clarification, not silently changed in the current MVP during this audit.

## 5. CONSENSUS IS NOT STATE

The MVP explicitly preserves:

Consensus ≠ Competency State

A consensus result describes the verification process.

A domain state describes what the system may assert after applying transition rules.

**Classification: PROTOCOL CORE**

This separation is essential for interoperability and safety.

## 6. STATE TRANSITION AUTHORITY

The current executable state machine rejects unsupported transitions and records actor, origin, reason and timestamp.

Current state vocabulary:

- NOT_STARTED
- IN_DEVELOPMENT
- UNDER_REVIEW
- DEMONSTRATED

**Classification: PROTOCOL CORE concept + PROFILE-specific vocabulary**

Protocol should define:

- authoritative transition path;
- attributable transition;
- reason;
- timestamp;
- history preservation.

The exact state names should remain profile-specific until protocol design proves otherwise.

## 7. HUMAN ADJUDICATION

Current rules:

- only after CONFLICT;
- preserves previous verification results;
- records adjudicator;
- records decision;
- records evidence references;
- records timestamp and rationale;
- can produce a state transition.

**Classification: PROTOCOL CORE**

Protocol principle:

> Adjudication is an explicit exceptional event that adds a decision to the record; it does not erase previous verification results.

## 8. PROVENANCE TRACE

The MVP preserves a causal chain across evidence, extraction, AI signal, consensus, adjudication and final state.

**Classification: PROTOCOL CORE**

The protocol should require enough provenance to reconstruct:

- what was considered;
- which verifier produced each result;
- which version produced it;
- which evidence was referenced;
- whether adjudication occurred;
- how the resulting state was produced.

## 9. STATE / DECISION RECORD

ReviewedStateRecord is a strong protocol candidate because it binds:

- record version;
- subject;
- competency;
- state;
- state history;
- criterion assessments;
- evidence references and hashes;
- interpretation metadata;
- decision metadata;
- record hash.

**Classification: PROTOCOL CORE candidate**

The protocol should define a language-neutral State Record / Decision Record rather than copy the current TypeScript interface.

## 10. BOUNDED CLAIM

The current VerifiableClaim is explicitly evidence-bound and scope-bound.

It references:

- subject;
- competency;
- state;
- criterion support;
- evidence;
- decision;
- scope.

**Classification: PROTOCOL CORE candidate**

Potential protocol relationship:

State Record
→ Bounded Claim
→ Attestation

This should be explored further.

## 11. ATTESTATION

Current MVP attestation is versioned, pseudonymous, evidence-minimal and bound to a record hash.

**Classification: PROTOCOL CORE**

Solana Memo is NOT the protocol.

It is the current reference implementation / transport.

The protocol should define an attestation envelope independently of the transport.

## 12. INDEPENDENT VERIFICATION

The current verifier distinguishes between:

1. confirming that a record hash exists on-chain;
2. validating the complete binding when the reviewed record is supplied.

This produces an important protocol principle:

> An observed public hash is not equivalent to complete semantic verification.

**Classification: PROTOCOL CORE**

The verifier must only claim what its available inputs support.

## 13. CANONICALIZATION AND VERSIONING

The MVP already defines deterministic record canonicalization before SHA-256 hashing and explicitly recognizes that changing canonicalization changes the resulting record hash.

**Classification: PROTOCOL CORE candidate**

The current project-local canonicalization should NOT automatically become the universal protocol format.

Protocol must define or reference a versioned canonicalization contract.

Breaking semantic changes must require explicit versioning.

## 14. PRIVACY / DATA BOUNDARY

The current architecture establishes:

- raw/sensitive evidence remains off-chain;
- attestation carries minimum information;
- subject is pseudonymized;
- pseudonymization is not treated as strong anonymization.

**Classification: PROTOCOL CORE**

The protocol should define privacy invariants without requiring one blockchain or storage provider.

## 15. VERIFICATION ADAPTER BOUNDARY

The current architecture already defines:

External Infrastructure
→ Adapter
→ Canonical Verifier Result
→ Consensus Core

And explicitly prevents external infrastructure from becoming semantic authority.

**Classification: PROTOCOL CORE / EXTENSIBILITY**

Critical invariant:

> External infrastructure consensus is not LASTRO competency consensus.

This should survive protocol extraction.

## 16. PROFILE-SPECIFIC MATERIAL

These should NOT enter the protocol core as currently implemented:

### Competency
Current data-analysis competency is a profile.

### Criteria
C1–C4 are profile-specific.

### Activities
A1–A4 are profile-specific.

### Evidence types
briefing, analysis_artifact, analysis_result and communication are profile-specific.

### Evidence contract
Current mappings between activities, evidence types and criteria are profile-specific.

### Current AI contract
m2.ai-output.v1 is a reference implementation/profile contract, not a universal protocol requirement.

### Current trust taxonomy
N1–N4 may become a protocol concept, but the current labels should not be frozen as universal until separately extracted and validated.

## 17. IMPLEMENTATION-SPECIFIC MATERIAL

The following remain reference implementation details:

- TypeScript structures;
- current AI provider/model;
- current prompt contract;
- learning-competency MVP identifier;
- Solana Memo Program;
- current CLI;
- local content limits;
- current file formats;
- current repository layout.

## 18. Proposed protocol layering

LASTRO Protocol
→ Evidence / Provenance
→ Verifier Result
→ Consensus
→ State Transition
→ Adjudication
→ Decision Record
→ Attestation
→ Independent Verification
→ Canonicalization / Versioning
→ Conformance / Failure Semantics

Then:

LASTRO Protocol
+
Domain Profile
+
Reference Implementation

For the current MVP:

LASTRO Protocol
+
Competency Verification Profile
+
Learning/Data Analysis Reference Implementation

## 19. First candidate protocol objects

These are extraction candidates, NOT frozen schemas:

- EvidenceRecord
- EvidenceReference
- VerifierResult
- ConsensusRecord
- StateRecord
- AdjudicationRecord
- ProvenanceRecord
- ClaimRecord
- AttestationRecord
- VerificationResult

## 20. First candidate normative invariants

1. Evidence remains distinguishable from interpretation.
2. Verifier results identify mechanism and version.
3. Verifier results preserve evidence/provenance references.
4. Consensus is not simple vote counting.
5. Consensus outcomes remain distinct from domain states.
6. CONFLICT cannot silently advance canonical state.
7. Adjudication preserves previous verification history.
8. State transitions are attributable and reasoned.
9. Attestation represents a produced state/event, not raw evidence.
10. Attestation is not proof of universal truth or human worth.
11. Independent verification claims only what its inputs support.
12. External infrastructure cannot become semantic authority over domain state.
13. Sensitive evidence should remain outside public attestation payloads where not required.
14. Canonical records are versioned.
15. Breaking semantic changes require explicit versioning.
16. Frontends project canonical state rather than manufacture it.
17. Insufficient evidence must remain representable.
18. Historical verification results remain reconstructible after adjudication.

## 21. What this audit does NOT establish

This audit does not establish:

- protocol novelty;
- universal competency verification;
- adoption;
- standardization;
- completeness;
- external implementation conformance;
- immediate need for a new repository.

It establishes only:

> The current MVP contains enough domain-independent invariants to justify a formal protocol-extraction phase.

## 22. Recommended next phase

Do NOT create the public lastro-protocol repository yet.

First produce three design artifacts:

1. Protocol Constitution — invariants that cannot be violated.
2. Protocol Object Model — language-neutral objects and relationships.
3. Competency Verification Profile — current MVP expressed as a profile over the protocol.

Then perform a conformance gap analysis against the current implementation.

Only after that should the public protocol repository be created.

## Final verdict

Protocol kernel detected: YES

Protocol specification ready: NO

Formal extraction phase justified: YES

Public lastro-protocol repository now: NO

Architectural confidence in extraction: HIGH

Protocol maturity: PRE-SPECIFICATION

Final principle:

> The protocol should not be everything the MVP currently does. It should be the smallest domain-independent set of rules required for an implementation to produce, preserve and independently verify an evidence-backed state without changing the meaning of evidence, verification, consensus, state or provenance.
