# Source of Truth Map

**Status:** preparation baseline for the future Public Vault.

## Current canonical layers

| Layer | Canonical location | Purpose | Future vault |
| --- | --- | --- | --- |
| Project entry point | README.md | public product narrative | PUBLIC |
| Product contract | docs/product/USE_CASE.md | canonical MVP use case | PUBLIC |
| Architecture | docs/evaluation/02_ARCHITECTURE.md | evidence/verification architecture | PUBLIC |
| Consensus | docs/architecture/CONSENSUS_CORE.md | decision authority | PUBLIC |
| Governance | docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md | consensus, adjudication, attestation boundary | PUBLIC |
| Demo / proof | docs/evaluation/04_DEMO_AND_PROOF.md | reproducible proof path | PUBLIC |
| Claims | docs/evaluation/05_LIMITATIONS_AND_CLAIMS.md | claim discipline | PUBLIC |
| Brand | docs/brand/ | identity and interface handoff | PUBLIC |
| Research | docs/research/ or equivalent research documents | external evidence and benchmarks | PUBLIC-WITH-REVIEW |
| Commercial | docs/business/ | buyer, GTM, pricing and commercial intelligence | PRIVATE |
| Pitch working material | docs/pitch/ | internal positioning | PRIVATE |
| Hackathon internal material | docs/hackathon/ | competition-sensitive planning | PRIVATE |
| Restricted notes | docs/private/ | sensitive internal material | PRIVATE |

## Canonical-state rule

When sources disagree:

1. current implementation and tests define executable behavior;
2. canonical product and architecture documents define intended behavior;
3. research documents define evidence and hypotheses;
4. historical archives preserve prior states but do not override current state.

## Public Vault rule

The future Public Vault should contain only material that can be safely used to understand, evaluate or reproduce the public project.

## Private Vault rule

The Private Vault is the workspace for strategy, confidential context and unpublished material. It must not become an undocumented second source of truth for the public MVP.

## Historical archive

Google Drive and other historical archives can preserve previous documents, meeting records and research snapshots. Historical material may be stale relative to the current GitHub state.

## Migration rule

The vault split must be executed only after a file-by-file inventory and review. No path should be moved solely because its directory name sounds public or private.
