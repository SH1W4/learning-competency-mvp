# File-Level Publication Classification Matrix

**Status:** operational baseline — file-level triage
**Date:** 2026-10-04

This is the authoritative file-level classification for the current LASTRO repository. It marks every tracked file; it does not move, delete, hide, or rewrite any file.

## Classes

| Class | Meaning | Action now |
|---|---|---|
| `PUBLIC` | Intentionally public and useful for reproducibility, evaluation, auditability, or understanding | Keep public |
| `PUBLIC-WITH-REVIEW` | Public candidate, but review/redaction should precede a future curated Vault release | Keep for now; review later |
| `REVIEW` | Potentially sensitive or historically internal; requires explicit decision before being treated as public canonical knowledge | Do not promote; assess |
| `RESTRICTED-LATER` | Intended for the future controlled Vault/workspace | Do not copy into a future public Vault without review |
| `SECRET STORE` | Secrets/credentials/signing material | Never commit |

> **Important:** Because this GitHub repository is already public, `RESTRICTED-LATER` does not make a file private today. It marks the intended future classification. Physical separation happens only when the Vault is created.

## File inventory

| Path | Class |
|---|---|
| `.agents/skills/lastro/SKILL.md` | `RESTRICTED-LATER` |
| `.env.example` | `PUBLIC` |
| `.gitattributes` | `PUBLIC` |
| `.github/workflows/ci.yml` | `PUBLIC` |
| `.github/workflows/solana-devnet.yml` | `PUBLIC` |
| `.gitignore` | `PUBLIC` |
| `CONTRIBUTING.md` | `PUBLIC` |
| `README.md` | `PUBLIC-WITH-REVIEW` |
| `README.pt.md` | `PUBLIC-WITH-REVIEW` |
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
| `docs/evaluation/01_PRODUCT.md` | `PUBLIC` |
| `docs/evaluation/02_ARCHITECTURE.md` | `PUBLIC` |
| `docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md` | `PUBLIC` |
| `docs/evaluation/04_DEMO_AND_PROOF.md` | `PUBLIC` |
| `docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md` | `PUBLIC` |
| `docs/evaluation/README.md` | `PUBLIC` |
| `docs/go-to-market/GTM.md` | `PUBLIC-WITH-REVIEW` |
| `docs/governance/PROJECT_AUDIT_2026-10-04.md` | `PUBLIC` |
| `docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md` | `PUBLIC` |
| `docs/governance/SECURITY_THREAT_MODEL.md` | `PUBLIC` |
| `docs/governance/SOURCE_OF_TRUTH.md` | `PUBLIC` |
| `docs/governance/TEAM_ROLES.md` | `PUBLIC-WITH-REVIEW` |
| `docs/governance/VAULT_BOUNDARY.md` | `PUBLIC` |
| `docs/market/COMPETITIVE_LANDSCAPE.md` | `PUBLIC-WITH-REVIEW` |
| `docs/product/FRONTEND_PRODUCT_SPEC.md` | `PUBLIC` |
| `docs/product/FRONTEND_SPEC_ERICK_JP.md` | `REVIEW` |
| `docs/product/MVP_CONTRACT.md` | `PUBLIC` |
| `docs/product/PITCH_ARCHITECTURE.md` | `PUBLIC` |
| `docs/product/README.md` | `PUBLIC` |
| `docs/product/USER_JOURNEYS.md` | `PUBLIC` |
| `docs/product/USE_CASE.md` | `PUBLIC` |
| `docs/product/VICTORY_EXECUTION.md` | `REVIEW` |
| `docs/project-journal/01_m2_merge_and_decisions.md` | `REVIEW` |
| `docs/project-journal/02_m3_architecture_setup.md` | `REVIEW` |
| `docs/project-journal/03_m2_m3_end_to_end_validation.md` | `REVIEW` |
| `docs/project-journal/04_m3_cycle_closure.md` | `REVIEW` |
| `docs/project-journal/05_m2_m3_handoff_hardening.md` | `REVIEW` |
| `docs/project-journal/06_mvp_technical_closure.md` | `REVIEW` |
| `docs/project-journal/07_bounded_verifiable_claim_pr7.md` | `REVIEW` |
| `docs/project-journal/08_semantic_hardening_and_ci_recovery.md` | `REVIEW` |
| `docs/project-journal/09_m4_execution_and_core_freeze.md` | `REVIEW` |
| `docs/project-journal/10_thesis_market_evidence_and_external_validation.md` | `REVIEW` |
| `docs/project-journal/11_positioning_and_ecosystem_benchmark.md` | `REVIEW` |
| `docs/project-journal/12_final_evaluation_and_documentation_freeze.md` | `REVIEW` |
| `docs/project-journal/README.md` | `REVIEW` |
| `docs/validation/DEMAND_VALIDATION.md` | `PUBLIC-WITH-REVIEW` |
| `fixtures/synthetic/ana/README.md` | `PUBLIC` |
| `fixtures/synthetic/ana/a1_briefing.md` | `PUBLIC` |
| `fixtures/synthetic/ana/a2_preparacao.ipynb` | `PUBLIC` |
| `fixtures/synthetic/ana/a3_analise.ipynb` | `PUBLIC` |
| `fixtures/synthetic/ana/a3_resultados.md` | `PUBLIC` |
| `fixtures/synthetic/ana/a4_sintese.md` | `PUBLIC` |
| `fixtures/synthetic/ana/adjudication_demonstrated.json` | `PUBLIC` |
| `package-lock.json` | `PUBLIC-WITH-REVIEW` |
| `package.json` | `PUBLIC-WITH-REVIEW` |
| `research/01_DYNAMIC_ROLE_ARCHITECTURE.md` | `PUBLIC-WITH-REVIEW` |
| `research/02_ROLE_DELTA_MODEL.md` | `PUBLIC-WITH-REVIEW` |
| `research/03_DATA_STATISTICAL_ROBUSTNESS.md` | `PUBLIC-WITH-REVIEW` |
| `research/04_MARKET_VALIDATION_EVIDENCE.md` | `REVIEW` |
| `research/05_COLOSSEUM_ECOSYSTEM_BENCHMARK.md` | `PUBLIC-WITH-REVIEW` |
| `research/06_DECISIONS.md` | `REVIEW` |
| `research/07_VERIFICATION_INFRASTRUCTURE_BENCHMARK.md` | `REVIEW` |
| `research/08_WINNING_PATTERN_AUDIT.md` | `REVIEW` |
| `research/09_WORK_EVIDENCE_TO_COMPETENCY_INFERENCE.md` | `PUBLIC-WITH-REVIEW` |
| `research/10_VERIFICATION_CONSENSUS_PROVENANCE_ATTESTATION.md` | `PUBLIC-WITH-REVIEW` |
| `research/ETHICAL_COMPLIANCE_LAYER.md` | `PUBLIC-WITH-REVIEW` |
| `research/LITERATURE_CLOSURE_PROTOCOL.md` | `PUBLIC-WITH-REVIEW` |
| `research/README.md` | `PUBLIC-WITH-REVIEW` |
| `research/RELATED_WORK_AND_EVIDENCE.md` | `PUBLIC-WITH-REVIEW` |
| `research/RELATED_WORK_MATRIX.md` | `PUBLIC-WITH-REVIEW` |
| `research/RESEARCH_MAP.md` | `PUBLIC-WITH-REVIEW` |
| `research/product/APPLIED_AI_WORKFORCE_CAPABILITY.md` | `PUBLIC-WITH-REVIEW` |
| `research/product/FUTURE_PLATFORM_VISION.md` | `REVIEW` |
| `research/product/PRODUCT_THESIS.md` | `PUBLIC-WITH-REVIEW` |
| `research/product/README.md` | `PUBLIC-WITH-REVIEW` |
| `research/product/RESEARCH_AGENDA.md` | `PUBLIC-WITH-REVIEW` |
| `skills/hackathon-evaluator/SKILL.md` | `RESTRICTED-LATER` |
| `skills/learning-competency/SKILL.md` | `RESTRICTED-LATER` |
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
| `tasks/CURRENT_EXECUTION_001.md` | `RESTRICTED-LATER` |
| `tasks/M1_CONCRETE_USE_CASE.md` | `RESTRICTED-LATER` |
| `tasks/M2_EVIDENCE_AI_REVIEW.md` | `RESTRICTED-LATER` |
| `tasks/M3_STATE_ATTESTATION.md` | `RESTRICTED-LATER` |
| `tasks/M4_VALIDATION_DEMO_SUBMISSION.md` | `RESTRICTED-LATER` |
| `tasks/README.md` | `RESTRICTED-LATER` |
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
| `tsconfig.json` | `PUBLIC-WITH-REVIEW` |

## Classification rules

1. `src/`, `tests/`, synthetic fixtures, canonical architecture and bounded research remain public when they are part of the reproducible proof.
2. Strategic execution, private operating intelligence, internal agent skills and task planning are candidates for the future restricted layer.
3. Research is **not** private by default. It is classified by content.
4. A file may move from `PUBLIC-WITH-REVIEW` or `REVIEW` to `PUBLIC` after evidence/claim review and removal of confidential material.
5. A file may move to `RESTRICTED-LATER` when publication would expose non-public strategy, partner information, sensitive competitive intelligence, private deliberation, or other controlled information.
6. Credentials, private keys, tokens and signing material are never solved by classification; they must not enter the repository.

## Current interpretation

The repository remains physically public. This matrix is the **triage map** that will be used when the future Public Vault / Restricted Vault is created.

The authoritative principle is:

> If a file is necessary to understand, reproduce, audit, challenge, or contextualize a public LASTRO claim, default to public. If publication exposes confidential, strategic, private, or security-sensitive information, keep it outside the future public layer.

## Reclassification

Any classification change should be made through a reviewable commit and, where material, recorded in the project decision history. No file should be hidden merely because it has competitive value; the distinction is between public auditability and genuinely controlled information.