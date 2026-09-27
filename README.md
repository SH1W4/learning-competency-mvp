# Learning Competency MVP

Experimental MVP for competency development, learning evidence, AI-assisted interpretation, and verifiable attestations on Solana.

## Current focus

The current working hypothesis is to demonstrate a minimal end-to-end flow:

`organization/program → competency → short trail → person → activities → evidence → AI + human review → competency state → attestation → Solana → verification`

This repository is the execution layer of the project. Product reasoning, research, meeting records, and governance materials remain in the team Drive.

## Scope discipline

The MVP should prove the core flow without becoming a full LMS, marketplace, recruitment platform, or institutional integration layer.

### In scope for the current MVP discussion

- One concrete competency or capability
- One short, controlled learning/development trail
- A small set of evidence types
- AI-assisted evidence structuring and competency relation
- Human review of AI output
- A minimal competency-state representation
- A minimal attestation/proof flow
- Solana as the integrity/verifiability layer
- A simple verification path

### Explicitly not assumed yet

- Final product name
- Definitive competency framework
- Broad institutional integrations
- Full course catalog or marketplace
- Recruitment or hiring engine
- Personal/sensitive documents stored on-chain
- Final monetization model

## Repository structure

```text
.
├── docs/
│   ├── product/
│   ├── architecture/
│   └── decisions/
├── src/
└── tests/
```

Directories will be expanded only when the implementation requires them.

## Working principles

1. Do not claim more than the evidence supports.
2. Separate evidence, interpretation, human review, competency state, and verification.
3. AI assists interpretation; it does not independently declare institutional truth.
4. Keep sensitive personal information off-chain.
5. Record meaningful architectural and product decisions explicitly.

## Status

**Phase:** MVP scope → technical specification

**Repository status:** Initial scaffold
