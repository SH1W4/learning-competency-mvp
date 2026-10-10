import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const LOCAL_RUNTIME_URL = 'http://127.0.0.1:8787/api/m4/competency?scenario=synthetic-ana'

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
    const upstream = await fetch(parsedRuntimeUrl, { cache: 'no-store', signal: AbortSignal.timeout(5000) })
    const body = await upstream.text()
    return new Response(body, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') ?? 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'canonical_runtime_unavailable', message: 'The canonical M4 runtime could not be reached. No local fixture fallback is provided.' },
      { status: 503, headers: { 'cache-control': 'no-store' } },
    )
  }
}
