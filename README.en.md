# Learning Competency MVP

> Experimental MVP for competency development, learning-evidence organization, AI-assisted interpretation, and verifiable attestations on Solana.

**Primary language:** Portuguese (Brazil) · [Português (Brasil)](README.md)

## 1. Context

The project thesis evolved from a platform focused only on microcredentials toward a broader approach to **competency development**.

The working hypothesis is that an organization can define a desired competency, associate it with a short development trail, and use the activities performed and evidence produced by a person to build a structured representation of that competency's state.

AI acts as an evidence organization and interpretation layer, with human review. Solana is explored as an integrity, attestation, and verifiability layer.

This is the project's current direction and remains subject to team validation.

## 2. What the MVP must prove

The MVP should demonstrate a minimal end-to-end transformation:

`organization/program → competency → short trail → person → activities → evidence → AI + human review → competency state → attestation → Solana → verification`

The central MVP question is:

> **Can a desired competency be transformed into a short trail, have evidence produced by the person collected and interpreted with AI and human review, represent a competency state, and preserve a verifiable proof of that state?**

The hackathon goal is not to build the entire future product, but to demonstrate this flow concretely.

## 3. Current scope

### In scope

- one concrete competency or capability;
- one short, controlled trail;
- one person traversing the trail;
- a small set of evidence types;
- AI-assisted structuring and interpretation;
- human review;
- a minimal competency-state representation;
- a minimal attestation/proof object;
- Solana as an integrity and verifiability layer;
- a simple verification path.

### Explicitly outside the MVP

- full LMS;
- course marketplace;
- complete recruitment platform;
- broad course catalog;
- extensive institutional integrations;
- definitive competency methodology;
- multiple markets at once;
- final monetization model;
- personal or sensitive documents stored directly on-chain.

These may remain future vision or hypotheses, but should not automatically expand the MVP.

## 4. Role of AI

AI is an **interpretation and organization layer**, not an institutional authority.

Within the MVP, it may:

- structure information present in evidence;
- relate evidence to competencies;
- synthesize development signals;
- identify inconsistencies or items requiring review;
- support construction of a competency state.

Human review remains part of the flow.

AI must not independently declare official recognition of a competency or turn an inference into institutional verification.

## 5. Role of Solana

Solana is not presented as a substitute for an institution, evaluator, or evidence.

Within the MVP, its role is to explore:

- integrity;
- attestation;
- recording of a relevant state/event;
- verifiability.

Personal information and sensitive documents should not be placed directly on-chain. The exact attestation object and technical mechanism remain to be defined and validated by the team.

## 6. Trust principle

The project keeps four concepts separate:

`evidence → interpretation → human review → verification`

Presented evidence is not automatically proven competency.

AI interpretation is not automatically institutional confirmation.

The system should avoid claiming more than the available data and verification support.

## 7. Current conceptual architecture

```text
ORGANIZATION / PROGRAM
        ↓
DESIRED COMPETENCY
        ↓
SHORT TRAIL
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
```

This is a working conceptual architecture, not a final technical specification.

## 8. Drive and GitHub

The project uses two spaces with different roles:

**Drive — context and governance**
- meeting records;
- research;
- analysis;
- thesis evolution;
- product documents;
- references;
- decisions and alignment material.

**GitHub — technical execution**
- code;
- technical architecture promoted from validated decisions;
- implementation specifications;
- tests;
- issues;
- pull requests;
- change history.

> **A hypothesis does not automatically become an implementation. A validated decision can be promoted into GitHub.**

## 9. Repository structure

```text
.
├── docs/
│   ├── product/
│   ├── architecture/
│   └── decisions/
├── src/
└── tests/
```

The structure will expand only when implementation requires it.

## 10. Working principles

1. Do not claim more than the evidence supports.
2. Separate evidence, interpretation, human review, competency state, and verification.
3. Keep humans in the loop where judgment is required.
4. Do not put sensitive personal data directly on-chain.
5. Record meaningful product and architectural decisions.
6. Do not turn a hypothesis into a requirement without validation.
7. Keep the MVP small enough to demonstrate end to end.

## 11. Status

**Phase:** MVP scope → technical specification.

**Repository status:** Initial scaffold.

**Next decision:** collectively validate the MVP field of action before consolidating the technical architecture.

See [Issue #1](https://github.com/SH1W4/learning-competency-mvp/issues/1).
