import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Allow the proxy to wait for the Render free instance to wake up.
// This is separate from the upstream fetch timeout below.
export const maxDuration = 60

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isOneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === 'string' && values.includes(value as T)
}

function isValidRuntimePayload(value: unknown): boolean {
  if (!isRecord(value) || value.synthetic !== true) return false
  if (!isRecord(value.consensus) || !isOneOf(value.consensus.status, ['AGREEMENT', 'INSUFFICIENT_EVIDENCE', 'CONFLICT'] as const)) return false
  if (typeof value.consensus.can_auto_advance !== 'boolean' || typeof value.consensus.requires_adjudication !== 'boolean') return false
  if (!Array.isArray(value.consensus.criteria)) return false
  if (!isRecord(value.resolution) ||
      !isOneOf(value.resolution.status, ['NOT_REQUIRED', 'PENDING', 'RESOLVED'] as const) ||
      !isOneOf(value.resolution.mechanism, ['consensus', 'human_adjudication', 'none'] as const) ||
      !(value.resolution.outcome === null || isOneOf(value.resolution.outcome, ['ESTABLISHED', 'NOT_ESTABLISHED', 'INSUFFICIENT_EVIDENCE', 'CONFLICT', 'REQUIRES_VERIFICATION'] as const))) return false
  if (!isRecord(value.competency_state) ||
      typeof value.competency_state.adapter_version !== 'string' ||
      !(value.competency_state.value === null || isOneOf(value.competency_state.value, ['ESTABLISHED', 'NOT_ESTABLISHED', 'INSUFFICIENT_EVIDENCE', 'CONFLICT', 'REQUIRES_VERIFICATION'] as const)) ||
      !isOneOf(value.competency_state.mapping_status, ['MAPPED', 'UNMAPPED', 'INCONSISTENT'] as const) ||
      typeof value.competency_state.reason !== 'string') return false
  if (!isRecord(value.state) ||
      !isOneOf(value.state.value, ['NOT_STARTED', 'IN_DEVELOPMENT', 'UNDER_REVIEW', 'DEMONSTRATED'] as const) ||
      !Array.isArray(value.state.history)) return false
  if (value.attestation !== null || value.public_verification !== null) return false
  return true
}

const LOCAL_RUNTIME_URL = 'http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana'
// Render's free instance can take ~40s to wake. Keep a small margin while
// remaining below this route's maxDuration. A timeout still fails closed.
const UPSTREAM_TIMEOUT_MS = 45_000

export async function GET(request: Request) {
  const incoming = new URL(request.url)
  if (incoming.searchParams.get('scenario') !== 'synthetic-ana') {
    return NextResponse.json({ error: 'unsupported_scenario' }, { status: 400 })
  }

  // localhost is only a development default. A deployed Vercel function cannot
  // reach the developer's laptop; production must explicitly configure an HTTPS
  // endpoint for the canonical runtime.
  const configuredUrl = process.env.LASTRO_M4_RUNTIME_URL
  const runtimeUrl = configuredUrl ?? (process.env.NODE_ENV === 'production' ? null : LOCAL_RUNTIME_URL)

  if (!runtimeUrl) {
    return NextResponse.json(
      {
        error: 'canonical_runtime_not_configured',
        message: 'Set LASTRO_M4_RUNTIME_URL to the reachable canonical M4 endpoint. Production never falls back to localhost or fixtures.',
      },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    )
  }

  let parsedRuntimeUrl: URL
  try {
    parsedRuntimeUrl = new URL(runtimeUrl)
  } catch {
    return NextResponse.json(
      { error: 'invalid_runtime_url', message: 'LASTRO_M4_RUNTIME_URL must be an absolute URL to the canonical M4 endpoint.' },
      { status: 500, headers: { 'cache-control': 'no-store' } },
    )
  }

  if (process.env.NODE_ENV === 'production' && parsedRuntimeUrl.protocol !== 'https:') {
    return NextResponse.json(
      { error: 'insecure_runtime_url', message: 'Production requires an HTTPS canonical runtime endpoint.' },
      { status: 500, headers: { 'cache-control': 'no-store' } },
    )
  }

  try {
    const upstream = await fetch(parsedRuntimeUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
    const body = await upstream.text()

    if (!upstream.ok) {
      return new Response(body, {
        status: upstream.status,
        headers: {
          'content-type': upstream.headers.get('content-type') ?? 'application/json; charset=utf-8',
          'cache-control': 'no-store',
        },
      })
    }

    let payload: unknown
    try {
      payload = JSON.parse(body)
    } catch {
      return NextResponse.json(
        { error: 'invalid_canonical_runtime_payload', message: 'The canonical runtime returned invalid JSON.' },
        { status: 502, headers: { 'cache-control': 'no-store' } },
      )
    }

    if (!isValidRuntimePayload(payload)) {
      return NextResponse.json(
        { error: 'invalid_canonical_runtime_payload', message: 'The canonical runtime response does not match the M4 contract.' },
        { status: 502, headers: { 'cache-control': 'no-store' } },
      )
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: { 'cache-control': 'no-store' },
    })
  } catch {
    return NextResponse.json(
      { error: 'canonical_runtime_unavailable', message: 'The canonical M4 runtime could not be reached within the proxy timeout. No local fixture fallback is provided.' },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    )
  }
}
