/**
 * LASTRO — Official M4 Competency API
 *
 * This route is the canonical, self-contained source of M4 projection data.
 * It does NOT depend on any external runtime (Render, Vercel, etc.).
 *
 * Strategy (in priority order):
 *  1. If LASTRO_M4_RUNTIME_URL is set → proxy to that HTTPS endpoint (production override)
 *  2. In development → proxy to local runtime at 127.0.0.1:8787 (npm run api:m4)
 *  3. Fallback → serve the built-in synthetic fixture below (fully self-contained)
 *
 * The built-in fixture mirrors exactly what buildM4SyntheticProjection() produces,
 * so the UI is always functional even when no separate runtime process is running.
 */

import { NextResponse } from 'next/server'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const LOCAL_RUNTIME_URL = 'http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana'

function resolveLatestAttestation() {
  const candidatePaths = [
    resolve(process.cwd(), 'out', 'm4-attestation-verification.json'),
    resolve(process.cwd(), '..', 'out', 'm4-attestation-verification.json'),
  ]
  for (const p of candidatePaths) {
    try {
      if (existsSync(p)) {
        const raw = JSON.parse(readFileSync(p, 'utf-8'))
        if (raw.signature) {
          return {
            attestation: {
              version: raw.record_version ?? 'm3.attestation.v2',
              record_hash: raw.record_hash,
              tx_signature: raw.signature,
              network: raw.network ?? 'devnet',
              verified: raw.verified ?? true,
            },
            public_verification: {
              href: raw.explorer_url ?? `https://explorer.solana.com/tx/${raw.signature}?cluster=devnet`,
              label: 'Solana Explorer (Devnet)',
            },
          }
        }
      }
    } catch {
      // ignore
    }
  }

  // Canonical fallback anchored on Solana Devnet
  return {
    attestation: {
      version: 'm3.attestation.v2',
      record_hash: '66b7ce865dc44f0f638c99da264a627d053a02e4c7ab865eef352dfa732e8f0b',
      tx_signature: '6mSva1n9oNLkFuFpKfM18BxpqbVF2t8PdkoEWiyzdDT8X3xYfean7n7PVQrNEKVaZBtc91xq59A8FuWAnWyf9Rn',
      network: 'devnet',
      verified: true,
    },
    public_verification: {
      href: 'https://explorer.solana.com/tx/6mSva1n9oNLkFuFpKfM18BxpqbVF2t8PdkoEWiyzdDT8X3xYfean7n7PVQrNEKVaZBtc91xq59A8FuWAnWyf9Rn?cluster=devnet',
      label: 'Solana Explorer (Devnet)',
    },
  }
}

// ─── Built-in synthetic fixture (canonical fallback) ─────────────────────────
// Matches the shape of M4Projection exactly. Used when no external runtime is
// reachable. This is NOT a stub — it is the deterministic output of the LASTRO
// M4 pipeline run against the Ana synthetic scenario.
const latestAttestation = resolveLatestAttestation()
const BUILTIN_FIXTURE = {
  synthetic: true,
  competency: {
    id: 'comp:data-analysis-reproducible',
    statement:
      'Use AI tools to transform a business question into reproducible data analysis and communicate conclusions backed by evidence.',
    criteria: [
      {
        id: 'C1',
        title: 'Analytical Formulation',
        observables: [
          'transforms a business question into a clear analytical question',
          'defines what it intends to answer',
        ],
      },
      {
        id: 'C2',
        title: 'Data Treatment and Analysis',
        observables: [
          'identifies and prepares the necessary data',
          'runs analysis consistent with the question',
          'records enough steps for reproducibility',
        ],
      },
      {
        id: 'C3',
        title: 'Evidence and Support',
        observables: [
          'presents results backed by data',
          'distinguishes observation, interpretation and limitation',
          'avoids conclusions not supported by the presented material',
        ],
      },
      {
        id: 'C4',
        title: 'Communication',
        observables: [
          'communicates result, context and limitations in a comprehensible way for the defined audience',
        ],
      },
    ],
  },
  trail: {
    id: 'trail:applied-data-analysis',
    title: 'Applied Data Analysis Trail',
    activities: [
      {
        id: 'A1',
        title: 'Formulate the question',
        objective: 'transform a business problem into an analytical question',
        expectedEvidence: ['briefing'],
        criteria: ['C1'],
      },
      {
        id: 'A2',
        title: 'Prepare and explore the data',
        objective: 'prepare the dataset and identify relevant patterns',
        expectedEvidence: ['analysis_artifact'],
        criteria: ['C2'],
      },
      {
        id: 'A3',
        title: 'Run reproducible analysis',
        objective: 'answer the analytical question through a reproducible analysis',
        expectedEvidence: ['analysis_artifact', 'analysis_result'],
        criteria: ['C2', 'C3'],
      },
      {
        id: 'A4',
        title: 'Communicate the result',
        objective: 'turn the analysis into a useful communication for decision-making',
        expectedEvidence: ['communication'],
        criteria: ['C3', 'C4'],
      },
    ],
  },
  evidence: [
    {
      evidence_id: 'ev_c7985fbc',
      type: 'analysis_artifact',
      activity_id: 'A3',
      source_ref: 'fixtures/synthetic/ana/a3_analysis.py',
      content_ref: 'sha256:bc9e38d8f3f431b7c5ca7575b7c8440dcbfc810c15a810d07fa472615af50a90',
      trust_level: 'N3_EVIDENCE_ANALYZED',
      synthetic: true,
    },
    {
      evidence_id: 'ev_39c73c91',
      type: 'briefing',
      activity_id: 'A1',
      source_ref: 'fixtures/synthetic/ana/a1_briefing.md',
      content_ref: 'sha256:76a4430c03a0c9c7d530d9e049a31764648976bd15dd0cca3e2d5a6ee583afde',
      trust_level: 'N3_EVIDENCE_ANALYZED',
      synthetic: true,
    },
    {
      evidence_id: 'ev_3d249c1c',
      type: 'analysis_artifact',
      activity_id: 'A2',
      source_ref: 'fixtures/synthetic/ana/a2_preparation.ipynb',
      content_ref: 'sha256:1fe68ec44149a58c0e6592d99c53cc88d7db5549eb26ec1b1b10d6c40d84cf00',
      trust_level: 'N3_EVIDENCE_ANALYZED',
      synthetic: true,
    },
    {
      evidence_id: 'ev_991de33c',
      type: 'analysis_result',
      activity_id: 'A3',
      source_ref: 'fixtures/synthetic/ana/a3_results.md',
      content_ref: 'sha256:8537b9592038bba328753aa83d33adb7b39b77d226061ce19b9d7912af0d25e8',
      trust_level: 'N3_EVIDENCE_ANALYZED',
      synthetic: true,
    },
    {
      evidence_id: 'ev_3fc2d0d1',
      type: 'communication',
      activity_id: 'A4',
      source_ref: 'fixtures/synthetic/ana/a4_synthesis.md',
      content_ref: 'sha256:447484b4356884e1771f53cf67eb68274936655d3e99a35a04e5b1a54932ee7e',
      trust_level: 'N3_EVIDENCE_ANALYZED',
      synthetic: true,
    },
  ],
  interpretation: {
    id: 'int_855770ca',
    model: 'local/heuristic-presence-v1',
    signals: [
      { signal_id: 'sig_C1_1', criterion_id: 'C1', support: 'supports', confidence: 0.9, evidence_refs: ['ev_39c73c91'] },
      { signal_id: 'sig_C2_2', criterion_id: 'C2', support: 'supports', confidence: 0.88, evidence_refs: ['ev_c7985fbc', 'ev_3d249c1c'] },
      { signal_id: 'sig_C3_3', criterion_id: 'C3', support: 'supports', confidence: 0.85, evidence_refs: ['ev_991de33c', 'ev_3fc2d0d1'] },
      { signal_id: 'sig_C4_4', criterion_id: 'C4', support: 'supports', confidence: 0.91, evidence_refs: ['ev_3fc2d0d1'] },
    ],
  },
  verification: {
    mechanisms: [
      {
        mechanism: 'evidence_integrity',
        criterion_id: 'C1',
        status: 'PASS',
        rationale: '1 eligible evidence item(s) with verified content integrity',
      },
      {
        mechanism: 'deterministic_criteria',
        criterion_id: 'C1',
        status: 'PASS',
        rationale: 'all activities required by the contract have eligible evidence: A1',
      },
      {
        mechanism: 'ai_interpretation',
        criterion_id: 'C1',
        status: 'PASS',
        rationale: 'interpretive assessment: supports',
      },
    ],
  },
  consensus: {
    status: 'AGREEMENT',
    criteria: [
      { criterion_id: 'C1', status: 'AGREEMENT', verifications: [] },
      { criterion_id: 'C2', status: 'AGREEMENT', verifications: [] },
      { criterion_id: 'C3', status: 'AGREEMENT', verifications: [] },
      { criterion_id: 'C4', status: 'AGREEMENT', verifications: [] },
    ],
    can_auto_advance: true,
    requires_adjudication: false,
  },
  state: {
    value: 'DEMONSTRATED',
    history: [
      {
        from: 'NOT_STARTED', to: 'IN_DEVELOPMENT',
        at: '2026-10-14T00:00:00.000Z', by: 'system', actor: 'pipeline',
        reason: 'first evidence received (ev_c7985fbc)',
      },
      {
        from: 'IN_DEVELOPMENT', to: 'UNDER_REVIEW',
        at: '2026-10-14T00:00:01.000Z', by: 'system', actor: 'pipeline',
        reason: 'trail complete; interpretation int_855770ca ready for verification and consensus',
      },
      {
        from: 'UNDER_REVIEW', to: 'DEMONSTRATED',
        at: '2026-10-14T00:00:02.000Z', by: 'consensus', actor: 'consensus-core',
        reason: 'independent verifications converged for all criteria',
      },
    ],
  },
  handoff: {
    record_version: 'm2.reviewed-state.v1',
    record_hash: '66b7ce865dc44f0f638c99da264a627d053a02e4c7ab865eef352dfa732e8f0b',
    competency_id: 'comp:data-analysis-reproducible',
    state: 'DEMONSTRATED',
    decision_mode: 'consensus',
  },
  reviewed_state_record: {
    record_version: 'm2.reviewed-state.v1',
    synthetic: true,
    subject: 'person:ana-synthetic',
    competency_id: 'comp:data-analysis-reproducible',
    state: 'DEMONSTRATED',
    decision: { mode: 'consensus', decided_at: '2026-10-14T00:00:02.000Z', confirm_demonstrated: true },
    record_hash: '66b7ce865dc44f0f638c99da264a627d053a02e4c7ab865eef352dfa732e8f0b',
  },
  attestation: latestAttestation.attestation,
  public_verification: latestAttestation.public_verification,
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  const incoming = new URL(request.url)
  if (incoming.searchParams.get('scenario') !== 'synthetic-ana') {
    return NextResponse.json({ error: 'unsupported_scenario' }, { status: 400 })
  }

  // Priority 1: explicit runtime URL (configured in Vercel for Preview/Production).
  // Accept either the service origin or the full competency endpoint.
  const configuredUrl = process.env.LASTRO_M4_RUNTIME_URL
  const isDev = process.env.NODE_ENV !== 'production'

  let normalizedConfiguredUrl: string | null = null
  if (configuredUrl) {
    const endpoint = new URL(configuredUrl)
    if (endpoint.pathname === '/' || endpoint.pathname === '') {
      endpoint.pathname = '/api/m4/competency'
    }
    if (!endpoint.searchParams.has('scenario')) {
      endpoint.searchParams.set('scenario', 'synthetic-ana')
    }
    normalizedConfiguredUrl = endpoint.toString()
  }

  // In development only, default to the local M4 runtime.
  const runtimeUrl = normalizedConfiguredUrl ?? (isDev ? LOCAL_RUNTIME_URL : null)

  if (runtimeUrl) {
    try {
      const upstream = await fetch(runtimeUrl, {
        cache: 'no-store',
        signal: AbortSignal.timeout(5000),
      })

      if (upstream.ok) {
        const body = await upstream.text()
        return new Response(body, {
          status: upstream.status,
          headers: {
            'content-type':
              upstream.headers.get('content-type') ??
              'application/json; charset=utf-8',
            'cache-control': 'no-store',
            'x-lastro-source': 'external-runtime',
          },
        })
      }

      // Do not hide an upstream HTTP error behind a fixture in production.
      if (!isDev) {
        return NextResponse.json(
          {
            error: 'runtime_upstream_error',
            upstream_status: upstream.status,
          },
          {
            status: 502,
            headers: {
              'cache-control': 'no-store',
              'x-lastro-source': 'external-runtime-error',
            },
          },
        )
      }
    } catch {
      // Development may fall back to the fixture; production must fail closed.
      if (!isDev) {
        return NextResponse.json(
          { error: 'runtime_unavailable' },
          {
            status: 503,
            headers: {
              'cache-control': 'no-store',
              'x-lastro-source': 'external-runtime-error',
            },
          },
        )
      }
    }
  }

  // Production must never silently serve a built-in fixture.
  if (!isDev) {
    return NextResponse.json(
      { error: 'runtime_not_configured' },
      {
        status: 503,
        headers: {
          'cache-control': 'no-store',
          'x-lastro-source': 'runtime-not-configured',
        },
      },
    )
  }

  // Development-only fallback.
  return NextResponse.json(BUILTIN_FIXTURE, {
    status: 200,
    headers: {
      'cache-control': 'no-store',
      'x-lastro-source': 'builtin-fixture',
    },
  })
}
