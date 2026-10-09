# M4 Frontend Vertical Slice — Public Integration Record

**Status:** draft implementation; validation and visual acceptance pending  
**Canonical implementation:** `frontend/` in this repository  
**Product/runtime authority:** this repository, not the private Vault or the frontend

## Purpose

Expose the existing M4 read-only projection through a public Next.js interface aligned with the LASTRO Visual System v0.2 and Frontend Product Specification. This is a vertical slice for the canonical runtime, not a claim that every planned V0 screen is complete.

## Runtime and authority boundaries

```text
Browser
  → Next.js page
  → same-origin /api/m4/competency
  → canonical M4 runtime
```

- The frontend renders the runtime response; it does not generate evidence or recalculate verification, consensus, or competency state.
- AI interpretation is visually and semantically distinct from independent integrity/deterministic checks.
- Consensus outcome is distinct from competency state.
- Conflict/adjudication flags are displayed as received; the frontend cannot advance state or submit an adjudication.
- Synthetic Ana data must remain visibly identified as synthetic.
- Attestation and public verification are shown only when the runtime actually supplies those fields.
- The production proxy requires a full HTTPS `LASTRO_M4_RUNTIME_URL`; there is no production localhost or fixture fallback.
- No signer key or private signing material belongs in the frontend.

## Included in this vertical slice

- Competency and criteria;
- trail and activities;
- evidence references and provenance fields returned by the runtime;
- integrity and deterministic mechanism results;
- AI interpretation signals and evidence references;
- consensus outcome and advancement/adjudication flags;
- competency state and runtime-provided state history;
- handoff metadata/hash;
- attestation and public-verification availability.

## Not claimed by this change

- Complete implementation of every planned V0 screen (landing, full dashboard, queue, audit-log experience, architecture tour, and dedicated adjudication workflow);
- browser-based E2E acceptance or screenshot-based visual sign-off;
- accessibility certification or measured contrast acceptance;
- deployed canonical runtime, Vercel Preview, or Production;
- new Solana transaction or on-chain proof;
- commercial validation, adoption, or product-market fit.

## Required acceptance gates

- [ ] Frozen-lockfile install passes from `frontend/`.
- [ ] TypeScript typecheck passes on the exact PR head.
- [ ] Next.js production build passes on the exact PR head.
- [ ] Runtime unavailable state is visibly fail-closed; no fixture fallback.
- [ ] Runtime available state is checked against the canonical M4 response.
- [ ] Browser walkthrough at mobile (<768 px), tablet (768–1199 px), and desktop (≥1200 px).
- [ ] Keyboard navigation, visible focus, zoom, reduced-motion behavior, and text contrast reviewed.
- [ ] Conflict and Human Adjudication states reviewed for semantic correctness.
- [ ] Production/Preview environment uses an approved reachable HTTPS runtime endpoint.
- [ ] Integrated browser E2E and any on-chain evidence are reported separately and only after actual execution.

## Local check

From the repository root, start the API with `npm run api:m4`. In another terminal:

```sh
cd frontend
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm dev
```

This document is an acceptance record and does not mark any unchecked gate as passed.
