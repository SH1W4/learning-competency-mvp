---
name: learning-competency-mvp
description: Project intelligence and operating rules for the Learning Competency MVP. Use this skill before making product-sensitive, architectural, AI, evidence-model, attestation, Solana, validation, or hackathon-submission decisions in this repository.
---

# Learning Competency MVP — Project Skill

## Mission

Help turn the current Learning Competency thesis into a small, demonstrable, technically coherent MVP and a credible hackathon submission.

The skill is a **working memory and decision framework**, not a substitute for team decisions.

When information conflicts, prefer:
1. explicit current team decisions;
2. validated implementation specifications in docs/;
3. current product thesis;
4. this skill's working model;
5. older research and hypotheses.

Do not silently convert an old hypothesis into a current requirement.

---

## 1. Core product thesis

The current thesis is broader than a certificate or microcredential wallet.

The working model is:

    ORGANIZATION
      ↓
    DESIRED COMPETENCY
      ↓
    SHORT DEVELOPMENT TRAIL
      ↓
    PERSON
      ↓
    ACTIVITIES
      ↓
    EVIDENCE
      ↓
    AI + HUMAN REVIEW
      ↓
    COMPETENCY STATE
      ↓
    ATTESTATION / PROOF
      ↓
    SOLANA
      ↓
    VERIFICATION

The central MVP question is:

> Can we transform a desired competency into a short development path, gather evidence produced by a person, interpret it with AI and human review, represent a competency state, and preserve a verifiable proof of that state?

The MVP does not need to prove the entire future product.

---

## 2. What the system is actually modeling

Keep these concepts separate:

### Competency
The capability the organization wants to develop or observe.

### Trail
A short sequence of activities intended to develop or generate evidence related to the competency.

### Activity
A concrete action performed by the person.

### Evidence
An artifact or structured signal produced by the activity.

Evidence is the source material. It is not automatically proof of competency.

### Interpretation
A structured reading of evidence, including extracted fields, relationships, signals, and possible competency relevance.

### Human review
A deliberate checkpoint where a human can accept, correct, or reject AI interpretation.

### Competency state
A structured representation of what the available evidence and review currently support.

Do not treat the state as an absolute claim of mastery unless the model and verification mechanism explicitly support that claim.

### Attestation
A signed or otherwise verifiable representation of a defined state/event.

The exact schema is an implementation decision and must be validated before becoming canonical.

---

## 3. Evidence and trust model

Maintain the distinction:

    EVIDENCE
      ↓
    EXTRACTION
      ↓
    INTERPRETATION
      ↓
    HUMAN REVIEW
      ↓
    COMPETENCY STATE
      ↓
    VERIFICATION

Trust levels:

- **N1 — Self-declared:** information supplied by the person without supporting evidence.
- **N2 — Evidence presented:** supporting evidence is attached or referenced.
- **N3 — Evidence analyzed:** evidence was structurally analyzed and interpreted.
- **N4 — Source verified:** an external authenticated source confirms the relevant claim.

Rules:

- AI can assist N1–N3.
- AI must not assign N4 by inference.
- An anomaly is not a fraud accusation.
- Missing evidence is not evidence of failure.
- Extraction and inference must remain distinguishable in data models.
- Never invent missing fields.

When possible, represent fields with their source and confidence rather than storing an inferred value as if it were directly observed.

---

## 4. AI operating model

AI is an interpretation and organization layer.

### AI may

- extract structured information from evidence;
- normalize fields;
- identify candidate competencies;
- relate evidence to competency criteria;
- synthesize signals across evidence;
- identify inconsistencies;
- propose a competency-state update;
- generate review prompts.

### AI may not

- claim institutional accreditation;
- independently verify an issuer;
- declare official recognition;
- convert an inference into external verification;
- accuse a person or document of fraud based only on an anomaly;
- invent evidence, credentials, institutions, dates, scores, or competencies.

### Human-in-the-loop contract

AI output should be treated as a proposal until reviewed.

A useful internal shape is:

    evidence
    → extracted data
    → interpretation
    → proposed competency signals
    → human review
    → accepted state

Keep the original evidence and the AI interpretation traceable.

---

## 5. Evidence-processing pipeline

Use this conceptual pipeline when designing services or modules:

    INGEST
      ↓
    NORMALIZE
      ↓
    EXTRACT
      ↓
    INTERPRET
      ↓
    RELATE TO COMPETENCY
      ↓
    REVIEW
      ↓
    UPDATE STATE
      ↓
    ATTEST
      ↓
    VERIFY

Do not collapse all stages into one opaque AI call if doing so would make provenance or review impossible.

---

## 6. Minimal state model

The implementation should be able to distinguish at least:

    DECLARED
    EVIDENCE_PRESENTED
    EVIDENCE_ANALYZED
    UNDER_REVIEW
    REVIEWED
    STATE_ACCEPTED
    ATTESTED
    VERIFIABLE

The exact domain model may evolve.

Do not create a large state machine before the first end-to-end demo requires it.

---

## 7. Attestation model

The attestation should represent a defined state or event, not an entire document archive.

Conceptually:

    SUBJECT
    COMPETENCY
    STATE
    EVIDENCE REFERENCE
    REVIEW CONTEXT
    TIMESTAMP
    EXPIRY
    PROOF / ATTESTATION

The current Solana Attestation System is organized around Credential → Schema → Attestation. A Credential defines the authority and authorized signers; a Schema defines the structure and validation rules and supports versioning; an Attestation contains the attested data and metadata.

Technical references:
- https://solana.com/docs/tools/attestations
- https://solana.com/docs/tools/attestations/credentials
- https://solana.com/pt/docs/tools/attestations/schemas
- https://solana.com/pt/docs/tools/attestations/attestations

Before implementing the final Solana object, confirm:
- what exactly is being attested;
- who/what is the attester;
- what evidence reference is bound to it;
- what state is being represented;
- what can be independently verified later;
- what data must never leave off-chain storage.

---

## 8. Solana role

Use Solana for the integrity/verifiability layer of the prototype.

The current conceptual responsibilities are:

- create or preserve an attestation/proof;
- anchor a relevant state/event;
- provide a verification path;
- preserve historical integrity.

Do not introduce:
- tokenomics;
- speculative incentives;
- personal documents on-chain;
- blockchain features that do not contribute to the MVP flow.

Blockchain is infrastructure for a product claim. It is not the product claim itself.

---

## 9. MVP scope guard

### In scope

- one competency;
- one short trail;
- one person;
- a few evidence types;
- AI-assisted interpretation;
- human review;
- minimal competency state;
- attestation/proof;
- Solana verification;
- end-to-end demonstration.

### Out of scope

- full LMS;
- marketplace;
- recruitment engine;
- broad institutional integrations;
- all credential standards at once;
- full enterprise workforce management;
- definitive competency methodology;
- definitive pricing;
- multi-market product expansion.

If a new feature does not help prove the central flow, default to postponing it.

---

## 10. Architecture decision rules

Before introducing a service, database table, queue, agent, smart contract, or external integration, ask:

1. Which domain concept does it represent?
2. Which step of the MVP flow needs it?
3. What is the smallest implementation that proves the concept?
4. What data provenance does it preserve?
5. What human review boundary does it preserve?
6. What can be tested independently?
7. What assumption would become embedded if we implement it now?

Prefer explicit boundaries over premature abstraction.

---

## 11. Data and privacy rules

- Raw sensitive evidence stays off-chain.
- Store references/hashes/proofs where appropriate, not unnecessary personal content.
- Preserve provenance for extracted and inferred fields.
- Do not silently overwrite source evidence with AI-normalized values.
- Avoid collecting data the MVP does not need.
- Treat privacy and governance as architectural concerns, not only UI concerns.

---

## 12. Hackathon operating model

The Crypto World's Fair is a startup competition, not merely a coding contest. The Colosseum currently evaluates Founder + Market Fit, Insight, Product + Execution, Potential Market Size, Founder Communication, Viability, and Traction, and asks for a product pitch, demo, GitHub, go-to-market, demand validation, and distribution plan.

Official reference:
- https://colosseum.com/hackathon
- https://colosseum.com/worldsfair

### Execution rule

Every major task should strengthen at least one of:

- product proof;
- insight clarity;
- execution evidence;
- demand validation;
- technical credibility;
- submission quality.

Do not optimize for feature count.

### GitHub rule

The repository should make it possible to see:

    DECISION
      ↓
    IMPLEMENTATION
      ↓
    TEST
      ↓
    COMMIT
      ↓
    DEMO

The Colosseum explicitly says it looks for significant work during the hackathon, work performed by the team, and strategic prioritization.

### Traction rule

Do not claim traction without evidence.

Useful evidence:
- interviews;
- pilot commitments;
- data access;
- active testers;
- paid intent;
- partner introductions.

Weak evidence:
- compliments;
- “I would use it”;
- generic interest.

### Pitch rule

The presentation explains the thesis.

The demo proves the thesis.

The GitHub demonstrates execution.

### Scope rule

If a feature does not improve the central vertical slice or materially improve validation, keep it out.

---

## 13. Development behavior

When asked to implement something:

### First

Identify whether the request is:
- product decision;
- architecture decision;
- implementation task;
- experiment;
- validation;
- documentation;
- future hypothesis.

### Then

If it is an implementation task:
1. locate the relevant module;
2. inspect existing interfaces;
3. implement the smallest coherent change;
4. add tests;
5. document a decision if architecture changed.

### Avoid

- speculative infrastructure;
- abstractions without a demonstrated need;
- hiding business rules inside prompts;
- coupling Solana directly to UI concerns;
- treating AI output as trusted state;
- expanding the MVP because a future feature is interesting;
- inventing traction or user validation.

---

## 14. Decision hierarchy

When uncertain, use this order:

    CURRENT TEAM DECISION
            ↓
    MVP CONTRACT
            ↓
    VALIDATED TECHNICAL SPEC
            ↓
    ARCHITECTURE DECISION
            ↓
    IMPLEMENTATION
            ↓
    EXPERIMENT / FUTURE HYPOTHESIS

If two documents conflict, do not silently reconcile them. Flag the conflict and identify which decision needs to be resolved.

---

## 15. Definition of done for the first vertical slice

The first meaningful milestone is not “the architecture is complete.”

It is:

> One concrete competency can be taken through a short trail, evidence can be submitted, AI can structure and interpret that evidence, a human can review it, a competency state can be produced, an attestation/proof can be created, and the result can be verified.

Everything else is secondary until this path works.

---

## 16. Working vocabulary

Prefer:
- competency;
- development trail;
- activity;
- evidence;
- interpretation;
- human review;
- competency state;
- attestation;
- proof;
- verification.

Avoid using “verified competency” when the underlying mechanism only supports evidence analysis or human review.

Avoid using “certificate” as the central domain object unless the specific flow is actually about a certificate.

---

## 17. Relationship to project documentation

This skill captures **operating intelligence**.

It should not become a dumping ground for every research note.

Put information in the appropriate place:

- product thesis / market research → Drive;
- current technical contract → docs/;
- architecture decisions → docs/architecture/ or docs/decisions/;
- hackathon strategy → docs/hackathon/;
- demand validation → docs/validation/;
- demo/pitch material → docs/demo/;
- implementation → src/;
- tests → tests/;
- reusable AI/project operating intelligence → this skill.

Update this skill when a stable project-level principle changes. Do not update it for every temporary idea.
