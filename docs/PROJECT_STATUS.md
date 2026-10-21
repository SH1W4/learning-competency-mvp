# Project Status — Public Snapshot

**Last reviewed:** 2026-10-20  
**Canonical main snapshot audited:** `41db4aaffd059300f345ef84588828ec515d4dea`  
**Status:** core MVP implementation exists; M4 semantic integration and exact-candidate release evidence remain open.

This is a public evidence snapshot, not a live task tracker or a certification of protocol conformance. Historical CI, previews, and Devnet transactions apply only to the exact behavior and commit they cover.

## What the MVP is designed to demonstrate

- One bounded, synthetic competency scenario with observable work and structured evidence.
- Separation between source evidence, AI interpretation, verification results, consensus, resolution, and competency state.
- Explicit handling of agreement, insufficient evidence, and conflict without treating them as interchangeable outcomes.
- A defined state record with integrity metadata and a documented Solana Devnet attestation/verification path.
- A read-only product projection that should display canonical runtime results rather than independently decide competency state.

See [Demo & Technical Proof](evaluation/04_DEMO_AND_PROOF.md) for the recorded proof path and its limits.

## M4 candidate audit — 2026-10-20

Two open pull requests were reviewed as alternative candidates and neither is approved for merge by this audit:

- [PR #43](https://github.com/SH1W4/learning-competency-mvp/pull/43), head `9a1081a3d6f799a78a7f69692587fb16870b64a3`: historical CI and frontend browser-smoke runs succeeded for that exact SHA ([CI](https://github.com/SH1W4/learning-competency-mvp/actions/runs/38326843938), [browser smoke](https://github.com/SH1W4/learning-competency-mvp/actions/runs/38326844026)). These runs predate later changes and do not validate a newly reconciled candidate. The PR description also says fresh live preview/API/browser inspection has not been recorded.
- [PR #57](https://github.com/SH1W4/learning-competency-mvp/pull/57), head `3a55239e4cedaf12471faee3818b578769a4ce83`: a preview/deployment signal exists, but this audit did not find equivalent CI and browser-smoke evidence tied to that exact SHA.

The current `main` checks passing at `41db4aaffd059300f345ef84588828ec515d4dea` validate that main snapshot only; they do not validate either candidate PR.

## Remaining public closure criteria

- Reconcile one M4 candidate with current `main`; avoid merging the two alternatives blindly.
- Run tests, typecheck, production build, dependency audit, and responsive/browser smoke on the exact final candidate SHA.
- Inspect the candidate's live preview, including mobile navigation, semantic UI states, invalid scenarios, malformed upstream payloads, and unavailable/timeout behavior.
- Record reproducible E2E steps and outcomes for the exact candidate. A historical Devnet attestation is not evidence that the current public frontend journey is integrated through persistence and on-chain attestation.
- Keep the [M4 validation gates](https://github.com/SH1W4/learning-competency-mvp/issues/30) open until each applicable criterion has linked evidence.
- Review accessibility (keyboard/focus, zoom, reduced motion, contrast) on the candidate actually being presented.
- Update public claims only after the relevant evidence is recorded.

## Current limitations

- The canonical demo uses synthetic evidence; it is not customer or pilot evidence.
- The MVP does not establish commercial demand, willingness to pay, recurring adoption, ROI, or product-market fit.
- A successful attestation verifies properties of a defined record; it does not prove universal competence, truth, merit, or fairness.
- Naming several verification mechanisms does not by itself prove statistical or operational independence between them.
- Durable public retrieval of a complete record with its matching verification report, a fully integrated persistent frontend-to-attestation workflow, production readiness, and independent security certification remain unestablished by the evidence reviewed here.

## Evidence rule

Publish only claims traceable to the current implementation, tests, reproducible proof, or cited external evidence. A successful test, build, preview, deployment, or historical transaction is evidence only for the exact behavior and candidate it covers. Keep unsupported gates explicitly pending; do not infer full conformance or release readiness from partial success.
