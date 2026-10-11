# Frontend Pre-Vercel Audit — 2026-10-09

## Purpose

Record the initial static audit of the frontend contribution before deciding how to integrate it into the canonical LASTRO MVP repository. This is an audit record, not a claim that the frontend has been integrated or tested.

## Source inspected

- Repository: `JpFernandes77/lastro-mvp`
- Default branch: `main`
- Source commit: `ddfac73df631fdb0ef369014203fae5b87357cd5`
- Source application path: `lastro-identidade-v0.1/`
- Task specification: `LASTRO_FRONTEND_TASK_SPEC_v1.1_PRE_VERCEL` (provided 2026-10-08)

The source repository currently exposes only the `main` branch and no open PRs through the available GitHub inspection. Its latest commit inspected is dated 2026-10-07. This does not establish whether the author is working locally or in an unobserved environment.

## Confirmed static findings

### P0 — Build integrity

- `lastro-identidade-v0.1/next.config.mjs` sets `typescript.ignoreBuildErrors: true`.
- The task specification explicitly requires removing this bypass and passing `pnpm build` with TypeScript validation enabled.
- No successful production build has been evidenced by this audit.

### P0 — Project root and package metadata

- The Next application is nested under `lastro-identidade-v0.1/`.
- The repository tree contains a second duplicated `lastro-identidade-v0.1/lastro-identidade-v0.1/` tree with repeated app/configuration files.
- The package name is still `my-project`.
- The effective Vercel root configuration has not been inspected; deployment configuration remains unverified.

### P0 — Synthetic data boundary

- The page component contains hardcoded `trails` and `evidence` arrays, including multiple illustrative subjects and states.
- The UI labels the workspace as a synthetic demo, which is good, but the fixtures are not isolated in an explicit demo/data module as required by the task spec.
- Hash-like values shown in the UI must be explicitly identified as illustrative unless tied to a real record.

### P0 — Inert controls

Static inspection found controls with no action handler, including:
- `Search evidence` in Evidence Pipeline;
- `Verify independently` in Proof Verification;
- `Export log` in Audit Logs.

Each must work, be disabled, or be clearly identified as demo/pending. No API or backend should be invented to make these controls appear functional.

### P0 — Proof display

The Proof Verification view displays `DEVNET PROOF PENDING`, `NOT YET VERIFIED`, and an unavailable transaction, which avoids fabricating an on-chain signature. It also displays a hash-like string (`8f4e2a...b1c9d3`) beside a `DEMONSTRATED` state. The hash must be clearly marked illustrative or bound to the actual record before the view can imply a real attestation.

### P1 — Domain ownership / semantic review

The UI includes explicit labels distinguishing evidence, AI interpretation, human review, competency state, attestation and verification. Preserve this separation. Additional review is needed to verify that conflict cannot automatically update competency state and that the interface does not present consensus as a confidence score.

### Security / deployment — not yet verified

No claim is made that secrets or private URLs are present or absent. Environment handling, Vercel project root, preview URL, runtime behavior, responsive behavior and full visual E2E remain unverified.

## Initial acceptance status

| Criterion | Initial result |
|---|---|
| A01 — Single unambiguous Next root | FAIL: duplicate nested tree visible |
| A02 — Package metadata | FAIL: `my-project` |
| A03 — TypeScript errors not ignored | FAIL: bypass enabled |
| A04 — Production build | NOT EVIDENCED |
| A05 — Synthetic fixtures isolated | FAIL: arrays embedded in page component |
| A06 — UI does not own domain decisions | NEEDS REVIEW |
| A07 — Semantic separation | PARTIAL / NEEDS REVIEW |
| A08 — Conflict blocks automatic state change | NOT EVIDENCED |
| A09 — No fabricated proof | PARTIAL: pending label present; hash semantics unresolved |
| A10 — Honest controls | FAIL: inert controls found |
| A11 — No secrets/private URLs hardcoded | NOT AUDITED |
| A12 — Vercel preview from correct root | NOT EVIDENCED |

## Next actions

1. Inspect the complete source tree and identify the canonical inner project root; do not copy the duplicated nested tree.
2. Bring the frontend into a dedicated path in the canonical product repository through a reviewable PR, preserving attribution and the existing visual identity.
3. Correct the confirmed P0 items and run the actual production build with TypeScript validation enabled.
4. Verify the real Devnet fixture consumed by the canonical MVP before displaying any transaction or record hash as live proof.
5. Capture a Vercel Preview and run the visual E2E. A successful build alone is not frontend integration proof.

## Boundaries

- No VAE.
- No fabricated API or backend.
- No fabricated on-chain proof.
- No claim of frontend integration, successful build, production readiness, market validation or PMF.
- The canonical product repository remains `SH1W4/learning-competency-mvp`; the contributor's repository is a source of contribution, not the product's authority.
