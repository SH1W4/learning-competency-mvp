'use client'

import { useEffect, useState } from 'react'

type Verification = {
  mechanism: 'evidence_integrity' | 'deterministic_criteria' | 'ai_interpretation'
  criterion_id: string
  status: 'PASS' | 'FAIL'
  rationale: string
}
type M4Projection = {
  synthetic: boolean
  competency: { id: string; statement: string; criteria: Array<{ id: string; title: string; observables: string[] }> }
  trail: { id: string; title: string; activities: Array<{ id: string; title: string; objective: string; expectedEvidence: string[]; criteria: string[] }> }
  evidence: Array<{ evidence_id: string; type: string; activity_id: string; source_ref: string; content_ref: string; trust_level: string; synthetic: boolean }>
  interpretation: { id: string; model: string; signals: Array<{ signal_id: string; criterion_id: string; support: string; confidence: number; evidence_refs: string[] }> }
  verification: { mechanisms: Verification[] }
  consensus: { status: 'AGREEMENT' | 'INSUFFICIENT_EVIDENCE' | 'CONFLICT' | 'HUMAN_ADJUDICATION'; can_auto_advance: boolean; requires_adjudication: boolean }
  state: { value: 'NOT_STARTED' | 'IN_DEVELOPMENT' | 'UNDER_REVIEW' | 'DEMONSTRATED'; history: unknown[] }
  handoff: { record_version: string; record_hash: string; competency_id: string; state: string; decision_mode: string }
  attestation: null | { version: string; record_hash: string; tx_signature?: string; network?: string; verified?: boolean }
  public_verification: null | { href: string; label: string }
}

const mechanismNames: Record<Verification['mechanism'], string> = {
  evidence_integrity: 'Evidence Integrity',
  deterministic_criteria: 'Deterministic Criteria',
  ai_interpretation: 'AI Interpretation',
}

const consensusDescriptions: Record<M4Projection['consensus']['status'], string> = {
  AGREEMENT: 'The mechanisms reported agreement. The state is displayed separately and is not recalculated by the interface.',
  INSUFFICIENT_EVIDENCE: 'The available evidence was deemed insufficient by the runtime. Do not interpret this result as a demonstration.',
  CONFLICT: 'Conflict reported. Auto-advancement must remain blocked; this interface does not resolve the conflict.',
  HUMAN_ADJUDICATION: 'The runtime indicates human adjudication is required. This interface does not record or simulate a human decision.',
}

const stateLabels: Record<M4Projection['state']['value'], string> = {
  NOT_STARTED: 'Not Started',
  IN_DEVELOPMENT: 'In Development',
  UNDER_REVIEW: 'Under Review',
  DEMONSTRATED: 'Demonstrated',
}

class RuntimeRequestError extends Error {
  status: number
  code: string | null
  constructor(status: number, code: string | null) {
    super(`Runtime unavailable (HTTP ${status}).`)
    this.status = status
    this.code = code
  }
}

const runtimeErrorHints: Record<string, string> = {
  canonical_runtime_not_configured: 'The server has no canonical runtime endpoint configured yet.',
  canonical_runtime_unavailable: 'The canonical runtime could not be reached. It may still be starting up; wait about 30 seconds and try again.',
  insecure_runtime_url: 'The configured runtime endpoint is not HTTPS, which production requires.',
  invalid_runtime_url: 'The configured runtime endpoint is not a valid URL.',
  unsupported_scenario: 'The requested scenario is not supported by this interface.',
}

function explorerUrl(network: string | undefined, signature: string | undefined) {
  if (!network || !signature) return null
  const clusters: Record<string, string> = {
    devnet: 'devnet',
    'mainnet-beta': 'mainnet-beta',
    testnet: 'testnet',
  }
  const cluster = clusters[network.toLowerCase()]
  if (!cluster) return null
  return `https://explorer.solana.com/tx/${encodeURIComponent(signature)}?cluster=${cluster}`
}

export default function Page() {
  const [data, setData] = useState<M4Projection | null>(null)
  const [error, setError] = useState<{ message: string; hint: string | null } | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    fetch('/api/m4/competency?scenario=synthetic-ana', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          let code: string | null = null
          try {
            const body = (await response.json()) as { error?: unknown }
            if (typeof body.error === 'string') code = body.error
          } catch {
            // The body is not JSON; the HTTP status alone is reported.
          }
          throw new RuntimeRequestError(response.status, code)
        }
        return response.json() as Promise<M4Projection>
      })
      .then((projection) => setData(projection))
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        if (cause instanceof RuntimeRequestError) {
          setError({ message: cause.message, hint: cause.code ? (runtimeErrorHints[cause.code] ?? null) : null })
          return
        }
        setError({ message: 'Failed to fetch the canonical runtime.', hint: null })
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [attempt])

  const txUrl = explorerUrl(data?.attestation?.network, data?.attestation?.tx_signature)

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar" aria-label="Main Navigation">
        <a className="brand" href="#runtime" aria-label="LASTRO — Home">
          <strong className="brand-name">LASTRO</strong>
          <small className="brand-caption">VERIFIABLE CAPABILITIES.</small>
        </a>
        <nav className="nav-list" aria-label="Runtime sections">
          <a className="nav-item nav-item-active" href="#runtime" aria-current="page"><span>M4 · Runtime</span></a>
        </nav>
        <div className="sidebar-bottom">
          <span className="eyebrow">MODE</span>
          <span className="badge b-neutral">READ-ONLY</span>
        </div>
      </aside>

      <main className="main-area" id="main-content">
        <div className="page-content" id="runtime">
          <header className="page-heading runtime-heading">
            <div>
              <span className="eyebrow">M4 / CANONICAL RUNTIME</span>
              <h1>From evidence to proof.</h1>
              <p>The interface displays data received from the runtime. It does not create evidence, execute criteria, calculate consensus, or alter states.</p>
            </div>
            <span className="badge b-neutral">PROJECTION · READ-ONLY</span>
          </header>

          {loading && <section className="panel runtime-panel" role="status" aria-live="polite"><span className="eyebrow">CONNECTION</span><h2>Querying runtime…</h2><p>Waiting for canonical projection.</p></section>}
          {error && <section className="panel runtime-panel runtime-error" role="alert"><span className="eyebrow">CONNECTION</span><h2>Runtime not connected</h2><p>{error.message}</p>{error.hint ? <p>{error.hint}</p> : null}<p>No local data is used as a fallback.</p><button type="button" className="retry-button" onClick={() => setAttempt((n) => n + 1)}>Try again</button></section>}

          {data && <>
            <div className="data-notice" role="note">
              <strong>{data.synthetic ? 'Synthetic Scenario — Ana' : 'Competency Record'}</strong>
              <span>Source: canonical runtime. {data.synthetic ? 'This scenario is demonstrative; it does not constitute proof of external validation.' : 'The data below is presented as received.'}</span>
            </div>

            <section className="panel runtime-panel" aria-labelledby="competency-title">
              <span className="eyebrow">COMPETENCY · {data.competency.id}</span>
              <h2 id="competency-title">{data.competency.statement}</h2>
              <div className="runtime-state-grid">
                <div className="runtime-state-card runtime-state-current">
                  <span className="eyebrow">COMPETENCY STATE</span>
                  <strong>{stateLabels[data.state.value] ?? data.state.value}</strong>
                  <code>{data.state.value}</code>
                </div>
                <div className={`runtime-state-card runtime-consensus runtime-consensus-${data.consensus.status.toLowerCase().replaceAll('_', '-')}`}>
                  <span className="eyebrow">CONSENSUS RESULT</span>
                  <strong>{data.consensus.status}</strong>
                  <p>{consensusDescriptions[data.consensus.status]}</p>
                  <div className="runtime-consensus-meta">
                    <span>Reported auto-advancement: <strong>{data.consensus.can_auto_advance ? 'allowed' : 'blocked'}</strong></span>
                    <span>Human adjudication required: <strong>{data.consensus.requires_adjudication ? 'yes' : 'no'}</strong></span>
                  </div>
                </div>
              </div>
              {data.consensus.status === 'CONFLICT' || data.consensus.requires_adjudication ? (
                <aside className="runtime-exception" role="note">
                  <strong>Exceptional Human Review</strong>
                  <p>The runtime signals a conflict or required adjudication. No decision is made in this interface and the state is not advanced by it.</p>
                  {data.consensus.status === 'CONFLICT' && data.consensus.can_auto_advance ? <p><strong>Inconsistency reported:</strong> the result is CONFLICT, but the runtime reported auto-advancement as allowed. Do not treat this projection as authorization to advance the state; verify the runtime contract.</p> : null}
                </aside>
              ) : null}
              <div className="runtime-subsection">
                <span className="eyebrow">CANONICAL CRITERIA</span>
                {data.competency.criteria.map((criterion) => <article className="runtime-item" key={criterion.id}>
                  <strong>{criterion.id} · {criterion.title}</strong>
                  <ul>{criterion.observables.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>)}
              </div>
            </section>

            <section className="panel runtime-panel" aria-labelledby="trail-title">
              <span className="eyebrow">TRAIL · {data.trail.id}</span>
              <h2 id="trail-title">{data.trail.title}</h2>
              {data.trail.activities.map((activity) => <article className="runtime-item" key={activity.id}>
                <h3>{activity.id} · {activity.title}</h3>
                <p>{activity.objective}</p>
                <small>Expected evidence: {activity.expectedEvidence.join(', ') || 'Not reported by the runtime.'}</small>
              </article>)}
            </section>

            <section className="panel runtime-panel" aria-labelledby="evidence-title">
              <div className="runtime-section-heading">
                <div><span className="eyebrow">STEP 01 · SOURCE</span><h2 id="evidence-title">Evidence</h2></div>
                <span className="badge b-evidence">{data.evidence.length} reference(s)</span>
              </div>
              <p className="runtime-intro">References received from the runtime; their presence alone does not signify verified integrity or demonstrated competency.</p>
              {data.evidence.map((item) => <article className="runtime-evidence" key={item.evidence_id}>
                <div className="runtime-evidence-heading"><strong>{item.evidence_id}</strong><span className="badge b-evidence">{item.synthetic ? 'SYNTHETIC' : item.type}</span></div>
                <p>{item.type} · activity {item.activity_id} · source confidence: {item.trust_level}</p>
                <dl className="runtime-metadata">
                  <div><dt>Source reference</dt><dd>{item.source_ref}</dd></div>
                  <div><dt>Content reference</dt><dd>{item.content_ref}</dd></div>
                </dl>
              </article>)}
            </section>

            <section className="panel runtime-panel" aria-labelledby="integrity-title">
              <div className="runtime-section-heading">
                <div><span className="eyebrow">STEPS 02–03 · CHECKS</span><h2 id="integrity-title">Integrity and criteria</h2></div>
              </div>
              <p className="runtime-intro">Results from canonical mechanisms. The interface does not re-execute or recalculate the checks.</p>
              <div className="runtime-verification-list">
                {data.verification.mechanisms.filter((item) => item.mechanism !== 'ai_interpretation').map((item, index) => <article className="runtime-verification-card" key={`${item.mechanism}:${item.criterion_id}:${index}`}>
                  <div className="runtime-verification-heading"><span className="eyebrow">{mechanismNames[item.mechanism]}</span><span className={`badge ${item.status === 'PASS' ? 'b-state' : 'b-neutral'}`}>{item.status}</span></div>
                  <strong>Criterion {item.criterion_id}</strong><p>{item.rationale}</p>
                </article>)}
                {data.verification.mechanisms.filter((item) => item.mechanism !== 'ai_interpretation').length === 0 && <p>No integrity result or deterministic criterion was provided.</p>}
              </div>
            </section>

            <section className="panel runtime-panel" aria-labelledby="interpretation-title">
              <div className="runtime-section-heading">
                <div><span className="eyebrow">STEP 04 · INFERENCE</span><h2 id="interpretation-title">AI Interpretation</h2></div>
                <span className="badge b-ai">NOT A SOURCE FACT</span>
              </div>
              <p className="runtime-intro">Interpretative signals provided by the runtime. This layer does not replace evidence, deterministic criteria, consensus, or human decision.</p>
              <div className="runtime-interpretation-meta"><span>Interpretation: <code>{data.interpretation.id}</code></span><span>Model: <code>{data.interpretation.model}</code></span></div>
              {data.interpretation.signals.length ? data.interpretation.signals.map((signal) => <article className="runtime-signal" key={signal.signal_id}>
                <div className="runtime-evidence-heading"><strong>{signal.signal_id}</strong><span className="badge b-ai">Criterion {signal.criterion_id}</span></div>
                <p>{signal.support}</p>
                <p className="runtime-signal-confidence">Confidence reported by runtime: <strong>{signal.confidence}</strong></p>
                <div className="runtime-refs"><span className="eyebrow">ASSOCIATED REFERENCES</span>{signal.evidence_refs.length ? signal.evidence_refs.map((ref) => <code key={ref}>{ref}</code>) : <span>No associated reference provided.</span>}</div>
              </article>) : <p>No interpretative signal was provided by the runtime.</p>}
              {data.verification.mechanisms.filter((item) => item.mechanism === 'ai_interpretation').map((item, index) => <article className="runtime-verification-card runtime-ai-result" key={`ai:${item.criterion_id}:${index}`}>
                <div className="runtime-verification-heading"><span className="eyebrow">REPORTED RESULT · CRITERION {item.criterion_id}</span><span className="badge b-ai">{item.status}</span></div>
                <p>{item.rationale}</p>
              </article>)}
            </section>

            <section className="panel runtime-panel" aria-labelledby="history-title">
              <span className="eyebrow">STEP 06 · CANONICAL HISTORY</span>
              <h2 id="history-title">State transitions</h2>
              {data.state.history.length ? <ol className="runtime-history">{data.state.history.map((entry, index) => <li key={index}><pre>{JSON.stringify(entry, null, 2)}</pre></li>)}</ol> : <p>No transition history was provided by the runtime.</p>}
            </section>

            <section className="panel runtime-panel" aria-labelledby="handoff-title">
              <span className="eyebrow">HANDOFF · {data.handoff.record_version}</span>
              <h2 id="handoff-title">Revised state record</h2>
              <dl className="runtime-metadata">
                <div><dt>State in record</dt><dd>{data.handoff.state}</dd></div>
                <div><dt>Decision mode</dt><dd>{data.handoff.decision_mode}</dd></div>
                <div><dt>Competency ID</dt><dd>{data.handoff.competency_id}</dd></div>
                <div><dt>Record hash</dt><dd><code className="runtime-hash">{data.handoff.record_hash}</code></dd></div>
              </dl>
            </section>

            <section className="panel runtime-panel" aria-labelledby="attestation-title">
              <span className="eyebrow">STEPS 08–09 · PROOF</span>
              <h2 id="attestation-title">Attestation and public verification</h2>
              {data.attestation ? <>
                <div className="runtime-proof-status"><span className="badge b-attest">ATTESTED · REFERENCE RECEIVED</span><span className="badge b-neutral">{data.attestation.network ?? 'NETWORK NOT DECLARED'}</span></div>
                <dl className="runtime-metadata">
                  <div><dt>Attestation version</dt><dd>{data.attestation.version}</dd></div>
                  <div><dt>Record hash</dt><dd><code className="runtime-hash">{data.attestation.record_hash}</code></dd></div>
                  <div><dt>Reported verification</dt><dd>{String(data.attestation.verified ?? false)}</dd></div>
                  {data.attestation.tx_signature ? <div><dt>Transaction signature</dt><dd><code className="runtime-hash">{data.attestation.tx_signature}</code></dd></div> : null}
                </dl>
                {txUrl ? <p><a href={txUrl} target="_blank" rel="noreferrer">Open transaction in Solana Explorer ↗</a></p> : data.attestation.tx_signature ? <p role="note">The signature was received, but the network does not match a recognized Solana cluster. No Explorer link was assumed.</p> : <p>The runtime did not provide a transaction signature.</p>}
              </> : <p>The runtime did not provide an attestation. No transaction is being inferred or copied to this screen.</p>}
              {data.public_verification ? <p><a href={data.public_verification.href} target="_blank" rel="noreferrer">{data.public_verification.label} ↗</a></p> : <p>Independent public verification: not available in this response.</p>}
            </section>
          </>}
        </div>
      </main>
    </div>
  )
}
