# File-Level Publication Classification Matrix

**Status:** operational baseline — file-level triage
**Review pass:** 2026-10-05 — publication class + public-surface role reconciliation
**Date:** 2026-10-05

This is the authoritative file-level classification for the current LASTRO repository. It marks every file currently tracked in the public repository; migrated files are recorded in the private Vault manifest.

The matrix now separates two questions that were previously conflated:

1. **Publication Class** — how the file should be treated from a publication/exposure perspective.
2. **Public Surface Role** — what function the file serves, if any, in the current public surface.

This prevents `PUBLIC-WITH-REVIEW` from meaning “this must remain part of the canonical public surface.” A file may be publicly accessible today while still being optional, future-facing, or awaiting curation.

## Classes

| Class | Meaning | Action now |
|---|---|---|
| `PUBLIC` | Intentionally public and part of the current public surface; useful for reproducibility, evaluation, auditability, or understanding | Keep public and treat as current canonical public material |
| `PUBLIC-WITH-REVIEW` | Publicly accessible today, but not necessarily part of the canonical public surface; future-facing, optional, or awaiting curation | Keep public for now; do not treat as required current-state material; review at the next curation pass |
| `REVIEW` | Potentially sensitive or historically internal; requires explicit decision before being treated as public canonical knowledge | Do not promote; assess |
| `RESTRICTED-LATER` | Intended for the future controlled Vault/workspace | Do not copy into a future public Vault without review |
| `SECRET STORE` | Secrets/credentials/signing material | Never commit |

> **Important:** Because this GitHub repository is already public, `REVIEW` and `RESTRICTED-LATER` do not make a file private today. They describe intended handling. Physical separation happens through migration to the private Vault or another controlled store.

## Public Surface Roles

The role column answers: **“What function does this file have in the current public surface?”**

| Role | Meaning |
|---|---|
| `CORE` | Current product, architecture, implementation, tests, reproducible fixtures, or governance required to understand/reproduce/audit the MVP |
| `EVIDENCE` | External evidence, related work, benchmarks, or methodological material supporting evaluation of the current thesis |
| `NAVIGATION` | Indexes, maps, READMEs, and orientation documents that help a reviewer traverse the public repository |
| `RESEARCH-ARTICLE` | Curated article research intentionally exposed as part of the public evidence/methodological boundary |
| `PRODUCT-THESIS` | Product thesis or bounded strategic framing that contextualizes the current public MVP |
| `FUTURE-RESEARCH` | Research or hypotheses beyond the closed MVP contract; public today only as optional/future-facing material |
| `RESEARCH-PLANNING` | Research agenda, open questions, or planning material for work beyond the current MVP |
| `PACKAGE` | Dependency/package metadata required by the public implementation |

### Interpretation rule

**Publication Class controls exposure. Public Surface Role controls necessity.**

Therefore, `PUBLIC-WITH-REVIEW + FUTURE-RESEARCH/RESEARCH-PLANNING` means publicly accessible but not part of the canonical current-state narrative. A future curation pass may promote, consolidate, archive, or migrate such a file without changing the historical record.

No role implies implementation authority. Research and thesis documents do not alter the MVP contract unless explicitly promoted through the normal product/architecture process.

## File inventory

| Path | Publication Class | Public Surface Role |
|---|---|
| `.env.example` | `PUBLIC` |
| `.gitattributes` | `PUBLIC` |
| `.github/workflows/ci.yml` | `PUBLIC` |
| `.github/workflows/solana-devnet.yml` | `PUBLIC` |
| `.gitignore` | `PUBLIC` |
| `CONTRIBUTING.md` | `PUBLIC` |
| `README.md` | `PUBLIC` |
| `README.pt.md` | `PUBLIC` |
| `docs/ALIGNMENT_AUDIT.md` | `PUBLIC` |
| `docs/PROJECT_HANDOFF.md` | `PUBLIC` |
| `docs/PROJECT_STATUS.md` | `PUBLIC` |
| `docs/REPOSITORY_INFORMATION_BOUNDARY.md` | `PUBLIC` |
| `docs/VAULT_MIGRATION_MAP.md` | `PUBLIC` |
| `docs/architecture/API_CONTRACT.md` | `PUBLIC` |
| `docs/architecture/ATTESTATION_MODEL.md` | `PUBLIC` |
| `docs/architecture/CANONICALIZATION.md` | `PUBLIC` |
| `docs/architecture/CONSENSUS_CORE.md` | `PUBLIC` |
| `docs/architecture/DOMAIN_MODEL.md` | `PUBLIC` |
| `docs/architecture/EVIDENCE_PIPELINE.md` | `PUBLIC` |
| `docs/architecture/GOVERNANCE_COMPLIANCE_LAYER.md` | `PUBLIC` |
| `docs/architecture/M2_IMPLEMENTATION.md` | `PUBLIC` |
| `docs/architecture/README.md` | `PUBLIC` |
| `docs/architecture/TECHNICAL_ARCHITECTURE.md` | `PUBLIC` |
| `docs/architecture/VERIFICATION_ADAPTER_BOUNDARY.md` | `PUBLIC` |
| `docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png` | `PUBLIC` |
| `docs/brand/BRANDBOOK_DRAFT.md` | `PUBLIC` |
| `docs/brand/DESIGN_BRIEF_JP_FERNANDES.md` | `PUBLIC` |
| `docs/brand/LASTRO_IDENTIDADE_v0.2.html` | `PUBLIC` |
| `docs/brand/NAMING_EXPLORATION.md` | `PUBLIC` |
| `docs/brand/README.md` | `PUBLIC` |
| `docs/brand/VISUAL_SYSTEM_SPEC.md` | `PUBLIC` |
| `docs/brand/assets/learning-competency-symbol-reference-3d.png` | `PUBLIC` |
| `docs/brand/assets/learning-competency-symbol-reference-flat.png` | `PUBLIC` |
| `docs/brand/assets/learning-competency-symbol-v0.svg` | `PUBLIC` |
| `docs/decisions/0001-repository-operating-model.md` | `PUBLIC` |
| `docs/decisions/README.md` | `PUBLIC` |
| `docs/demo/DEMO_SCRIPT.md` | `PUBLIC` |
| `docs/demo/REPRODUCIBLE_DEMO_CONTRACT.md` | `PUBLIC` |
| `docs/evaluation/01_PRODUCT.md` | `PUBLIC` |
| `docs/evaluation/02_ARCHITECTURE.md` | `PUBLIC` |
| `docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md` | `PUBLIC` |
| `docs/evaluation/04_DEMO_AND_PROOF.md` | `PUBLIC` |
| `docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md` | `PUBLIC` |
| `docs/evaluation/README.md` | `PUBLIC` |
| `docs/go-to-market/GTM.md` | `PUBLIC` |
| `docs/governance/PROJECT_AUDIT_2026-10-04.md` | `PUBLIC` |
| `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` | `PUBLIC` |
| `docs/governance/SECURITY_THREAT_MODEL.md` | `PUBLIC` |
| `docs/governance/SOURCE_OF_TRUTH.md` | `PUBLIC` |
| `docs/governance/TEAM_ROLES.md` | `PUBLIC` |
| `docs/governance/VAULT_BOUNDARY.md` | `PUBLIC` |
| `docs/market/COMPETITIVE_LANDSCAPE.md` | `PUBLIC` |
| `docs/product/FRONTEND_PRODUCT_SPEC.md` | `PUBLIC` |
| `docs/product/MVP_CONTRACT.md` | `PUBLIC` |
| `docs/product/PITCH_ARCHITECTURE.md` | `PUBLIC` |
| `docs/product/README.md` | `PUBLIC` |
| `docs/product/USER_JOURNEYS.md` | `PUBLIC` |
| `docs/product/USE_CASE.md` | `PUBLIC` |
| `docs/validation/DEMAND_VALIDATION.md` | `PUBLIC` |
| `fixtures/synthetic/ana/README.md` | `PUBLIC` |
| `fixtures/synthetic/ana/a1_briefing.md` | `PUBLIC` |
| `fixtures/synthetic/ana/a2_preparacao.ipynb` | `PUBLIC` |
| `fixtures/synthetic/ana/a3_analise.ipynb` | `PUBLIC` |
| `fixtures/synthetic/ana/a3_resultados.md` | `PUBLIC` |
| `fixtures/synthetic/ana/a4_sintese.md` | `PUBLIC` |
| `fixtures/synthetic/ana/adjudication_demonstrated.json` | `PUBLIC` |
| `package-lock.json` | `PUBLIC-WITH-REVIEW` |
| `package.json` | `PUBLIC` |
| `research/01_DYNAMIC_ROLE_ARCHITECTURE.md` | `PUBLIC-WITH-REVIEW` | `FUTURE-RESEARCH` |
| `research/02_ROLE_DELTA_MODEL.md` | `PUBLIC-WITH-REVIEW` | `FUTURE-RESEARCH` |
| `research/03_DATA_STATISTICAL_ROBUSTNESS.md` | `PUBLIC-WITH-REVIEW` | `FUTURE-RESEARCH` |
| `research/05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` | `PUBLIC` | `EVIDENCE` |
| `research/ETHICAL_COMPLIANCE_LAYER.md` | `PUBLIC` | `EVIDENCE` |
| `research/README.md` | `PUBLIC-WITH-REVIEW` | `NAVIGATION` |
| `research/RELATED_WORK_AND_EVIDENCE.md` | `PUBLIC` | `EVIDENCE` |
| `research/RESEARCH_MAP.md` | `PUBLIC` | `NAVIGATION` |
| `research/article/README.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/09_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/10_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/RELATED_WORK_MATRIX.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/article/LITERATURE_CLOSURE_PROTOCOL.md` | `PUBLIC` | `RESEARCH-ARTICLE` |
| `research/product/APPLIED_AI_WORKFORCE_CAPABILITY.md` | `PUBLIC-WITH-REVIEW` | `FUTURE-RESEARCH` |
| `research/product/PRODUCT_THESIS.md` | `PUBLIC` | `PRODUCT-THESIS` |
| `research/product/README.md` | `PUBLIC-WITH-REVIEW` | `NAVIGATION` |
| `research/product/RESEARCH_AGENDA.md` | `PUBLIC-WITH-REVIEW` | `RESEARCH-PLANNING` |
| `src/.gitkeep` | `PUBLIC` |
| `src/README.md` | `PUBLIC` |
| `src/adjudication/adjudication.ts` | `PUBLIC` |
| `src/ai/contract.ts` | `PUBLIC` |
| `src/ai/provider.ts` | `PUBLIC` |
| `src/cli/demo.ts` | `PUBLIC` |
| `src/consensus/consensus.ts` | `PUBLIC` |
| `src/domain/types.ts` | `PUBLIC` |
| `src/domain/useCase.ts` | `PUBLIC` |
| `src/evidence/extract.ts` | `PUBLIC` |
| `src/evidence/ingest.ts` | `PUBLIC` |
| `src/evidence/normalize.ts` | `PUBLIC` |
| `src/pipeline.ts` | `PUBLIC` |
| `src/provenance/claim.ts` | `PUBLIC` |
| `src/provenance/trace.ts` | `PUBLIC` |
| `src/relation/relate.ts` | `PUBLIC` |
| `src/scenario.ts` | `PUBLIC` |
| `src/solana/attest.ts` | `PUBLIC` |
| `src/solana/demo.ts` | `PUBLIC` |
| `src/solana/integration.ts` | `PUBLIC` |
| `src/solana/verify.ts` | `PUBLIC` |
| `src/state/state.ts` | `PUBLIC` |
| `src/util.ts` | `PUBLIC` |
| `tests/.gitkeep` | `PUBLIC` |
| `tests/adjudication.test.ts` | `PUBLIC` |
| `tests/ai-contract.test.ts` | `PUBLIC` |
| `tests/canonicalization.test.ts` | `PUBLIC` |
| `tests/claim.test.ts` | `PUBLIC` |
| `tests/consensus.test.ts` | `PUBLIC` |
| `tests/extract.test.ts` | `PUBLIC` |
| `tests/helpers.ts` | `PUBLIC` |
| `tests/ingest.test.ts` | `PUBLIC` |
| `tests/m3.test.ts` | `PUBLIC` |
| `tests/pipeline.test.ts` | `PUBLIC` |
| `tests/provenance.test.ts` | `PUBLIC` |
| `tests/relate.test.ts` | `PUBLIC` |
| `tsconfig.json` | `PUBLIC` |

## Classification rules

1. `src/`, `tests/`, synthetic fixtures, canonical architecture and bounded research remain public when they are part of the reproducible proof.
2. Strategic execution, private operating intelligence, internal agent skills and task planning are candidates for the future restricted layer.
3. Research is **not** public by default. It is classified by content, maturity, and current public-surface role.
4. `PUBLIC-WITH-REVIEW` means **publicly accessible but not necessarily canonical current-state material**. It must not be interpreted as “required to understand the current MVP.”
5. A `PUBLIC-WITH-REVIEW` file may later be promoted to `PUBLIC`, consolidated with another document, archived, or migrated to the private Vault after an explicit curation decision.
6. A file may move to `REVIEW` or `RESTRICTED-LATER` when publication would expose non-public strategy, partner information, sensitive competitive intelligence, private deliberation, or other controlled information.
7. Credentials, private keys, tokens and signing material are never solved by classification; they must not enter the repository.
8. **Current MVP closure takes precedence over future research surface area.** Future-facing material should remain visibly subordinate to the closed MVP contract.

## Article research track

The curated article-research artifacts are intentionally public because they provide evidence, prior-art boundaries, counterexamples, and methodological constraints needed to understand or challenge the public LASTRO thesis.


| `research/article/README.md` | `PUBLIC` |
| `research/article/09_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | `PUBLIC` |
| `research/article/10_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | `PUBLIC` |
| `research/article/RELATED_WORK_MATRIX.md` | `PUBLIC` |
| `research/article/LITERATURE_CLOSURE_PROTOCOL.md` | `PUBLIC` |

## Current interpretation

The repository is already public. This matrix is the **file-level publication authority for the current public repository**.

The public surface should be read in this order:

`CORE → EVIDENCE → NAVIGATION → RESEARCH-ARTICLE / PRODUCT-THESIS → FUTURE-RESEARCH / RESEARCH-PLANNING`

Files migrated to the private Vault are no longer tracked here; their migration is recorded in `MIGRATION_MANIFEST_2026-10-04.md` in `SH1W4/lastro-vault-1`.

The authoritative principle is:

> **Publication class tells us what may be public. Surface role tells us why it is public. Neither makes future research part of the current MVP.**

## Reclassification

Any classification change should be made through a reviewable commit and, where material, recorded in the project decision history. No file should be hidden merely because it has competitive value; the distinction is between public auditability and genuinely controlled information.

## Completed Vault migration

On 2026-10-04, the files classified as `REVIEW` or `RESTRICTED-LATER` in the migration pass were copied to the private Vault and then removed from this public repository. The initial controlled migration remains **29 files: 9 `RESTRICTED-LATER` + 20 `REVIEW`**. Four article-research artifacts were subsequently curated back into a public `research/article/` track because their evidence and methodological boundaries materially support public auditability. Private Vault copies may be retained for lineage, but the public versions are canonical for the public research layer.
