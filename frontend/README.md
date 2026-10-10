# LASTRO M4 Frontend

Public, read-only Next.js frontend candidate for the canonical LASTRO M4 runtime.

## Architecture

`Browser → Next.js UI → same-origin /api/m4/competency → canonical M4 runtime`

The browser does not create evidence, interpret it as authority, calculate verification or consensus, transition competency state, sign transactions, or create attestations. The current Ana scenario is synthetic and is labelled as such. If the canonical runtime is unavailable, the UI fails closed; there is no fixture fallback.

## Local development

Requirements: Node.js 22 and pnpm 10.12.1.

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

## Deployment boundary (Instruções para Vercel)

**Para JP Fernandes / Equipe de Frontend:**
Para que o site funcione corretamente na Vercel e não retorne erro 404 ou 503, garanta que a Vercel esteja configurada da seguinte forma:

1. **Root Directory:** Nas configurações do projeto na Vercel (`Settings > General > Root Directory`), o valor deve ser obrigatoriamente `frontend`.
2. **Environment Variables:** O frontend **nunca** usa dados mockados (fixtures) em produção. Para que a tela funcione, vá em `Settings > Environment Variables` e adicione a variável:
   - **Chave:** `LASTRO_M4_RUNTIME_URL`
   - **Valor:** `[URL HTTPS do seu Backend M4 Canônico / Cloudflare Worker]`
   > *Nota: O backend M4 (A API que o Next.js vai consultar) precisa estar rodando online em uma URL HTTPS. Não coloque localhost.*

### Como plugar as suas novas telas
A infraestrutura (Tailwind, Next.js App Router, Proxy API) já está 100% pronta. Para adicionar novas telas (Ex: Login, Dashboard), basta criar as pastas padrão do Next.js (ex: `app/login/page.tsx`) e injetar o seu CSS lá dentro. O domínio oficial da Vercel (`lastro-learn.vercel.app`) está sincronizado com a branch `main`.

Never put signer secrets or `SOLANA_PRIVATE_KEY` in this frontend. It is read-only. No deployment, integrated E2E, or fresh on-chain proof is claimed by the existence of this UI.
