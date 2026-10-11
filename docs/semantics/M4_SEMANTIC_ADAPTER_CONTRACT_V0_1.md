# M4 Semantic Adapter Contract v0.1.0

**Status:** Implementation contract for review; not a certification of LASTRO Protocol conformance.  
**Adapter:** `lastro-competency-adapter/0.1.0`  
**Scope:** Public Learning Competency MVP M4 projection only.

## 1. Concept boundaries

The runtime response MUST keep these fields separate:

- `consensus.status`: one of `AGREEMENT`, `INSUFFICIENT_EVIDENCE`, `CONFLICT`.
- `resolution`: explicit status, mechanism, and outcome. Human adjudication belongs here as a mechanism/exception path, not as a consensus outcome.
- `state.value`: existing product/workflow state (`NOT_STARTED`, `IN_DEVELOPMENT`, `UNDER_REVIEW`, `DEMONSTRATED`).
- `competency_state.value`: canonical profile vocabulary when an explicit resolution supports it; otherwise `null`.
- `attestation` and `public_verification`: remain `null` for this synthetic M4 projection.

A consensus result is not itself the bounded competency state. A product label is not proof of canonical state. A state is not an attestation.

## 2. Product-state treatment

| Product state | Direct mapping to canonical competency state | Contract |
|---|---|---|
| `NOT_STARTED` | None | Means product workflow has not started. It MUST NOT be converted to `NOT_ESTABLISHED` or `INSUFFICIENT_EVIDENCE` without an explicit resolution. |
| `IN_DEVELOPMENT` | None | Product/workflow status only. A canonical state requires explicit resolution. |
| `UNDER_REVIEW` | None | Workflow status only. It MUST NOT be modeled as a consensus outcome or automatically become `REQUIRES_VERIFICATION`. |
| `DEMONSTRATED` | Conditional: `ESTABLISHED` | Allowed only when verification is complete, consensus is `AGREEMENT`, and an explicit resolved outcome is `ESTABLISHED`. Otherwise the adapter returns no canonical state or an inconsistency. |

The adapter maps from the explicit resolution outcome, not from a product-state enum lookup. It rejects a `DEMONSTRATED` product state paired with any resolved outcome other than `ESTABLISHED`.

## 3. Canonical profile states

The adapter accepts the profile vocabulary:

- `ESTABLISHED`
- `NOT_ESTABLISHED`
- `INSUFFICIENT_EVIDENCE`
- `CONFLICT`
- `REQUIRES_VERIFICATION`

A value is emitted only when verification is complete and resolution status is `RESOLVED`, except that unresolved conflicts and pending resolution intentionally emit `null` or an explicit unmapped result rather than fabricating a final state.

## 4. Consensus and resolution rules

1. `HUMAN_ADJUDICATION` is not a valid `consensus.status`.
2. A human adjudication follows `CONFLICT`; the original consensus result remains `CONFLICT` for provenance.
3. The adjudication record and resulting state are separate fields/records.
4. `AGREEMENT` paired with `human_adjudication` or an outcome other than `ESTABLISHED` is inconsistent under the current MVP semantics.
5. `INSUFFICIENT_EVIDENCE` cannot be silently mapped to `ESTABLISHED`.
6. A conflict without an explicit resolution cannot become agreement or a demonstrated state.
7. `SOURCE_UNAVAILABLE` is a transport/acquisition failure, not a competency state. The current adapter does not represent source outage as an enum; API/proxy errors must remain distinct from a successful competency projection.

## 5. API error behavior

- Unsupported scenario at the Vercel proxy: HTTP 400.
- Canonical runtime not configured or unreachable: HTTP 503.
- Malformed JSON or a successful upstream response that violates the M4 semantic payload contract: HTTP 502.
- Runtime route does not accept unknown scenarios; direct unmatched runtime requests return HTTP 404.
- No fixture fallback is permitted when the canonical runtime is unavailable.

## 6. Executable coverage

- `tests/semantics/competency-adapter.test.ts`: 15 focused contract tests.
- `tests/http/m4-runtime.integration.test.ts`: runtime health, unsupported scenario, and separated semantic fields.
- `tests/adjudication.test.ts`: conflict remains the consensus result after adjudication.
- CI workflow `.github/workflows/m4-semantic-gates.yml`: Vitest, TypeScript typecheck, frontend typecheck/build, and production dependency audit.

A test passing demonstrates only the assertion it exercises. It does not establish real-world verifier independence, on-chain attestation, or full end-to-end conformance.
