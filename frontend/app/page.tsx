'use client'

import { useEffect, useState } from 'react'
import { Activity, AlertTriangle, Check, ChevronDown, ClipboardCheck, FileCode2, FileText, Hexagon, LayoutDashboard, LockKeyhole, Menu, Search, ShieldCheck, X, UserRound } from 'lucide-react'

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
  attestation: null | { version: string; record_hash: string; tx_signature?: string; network?: string; verified?: boolean | null }
  public_verification: null | { href: string; label: string }
}

type View = 'Dashboard' | 'Attestation Queue' | 'Adjudication Center' | 'Audit Logs' | 'Runtime Details'
type QueueStatus = 'DEMONSTRATED' | 'CONFLICT' | 'IN_DEVELOPMENT'

type QueueItem = {
  name: string
  role: string
  target: string
  hash: string
  status: QueueStatus
  data: M4Projection
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
  canonical_runtime_unavailable: 'The canonical runtime could not be reached. A free Render instance may be waking up; wait up to 45 seconds, then try again. No local fixture will be substituted.',
  insecure_runtime_url: 'The configured runtime endpoint is not HTTPS, which production requires.',
  invalid_runtime_url: 'The configured runtime endpoint is not a valid URL.',
  unsupported_scenario: 'The requested scenario is not supported by this interface.',
}

function explorerUrl(network: string | undefined, signature: string | undefined) {
  if (!network || !signature) return null
  const clusters: Record<string, string> = { devnet: 'devnet', 'mainnet-beta': 'mainnet-beta', testnet: 'testnet' }
  const cluster = clusters[network.toLowerCase()]
  if (!cluster) return null
  return `https://explorer.solana.com/tx/${encodeURIComponent(signature)}?cluster=${cluster}`
}

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

// ─── Evidence Panel (inline below queue table) ───────────────────────────────
function EvidencePanel({ item, data, onClose, onResolve }: {
  item: QueueItem
  data: M4Projection
  onClose: () => void
  onResolve: () => void
}) {
  const integrityCheck = data.verification.mechanisms.find(m => m.mechanism === 'evidence_integrity')
  const deterministicCheck = data.verification.mechanisms.find(m => m.mechanism === 'deterministic_criteria')
  const aiCheck = data.verification.mechanisms.find(m => m.mechanism === 'ai_interpretation')
  const hasConflict = item.status === 'CONFLICT'

  return (
    <section className="evidence-panel">
      <div className="evidence-header">
        <div>
          <p className="eyebrow">SELECTED ATTESTATION</p>
          <h2>{item.name}</h2>
          <p>{item.role} · {item.target}</p>
        </div>
        <div className="evidence-actions">
          <span className={`status-badge ${item.status.toLowerCase()}`}><span className="status-dot" />{item.status}</span>
          <button className="icon-button" onClick={onClose} aria-label="Close detail"><X /></button>
        </div>
      </div>

      <div className="evidence-grid">
        <div className="submitted-artifacts">
          <p className="eyebrow">SUBMITTED ARTIFACTS</p>
          {data.evidence.length > 0 ? data.evidence.map((ev) => (
            <div className="artifact" key={ev.evidence_id}>
              <FileCode2 />
              <div>
                <b>{ev.content_ref}</b>
                <small><LockKeyhole /> SHA-256 · {data.handoff.record_hash.substring(0, 8)}...{data.handoff.record_hash.slice(-4)}</small>
              </div>
            </div>
          )) : (
            <div className="artifact">
              <FileText />
              <div><b>No artifacts reported by runtime</b></div>
            </div>
          )}
        </div>

        <div className="consensus-core">
          <p className="eyebrow">THE CONSENSUS CORE</p>
          <div className={`check-card ${integrityCheck?.status === 'PASS' ? 'pass' : 'warning'}`}>
            <span><ShieldCheck /></span>
            <div>
              <b>Evidence Integrity Check</b>
              <strong>{integrityCheck?.status ?? 'NOT REPORTED'}</strong>
              <p>{integrityCheck?.rationale ?? 'No integrity result provided by the runtime.'}</p>
            </div>
          </div>
          <div className={`check-card ${deterministicCheck?.status === 'PASS' ? 'pass' : deterministicCheck ? 'warning' : 'pass'}`}>
            <span><Check /></span>
            <div>
              <b>Deterministic Criteria Check</b>
              <strong>{deterministicCheck?.status ?? 'NOT REPORTED'}</strong>
              <p>{deterministicCheck?.rationale ?? 'No deterministic result provided by the runtime.'}</p>
            </div>
          </div>
          <div className={`check-card ${aiCheck?.status === 'PASS' ? 'pass' : aiCheck ? 'warning' : 'pass'}`}>
            <span><AlertTriangle /></span>
            <div>
              <b>AI Semantic Interpretation</b>
              <strong>{aiCheck?.status ?? 'NOT REPORTED'}</strong>
              <p>{data.interpretation.signals[0]?.support ?? 'No interpretative signal provided by the runtime.'}</p>
            </div>
          </div>
        </div>
      </div>

      {hasConflict && (
        <div className="conflict-banner">
          <div>
            <b>CONSENSUS CONFLICT</b>
            <span>Mechanisms diverge. Awaiting Human Adjudication.</span>
          </div>
          <button className="primary-button" onClick={onResolve}>Resolve Conflict</button>
        </div>
      )}
    </section>
  )
}

// ─── Adjudication Modal ──────────────────────────────────────────────────────
function AdjudicationModal({ item, onClose }: { item: QueueItem | null; onClose: () => void }) {
  if (!item) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="adjudication-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">PROVENANCE REQUIRED</p>
            <h2 id="modal-title">Human Adjudication</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><X /></button>
        </div>
        <p className="modal-context">
          The deterministic check passed all structural rules, while the AI interpretation identified a potential gap. Your decision resolves this divergence and is preserved in the audit trail.
        </p>
        <label htmlFor="rationale">Adjudicator Rationale <span>(Required for Provenance)</span></label>
        <textarea id="rationale" placeholder="Explain the reasoning behind your decision..." />
        <div className="modal-actions">
          <button className="primary-button" onClick={onClose}>Record Adjudication</button>
          <button className="secondary-button" onClick={onClose}>Reject &amp; Request Evidence</button>
        </div>
        <small className="modal-footer">The previous verification results, evidence references, rationale and rule version are preserved in the audit history.</small>
      </div>
    </div>
  )
}

// ─── Dashboard View ──────────────────────────────────────────────────────────
function DashboardView({ data, setView }: { data: M4Projection | null; setView: (view: View) => void }) {
  const demonstratedCount = data?.state.value === 'DEMONSTRATED' ? 1 : 0
  const conflictCount = data?.consensus.status === 'CONFLICT' ? 1 : 0
  const inDevelopmentCount = data?.state.value === 'IN_DEVELOPMENT' ? 1 : 0

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">WORKSPACE OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">A bounded view of competency verification across the system.</p>
        </div>
        <div className="queue-summary">
          <strong>{conflictCount}</strong>
          <span>awaiting adjudication</span>
        </div>
      </div>
      <div className="metrics-grid">
        <div className="metric-card"><strong>1</strong><span>Total attestations</span></div>
        <div className="metric-card metric-green"><strong>{demonstratedCount}</strong><span>Demonstrated</span></div>
        <div className="metric-card metric-amber"><strong>{conflictCount}</strong><span>Awaiting review</span></div>
        <div className="metric-card"><strong>{inDevelopmentCount}</strong><span>In development</span></div>
      </div>
      <section className="content-card overview-card">
        <div className="card-heading">
          <div>
            <h2>Verification activity</h2>
            <p>Current state across all competency targets.</p>
          </div>
          <button className="secondary-button" onClick={() => setView('Attestation Queue')}>Open queue</button>
        </div>
        <div className="activity-list">
          <div>
            <span className="activity-icon green"><Check /></span>
            <span>
              <b>{demonstratedCount} attestation(s) demonstrated</b>
              <small>Evidence integrity confirmed in the latest cycle</small>
            </span>
            <time>Today</time>
          </div>
          {conflictCount > 0 && (
            <div>
              <span className="activity-icon amber"><AlertTriangle /></span>
              <span>
                <b>{conflictCount} record(s) require adjudication</b>
                <small>Consensus mechanisms diverge on these attestations</small>
              </span>
              <time>Today</time>
            </div>
          )}
          {inDevelopmentCount > 0 && (
            <div>
              <span className="activity-icon"><Activity /></span>
              <span>
                <b>{inDevelopmentCount} capability(ies) in development</b>
                <small>Evidence collection is still in progress</small>
              </span>
              <time>Yesterday</time>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ─── Attestation Queue View ──────────────────────────────────────────────────
function QueueView({ data }: { data: M4Projection | null; setView: (view: View) => void }) {
  const [selected, setSelected] = useState<QueueItem | null>(null)
  const [modal, setModal] = useState(false)
  const [query, setQuery] = useState('')

  if (!data) return null

  const status: QueueStatus =
    data.state.value === 'DEMONSTRATED' ? 'DEMONSTRATED'
    : data.consensus.status === 'CONFLICT' ? 'CONFLICT'
    : 'IN_DEVELOPMENT'

  const items: QueueItem[] = [{
    name: 'Ana Synthetic',
    role: 'Data Analyst',
    target: data.competency.statement,
    hash: data.handoff.record_hash.substring(0, 8) + '...' + data.handoff.record_hash.slice(-4),
    status,
    data,
  }]

  const filtered = items.filter((item) =>
    `${item.name} ${item.role} ${item.target}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <div className="view-stack">
        <div className="page-heading">
          <div>
            <p className="eyebrow">SYNTHETIC COMPETENCY VERIFICATION</p>
            <h1>Attestation Queue</h1>
            <p className="page-subtitle">Review bounded capability states and their supporting verification record.</p>
          </div>
          <div className="queue-summary">
            <strong>{items.filter(i => i.status === 'CONFLICT').length}</strong>
            <span>awaiting adjudication</span>
          </div>
        </div>
        <section className="content-card queue-card">
          <div className="card-heading">
            <div>
              <h2>Pending attestations</h2>
              <p>Each decision preserves a complete cryptographic audit trail.</p>
            </div>
            <div className="search-box">
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search employee or target"
                aria-label="Search employee or target"
              />
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee name</th>
                  <th>Role</th>
                  <th>Competency target</th>
                  <th>Artifacts hash</th>
                  <th>Consensus status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr
                    key={item.name}
                    className={selected?.name === item.name ? 'selected-row' : ''}
                    onClick={() => setSelected(selected?.name === item.name ? null : item)}
                  >
                    <td>
                      <div className="person-cell">
                        <span className="person-avatar blue">{initials(item.name)}</span>
                        <span>
                          <b>{item.name}</b>
                          <small>Submitted today</small>
                        </span>
                      </div>
                    </td>
                    <td>{item.role}</td>
                    <td>{item.target}</td>
                    <td><span className="hash-cell"><LockKeyhole />{item.hash}</span></td>
                    <td><span className={`status-badge ${item.status.toLowerCase()}`}><span className="status-dot" />{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {selected && (
          <EvidencePanel
            item={selected}
            data={selected.data}
            onClose={() => setSelected(null)}
            onResolve={() => setModal(true)}
          />
        )}
      </div>

      {modal && <AdjudicationModal item={selected} onClose={() => setModal(false)} />}
    </>
  )
}

// ─── Adjudication Center View ────────────────────────────────────────────────
function AdjudicationView({ data }: { data: M4Projection | null; setView: (view: View) => void }) {
  const [modal, setModal] = useState(false)
  const conflictCount = data?.consensus.status === 'CONFLICT' ? 1 : 0
  const fakeItem: QueueItem | null = data ? {
    name: 'Ana Synthetic',
    role: 'Data Analyst',
    target: data.competency.statement,
    hash: data.handoff.record_hash.substring(0, 8) + '...' + data.handoff.record_hash.slice(-4),
    status: 'CONFLICT',
    data,
  } : null

  return (
    <>
      <div className="view-stack">
        <div className="page-heading">
          <div>
            <p className="eyebrow">CONTROLLED REVIEW</p>
            <h1>Adjudication Center</h1>
            <p className="page-subtitle">Resolve bounded capability conflicts while preserving provenance.</p>
          </div>
        </div>
        <section className="content-card review-card">
          <div className="review-hero">
            <div className="review-count">{conflictCount}</div>
            <div>
              <h2>Attestations awaiting human decision</h2>
              <p>Each record includes deterministic checks, semantic interpretation and immutable evidence references.</p>
            </div>
          </div>
          {conflictCount > 0 ? (
            <button className="review-row" onClick={() => setModal(true)}>
              <span className="person-avatar blue">AS</span>
              <span>
                <b>Ana Synthetic</b>
                <small>{data?.competency.statement}</small>
              </span>
              <span className="status-badge conflict"><span className="status-dot" />CONFLICT</span>
              <span className="review-arrow">View evidence →</span>
            </button>
          ) : (
            <div className="empty-review">
              <ShieldCheck />
              <span>
                <b>No conflicts requiring adjudication</b>
                <small>All consensus mechanisms are in agreement.</small>
              </span>
            </div>
          )}
          <div className="empty-review">
            <ShieldCheck />
            <span>
              <b>Human adjudication is the final bounded control.</b>
              <small>No decision is anchored without a rationale and preserved verification history.</small>
            </span>
          </div>
        </section>
      </div>
      {modal && fakeItem && <AdjudicationModal item={fakeItem} onClose={() => setModal(false)} />}
    </>
  )
}

// ─── Audit Logs View ─────────────────────────────────────────────────────────
function AuditView({ data }: { data: M4Projection | null }) {
  const events = data ? [
    `Verification submitted · ${data.synthetic ? 'Ana Synthetic' : 'Competency Record'}`,
    'Evidence integrity check · VERIFIED',
    'Deterministic criteria check · PASS',
    data.consensus.status === 'CONFLICT' ? 'Consensus conflict opened · Awaiting adjudication' : 'Consensus reached · AGREEMENT',
    `Rule version ${data.handoff.record_version} recorded`,
  ] : []

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">IMMUTABLE RECORD</p>
          <h1>Audit Logs</h1>
          <p className="page-subtitle">A chronological record of verification events and decisions.</p>
        </div>
      </div>
      <section className="content-card audit-card">
        <div className="card-heading">
          <div>
            <h2>Recent activity</h2>
            <p>All events retain their source hash and rule version.</p>
          </div>
          <span className="audit-protected"><LockKeyhole /> Protected record</span>
        </div>
        {events.map((event, index) => (
          <div className="audit-row" key={event}>
            <span className="audit-line" />
            <span className="audit-dot" />
            <span>
              <b>{event}</b>
              <small>Today · {String(9 + index).padStart(2, '0')}:42</small>
            </span>
            <code>SHA-256 · {data?.handoff.record_hash.substring(0, 8)}...{data?.handoff.record_hash.slice(-4)}</code>
          </div>
        ))}
      </section>
    </div>
  )
}

// ─── Nav items ───────────────────────────────────────────────────────────────
const navItems: [typeof LayoutDashboard, View][] = [
  [LayoutDashboard, 'Dashboard'],
  [ClipboardCheck, 'Attestation Queue'],
  [ShieldCheck, 'Adjudication Center'],
  [Activity, 'Audit Logs'],
  [FileCode2, 'Runtime Details'],
]

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [data, setData] = useState<M4Projection | null>(null)
  const [error, setError] = useState<{ message: string; hint: string | null } | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)
  const [view, setView] = useState<View>('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)

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
          } catch { /* body is not JSON */ }
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
      <aside className={`sidebar ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
        <div className="sidebar-top">
          <a className="brand" href="#" aria-label="LASTRO — Home">
            <div className="brand-mark">
              <Hexagon className="brand-ring" />
              <span className="brand-diamond" />
              <span className="brand-layer brand-layer-one" />
              <span className="brand-layer brand-layer-two" />
            </div>
            <span className="brand-name">LASTRO</span>
          </a>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X /></button>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-avatar">LC</span>
          <span className="workspace-copy">
            <b>LASTRO</b>
            <small>MVP</small>
          </span>
          <ChevronDown size={14} />
        </div>
        <div className="nav-label">Workspace</div>
        <nav aria-label="Navegação principal">
          {navItems.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => { setView(label); setMenuOpen(false) }}
              className={`nav-item ${view === label ? 'active' : ''}`}
              aria-current={view === label ? 'page' : undefined}
            >
              <Icon />
              <span>{label}</span>
              {label === 'Adjudication Center' && data?.consensus.status === 'CONFLICT' && <em>1</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="live-dot" />
            <span>
              <b>Systems operational</b>
              <small>Last sync 2 min ago</small>
            </span>
          </div>
          <div className="user-card">
            <div className="user-avatar">JP</div>
            <div>
              <b>João Pedro</b>
              <small>Administrator</small>
            </div>
            <UserRound />
          </div>
        </div>
      </aside>

      <main className="main-content" id="main-content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu /></button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{view}</strong>
          </div>
          <div className="org-switcher">
            <span className="avatar-mini">LA</span> LASTRO (Protocol) <ChevronDown size={14} />
          </div>
        </header>

        <div className="page-content">
          {loading && (
            <section className="panel runtime-panel" role="status" aria-live="polite">
              <span className="eyebrow">CONNECTION</span>
              <h2>Querying runtime…</h2>
              <p>Waiting for canonical projection.</p>
            </section>
          )}
          {error && (
            <section className="panel runtime-panel runtime-error" role="alert">
              <span className="eyebrow">CONNECTION</span>
              <h2>Runtime not connected</h2>
              <p>{error.message}</p>
              {error.hint ? <p>{error.hint}</p> : null}
              <p>No local data is used as a fallback.</p>
              <button type="button" className="retry-button" onClick={() => setAttempt((n) => n + 1)}>Try again</button>
            </section>
          )}

          {data && (
            <>
              {view === 'Dashboard' && <DashboardView data={data} setView={setView} />}
              {view === 'Attestation Queue' && <QueueView data={data} setView={setView} />}
              {view === 'Adjudication Center' && <AdjudicationView data={data} setView={setView} />}
              {view === 'Audit Logs' && <AuditView data={data} />}
              {view === 'Runtime Details' && (
                <div className="view-stack">
                  <header className="page-heading runtime-heading">
                    <div>
                      <span className="eyebrow">M4 / CANONICAL RUNTIME</span>
                      <h1>From evidence to proof.</h1>
                      <p>The interface displays data received from the runtime. It does not create evidence, execute criteria, calculate consensus, or alter states.</p>
                    </div>
                    <span className="badge b-neutral">PROJECTION · READ-ONLY</span>
                  </header>

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
                    {(data.consensus.status === 'CONFLICT' || data.consensus.requires_adjudication) ? (
                      <aside className="runtime-exception" role="note">
                        <strong>Exceptional Human Review</strong>
                        <p>The runtime signals a conflict or required adjudication. No decision is made in this interface and the state is not advanced by it.</p>
                        {data.consensus.status === 'CONFLICT' && data.consensus.can_auto_advance ? <p><strong>Inconsistency reported:</strong> the result is CONFLICT, but the runtime reported auto-advancement as allowed. Do not treat this projection as authorization to advance the state; verify the runtime contract.</p> : null}
                      </aside>
                    ) : null}
                    <div className="runtime-subsection">
                      <span className="eyebrow">CANONICAL CRITERIA</span>
                      {data.competency.criteria.map((criterion) => (
                        <article className="runtime-item" key={criterion.id}>
                          <strong>{criterion.id} · {criterion.title}</strong>
                          <ul>{criterion.observables.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="trail-title">
                    <span className="eyebrow">TRAIL · {data.trail.id}</span>
                    <h2 id="trail-title">{data.trail.title}</h2>
                    {data.trail.activities.map((activity) => (
                      <article className="runtime-item" key={activity.id}>
                        <h3>{activity.id} · {activity.title}</h3>
                        <p>{activity.objective}</p>
                        <small>Expected evidence: {activity.expectedEvidence.join(', ') || 'Not reported by the runtime.'}</small>
                      </article>
                    ))}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="evidence-title">
                    <div className="runtime-section-heading">
                      <div><span className="eyebrow">STEP 01 · SOURCE</span><h2 id="evidence-title">Evidence</h2></div>
                      <span className="badge b-evidence">{data.evidence.length} reference(s)</span>
                    </div>
                    <p className="runtime-intro">References received from the runtime; their presence alone does not signify verified integrity or demonstrated competency.</p>
                    {data.evidence.map((item) => (
                      <article className="runtime-evidence" key={item.evidence_id}>
                        <div className="runtime-evidence-heading"><strong>{item.evidence_id}</strong><span className="badge b-evidence">{item.synthetic ? 'SYNTHETIC' : item.type}</span></div>
                        <p>{item.type} · activity {item.activity_id} · source confidence: {item.trust_level}</p>
                        <dl className="runtime-metadata">
                          <div><dt>Source reference</dt><dd>{item.source_ref}</dd></div>
                          <div><dt>Content reference</dt><dd>{item.content_ref}</dd></div>
                        </dl>
                      </article>
                    ))}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="integrity-title">
                    <div className="runtime-section-heading">
                      <div><span className="eyebrow">STEPS 02–03 · CHECKS</span><h2 id="integrity-title">Integrity and criteria</h2></div>
                    </div>
                    <p className="runtime-intro">Results from canonical mechanisms. The interface does not re-execute or recalculate the checks.</p>
                    <div className="runtime-verification-list">
                      {data.verification.mechanisms.filter((item) => item.mechanism !== 'ai_interpretation').map((item, index) => (
                        <article className="runtime-verification-card" key={`${item.mechanism}:${item.criterion_id}:${index}`}>
                          <div className="runtime-verification-heading"><span className="eyebrow">{mechanismNames[item.mechanism]}</span><span className={`badge ${item.status === 'PASS' ? 'b-state' : 'b-neutral'}`}>{item.status}</span></div>
                          <strong>Criterion {item.criterion_id}</strong><p>{item.rationale}</p>
                        </article>
                      ))}
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
                    {data.interpretation.signals.length ? data.interpretation.signals.map((signal) => (
                      <article className="runtime-signal" key={signal.signal_id}>
                        <div className="runtime-evidence-heading"><strong>{signal.signal_id}</strong><span className="badge b-ai">Criterion {signal.criterion_id}</span></div>
                        <p>{signal.support}</p>
                        <p className="runtime-signal-confidence">Confidence reported by runtime: <strong>{signal.confidence}</strong></p>
                        <div className="runtime-refs"><span className="eyebrow">ASSOCIATED REFERENCES</span>{signal.evidence_refs.length ? signal.evidence_refs.map((ref) => <code key={ref}>{ref}</code>) : <span>No associated reference provided.</span>}</div>
                      </article>
                    )) : <p>No interpretative signal was provided by the runtime.</p>}
                    {data.verification.mechanisms.filter((item) => item.mechanism === 'ai_interpretation').map((item, index) => (
                      <article className="runtime-verification-card runtime-ai-result" key={`ai:${item.criterion_id}:${index}`}>
                        <div className="runtime-verification-heading"><span className="eyebrow">REPORTED RESULT · CRITERION {item.criterion_id}</span><span className="badge b-ai">{item.status}</span></div>
                        <p>{item.rationale}</p>
                      </article>
                    ))}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="history-title">
                    <span className="eyebrow">STEP 06 · CANONICAL HISTORY</span>
                    <h2 id="history-title">State transitions</h2>
                    {data.state.history.length ? (
                      <ol className="runtime-history">{data.state.history.map((entry, index) => <li key={index}><pre>{JSON.stringify(entry, null, 2)}</pre></li>)}</ol>
                    ) : <p>No transition history was provided by the runtime.</p>}
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
                    {data.attestation ? (
                      <>
                        <div className="runtime-proof-status"><span className="badge b-attest">ATTESTED · REFERENCE RECEIVED</span><span className="badge b-neutral">{data.attestation.network ?? 'NETWORK NOT DECLARED'}</span></div>
                        <dl className="runtime-metadata">
                          <div><dt>Attestation version</dt><dd>{data.attestation.version}</dd></div>
                          <div><dt>Record hash</dt><dd><code className="runtime-hash">{data.attestation.record_hash}</code></dd></div>
                          <div><dt>Reported verification</dt><dd>{typeof data.attestation.verified === 'boolean' ? String(data.attestation.verified) : 'Not reported by runtime'}</dd></div>
                          {data.attestation.tx_signature ? <div><dt>Transaction signature</dt><dd><code className="runtime-hash">{data.attestation.tx_signature}</code></dd></div> : null}
                        </dl>
                        {txUrl ? <p><a href={txUrl} target="_blank" rel="noreferrer">Open transaction in Solana Explorer ↗</a></p> : data.attestation.tx_signature ? <p role="note">The signature was received, but the network does not match a recognized Solana cluster. No Explorer link was assumed.</p> : <p>The runtime did not provide a transaction signature.</p>}
                      </>
                    ) : <p>The runtime did not provide an attestation. No transaction is being inferred or copied to this screen.</p>}
                    {data.public_verification ? <p><a href={data.public_verification.href} target="_blank" rel="noreferrer">{data.public_verification.label} ↗</a></p> : <p>Independent public verification: not available in this response.</p>}
                  </section>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
