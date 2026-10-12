# PR #39 — Responsive frontend validation record

Date: 2026-10-12

## Scope and integration

PR: https://github.com/SH1W4/learning-competency-mvp/pull/39  
Branch: `fix/mobile-responsive-layout`  
Status: **merged**. Merge commit recorded by GitHub: `3190ca2ca143a92a2346168f4b63cd3e0bce1752`.

## Validated candidate

Candidate SHA: `ac4f8978b1f44d94f851316ba6d8e2d9940dc971`

- `test-and-typecheck`: passed.
- `responsive-browser-smoke`: passed.
- Production build: passed.
- Browser smoke covers horizontal overflow at 320, 375, 390, 430, and 1280 CSS pixels; mobile drawer focus/Escape behavior; and selecting a navigation destination.
- The mobile drawer stacking context is isolated at the mobile breakpoint; drawer is above the backdrop.
- Dependency audit artifact from run [38296205107](https://github.com/SH1W4/learning-competency-mvp/actions/runs/38296205107) was inspected: 117 dependencies and zero info, low, moderate, high, or critical findings.
- Independent dependency refresh/audit/typecheck/build evidence: [run 38296079316](https://github.com/SH1W4/learning-competency-mvp/actions/runs/38296079316).

## Deployment and runtime boundary

GitHub/Vercel reported a successful status for the current main commit, and the project owner has confirmed that the public interface is accessible. These facts do not, by themselves, prove the live API's upstream runtime configuration or the complete browser-to-runtime E2E path.

The responsive browser suite does not verify canonical runtime integration, persisted adjudication, or on-chain attestation. The production API must be separately checked for an HTTP success response and the expected synthetic scenario payload.

## Product-integrity constraints

- Local drafts are not canonical runtime writes.
- A browser-computed SHA-256 is not proof of authorship, runtime registration, or immutability.
- A successful frontend build is not evidence of production runtime availability.
- The frontend remains read-only and must fail closed when the canonical runtime is unavailable.
