import { spawn } from 'node:child_process'

const port = 3187
const origin = `http://127.0.0.1:${port}`
const env = { ...process.env, NODE_ENV: 'production', PORT: String(port) }
delete env.LASTRO_M4_RUNTIME_URL

const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], {
  cwd: process.cwd(),
  env,
  stdio: 'ignore',
})

async function stop() {
  if (server.exitCode !== null) return
  server.kill('SIGTERM')
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ])
  if (server.exitCode === null) server.kill('SIGKILL')
}

async function waitForReady() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) throw new Error(`Next.js exited early with code ${server.exitCode}`)
    try {
      const response = await fetch(origin, { signal: AbortSignal.timeout(1500) })
      if (response.status === 200) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error('Next.js production server did not become ready in 20 seconds')
}

try {
  await waitForReady()

  const page = await fetch(origin)
  if (page.status !== 200) throw new Error(`UI smoke failed: GET / returned ${page.status}`)

  const invalid = await fetch(`${origin}/api/m4/competency?scenario=invalid`)
  const invalidBody = await invalid.json()
  if (invalid.status !== 400 || invalidBody.error !== 'unsupported_scenario') {
    throw new Error(`API invalid-scenario gate failed: HTTP ${invalid.status}, ${JSON.stringify(invalidBody)}`)
  }

  const unavailable = await fetch(`${origin}/api/m4/competency?scenario=synthetic-ana`)
  const unavailableBody = await unavailable.json()
  if (unavailable.status !== 503 || unavailableBody.error !== 'canonical_runtime_not_configured') {
    throw new Error(`API fail-closed gate failed: HTTP ${unavailable.status}, ${JSON.stringify(unavailableBody)}`)
  }

  console.log('PASS UI production route: HTTP 200')
  console.log('PASS API invalid scenario: HTTP 400 / unsupported_scenario')
  console.log('PASS API missing canonical runtime: HTTP 503 / canonical_runtime_not_configured')
  console.log('PASS no fixture fallback when canonical runtime is not configured')
} finally {
  await stop()
}
