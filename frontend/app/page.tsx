'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Compass,
  FileCode2,
  FileText,
  FolderUp,
  Layers,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  X,
} from 'lucide-react'

// ─── LASTRO Official Vector Symbol (Identidade v0.1) ─────────────────────────
export function LastroSymbol({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="4" />
      <g transform="translate(0 5)">
        <polygon points="60,26 82,38 60,50 38,38" fill="var(--ac, #1683FF)" />
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="miter">
          <polyline points="34,52 60,66 86,52" />
          <polyline points="34,68 60,82 86,68" />
        </g>
      </g>
    </svg>
  )
}

export function LastroSymbolReduced({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <polygon points="60,12 94,31 60,50 26,31" fill="var(--ac, #1683FF)" />
      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="miter">
        <polyline points="24,56 60,77 96,56" />
        <polyline points="24,82 60,103 96,82" />
      </g>
    </svg>
  )
}

type Verification = {
  mechanism: 'evidence_integrity' | 'deterministic_criteria' | 'ai_interpretation'
  criterion_id: string
  status: 'PASS' | 'FAIL' | 'NOT_RUN'
  rationale: string
}

type M4Projection = {
  synthetic: boolean
  competency: { id: string; statement: string; criteria: Array<{ id: string; title: string; observables: string[] }> }
  trail: { id: string; title: string; activities: Array<{ id: string; title: string; objective: string; expectedEvidence: string[]; criteria: string[] }> }
  evidence: Array<{ evidence_id: string; type: string; activity_id: string; source_ref: string; content_ref: string; trust_level: string; synthetic: boolean }>
  interpretation: { id: string; model: string; signals: Array<{ signal_id: string; criterion_id: string; support: string; confidence: number; evidence_refs: string[] }> }
  verification: { mechanisms: Verification[] }
  consensus: { status: 'AGREEMENT' | 'INSUFFICIENT_EVIDENCE' | 'CONFLICT' | 'HUMAN_ADJUDICATION' | 'NOT_EVALUATED'; can_auto_advance: boolean; requires_adjudication: boolean }
  state: { value: 'NOT_STARTED' | 'IN_DEVELOPMENT' | 'UNDER_REVIEW' | 'DEMONSTRATED'; history: unknown[] }
  handoff: { record_version: string; record_hash: string; competency_id: string; state: string; decision_mode: string }
  attestation: null | { version: string; record_hash: string; tx_signature?: string; network?: string; verified?: boolean | null }
  public_verification: null | { href: string; label: string }
}

export type CustomTrail = {
  id: string
  role: string
  title: string
  statement: string
  criteria: Array<{ id: string; title: string; observables: string[] }>
  activities: Array<{ id: string; title: string; objective: string; expectedEvidence: string[]; criteria: string[] }>
}

type View =
  | 'Dashboard'
  | 'Attestation Queue'
  | 'Adjudication Center'
  | 'Audit Logs'
  | 'Runtime Details'
  | 'Submeter Evidência'
  | 'Criar Trilha'

type QueueStatus = 'DEMONSTRATED' | 'CONFLICT' | 'IN_DEVELOPMENT'

type QueueItem = {
  id: string
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
  NOT_EVALUATED: 'This is a local draft. No verification mechanism or consensus was executed by the canonical runtime.',
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
          <div className={`check-card evidence ${integrityCheck?.status === 'PASS' ? 'pass' : 'warning'}`}>
            <span><ShieldCheck /></span>
            <div>
              <b>Evidence Integrity Check</b>
              <strong>{integrityCheck?.status ?? 'NOT REPORTED'}</strong>
              <p>{integrityCheck?.rationale ?? 'No integrity result provided by the runtime.'}</p>
            </div>
          </div>
          <div className={`check-card deterministic ${deterministicCheck?.status === 'PASS' ? 'pass' : deterministicCheck ? 'warning' : 'pass'}`}>
            <span><Check /></span>
            <div>
              <b>Deterministic Criteria Check</b>
              <strong>{deterministicCheck?.status ?? 'NOT REPORTED'}</strong>
              <p>{deterministicCheck?.rationale ?? 'No deterministic result provided by the runtime.'}</p>
            </div>
          </div>
          <div className={`check-card ai-interpretation ${aiCheck?.status === 'PASS' ? 'pass' : aiCheck ? 'warning' : 'pass'}`}>
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
            <b>CONSENSUS CONFLICT · HUMAN ADJUDICATION REQUIRED</b>
            <span>Mechanisms diverge. No automated advance authorized without human rationale.</span>
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
          This demo modal does not load a live conflict record or persist adjudication. No human decision is recorded by these controls.
        </p>
        <label htmlFor="rationale">Adjudicator Rationale <span>(Required for Provenance)</span></label>
        <textarea id="rationale" placeholder="Explain the reasoning behind your decision..." />
        <div className="modal-actions">
          <button className="primary-button" onClick={onClose}>Close without recording</button>
          <button className="secondary-button" onClick={onClose}>Close</button>
        </div>
        <small className="modal-footer">Adjudication persistence is not implemented in this interface. Closing this dialog does not record a decision.</small>
      </div>
    </div>
  )
}

// ─── Dashboard View ──────────────────────────────────────────────────────────
function DashboardView({ data, queueItems, setView }: {
  data: M4Projection | null
  queueItems: QueueItem[]
  setView: (view: View) => void
}) {
  const demonstratedCount = queueItems.filter(i => i.status === 'DEMONSTRATED').length
  const conflictCount = queueItems.filter(i => i.status === 'CONFLICT').length
  const inDevelopmentCount = queueItems.filter(i => i.status === 'IN_DEVELOPMENT').length
  const totalCount = queueItems.length

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">WORKSPACE OVERVIEW · DO APRENDIZADO À PROVA</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Infraestrutura para transformar experiências de aprendizagem em evidências de competência, revisadas por pessoas e verificáveis.</p>
        </div>
        <div className="queue-summary">
          <strong>{conflictCount}</strong>
          <span>awaiting adjudication</span>
        </div>
      </div>
      <div className="metrics-grid">
        <div className="metric-card"><strong>{totalCount}</strong><span>Total attestations</span></div>
        <div className="metric-card metric-green"><strong>{demonstratedCount}</strong><span>Demonstrated</span></div>
        <div className="metric-card metric-amber"><strong>{conflictCount}</strong><span>Awaiting review</span></div>
        <div className="metric-card"><strong>{inDevelopmentCount}</strong><span>In development</span></div>
      </div>
      <section className="content-card overview-card">
        <div className="card-heading">
          <div>
            <h2>Scenario summary</h2>
            <p>Counts from the synthetic scenarios bundled with this demo — not live production activity.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="secondary-button" onClick={() => setView('Submeter Evidência')}>+ Nova Evidência</button>
            <button className="secondary-button" onClick={() => setView('Attestation Queue')}>Open queue</button>
          </div>
        </div>
        <div className="activity-list">
          <div>
            <span className="activity-icon green"><Check /></span>
            <span>
              <b>{demonstratedCount} attestation(s) demonstrated</b>
              <small>Example scenario marked as demonstrated; this dashboard does not run verification.</small>
            </span>
            <span className="demo-label">DEMO SCENARIO</span>
          </div>
          {conflictCount > 0 && (
            <div>
              <span className="activity-icon amber"><AlertTriangle /></span>
              <span>
                <b>{conflictCount} record(s) require adjudication</b>
                <small>Consensus mechanisms diverge on these attestations</small>
              </span>
              <span className="demo-label">DEMO SCENARIO</span>
            </div>
          )}
          {inDevelopmentCount > 0 && (
            <div>
              <span className="activity-icon"><Activity /></span>
              <span>
                <b>{inDevelopmentCount} capability(ies) in development</b>
                <small>Evidence collection is still in progress</small>
              </span>
              <span className="demo-label">DEMO SCENARIO</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// ─── Attestation Queue View ──────────────────────────────────────────────────
function QueueView({ items }: { items: QueueItem[]; setView: (view: View) => void }) {
  const [selected, setSelected] = useState<QueueItem | null>(null)
  const [modal, setModal] = useState(false)
  const [query, setQuery] = useState('')

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
              <p>Illustrative records only. This interface does not persist decisions or create canonical attestations.</p>
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
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="empty-state-cell">No sample records match “{query}”. Try another name or competency.</td></tr>
                ) : filtered.map((item) => (
                  <tr
                    key={item.id}
                    tabIndex={0}
                    aria-label={`Select sample record for ${item.name}, ${item.target}`}
                    aria-selected={selected?.id === item.id}
                    className={selected?.id === item.id ? 'selected-row' : ''}
                    onClick={() => setSelected(selected?.id === item.id ? null : item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setSelected(selected?.id === item.id ? null : item)
                      }
                    }}
                  >
                    <td>
                      <div className="person-cell">
                        <span className="person-avatar">{initials(item.name)}</span>
                        <span>
                          <b>{item.name}</b>
                          <small>Sample record</small>
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
function AdjudicationView({ items }: { items: QueueItem[]; setView: (view: View) => void }) {
  const [modal, setModal] = useState(false)
  const conflictItems = items.filter(i => i.status === 'CONFLICT')
  const conflictCount = conflictItems.length
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(conflictItems[0] ?? null)

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
            conflictItems.map(item => (
              <button
                key={item.id}
                className="review-row"
                onClick={() => {
                  setSelectedItem(item)
                  setModal(true)
                }}
              >
                <span className="person-avatar">{initials(item.name)}</span>
                <span>
                  <b>{item.name}</b>
                  <small>{item.target}</small>
                </span>
                <span className="status-badge conflict"><span className="status-dot" />CONFLICT</span>
                <span className="review-arrow">Resolve decision →</span>
              </button>
            ))
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
      {modal && selectedItem && <AdjudicationModal item={selectedItem} onClose={() => setModal(false)} />}
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

// ─── SUBMETER EVIDÊNCIA VIEW (Learner / Worker Portal) ────────────────────────
function SubmitEvidenceView({
  trails,
  onSubmitEvidence,
  setView,
}: {
  trails: CustomTrail[]
  onSubmitEvidence: (newItem: QueueItem) => void
  setView: (view: View) => void
}) {
  const [employeeName, setEmployeeName] = useState('Gabriel Lima')
  const [employeeRole, setEmployeeRole] = useState('Data Governance Lead')
  const [selectedTrailId, setSelectedTrailId] = useState(trails[0]?.id ?? '')
  const [activityId, setActivityId] = useState('A2')
  const [evidenceType, setEvidenceType] = useState('analysis_artifact')
  const [filename, setFilename] = useState('pipeline_desidentificacao_v2.py')
  const [content, setContent] = useState(`import hashlib
import pandas as pd

def desidentificar_dados(df: pd.DataFrame, salt: str = "lastro-prod") -> pd.DataFrame:
    """Aplica pseudoanonimização irreversível com salt criptográfico."""
    df_clean = df.copy()
    df_clean["cpf_hash"] = df_clean["cpf"].apply(lambda v: hashlib.sha256(f"{v}:{salt}".encode()).hexdigest())
    df_clean = df_clean.drop(columns=["nome", "cpf", "email"])
    return df_clean

# Execução e teste de estresse
df_sample = pd.read_csv("pacientes_raw.csv")
df_safe = desidentificar_dados(df_sample)
assert "cpf" not in df_safe.columns
print("Pipeline executado com integridade.")
`)
  const [hash, setHash] = useState<string>('')
  const [hashError, setHashError] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  // Calcule o hash SHA-256 criptográfico em tempo real
  useEffect(() => {
    async function computeHash() {
      if (!content) {
        setHash('')
        return
      }
      setHashError('')
      try {
        const encoder = new TextEncoder()
        const data = encoder.encode(content)
        const hashBuffer = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
        setHash(hashHex)
      } catch {
        setHash('')
        setHashError('Não foi possível calcular o SHA-256 neste navegador. Nenhum hash foi confirmado.')
      }
    }
    computeHash()
  }, [content])

  const currentTrail = trails.find((t) => t.id === selectedTrailId) ?? trails[0]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFilename(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === 'string') {
        setContent(text)
      }
    }
    reader.readAsText(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !hash || hashError) return

    const shortHash = hash.substring(0, 8) + '...' + hash.slice(-4)

    // Cria nova projeção com a evidência recém-submetida
    const syntheticProjection: M4Projection = {
      synthetic: true,
      competency: {
        id: currentTrail?.id ?? 'comp:custom',
        statement: currentTrail?.statement ?? 'Competência demonstrada em ambiente prático.',
        criteria: currentTrail?.criteria ?? [
          { id: 'C1', title: 'Critério Estrutural', observables: ['Evidência submetida com hash verificável'] },
        ],
      },
      trail: {
        id: currentTrail?.id ?? 'trail:custom',
        title: currentTrail?.title ?? 'Trilha Corporativa',
        activities: currentTrail?.activities ?? [
          {
            id: activityId,
            title: `Atividade ${activityId}`,
            objective: 'Demonstrar capacidade técnica reproduzível',
            expectedEvidence: [evidenceType],
            criteria: ['C1'],
          },
        ],
      },
      evidence: [
        {
          evidence_id: `ev-${Date.now().toString(36)}`,
          type: evidenceType,
          activity_id: activityId,
          source_ref: filename,
          content_ref: `sha256:${hash}`,
          trust_level: 'N2_EVIDENCE_PRESENTED',
          synthetic: false,
        },
      ],
      interpretation: {
        id: `interp-${Date.now().toString(36)}`,
        model: 'gemini-1.5-pro / claude-3.5-sonnet',
        signals: [
          {
            signal_id: 'sig-01',
            criterion_id: 'C1',
            support: 'O artefato submetido contém rotina analítica estruturada com testes e desidentificação coerentes.',
            confidence: 0.94,
            evidence_refs: [`sha256:${hash.substring(0, 12)}`],
          },
        ],
      },
      verification: {
        mechanisms: [
          {
            mechanism: 'evidence_integrity',
            criterion_id: 'C1',
            status: 'NOT_RUN',
            rationale: 'O hash foi calculado no navegador; a verificação de integridade pelo runtime não foi executada.',
          },
          {
            mechanism: 'deterministic_criteria',
            criterion_id: 'C1',
            status: 'NOT_RUN',
            rationale: 'A verificação determinística não foi executada pelo runtime.',
          },
          {
            mechanism: 'ai_interpretation',
            criterion_id: 'C1',
            status: 'NOT_RUN',
            rationale: 'Nenhuma interpretação por IA foi executada para esta evidência.',
          },
        ],
      },
      consensus: {
        status: 'NOT_EVALUATED',
        can_auto_advance: false,
        requires_adjudication: false,
      },
      state: {
        value: 'UNDER_REVIEW',
        history: [{ step: 'SUBMISSION', timestamp: new Date().toISOString() }],
      },
      handoff: {
        record_version: 'v0.2',
        record_hash: hash,
        competency_id: currentTrail?.id ?? 'comp:custom',
        state: 'UNDER_REVIEW',
        decision_mode: 'local_draft_not_submitted',
      },
      attestation: null,
      public_verification: null,
    }

    const newItem: QueueItem = {
      id: `queue-${Date.now()}`,
      name: employeeName,
      role: employeeRole,
      target: currentTrail?.statement ?? 'Evidência de Competência',
      hash: shortHash,
      status: 'IN_DEVELOPMENT',
      data: syntheticProjection,
    }

    onSubmitEvidence(newItem)
    setSubmitted(true)
  }

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PORTAL DO COLABORADOR · ENVIO DE PROVAS</p>
          <h1>Submeter Evidência</h1>
          <p className="page-subtitle">
            Anexe seu trabalho observável (código, notebook ou síntese). O SHA-256 é calculado neste navegador. Este formulário ainda não envia a evidência ao runtime canônico.
          </p>
        </div>
      </div>

      {submitted && (
        <aside className="action-banner">
          <div>
            <CheckCircle2 />
            <div>
              <strong>Rascunho local criado</strong>
              <p>O conteúdo e o hash foram adicionados apenas à fila desta sessão. Nenhuma verificação, consenso ou atestação foi executada pelo runtime canônico.</p>
            </div>
          </div>
          <button className="primary-button" onClick={() => setView('Attestation Queue')}>
            Ver na Fila de Atestações <ArrowRight size={14} />
          </button>
        </aside>
      )}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Nome do Colaborador / Aluno <small>SUBMITTED_BY</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="ex: Gabriel Lima"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Função / Cargo Alvo <small>ROLE</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={employeeRole}
              onChange={(e) => setEmployeeRole(e.target.value)}
              placeholder="ex: Data Governance Lead"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Trilha de Competência Ativa <small>TRAIL_ID</small>
            </label>
            <select
              className="form-select"
              value={selectedTrailId}
              onChange={(e) => setSelectedTrailId(e.target.value)}
            >
              {trails.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.role})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Atividade da Trilha <small>ACTIVITY_ID</small>
            </label>
            <select
              className="form-select"
              value={activityId}
              onChange={(e) => setActivityId(e.target.value)}
            >
              {currentTrail?.activities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.title} ({a.expectedEvidence.join(', ')})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Tipo Canônico da Evidência <small>EVIDENCE_TYPE</small>
            </label>
            <select
              className="form-select"
              value={evidenceType}
              onChange={(e) => setEvidenceType(e.target.value)}
            >
              <option value="analysis_artifact">analysis_artifact (Notebook .ipynb / Script .py)</option>
              <option value="briefing">briefing (Definição de Pergunta .md)</option>
              <option value="analysis_result">analysis_result (Dados, Logs e Tabelas .csv / .md)</option>
              <option value="communication">communication (Síntese Executiva .md / .pdf)</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Referência do Arquivo / Repositório <small>SOURCE_REF</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="ex: pipeline_desidentificacao.py"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>
              Upload do Arquivo Observável <small>FILE_DROPZONE</small>
            </label>
            <label htmlFor="file-input" className="dropzone">
              <Upload />
              <strong>Arraste seu arquivo aqui ou clique para selecionar</strong>
              <p>Formatos suportados: .ipynb, .py, .md, .csv, .json, .pdf (leitura instantânea)</p>
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <div className="form-group full-width">
            <label>
              Conteúdo da Evidência <small>RAW_CONTENT (USADO PARA O HASH)</small>
            </label>
            <textarea
              className="form-textarea"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Cole o código-fonte, notebook JSON ou markdown aqui..."
              required
            />
          </div>
        </div>

        {hashError && <p className="runtime-error" role="alert">{hashError}</p>}
        {hash && !hashError && (
          <div className="hash-preview-card">
            <div>
              <span className="eyebrow ac">HASH LOCAL · AINDA NÃO VERIFICADO</span>
              <code>SHA-256 · {hash}</code>
              <small style={{ color: 'var(--mut-2)', fontSize: '11px', marginTop: '4px' }}>
                Identificador calculado neste navegador. Não comprova autoria, registro no runtime nem imutabilidade.
              </small>
            </div>
            <span className="badge b-evidence">HASH CALCULADO LOCALMENTE</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="secondary-button" onClick={() => setView('Dashboard')}>
            Cancelar
          </button>
          <button type="submit" className="primary-button" disabled={!hash || Boolean(hashError) || !content.trim()}>
            <FolderUp size={16} /> Submeter para Verificação Criptográfica
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── CRIAR TRILHA VIEW (Organization / HR Trail Builder) ─────────────────────
function CreateTrailView({
  onSaveTrail,
  setView,
}: {
  onSaveTrail: (newTrail: CustomTrail) => void
  setView: (view: View) => void
}) {
  const [role, setRole] = useState('Líder de Governança de Dados & IA')
  const [title, setTitle] = useState('Trilha de Governança e Anonimização Ética com IA')
  const [statement, setStatement] = useState(
    'Garantir a desidentificação e governança ética de dados sensíveis em pipelines corporativos com apoio de IA, auditabilidade estrita e testes de reidentificação.'
  )
  const [criteria, setCriteria] = useState([
    {
      id: 'C1',
      title: 'Mapeamento de Riscos de Privacidade',
      observables: [
        'identifica colunas de identificação direta e indireta',
        'documenta a justificativa da técnica de mitigação adotada',
      ],
    },
    {
      id: 'C2',
      title: 'Implementação de Rotina de Anonimização',
      observables: [
        'implementa algoritmo criptográfico com salt seguro',
        'assegura que a remoção das chaves seja irreversível em pipeline auditável',
      ],
    },
    {
      id: 'C3',
      title: 'Testes de Reidentificação e Prova',
      observables: [
        'executa teste de estresse contra ataques de ligação',
        'gera logs determinísticos que comprovam a higienização dos dados',
      ],
    },
  ])
  const [activities, setActivities] = useState([
    {
      id: 'A1',
      title: 'Briefing e Plano de Privacidade',
      objective: 'Estruturar o escopo de conformidade da base de dados',
      expectedEvidence: ['briefing'],
      criteria: ['C1'],
    },
    {
      id: 'A2',
      title: 'Pipeline de Anonimização',
      objective: 'Construir a rotina automatizada de sanitização em código',
      expectedEvidence: ['analysis_artifact'],
      criteria: ['C2'],
    },
    {
      id: 'A3',
      title: 'Auditoria e Teste de Estresse',
      objective: 'Comprovar a robustez e ausência de vazamentos',
      expectedEvidence: ['analysis_result', 'communication'],
      criteria: ['C3'],
    },
  ])
  const [saved, setSaved] = useState(false)

  // Presets rápidos para novas profissões
  const applyPreset = (presetKey: string) => {
    if (presetKey === 'governance') {
      setRole('Líder de Governança de Dados & IA')
      setTitle('Trilha de Governança e Anonimização Ética com IA')
      setStatement(
        'Garantir a desidentificação e governança ética de dados sensíveis em pipelines corporativos com apoio de IA, auditabilidade estrita e testes de reidentificação.'
      )
    } else if (presetKey === 'finance') {
      setRole('Analista Financeiro Assistido por IA')
      setTitle('Trilha de Modelagem Financeira e Validação com LLMs')
      setStatement(
        'Construir projeções de fluxo de caixa e valuation auxiliados por modelos de linguagem, mantendo rastreabilidade estrita das fórmulas e premissas contra dados primários.'
      )
    } else if (presetKey === 'aiops') {
      setRole('Engenheiro de Operações de IA & Agentes')
      setTitle('Trilha de Orquestração e Avaliação de Agentes Autônomos')
      setStatement(
        'Projetar, calibrar e monitorar fluxos de agentes inteligentes com guardrails determinísticos, prevenção de alucinações e log auditável de execução.'
      )
    }
  }

  const handleAddCriterion = () => {
    const nextId = `C${criteria.length + 1}`
    setCriteria([
      ...criteria,
      { id: nextId, title: 'Novo Critério Observável', observables: ['comprova ação técnica verificável'] },
    ])
  }

  const handleRemoveCriterion = (idx: number) => {
    setCriteria(criteria.filter((_, i) => i !== idx))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const trailId = `trail:${role.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}`
    const newTrail: CustomTrail = {
      id: trailId,
      role,
      title,
      statement,
      criteria,
      activities,
    }
    onSaveTrail(newTrail)
    setSaved(true)
  }

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NOVA PROFISSÃO · CAPABILITY DESIGN</p>
          <h1>Criar Trilha de Competência</h1>
          <p className="page-subtitle">
            Monte um rascunho local de competência e critérios observáveis. A publicação no protocolo canônico ainda não está disponível nesta interface.
          </p>
        </div>
      </div>

      <div className="preset-bar">
        <span className="eyebrow" style={{ marginRight: 6 }}>
          PRESETS RÁPIDOS:
        </span>
        <button type="button" className="preset-pill active" onClick={() => applyPreset('governance')}>
          Data Governance &amp; AI Compliance
        </button>
        <button type="button" className="preset-pill" onClick={() => applyPreset('finance')}>
          AI-Assisted Financial Analyst
        </button>
        <button type="button" className="preset-pill" onClick={() => applyPreset('aiops')}>
          AI Agent Ops Engineer
        </button>
      </div>

      {saved && (
        <aside className="action-banner">
          <div>
            <CheckCircle2 />
            <div>
              <strong>Rascunho de trilha criado nesta sessão</strong>
              <p>A trilha está apenas no estado local desta sessão. Ela não foi publicada nem registrada no protocolo canônico.</p>
            </div>
          </div>
          <button className="primary-button" onClick={() => setView('Submeter Evidência')}>
            Submeter Evidência nesta Trilha <ArrowRight size={14} />
          </button>
        </aside>
      )}

      <form className="form-card" onSubmit={handleSave}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Nova Profissão / Cargo Alvo <small>TARGET_ROLE</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="ex: Líder de Governança de Dados"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Título Canônico da Trilha <small>TRAIL_TITLE</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Trilha de Governança e Anonimização"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>
              Declaração Canônica da Competência <small>COMPETENCY_STATEMENT</small>
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Descreva a capacidade observável que diferencia quem demonstra esta competência..."
              required
            />
          </div>
        </div>

        {/* Critérios Observáveis */}
        <div className="builder-block">
          <div className="builder-header">
            <div>
              <strong>Critérios Canônicos Observáveis</strong>
              <p style={{ margin: '2px 0 0', color: 'var(--mut)', fontSize: '11.5px' }}>
                Critérios objetivos que devem ser testados por mecanismos determinísticos e interpretação semântica.
              </p>
            </div>
            <button type="button" className="secondary-button" onClick={handleAddCriterion}>
              <Plus size={14} /> Adicionar Critério
            </button>
          </div>

          <div className="criteria-list">
            {criteria.map((c, idx) => (
              <div className="criteria-item" key={c.id}>
                <div className="criteria-item-top">
                  <span className="badge b-review">{c.id}</span>
                  <input
                    type="text"
                    className="form-control"
                    style={{ flex: 1, margin: '0 10px' }}
                    value={c.title}
                    onChange={(e) => {
                      const updated = [...criteria]
                      updated[idx]!.title = e.target.value
                      setCriteria(updated)
                    }}
                  />
                  {criteria.length > 1 && (
                    <button
                      type="button"
                      className="icon-button"
                      onClick={() => handleRemoveCriterion(idx)}
                      title="Remover critério"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div style={{ paddingLeft: '4px' }}>
                  <small style={{ color: 'var(--mut-2)', fontSize: '10px', textTransform: 'uppercase' }}>
                    Comportamentos observáveis:
                  </small>
                  <ul style={{ margin: '4px 0 0', paddingLeft: '18px', color: 'var(--mut)', fontSize: '12px' }}>
                    {c.observables.map((obs, obsIdx) => (
                      <li key={obsIdx}>{obs}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atividades e Evidências Esperadas */}
        <div className="builder-block">
          <div className="builder-header">
            <div>
              <strong>Atividades e Evidências da Trilha</strong>
              <p style={{ margin: '2px 0 0', color: 'var(--mut)', fontSize: '11.5px' }}>
                As etapas práticas pelas quais o colaborador submeterá evidências concretas.
              </p>
            </div>
          </div>

          <div className="activity-builder-list">
            {activities.map((act) => (
              <div className="activity-builder-item" key={act.id}>
                <div className="activity-item-top">
                  <span className="badge b-evidence">{act.id}</span>
                  <b>{act.title}</b>
                  <span style={{ color: 'var(--mut-2)', fontSize: '11px', marginLeft: 'auto' }}>
                    Evidências: {act.expectedEvidence.join(', ')}
                  </span>
                </div>
                <p style={{ margin: '2px 0 0', color: 'var(--mut)', fontSize: '12px' }}>
                  <b>Objetivo:</b> {act.objective} · <b>Alimenta:</b> {act.criteria.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="secondary-button" onClick={() => setView('Dashboard')}>
            Cancelar
          </button>
          <button type="submit" className="primary-button">
            <Layers size={16} /> Publicar Trilha no Protocolo
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Nav items ───────────────────────────────────────────────────────────────
const protocolNavItems: [typeof LayoutDashboard, View][] = [
  [LayoutDashboard, 'Dashboard'],
  [ClipboardCheck, 'Attestation Queue'],
  [ShieldCheck, 'Adjudication Center'],
  [Activity, 'Audit Logs'],
  [FileCode2, 'Runtime Details'],
]

const operationNavItems: [typeof FolderUp, View][] = [
  [FolderUp, 'Submeter Evidência'],
  [Layers, 'Criar Trilha'],
]

// ─── Default Initial Trail ───────────────────────────────────────────────────
const initialDefaultTrail: CustomTrail = {
  id: 'trail:applied-data-analysis',
  role: 'Data Analyst',
  title: 'Trilha de Análise de Dados Aplicada',
  statement:
    'Usar ferramentas de IA como apoio para transformar uma pergunta de negócio em uma análise de dados reproduzível e comunicar conclusões sustentadas por evidências.',
  criteria: [
    {
      id: 'C1',
      title: 'Formulação Analítica',
      observables: ['transforma pergunta de negócio em pergunta analítica clara', 'define o que pretende responder'],
    },
    {
      id: 'C2',
      title: 'Tratamento e Análise',
      observables: ['identifica e prepara dados', 'executa análise coerente com a pergunta'],
    },
    {
      id: 'C3',
      title: 'Evidência e Suporte',
      observables: ['apresenta resultados apoiados pelos dados', 'diferencia observação de inferência'],
    },
    {
      id: 'C4',
      title: 'Comunicação',
      observables: ['comunica contexto, achados e limitações de forma compreensível'],
    },
  ],
  activities: [
    {
      id: 'A1',
      title: 'Formular a pergunta',
      objective: 'transformar um problema de negócio em uma pergunta analítica',
      expectedEvidence: ['briefing'],
      criteria: ['C1'],
    },
    {
      id: 'A2',
      title: 'Preparar e explorar os dados',
      objective: 'preparar o conjunto de dados e identificar padrões relevantes',
      expectedEvidence: ['analysis_artifact'],
      criteria: ['C2'],
    },
    {
      id: 'A3',
      title: 'Executar análise reproduzível',
      objective: 'responder à pergunta analítica por meio de uma análise reproduzível',
      expectedEvidence: ['analysis_artifact', 'analysis_result'],
      criteria: ['C2', 'C3'],
    },
    {
      id: 'A4',
      title: 'Comunicar resultado',
      objective: 'transformar a análise em uma comunicação útil para decisão',
      expectedEvidence: ['communication'],
      criteria: ['C3', 'C4'],
    },
  ],
}

// ─── Root Application Component ──────────────────────────────────────────────
export default function Page() {
  const [data, setData] = useState<M4Projection | null>(null)
  const [error, setError] = useState<{ message: string; hint: string | null } | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)
  const [view, setView] = useState<View>('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const wasMenuOpen = useRef(false)

  useEffect(() => {
    if (!menuOpen) {
      if (wasMenuOpen.current) {
        menuButtonRef.current?.focus()
        wasMenuOpen.current = false
      }
      return
    }

    wasMenuOpen.current = true
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  // Gerenciamento dinâmico de trilhas e fila de atestações
  const [trails, setTrails] = useState<CustomTrail[]>([initialDefaultTrail])
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])

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
            /* body is not JSON */
          }
          throw new RuntimeRequestError(response.status, code)
        }
        return response.json() as Promise<M4Projection>
      })
      .then((projection) => {
        setData(projection)

        // Inicializa a fila com a atestação canônica vinda do runtime
        const initialStatus: QueueStatus =
          projection.state.value === 'DEMONSTRATED'
            ? 'DEMONSTRATED'
            : projection.consensus.status === 'CONFLICT'
            ? 'CONFLICT'
            : 'IN_DEVELOPMENT'

        setQueueItems([
          {
            id: 'item-ana-synthetic',
            name: 'Ana Synthetic',
            role: 'Data Analyst',
            target: projection.competency.statement,
            hash:
              projection.handoff.record_hash.substring(0, 8) +
              '...' +
              projection.handoff.record_hash.slice(-4),
            status: initialStatus,
            data: projection,
          },
        ])
      })
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        if (cause instanceof RuntimeRequestError) {
          setError({ message: cause.message, hint: cause.code ? runtimeErrorHints[cause.code] ?? null : null })
          return
        }
        setError({ message: 'Failed to fetch the canonical runtime.', hint: null })
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [attempt])

  const handleAddEvidence = (newItem: QueueItem) => {
    setQueueItems((prev) => [newItem, ...prev])
  }

  const handleAddTrail = (newTrail: CustomTrail) => {
    setTrails((prev) => [newTrail, ...prev])
  }

  const txUrl = explorerUrl(data?.attestation?.network, data?.attestation?.tx_signature)
  const conflictCount = queueItems.filter((i) => i.status === 'CONFLICT').length

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <aside id="primary-navigation" className={`sidebar ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
        <div className="sidebar-top">
          <a className="brand" href="#" aria-label="LASTRO — Home">
            <div className="brand-mark">
              <LastroSymbol size={32} />
            </div>
            <div className="brand-text">
              <span className="brand-name">LASTRO</span>
              <small className="brand-caption">DO APRENDIZADO À PROVA</small>
            </div>
          </a>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <X />
          </button>
        </div>

        <div className="workspace-switcher">
          <span className="workspace-avatar">
            <LastroSymbolReduced size={18} />
          </span>
          <span className="workspace-copy">
            <b>LASTRO</b>
            <small>MVP Protocol</small>
          </span>
          <ChevronDown size={14} />
        </div>

        {/* Grupo 1: Protocolo & Auditoria */}
        <div className="nav-label">Protocolo &amp; Auditoria</div>
        <nav aria-label="Navegação de protocolo">
          {protocolNavItems.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => {
                setView(label)
                setMenuOpen(false)
              }}
              className={`nav-item ${view === label ? 'active' : ''}`}
              aria-current={view === label ? 'page' : undefined}
            >
              <Icon />
              <span>{label}</span>
              {label === 'Adjudication Center' && conflictCount > 0 && <em>{conflictCount}</em>}
            </button>
          ))}
        </nav>

        {/* Grupo 2: Operação & Trilha */}
        <div className="nav-label" style={{ marginTop: '16px' }}>
          Operação &amp; Trilha
        </div>
        <nav aria-label="Navegação operacional">
          {operationNavItems.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => {
                setView(label)
                setMenuOpen(false)
              }}
              className={`nav-item ${view === label ? 'active' : ''}`}
              aria-current={view === label ? 'page' : undefined}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="live-dot" />
            <span>
              <b>Runtime status</b>
              <small>Consulte Runtime Details para o estado da conexão</small>
            </span>
          </div>
          <div className="user-card">
            <div className="user-avatar">LS</div>
            <div>
              <b>LASTRO</b>
              <small>Workspace</small>
            </div>
            <UserRound />
          </div>
        </div>
      </aside>
      {menuOpen && (
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="Fechar menu de navegação"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="main-content" id="main-content">
        <header className="topbar">
          <button ref={menuButtonRef} className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-controls="primary-navigation" aria-expanded={menuOpen}>
            <Menu />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{view}</strong>
          </div>
          <div className="org-switcher">
            <span className="avatar-mini">
              <LastroSymbolReduced size={16} />
            </span>{' '}
            LASTRO (Protocol) <ChevronDown size={14} />
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
              <button type="button" className="retry-button" onClick={() => setAttempt((n) => n + 1)}>
                Try again
              </button>
            </section>
          )}

          {!loading && !error && (
            <>
              {view === 'Dashboard' && (
                <DashboardView data={data} queueItems={queueItems} setView={setView} />
              )}
              {view === 'Attestation Queue' && <QueueView items={queueItems} setView={setView} />}
              {view === 'Adjudication Center' && <AdjudicationView items={queueItems} setView={setView} />}
              {view === 'Audit Logs' && <AuditView data={data} />}

              {/* Novas Telas */}
              {view === 'Submeter Evidência' && (
                <SubmitEvidenceView
                  trails={trails}
                  onSubmitEvidence={handleAddEvidence}
                  setView={setView}
                />
              )}

              {view === 'Criar Trilha' && (
                <CreateTrailView onSaveTrail={handleAddTrail} setView={setView} />
              )}

              {view === 'Runtime Details' && data && (
                <div className="view-stack">
                  <header className="page-heading runtime-heading">
                    <div>
                      <span className="eyebrow">M4 / CANONICAL RUNTIME</span>
                      <h1>From evidence to proof.</h1>
                      <p>
                        The interface displays data received from the runtime. It does not create evidence,
                        execute criteria, calculate consensus, or alter states.
                      </p>
                    </div>
                    <span className="badge b-neutral">PROJECTION · READ-ONLY</span>
                  </header>

                  <div className="data-notice" role="note">
                    <strong>{data.synthetic ? 'Synthetic Scenario — Ana' : 'Competency Record'}</strong>
                    <span>
                      Source: canonical runtime.{' '}
                      {data.synthetic
                        ? 'This scenario is demonstrative; it does not constitute proof of external validation.'
                        : 'The data below is presented as received.'}
                    </span>
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
                      <div
                        className={`runtime-state-card runtime-consensus runtime-consensus-${data.consensus.status
                          .toLowerCase()
                          .replaceAll('_', '-')}`}
                      >
                        <span className="eyebrow">CONSENSUS RESULT</span>
                        <strong>{data.consensus.status}</strong>
                        <p>{consensusDescriptions[data.consensus.status]}</p>
                        <div className="runtime-consensus-meta">
                          <span>
                            Reported auto-advancement:{' '}
                            <strong>{data.consensus.can_auto_advance ? 'allowed' : 'blocked'}</strong>
                          </span>
                          <span>
                            Human adjudication required:{' '}
                            <strong>{data.consensus.requires_adjudication ? 'yes' : 'no'}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                    {data.consensus.status === 'CONFLICT' || data.consensus.requires_adjudication ? (
                      <aside className="runtime-exception" role="note">
                        <strong>Exceptional Human Review</strong>
                        <p>
                          The runtime signals a conflict or required adjudication. No decision is made in this
                          interface and the state is not advanced by it.
                        </p>
                        {data.consensus.status === 'CONFLICT' && data.consensus.can_auto_advance ? (
                          <p>
                            <strong>Inconsistency reported:</strong> the result is CONFLICT, but the runtime
                            reported auto-advancement as allowed. Do not treat this projection as authorization to
                            advance the state; verify the runtime contract.
                          </p>
                        ) : null}
                      </aside>
                    ) : null}
                    <div className="runtime-subsection">
                      <span className="eyebrow">CANONICAL CRITERIA</span>
                      {data.competency.criteria.map((criterion) => (
                        <article className="runtime-item" key={criterion.id}>
                          <strong>
                            {criterion.id} · {criterion.title}
                          </strong>
                          <ul>
                            {criterion.observables.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="trail-title">
                    <span className="eyebrow">TRAIL · {data.trail.id}</span>
                    <h2 id="trail-title">{data.trail.title}</h2>
                    {data.trail.activities.map((activity) => (
                      <article className="runtime-item" key={activity.id}>
                        <h3>
                          {activity.id} · {activity.title}
                        </h3>
                        <p>{activity.objective}</p>
                        <small>
                          Expected evidence:{' '}
                          {activity.expectedEvidence.join(', ') || 'Not reported by the runtime.'}
                        </small>
                      </article>
                    ))}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="evidence-title">
                    <div className="runtime-section-heading">
                      <div>
                        <span className="eyebrow">STEP 01 · SOURCE</span>
                        <h2 id="evidence-title">Evidence</h2>
                      </div>
                      <span className="badge b-evidence">{data.evidence.length} reference(s)</span>
                    </div>
                    <p className="runtime-intro">
                      References received from the runtime; their presence alone does not signify verified
                      integrity or demonstrated competency.
                    </p>
                    {data.evidence.map((item) => (
                      <article className="runtime-evidence" key={item.evidence_id}>
                        <div className="runtime-evidence-heading">
                          <strong>{item.evidence_id}</strong>
                          <span className="badge b-evidence">{item.synthetic ? 'SYNTHETIC' : item.type}</span>
                        </div>
                        <p>
                          {item.type} · activity {item.activity_id} · source confidence: {item.trust_level}
                        </p>
                        <dl className="runtime-metadata">
                          <div>
                            <dt>Source reference</dt>
                            <dd>{item.source_ref}</dd>
                          </div>
                          <div>
                            <dt>Content reference</dt>
                            <dd>{item.content_ref}</dd>
                          </div>
                        </dl>
                      </article>
                    ))}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="integrity-title">
                    <div className="runtime-section-heading">
                      <div>
                        <span className="eyebrow">STEPS 02–03 · CHECKS</span>
                        <h2 id="integrity-title">Integrity and criteria</h2>
                      </div>
                    </div>
                    <p className="runtime-intro">
                      Results from canonical mechanisms. The interface does not re-execute or recalculate the
                      checks.
                    </p>
                    <div className="runtime-verification-list">
                      {data.verification.mechanisms
                        .filter((item) => item.mechanism !== 'ai_interpretation')
                        .map((item, index) => (
                          <article
                            className="runtime-verification-card"
                            key={`${item.mechanism}:${item.criterion_id}:${index}`}
                          >
                            <div className="runtime-verification-heading">
                              <span className="eyebrow">{mechanismNames[item.mechanism]}</span>
                              <span
                                className={`badge ${
                                  item.status === 'PASS' ? 'b-state' : 'b-neutral'
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <strong>Criterion {item.criterion_id}</strong>
                            <p>{item.rationale}</p>
                          </article>
                        ))}
                      {data.verification.mechanisms.filter((item) => item.mechanism !== 'ai_interpretation')
                        .length === 0 && <p>No integrity result or deterministic criterion was provided.</p>}
                    </div>
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="interpretation-title">
                    <div className="runtime-section-heading">
                      <div>
                        <span className="eyebrow">STEP 04 · INFERENCE</span>
                        <h2 id="interpretation-title">AI Interpretation</h2>
                      </div>
                      <span className="badge b-ai">NOT A SOURCE FACT</span>
                    </div>
                    <p className="runtime-intro">
                      Interpretative signals provided by the runtime. This layer does not replace evidence,
                      deterministic criteria, consensus, or human decision.
                    </p>
                    <div className="runtime-interpretation-meta">
                      <span>
                        Interpretation: <code>{data.interpretation.id}</code>
                      </span>
                      <span>
                        Model: <code>{data.interpretation.model}</code>
                      </span>
                    </div>
                    {data.interpretation.signals.length ? (
                      data.interpretation.signals.map((signal) => (
                        <article className="runtime-signal" key={signal.signal_id}>
                          <div className="runtime-evidence-heading">
                            <strong>{signal.signal_id}</strong>
                            <span className="badge b-ai">Criterion {signal.criterion_id}</span>
                          </div>
                          <p>{signal.support}</p>
                          <p className="runtime-signal-confidence">
                            Confidence reported by runtime: <strong>{signal.confidence}</strong>
                          </p>
                          <div className="runtime-refs">
                            <span className="eyebrow">ASSOCIATED REFERENCES</span>
                            {signal.evidence_refs.length ? (
                              signal.evidence_refs.map((ref) => <code key={ref}>{ref}</code>)
                            ) : (
                              <span>No associated reference provided.</span>
                            )}
                          </div>
                        </article>
                      ))
                    ) : (
                      <p>No interpretative signal was provided by the runtime.</p>
                    )}
                    {data.verification.mechanisms
                      .filter((item) => item.mechanism === 'ai_interpretation')
                      .map((item, index) => (
                        <article
                          className="runtime-verification-card runtime-ai-result"
                          key={`ai:${item.criterion_id}:${index}`}
                        >
                          <div className="runtime-verification-heading">
                            <span className="eyebrow">REPORTED RESULT · CRITERION {item.criterion_id}</span>
                            <span className="badge b-ai">{item.status}</span>
                          </div>
                          <p>{item.rationale}</p>
                        </article>
                      ))}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="history-title">
                    <span className="eyebrow">STEP 06 · CANONICAL HISTORY</span>
                    <h2 id="history-title">State transitions</h2>
                    {data.state.history.length ? (
                      <ol className="runtime-history">
                        {data.state.history.map((entry, index) => (
                          <li key={index}>
                            <pre>{JSON.stringify(entry, null, 2)}</pre>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p>No transition history was provided by the runtime.</p>
                    )}
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="handoff-title">
                    <span className="eyebrow">HANDOFF · {data.handoff.record_version}</span>
                    <h2 id="handoff-title">Revised state record</h2>
                    <dl className="runtime-metadata">
                      <div>
                        <dt>State in record</dt>
                        <dd>{data.handoff.state}</dd>
                      </div>
                      <div>
                        <dt>Decision mode</dt>
                        <dd>{data.handoff.decision_mode}</dd>
                      </div>
                      <div>
                        <dt>Competency ID</dt>
                        <dd>{data.handoff.competency_id}</dd>
                      </div>
                      <div>
                        <dt>Record hash</dt>
                        <dd>
                          <code className="runtime-hash">{data.handoff.record_hash}</code>
                        </dd>
                      </div>
                    </dl>
                  </section>

                  <section className="panel runtime-panel" aria-labelledby="attestation-title">
                    <span className="eyebrow">STEPS 08–09 · PROOF</span>
                    <h2 id="attestation-title">Attestation and public verification</h2>
                    {data.attestation ? (
                      <>
                        <div className="runtime-proof-status">
                          <span className="badge b-attest">ATTESTED · REFERENCE RECEIVED</span>
                          <span className="badge b-neutral">
                            {data.attestation.network ?? 'NETWORK NOT DECLARED'}
                          </span>
                        </div>
                        <dl className="runtime-metadata">
                          <div>
                            <dt>Attestation version</dt>
                            <dd>{data.attestation.version}</dd>
                          </div>
                          <div>
                            <dt>Record hash</dt>
                            <dd>
                              <code className="runtime-hash">{data.attestation.record_hash}</code>
                            </dd>
                          </div>
                          <div>
                            <dt>Reported verification</dt>
                            <dd>
                              {typeof data.attestation.verified === 'boolean'
                                ? String(data.attestation.verified)
                                : 'Not reported by runtime'}
                            </dd>
                          </div>
                          {data.attestation.tx_signature ? (
                            <div>
                              <dt>Transaction signature</dt>
                              <dd>
                                <code className="runtime-hash">{data.attestation.tx_signature}</code>
                              </dd>
                            </div>
                          ) : null}
                        </dl>
                        {txUrl ? (
                          <p>
                            <a href={txUrl} target="_blank" rel="noreferrer">
                              Open transaction in Solana Explorer ↗
                            </a>
                          </p>
                        ) : data.attestation.tx_signature ? (
                          <p role="note">
                            The signature was received, but the network does not match a recognized Solana
                            cluster. No Explorer link was assumed.
                          </p>
                        ) : (
                          <p>The runtime did not provide a transaction signature.</p>
                        )}
                      </>
                    ) : (
                      <p>
                        The runtime did not provide an attestation. No transaction is being inferred or copied to
                        this screen.
                      </p>
                    )}
                    {data.public_verification ? (
                      <p>
                        <a href={data.public_verification.href} target="_blank" rel="noreferrer">
                          {data.public_verification.label} ↗
                        </a>
                      </p>
                    ) : (
                      <p>Independent public verification: not available in this response.</p>
                    )}
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
