# LASTRO M4 Frontend

Public, read-only Next.js frontend candidate for the canonical LASTRO M4 runtime.

## Architecture

`Browser → Next.js UI → same-origin /api/m4/competency → canonical M4 runtime`

The browser does not create evidence, interpret it as authority, calculate verification or consensus, transition competency state, sign transactions, or create attestations. The current Ana scenario is synthetic and is labelled as such. If the canonical runtime is unavailable, the UI fails closed; there is no fixture fallback.

## Local development

Requirements: Node.js 22 and pnpm 12.3.4.

1. From this directory, install dependencies with `pnpm install --frozen-lockfile`.
2. Start the canonical runtime from the repository root in another terminal: `npm run api:m4`.
3. Run `pnpm dev` here.
4. Open `http://localhost:3000`.

Local development defaults to the M4 runtime at `http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana`. To override it, set the server-only variable `LASTRO_M4_RUNTIME_URL`.

## Validation

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
```

## Deployment boundary

For Preview or Production, configure `LASTRO_M4_RUNTIME_URL` to the full, externally reachable HTTPS endpoint of the canonical runtime. The Next.js API route rejects missing production configuration and non-HTTPS production URLs. Do not use a laptop, localhost, temporary tunnel, or undocumented public service as the deployed upstream.

Never put signer secrets or `SOLANA_PRIVATE_KEY` in this frontend. It is read-only. No deployment, integrated E2E, or fresh on-chain proof is claimed by the existence of this UI.
