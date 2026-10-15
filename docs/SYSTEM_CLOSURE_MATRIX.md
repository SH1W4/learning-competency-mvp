# LASTRO — System Closure Matrix

**Status reviewed:** 2026-10-15  
**Purpose:** Single execution surface for closing the known technical, integration, protocol, provenance, and product-quality gaps. This is a working acceptance matrix, not a claim that the system is production-ready or protocol-conformant.

## Authority and scope boundaries

- **Public implementation source of truth:** this repository, `SH1W4/learning-competency-mvp`.
- **Protocol authority/evaluation surface:** `SH1W4/lastro-protocol`; its normative specification remains private unless a separate explicit release decision is made.
- **Audit/provenance record:** `SH1W4/lastro-vault-1`.
- Do not modify the original contributor repository/snapshot as part of reconciliation.
- A successful CI run, deployment, or historical Devnet transaction does not independently prove full protocol conformance or public end-to-end attestation.
- No personal data belongs on-chain. The current public MVP uses synthetic evidence only.

## Status vocabulary

- **OPEN** — implementation or evidence is still missing.
- **IN PROGRESS** — candidate work exists, but acceptance is not complete.
- **BLOCKED** — dependent decision, infrastructure, or evidence is unresolved.
- **PASS** — acceptance evidence is linked and verified on the exact candidate commit.
- **NOT AUTHORIZED** — no conformance/release claim may be made, regardless of individual passing tests.

## Prioritized closure matrix

| ID | Priority | Workstream | Current finding | Acceptance criteria / required evidence | Owner surface / references | Status |
|---|---|---|---|---|---|---|
| LST-01 | P0 | Immutable record lifecycle | Runtime currently rebuilds the synthetic record per GET; hash may change. | Create a reviewed record once; canonicalize and persist it under exact `record_hash`; subsequent reads return the same record and hash. Add tests for repeat reads, restart/redeploy, unknown hash, and tampering. Record schema/migration and exact test run. | MVP runtime; [PR #50 runbook](https://github.com/SH1W4/learning-competency-mvp/pull/50) | OPEN |
| LST-02 | P0 | Attestation ingestion and verification | Operator E2E writes local artifacts; it does not publish a verified report to the hosted runtime. | Server-side controlled ingestion of attestation result; independently verify Devnet transaction, expected signer, payload/hash binding and network; persist verification result against the exact immutable record. Invalid/missing/mismatched proof must fail closed. Never expose signing secrets to browser or commit them. | MVP runtime; [PR #50](https://github.com/SH1W4/learning-competency-mvp/pull/50) | OPEN |
| LST-03 | P0 | Public retrieval contract | Public runtime does not yet return a durable complete record plus its matching verification report. | Public read path retrieves by stable record identifier/hash and returns the exact persisted record and proof; API schema validated at runtime; no fixture fallback; unknown/unverified records remain explicitly unattested. Add HTTP contract and negative-path tests. | MVP runtime; [Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30) | OPEN |
| LST-04 | P0 | Semantic state contract | Product states, canonical competency states, consensus, resolution, and workflow status must remain distinct. | Versioned mapping is documented; unmappable cases explicit; AI interpretation alone cannot verify or establish competency; human adjudication only follows eligible conflict and records actor, basis, evidence, rules and prior verifier results. Tests cover every mapping and invalid combination. | [MVP PR #43](https://github.com/SH1W4/learning-competency-mvp/pull/43); [Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30) | IN PROGRESS — PR open, mergeability false |
| LST-05 | P0 | Failure-closed API and UI | Negative paths need exact-candidate evidence, not only happy-path tests. | Verify invalid scenario returns documented 400; unavailable/timeout returns documented 503; malformed JSON/schema, conflict, insufficient evidence, and adjudication-required states render distinctly; no fallback fixture can masquerade as authoritative data or attestation. Capture CI and browser/API results for exact SHA. | [MVP PR #43](https://github.com/SH1W4/learning-competency-mvp/pull/43); [Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30) | IN PROGRESS |
| LST-06 | P0 | Protocol conformance | Latest recorded competency evaluation is 5 PASS / 0 FAIL / 0 BLOCKED / 3 NOT_EVALUATED; claim remains NOT_AUTHORIZED. | Resolve or explicitly bound each NOT_EVALUATED fixture; run protocol-owned evaluator against exact MVP candidate; publish result artifact, fixture-by-fixture evidence and separate promotion decision. No claim of conformance before authorization. | [Protocol PR #2](https://github.com/SH1W4/lastro-protocol/pull/2); [Protocol PR #1](https://github.com/SH1W4/lastro-protocol/pull/1) | BLOCKED — NOT_AUTHORIZED |
| LST-07 | P0 | Vault reconciliation and provenance | File-by-file provenance and exact-head reconciliation remain incomplete. | Classify all 42 files in the relevant M4 change as imported, transformed, authored, generated, or deployment/configuration; include source and validation references; reconcile Vault/public records against exact SHAs and document discrepancies without rewriting history. | [Vault PR #13](https://github.com/SH1W4/lastro-vault-1/pull/13); [Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30) | OPEN |
| LST-08 | P1 | Exact-candidate CI/build | Existing CI evidence for PR #43 is tied to its candidate SHA, not necessarily the latest main or final promoted candidate. | On the exact candidate to be merged/released, run typecheck, unit/contract/integration tests, dependency/security checks and production build; attach run URLs and commit SHA. Re-run after any source change. | [MVP PR #43](https://github.com/SH1W4/learning-competency-mvp/pull/43) | OPEN — rerun on final SHA |
| LST-09 | P1 | Public preview and E2E | PR #43 has a Ready Preview report, but a fresh live HTTP/API/browser inspection is not recorded. | Inspect the exact preview: desktop/mobile, real mobile menu, keyboard/focus, zoom, contrast, reduced motion, happy path and negative API paths. Record timestamp, preview URL, commit SHA, commands/results and screenshots/logs. | [MVP PR #43](https://github.com/SH1W4/learning-competency-mvp/pull/43); [Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30) | OPEN |
| LST-10 | P1 | Persistence infrastructure decision | No durable database integration/configuration is present; no provider should be selected silently. | Choose and document an approved persistence provider and operational budget/ownership; configure secrets outside source control; add migrations, backup/restore expectations, retention policy and failure behavior. Validate persistence across process restart/redeploy. | MVP runtime; decision required before provisioning | BLOCKED — provider/infra decision |
| LST-11 | P1 | Security and signing boundary | The attestation path must protect signing material and reject mismatched records. | Review secret handling, authorization for proof ingestion, replay/idempotency, request validation, signer allowlist, network pinning, rate limiting and logs. Test replay, wrong signer, wrong cluster, altered payload, duplicate submission and unavailable RPC. | MVP runtime and attestation verification path | OPEN |
| LST-12 | P1 | Accessibility and product UX | Responsive/accessibility review is not yet evidenced on the final candidate. | Record review for mobile responsiveness, keyboard-only navigation, visible focus, zoom, contrast and reduced motion. Critical user-facing states must explain what was verified and what remains unknown without overstating claims. | MVP frontend; [Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30) | OPEN |
| LST-13 | P1 | Claims and documentation consistency | README now separates historical Devnet proof from current public integration; this boundary must remain consistent. | Check README, project status, demo proof, UI labels, submission narrative and protocol/Vault records against implementation and exact test evidence. Keep synthetic-only, no-PMF/no-ROI and no-universal-competence limitations explicit. | [README](https://github.com/SH1W4/learning-competency-mvp/blob/main/README.md); [Project Status](https://github.com/SH1W4/learning-competency-mvp/blob/main/docs/PROJECT_STATUS.md) | IN PROGRESS |
| LST-14 | P2 | Independent review and release decision | Internal tests and a Devnet proof do not equal an independent security or protocol audit. | Obtain an independent review of threat model, cryptographic binding, state semantics and conformance evidence; resolve findings; record a signed-off decision with scope and residual risks. Do not use “production-ready” until operational readiness is independently supported. | Release governance; protocol and Vault records | OPEN |

## Execution order and dependencies

1. **Infrastructure decision (LST-10)** — decide persistence provider, environment, access controls and budget before implementation depends on a database.
2. **Immutable record lifecycle (LST-01)** — define canonical record schema and stable identity.
3. **Attestation verification and persistence (LST-02)** — bind proof to that exact record.
4. **Public retrieval contract (LST-03)** — expose only persisted, matching records/proofs.
5. **Semantic and failure behavior (LST-04, LST-05)** — preserve distinctions and fail closed.
6. **Protocol evaluation and provenance (LST-06, LST-07)** — evaluate the exact candidate and reconcile source lineage.
7. **Exact-candidate CI and live E2E (LST-08, LST-09, LST-11, LST-12)**.
8. **Documentation consistency and independent release review (LST-13, LST-14)**.

Do not merge a candidate solely because it is green in CI or because a preview is marked Ready. PR #43 explicitly requires live preview inspection and Vault/provenance acceptance. Do not merge unrelated branches independently if their semantic changes overlap; reconcile against current `main` first.

## Evidence record template

For every gate marked PASS, record:

- Gate ID and acceptance criterion.
- Repository, branch, exact commit SHA and deployment/preview URL if applicable.
- Command or test case executed, environment and timestamp.
- Result, including relevant logs/artifact URL.
- Reviewer and any residual limitation.
- Links to the corresponding issue/PR and Vault decision record.

A gate is **PASS** only when evidence refers to the exact candidate being evaluated. A previous successful run does not validate a later SHA.

## Definition of system closure

The system is not considered fully closed until all P0 gates pass, all P1 gates pass or have explicitly accepted residual risk, protocol conformance has a separate authorized decision, and the final deployed candidate passes end-to-end validation. A 10/10 assessment is an outcome of verified evidence, not a target label to place on an incomplete system.

## Current canonical trackers

- [M4 protocol conformance and Vault/public reconciliation — Issue #30](https://github.com/SH1W4/learning-competency-mvp/issues/30)
- [Semantic contract candidate — PR #43](https://github.com/SH1W4/learning-competency-mvp/pull/43)
- [Attestation closure runbook — PR #50](https://github.com/SH1W4/learning-competency-mvp/pull/50)
- [Vault/public reconciliation — Vault PR #13](https://github.com/SH1W4/lastro-vault-1/pull/13)
- [Protocol-owned competency evaluation — Protocol PR #2](https://github.com/SH1W4/lastro-protocol/pull/2)
