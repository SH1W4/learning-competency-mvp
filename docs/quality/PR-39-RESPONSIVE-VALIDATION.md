# PR #39 — Responsive frontend validation record

Date: 2026-10-12

## Scope
PR: https://github.com/SH1W4/learning-competency-mvp/pull/39
Branch: `fix/mobile-responsive-layout`

## Verified on commit `dcc820e07619525a003f57a7a661ee57bb964cd7`
- `test-and-typecheck`: passed.
- `responsive-browser-smoke`: passed.
- Browser smoke covers horizontal overflow at 320, 375, 390, 430, and 1280 CSS pixels; mobile drawer focus/Escape behavior; and selecting a navigation destination.
- The mobile drawer stacking context is isolated at the mobile breakpoint; drawer is above the backdrop.
- No merge or deployment was performed.

## Dependency reproducibility and security follow-up
The browser workflow previously installed `@playwright/test` without an exact version. The install log reported 8 audit findings (7 high, 1 critical), but that output alone does not identify which dependency paths are vulnerable or establish whether the findings are introduced by this PR.

Change recorded on 2026-10-12: pin the workflow's temporary Playwright test dependency to `@playwright/test@1.56.1` to avoid floating to an arbitrary latest version.

**Open follow-up:** inspect a fresh, machine-readable dependency audit and determine the exact affected packages and dependency paths before applying upgrades. Do not use `npm audit fix --force` without reviewing breaking changes. The prior count is an observed install-time warning, not a claim that the vulnerabilities have been remediated.

## Product-integrity constraints
- Local drafts are not canonical runtime writes.
- A browser-computed SHA-256 is not proof of authorship, runtime registration, or immutability.
- The responsive browser suite does not verify canonical runtime integration or on-chain attestation.
