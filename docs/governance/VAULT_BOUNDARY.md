# Vault Boundary & Publication Policy

**Status:** preparation baseline — no vault migration performed yet.

## Purpose

Define the boundary between the future Public Vault and Private Vault before any migration.

### Public Vault

Canonical public state, reproducible technical proof, research supporting the thesis, public product and brand documentation.

### Private Vault

Commercial strategy, sensitive team material, unpublished research, private deliberation and restricted operational information.

### Secrets

Credentials, API keys, private keys, tokens and passwords never belong in either vault. They belong in a secret manager.

## Current repository status

This repository is currently a **pre-vault mixed state**.

Important: .gitignore does not make an already tracked file private. A later migration must classify tracked content explicitly.

## Publication classes

### PUBLIC

Candidate material:
- README;
- product and use-case specifications;
- public architecture;
- Consensus Core;
- selected research and benchmarks;
- brand system;
- demo and proof documentation;
- limitations and claims discipline;
- source code, tests and synthetic fixtures.

### PUBLIC-WITH-REVIEW

Material that is useful publicly but needs a release review:
- detailed competitive analysis;
- unpublished benchmark conclusions;
- future roadmap research;
- internal decision records;
- research containing non-public collaborator context.

### PRIVATE

Keep in the Private Vault:
- commercial strategy;
- pricing and buyer experiments;
- private interviews;
- private meeting notes;
- negotiation or partnership material;
- internal deliberation;
- unpublished security findings.

## Current classification baseline

| Area | Default | Reason |
| --- | --- | --- |
| README | PUBLIC | project entry point |
| Product / Use Case | PUBLIC | explains the MVP |
| Architecture | PUBLIC | technical proof |
| Consensus Core | PUBLIC | core differentiator |
| Research | PUBLIC-WITH-REVIEW | valuable depth; claims require discipline |
| Brand | PUBLIC | product identity |
| Tests / synthetic fixtures | PUBLIC | reproducibility |
| Demo / proof | PUBLIC | hackathon evidence |
| Limitations / claims | PUBLIC | credibility |
| Commercial strategy | PRIVATE | competitive sensitivity |
| Pitch working material | PRIVATE | internal positioning |
| Hackathon internal planning | PRIVATE | competition-sensitive |
| Private meeting notes | PRIVATE | confidentiality |
| Secrets | SECRET STORE | never committed |

## Migration gate

Do not perform the final split until:
1. repository inventory is complete;
2. every file has a publication class;
3. tracked private files are identified;
4. secret scanning is clean;
5. public claims match implementation;
6. research citations are preserved;
7. synthetic examples are separated from real evidence;
8. every private file has a destination;
9. the Public Vault has a canonical README and source-of-truth map;
10. migration happens through a reviewable commit/PR.

## Decision

**No migration is performed by this audit.**

This file is the preparation contract for the later Public Vault / Private Vault operation.
