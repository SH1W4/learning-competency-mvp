# M4 Frontend Vertical Slice — Public Integration Record

**Status:** implementation slice; integration and visual acceptance pending  
**Canonical implementation:** `frontend/` in this repository  
**Product/runtime authority:** this repository

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
- a verified deployed canonical runtime integration;
- new Solana transaction or on-chain proof;
- commercial validation, adoption, or product-market fit.

## Acceptance gates

### Verified on the PR head
- [x] Frozen-lockfile install, TypeScript typecheck, and Next.js production build pass in the recorded GitHub Actions runs for the previously inspected PR head.

### Not yet evidenced as executed
- [ ] Invalid scenario returns HTTP 400 with `unsupported_scenario`.
- [ ] Runtime unavailable state returns HTTP 503 without fixture substitution.
- [ ] Runtime available response is compared with the direct canonical M4 response.
- [ ] Browser walkthrough at mobile (<768 px), tablet (768–1199 px), and desktop (≥1200 px).
- [ ] Keyboard navigation, visible focus, zoom, reduced-motion behavior, and text contrast reviewed.
- [ ] Conflict and Human Adjudication states reviewed for semantic correctness.
- [ ] Production/Preview environment is configured with an approved, reachable HTTPS runtime endpoint and a successful response verified.
- [ ] Integrated browser E2E and any on-chain evidence are reported separately and only after actual execution.

**Observed deployment evidence:** the screenshot provided for `https://lastro-learn.vercel.app` shows the M4 interface loading but reporting HTTP 503, “Runtime not connected.” Therefore the deployment is not evidence of a successful runtime integration. Confirm that this Vercel project/domain is intended to serve the M4 frontend; it is not the Erick Learn workflow shown in his prototype description.

## Deploying the canonical M4 runtime

The repository now includes a Render Blueprint at `render.yaml` and a `/health` endpoint in `src/http/server.ts`.

1. In Render, create a new Blueprint/Web Service from this repository and select the branch containing these runtime changes.
2. Use the repository root as the service root (do not set `frontend/` as the root). Render should read `render.yaml`.
3. Confirm the service build command is `npm install --include=dev` and start command is `npm run api:m4`.
4. Wait for the deploy to become healthy. Verify `https://<render-service-host>/health` returns HTTP 200 and JSON with `status: "ok"`.
5. Verify `https://<render-service-host>/api/m4/competency?scenario=synthetic-ana` returns HTTP 200 JSON and `synthetic: true`. Attestation and public verification are expected to be null in this synthetic projection; do not claim an on-chain proof.
6. In the Vercel project serving the M4 frontend, configure the server-side environment variable `LASTRO_M4_RUNTIME_URL` to the full HTTPS URL in step 5, including the path and query string. Do not use localhost and do not expose secrets in `NEXT_PUBLIC_*` variables.
7. Redeploy the Vercel frontend after setting the variable.
8. Verify `https://lastro-learn.vercel.app/api/m4/competency?scenario=synthetic-ana` returns HTTP 200, then open the UI and confirm the synthetic Ana projection renders. If the Vercel project is intended for Erick's Learn workflow instead, stop here and correct the Vercel project/domain association rather than wiring the M4 runtime into the wrong app.

**Hosting caveat:** the Blueprint currently selects Render's free plan for initial integration testing. Free services can sleep and cold-start, so this is not a reliability guarantee for a live demo; a cold start may exceed the frontend proxy's 5-second timeout. For a time-critical public demo, use an always-on runtime plan or adjust and test timeout budgets end-to-end before claiming reliability. Do not incur paid hosting without explicit approval.

## Reproducible local integration check

Run from the repository root. This requires the repository's canonical runtime dependencies to be installed.

Terminal 1 — start the canonical M4 runtime:

```sh
npm install
npm run api:m4
```

Confirm the runtime responds before testing the frontend:

```sh
curl -i 'http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana'
```

Terminal 2 — install and start the frontend with the local runtime explicitly configured:

```sh
cd frontend
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
LASTRO_M4_RUNTIME_URL='http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana' pnpm dev
```

Terminal 3 — verify the same-origin proxy and the invalid-scenario guard:

```sh
curl -i 'http://localhost:3000/api/m4/competency?scenario=synthetic-ana'
curl -i 'http://localhost:3000/api/m4/competency?scenario=unsupported'
```

Expected: the supported scenario returns the canonical runtime's status/body; the unsupported scenario returns HTTP 400 with `unsupported_scenario`. Compare the proxy JSON with the direct runtime JSON; do not treat HTTP 200 alone as proof of semantic correctness.

To verify fail-closed behavior, stop the runtime process and repeat the supported-scenario request. Expected: HTTP 503 with `canonical_runtime_unavailable`, with no fixture substitution. Restart the runtime after the check.

The local HTTP endpoint is for development only. Production must use a reachable HTTPS endpoint in `LASTRO_M4_RUNTIME_URL`. A localhost endpoint on a developer machine is not reachable by a deployed Vercel function.

This procedure is a reproducible test plan, not evidence that the checks have already been executed. Mark a gate complete only after the corresponding command/browser check has actually passed and its result is recorded.
