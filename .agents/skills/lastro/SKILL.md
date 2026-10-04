---
name: lastro
description: Operational skill for working on the LASTRO — Learning Competency Infrastructure repository. Use for architecture, implementation, auditing, documentation, verification, governance, attestation, research boundaries, and hackathon-readiness tasks. Preserve the current MVP boundaries and never promote future research into implemented capability.
---

# LASTRO — Project Operating Skill

## 0. Mission

Treat LASTRO as an evidence-backed competency infrastructure whose current MVP transforms observable work evidence into bounded, auditable competency states.

Canonical product statement:

> From observable evidence to verifiable competency states.

The project is not a universal competency oracle, moral authority, human-worth scorer, or blockchain truth oracle.

The purpose of this skill is to keep implementation, documentation, research, governance, and future work aligned with the current executable architecture.

---

## 1. Source-of-Truth Hierarchy

When sources disagree, use this order:

1. Current implementation and tests define executable behavior.
2. Canonical product and architecture documents define intended current behavior.
3. Research documents define hypotheses and future directions.
4. Historical archives preserve prior states but never override the current state.

Canonical references:

- README.md — public project narrative and MVP boundary.
- docs/product/USE_CASE.md — product contract.
- docs/evaluation/02_ARCHITECTURE.md — architecture.
- docs/architecture/DOMAIN_MODEL.md — domain model and competency state contract.
- docs/architecture/API_CONTRACT.md — interface and handoff contract.
- docs/architecture/CONSENSUS_CORE.md — Consensus Core decision model.
- docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md — governance, adjudication, attestation boundary.
- docs/evaluation/04_DEMO_AND_PROOF.md — reproducible proof path.
- docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md — claim discipline.
- docs/governance/SOURCE_OF_TRUTH.md — canonical hierarchy.
- docs/governance/VAULT_BOUNDARY.md — public/private publication boundary.
- docs/governance/SECURITY_THREAT_MODEL.md — security threats and trust boundaries.
- docs/governance/PROJECT_AUDIT_2026-10-04.md — latest repository audit baseline.
- research/ETHICAL_COMPLIANCE_LAYER.md — future Ethical Compliance Gate research hypothesis.

If a research document proposes a future mechanism, do not describe it as implemented merely because it is documented.

---

## 2. Current MVP Architecture

The current MVP is a bounded vertical slice:

~~~
EVIDENCE
   ↓
VERIFICATION & INTERPRETATION
   ├─ Evidence Integrity Check       [STRUCTURAL]
   ├─ Deterministic Criteria Check   [STRUCTURAL]
   └─ AI Interpretation              [SEMANTIC]
   ↓
CONSENSUS CORE
   ├─ AGREEMENT
   ├─ INSUFFICIENT_EVIDENCE
   └─ CONFLICT → HUMAN ADJUDICATION
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
   ↓
PUBLIC VERIFICATION
~~~

The three MVP verification mechanisms are exactly:

1. Evidence Integrity Check.
2. Deterministic Criteria Check.
3. AI Interpretation.

Do not add a fourth verifier to the MVP without an explicit architectural decision and updated canonical documentation.

---

## 3. Independence Rules

### Evidence Integrity

- Verify canonical evidence integrity cryptographically.
- Recompute SHA-256 content integrity and compare with the recorded content hash.
- Preserve the content reference and provenance relationship.
- Fail closed on detected post-ingestion tampering.
- Do not trust mutable downstream representations when canonical evidence is available.

### Deterministic Criteria

The deterministic verifier operates directly on canonical evidence, competency contracts, activities, metadata, and required evidence types.

It MUST NOT consume:

- AI confidence;
- AI summaries;
- AI classifications;
- AI-generated signals;
- semantic interpretations.

This independence is a core security and epistemic boundary.

### AI Interpretation

AI may interpret evidence semantically.

AI output is:

- a semantic signal;
- non-authoritative;
- not sufficient by itself to update competency state.

Never describe AI interpretation as proof of competency.

---

## 4. Consensus Core

Consensus is not majority voting.

It is explicit convergence among mechanisms that observe different dimensions of the case.

Canonical outcomes:

- AGREEMENT
- INSUFFICIENT_EVIDENCE
- CONFLICT
- HUMAN_ADJUDICATION

State must not advance from unresolved CONFLICT or INSUFFICIENT_EVIDENCE.

Human Adjudication is an exception path, not the normal pipeline.

Adjudication should preserve:

- responsible human;
- evidence considered;
- criteria;
- rationale;
- result;
- timestamp;
- rule version;
- references to prior verification results.

Never erase previous verification results to manufacture a final decision.

---

## 5. Governance Boundary

Governance and policy define conditions under which the current process may operate.

Governance is NOT a fourth verification mechanism.

Current architecture:

~~~
GOVERNANCE / POLICY
        ↓
RULE SCHEMA
        ↓
3 MVP VERIFICATION MECHANISMS
        ↓
CONSENSUS CORE
        ↓
STATE
~~~

Do not silently convert governance requirements into Consensus votes.

---

## 6. Ethical Compliance Gate — Future Only

The Ethical Compliance Layer is a research hypothesis documented at:

research/ETHICAL_COMPLIANCE_LAYER.md

Its canonical position is:

~~~
ORGANIZATION RULE SCHEMA
        ↓
ETHICAL COMPLIANCE GATE
        ↓
VALIDATED RULE SCHEMA
        ↓
EVIDENCE + MVP VERIFICATION
        ↓
CONSENSUS CORE
~~~

It is:

- pre-consensus;
- governance-oriented;
- rule-schema validation;
- M2/M3 research;
- not implemented in the current MVP.

It is NOT:

- a verifier;
- a fourth Consensus mechanism;
- an evidence evaluator;
- a moral authority;
- a legal opinion;
- proof of universal fairness.

Never implement this layer merely because a task mentions fairness. First establish that the user explicitly wants future M2/M3 research or implementation.

Reference frameworks in the research document are not yet a validated legal/compliance mapping. Before implementation, claims about AERA, UDL, EU AI Act, ISO/IEC 24029, OECD, FAT/ML, or jurisdictional requirements must be checked against authoritative source material and converted into concrete, machine-evaluable constraints.

---

## 7. Statistical / Robustness Boundary

Statistical / Robustness verification is Future Research / M4+.

Do not add sample-size verification, statistical significance, baseline comparison, disparate-impact monitoring, or robustness scoring to the current MVP merely because the architecture could eventually support them.

If a future decision depends on multiple observations or statistical inference, document the requirement as future research unless an explicit implementation scope has been approved.

---

## 8. Attestation Boundary

Attestation represents a defined system state or event and its integrity reference.

It does NOT prove:

- truth;
- merit;
- human worth;
- universal competence;
- correctness of the underlying evaluation;
- blockchain-derived truth.

Sensitive learning evidence must remain off-chain.

The public chain may anchor a minimal, verifiable representation of the generated state or record.

When discussing live Devnet proof:

- distinguish a current live transaction from a historical or fallback fixture;
- never invent a transaction signature;
- never present an unverified transaction as proof;
- preserve the matching record hash when using a fallback fixture.

---

## 9. Publication, Vault & IP Boundary

The repository is currently a pre-vault mixed state.

The Public Vault / Private Vault architecture is defined but physical migration has not been completed.

### Publication Classes

The vault model uses four publication classes:

- **PUBLIC** — material intentionally publishable and suitable for the public repository.
- **RESTRICTED** — controlled-disclosure material that may be shared selectively but is not public.
- **PRIVATE** — internal material that should not be published.
- **SECRET STORE** — credentials, secrets, keys, or other sensitive operational material that must never live in either vault.

RESTRICTED is a controlled-disclosure classification, not a mandate to create a third physical repository before the hackathon.

### Public Candidates

Public candidates include:

- README;
- public product and use-case material;
- architecture;
- Consensus Core;
- governance and attestation boundary;
- demo/proof documentation;
- limitations/claims;
- brand;
- source code, tests, synthetic fixtures;
- selected research after review.

The current MVP source tree is intentionally public because reproducibility and technical auditability are part of the proof strategy. Do not claim that current prompts, heuristics, weights, or other implementation details are proprietary unless they are actually withheld/classified that way. If future implementation contains intentionally proprietary details, publish the public contract separately and classify the implementation before release.

### Restricted / Private Candidates

Private or restricted candidates include:

- commercial strategy;
- pricing and buyer experiments;
- pitch working material;
- hackathon-internal planning;
- private meeting notes;
- confidential interviews;
- unpublished competitive intelligence;
- restricted security findings.

RESTRICTED/PRIVATE material may be promoted to PUBLIC only after content, metadata, security and claim review, with SOURCE_OF_TRUTH updated and the promotion recorded through a reviewable change.

For controlled disclosure, provide the minimum necessary scope, prefer redaction, use NDA/access control when appropriate, record the disclosure, and never copy restricted material into the public repository merely for convenience.

Secrets belong in a secret manager, never in either vault.

### Migration Protocol

Never claim that logical separation equals completed physical vault migration.

Before migration:

1. inventory every tracked file;
2. classify each file;
3. run dedicated secret scanning;
4. review public research claims and citations;
5. separate real/private evidence from synthetic examples;
6. assign every private file a destination;
7. create the vaults through a reviewable change set.

Before hackathon submission, perform a file-by-file publication audit and dedicated secret scan. A keyword grep alone is not sufficient evidence of a clean public repository.

Do not perform a blind directory move.

## 10. Claim Discipline

Use the narrowest claim supported by implementation.

The MVP can demonstrate:

- structured evidence ingestion;
- provenance-aware processing;
- AI-assisted interpretation;
- deterministic explicit-criteria verification;
- independent verification mechanisms;
- bounded Consensus Core state transitions;
- Human Adjudication as an exception path;
- deterministic state records;
- Solana Devnet integrity anchoring capability;
- verification of an anchored record when a current transaction is available.

Do NOT claim:

- universal competency assessment;
- replacement of human evaluation in high-stakes contexts;
- universal fairness;
- universal competency taxonomy;
- blockchain truth or merit;
- autonomous human-worth scoring;
- validated pricing;
- recurring commercial adoption;
- market traction;
- Dynamic Role Architecture as a validated commercial wedge;
- completed physical Public/Private Vault migration.

Guiding principle:

> The system should be able to say “we do not know” as structurally as it can say “we have evidence.”

---

## 11. Research Boundary

Research documents may be ambitious.

They must not silently become implementation claims.

Always label future work clearly as:

- hypothesis;
- research;
- roadmap;
- planned;
- future;
- not implemented.

Current important research directions include:

- Ethical Compliance Gate — M2/M3;
- configurable Rule Engine — M2;
- expanded governance/provenance integration — M3;
- Statistical / Robustness — M4+;
- Dynamic Role Architecture — research direction;
- Public/Private Vault migration — controlled future operation.

When converting research into implementation, create an explicit transition:

hypothesis → specification → implementation → test → documented claim.

---

## 12. Engineering Change Protocol

Before modifying code:

1. Identify the canonical behavior being changed.
2. Check the current implementation and tests.
3. Check the relevant architecture or governance document.
4. Determine whether the request is MVP, future research, or non-goal.
5. Avoid adding capabilities outside approved scope.
6. Preserve independence boundaries.
7. Add or update tests for security-sensitive behavior.
8. Update canonical documentation if behavior or claims changed.
9. Run typecheck and tests when execution is available.
10. Never report unexecuted tests as passing.

For security-sensitive pipeline changes, explicitly test:

- post-ingestion tampering;
- malicious provider mutation;
- canonical evidence integrity;
- fail-closed behavior;
- AI/deterministic independence.

---

## 13. Audit Protocol

When asked to audit the project, check:

### Architecture

- Evidence → Verification/Interpretation → Consensus → State → Attestation.
- Exactly three MVP verification mechanisms.
- Structural versus semantic separation.
- Deterministic verifier independence from AI.
- Human Adjudication as exception.

### Security

- canonical evidence integrity;
- immutable or snapshot boundaries around untrusted providers;
- fail-closed integrity validation;
- no sensitive evidence on-chain;
- secret hygiene.

### Governance

- explicit rules;
- versioning;
- provenance;
- adjudication traceability;
- claims discipline;
- Ethical Compliance Gate kept outside MVP.

### Repository

- source-of-truth consistency;
- branch and PR state;
- documentation drift;
- public/private classification;
- synthetic versus real evidence;
- future vault readiness.

### Proof

- reproducible demo;
- typecheck;
- tests;
- live Devnet attestation when available;
- fallback fixture only when previously validated;
- independent verification.

Do not declare readiness solely from documentation. Separate:

- documented;
- implemented;
- tested;
- externally verified.

---

## 14. Hackathon Operating Principle

The project is currently in a consolidation phase.

Prefer:

**closing proofs and reducing ambiguity**

over:

**adding architectural novelty.**

Do not add another verifier, statistical layer, ethical implementation, physical vault split, or interface capability merely to make the project appear more sophisticated.

Preferred sequence:

~~~
CORE HARDENED
      ↓
LOCAL TESTS VERIFIED
      ↓
SOLANA ATTESTATION / FALLBACK PROVEN
      ↓
PR / DOCUMENT CHECKPOINTS CLOSED
      ↓
INTERFACE EXECUTION
      ↓
DEMO / HACKATHON READY
      ↓
PUBLIC / PRIVATE VAULT MIGRATION
~~~

---

## 15. Interaction Rules for Agents

When working on LASTRO:

- Be precise and evidence-driven.
- Prefer subtraction over speculative additions.
- Do not invent repository state.
- Do not invent test results.
- Do not invent blockchain transactions.
- Do not treat historical context as current truth.
- Do not confuse research with implementation.
- Do not collapse structural verification and semantic interpretation.
- Do not let AI output become deterministic verification input.
- Do not turn governance into a Consensus vote.
- Do not claim attestation proves truth or merit.
- Do not claim the vault split is complete.
- When uncertain, inspect the repository and canonical documents before deciding.
- If uncertainty remains after inspection, classify the capability as **unverified** rather than inferred or implemented.
- Never claim external verification without corresponding execution or external evidence.
- When a requested change conflicts with this skill, surface the conflict explicitly instead of silently overriding the boundary.

---

## 16. Definition of Done for MVP Changes

A meaningful MVP change is complete only when:

1. implementation matches the intended architecture;
2. tests cover the relevant behavior;
3. security boundaries remain intact;
4. canonical documentation is aligned;
5. claims remain narrower than or equal to demonstrated capability;
6. research-only capabilities remain labeled as future;
7. public/private boundaries remain intact;
8. reproducible proof remains possible.

The standard is not “more features”.

The standard is:

> **more verifiable capability with less ambiguity.**
