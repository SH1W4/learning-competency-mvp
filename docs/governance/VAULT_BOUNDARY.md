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

## Current Migration Status

The project has a strictly defined public/private information architecture and publication policy.

**Note:** The physical migration of files into separated Public/Private Vaults is prepared and gated by the 10-point migration checklist, but has not yet been executed. Current claims of "IP BLINDADA" refer to the logical separation of concerns, interface contracts, and the exclusion of sensitive heuristics from public endpoints, not a completed physical repository split.

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


## Publication Classes — 2026-10-04 clarification

The publication model is more granular than a binary public/private split:

### PUBLIC
Safe for general publication and intended to support understanding, evaluation, or reproduction.

### RESTRICTED
Controlled-disclosure material. Access may require NDA, redaction, or case-by-case technical review. Examples include non-public market-validation evidence, customer/partner interviews, unpublished benchmark material, and technical due-diligence details.

**RESTRICTED is a publication class, not a requirement to create a third physical repository before the hackathon.** Until a physical topology is approved, restricted material remains outside the public repository in the team's controlled workspace.

### PRIVATE
Core-team material such as commercial strategy, pricing/buyer experiments, private meeting notes, negotiations, internal deliberation, unpublished competitive intelligence, and unpublished security findings.

### SECRET STORE
Credentials, API keys, private keys, tokens, passwords and signing material never belong in any vault or repository. They belong in an appropriate secret manager.

## IP Boundary

The current MVP repository intentionally exposes implementation as part of reproducibility and technical auditability. Do not retroactively label the current source tree as proprietary merely because competitors can learn from it.

If a future component intentionally contains proprietary prompts, heuristics, weights, models, or other competitive implementation details, classify that component before publication and expose the corresponding public contract separately where appropriate. A public architecture document does not require every future implementation detail to be public.

## Declassification Protocol

A RESTRICTED or PRIVATE artifact may be promoted to PUBLIC only after review that:
1. removes or redacts commercial, contractual, personal, security-sensitive and credential material;
2. removes sensitive metadata or identifiers where necessary;
3. verifies that public claims remain supported;
4. updates SOURCE_OF_TRUTH.md;
5. records the promotion in a reviewable commit or decision record.

## Controlled Disclosure Protocol

For hackathon evaluation, investor diligence, partnership discussion, or technical review:
1. identify the minimum information required;
2. prepare a redacted or purpose-specific package;
3. use NDA/access control for RESTRICTED material when appropriate;
4. disclose only the approved scope;
5. record who received it, why, and when;
6. define an expiry/review date when access is temporary;
7. never copy restricted material into the public repository merely for convenience.

## Pre-Hackathon Publication Audit

Before public submission or a major release, review the tracked repository file-by-file. Inspect research, market, GTM, diary, pitch, decision and configuration material individually; run dedicated secret scanning; distinguish synthetic fixtures from real evidence; and verify public claims against implementation. A keyword grep alone is not sufficient.

## Physical Migration Decision

**No physical Public/Private Vault migration is performed before the hackathon unless explicitly approved.** The current priority remains consolidation, proof and reproducibility. The eventual topology may use a Public Vault, a controlled Private Vault, a restricted-access workspace/package, and a Secret Store. The exact topology is a later implementation decision.


## Operational classification baseline — 2026-10-04

The file-level publication baseline is maintained in `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` and overrides directory-based assumptions for the current review.

The important correction is that `research/`, `docs/product/`, and `docs/decisions/` are not intrinsically public or private. Each artifact is classified by actual information content. Current source code remains PUBLIC because reproducibility and technical auditability are part of the MVP proof strategy.

No physical file movement is authorized by this classification. RESTRICTED means controlled disclosure, not a requirement for a third repository before the hackathon.
