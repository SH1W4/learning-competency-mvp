'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  Globe,
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

// ─── Simple i18n System ─────────────────────────────────────────────────────
type Language = 'en' | 'pt'

const I18nContext = React.createContext<{ lang: Language; setLang: (lang: Language) => void }>({
  lang: 'en',
  setLang: () => {},
})

const translations: Record<Language, Record<string, string>> = {
  en: {
    landing_eyebrow: 'EVIDENCE INFRASTRUCTURE FOR CAPABILITY',
    landing_title: 'From observable work to verifiable capability.',
    landing_lede: 'LASTRO connects observable work to explicit competency criteria, verifies evidence through multiple mechanisms, and preserves every decision in an auditable record.',
    landing_enter: 'Enter workspace',
    landing_how: 'How it works',
    signal_top: 'bounded capability state',
    signal_01_title: 'Observable work',
    signal_01_desc: 'artifacts and context',
    signal_02_title: 'Independent verification',
    signal_02_desc: 'criteria + interpretation',
    signal_03_title: 'Verifiable capability',
    signal_03_desc: 'bounded and auditable state',
    principles_eyebrow: 'WHAT IS LASTRO',
    principles_title: 'An evidence layer, not another credential platform.',
    principle_01_title: 'Evidence before assertion',
    principle_01_desc: 'Decisions start with work that can be observed, contextualized, and reviewed.',
    principle_02_title: 'States, not absolute labels',
    principle_02_desc: 'Each competency maintains a bounded state: demonstrated, in development, or in conflict.',
    principle_03_title: 'Human at the decision point',
    principle_03_desc: 'When mechanisms diverge, adjudication preserves reason and provenance.',
    // Dashboard
    dashboard_subtitle: 'Infrastructure to transform learning experiences into verifiable competency evidence, human-reviewed and verifiable.',
    awaiting_adjudication: 'awaiting adjudication',
    total_attestations: 'Total attestations',
    demonstrated: 'Demonstrated',
    awaiting_review: 'Awaiting review',
    in_development: 'In development',
    workflow_eyebrow: 'RECOMMENDED WORKFLOW',
    workflow_title: 'From evidence to decision',
    workflow_desc: 'Follow the workspace in this order to keep review context intact.',
    workflow_01: 'Review queue',
    workflow_01_desc: 'Inspect submitted evidence',
    workflow_02: 'Resolve conflicts',
    workflow_02_desc: 'Apply human judgment',
    workflow_03: 'Audit the record',
    workflow_03_desc: 'Trace the final decision',
    new_evidence: '+ New Evidence',
    open_queue: 'Open queue',
    // Queue
    queue_title: 'Attestation Queue',
    queue_subtitle: 'Review bounded capability states and their supporting verification record.',
    search_placeholder: 'Search employee or target',
    // Adjudication
    adjudication_title: 'Adjudication Center',
    adjudication_subtitle: 'Resolve bounded capability conflicts while preserving provenance.',
    // Audit
    audit_title: 'Audit Logs',
    audit_subtitle: 'A chronological record of verification events and decisions.',
    // Details
    details_title: 'From evidence to proof.',
    details_desc: 'The interface displays data received from the runtime. It does not create evidence, execute criteria, calculate consensus, or alter states.',
    projection_readonly: 'PROJECTION · READ-ONLY',
    // Submit Evidence
    submit_evidence_title: 'Submit Evidence',
    // Create Trail
    create_trail_title: 'Create Trail',
    // Language selector
    language: 'Language',
  },
  pt: {
    landing_eyebrow: 'INFRAESTRUTURA DE EVIDÊNCIA PARA CAPACIDADE',
    landing_title: 'Da evidência do trabalho à capacidade verificável.',
    landing_lede: 'LASTRO conecta trabalho observável a critérios explícitos de competência, verifica evidências por múltiplos mecanismos e preserva cada decisão em um registro auditável.',
    landing_enter: 'Entrar no workspace',
    landing_how: 'Como funciona',
    signal_top: 'estado delimitado de capacidade',
    signal_01_title: 'Trabalho observável',
    signal_01_desc: 'artefatos e contexto',
    signal_02_title: 'Verificação independente',
    signal_02_desc: 'critérios + interpretação',
    signal_03_title: 'Capacidade verificável',
    signal_03_desc: 'estado delimitado e auditável',
    principles_eyebrow: 'O QUE É LASTRO',
    principles_title: 'Uma camada de evidência, não outra plataforma de credenciais.',
    principle_01_title: 'Evidência antes da afirmação',
    principle_01_desc: 'Decisões começam no trabalho que pode ser observado, contextualizado e revisado.',
    principle_02_title: 'Estados, não rótulos absolutos',
    principle_02_desc: 'Cada competência mantém um estado delimitado: demonstrada, em desenvolvimento ou em conflito.',
    principle_03_title: 'Humano no ponto de decisão',
    principle_03_desc: 'Quando os mecanismos divergem, a adjudicação preserva a razão e a provenance.',
    // Dashboard
    dashboard_subtitle: 'Infraestrutura para transformar experiências de aprendizagem em evidências de competência, revisadas por pessoas e verificáveis.',
    awaiting_adjudication: 'aguardando adjudicação',
    total_attestations: 'Total de atestações',
    demonstrated: 'Demonstrado',
    awaiting_review: 'Aguardando revisão',
    in_development: 'Em desenvolvimento',
    workflow_eyebrow: 'FLUXO DE TRABALHO RECOMENDADO',
    workflow_title: 'Da evidência à decisão',
    workflow_desc: 'Siga o workspace nesta ordem para manter o contexto de review intacto.',
    workflow_01: 'Revisar fila',
    workflow_01_desc: 'Inspecionar evidência submetida',
    workflow_02: 'Resolver conflitos',
    workflow_02_desc: 'Aplicar julgamento humano',
    workflow_03: 'Auditar o registro',
    workflow_03_desc: 'Rastrear a decisão final',
    new_evidence: '+ Nova Evidência',
    open_queue: 'Abrir fila',
    // Queue
    queue_title: 'Fila de Atestação',
    queue_subtitle: 'Revise estados delimitados de capacidade e seu registro de verificação de suporte.',
    search_placeholder: 'Buscar funcionário ou alvo',
    // Adjudication
    adjudication_title: 'Centro de Adjudicação',
    adjudication_subtitle: 'Resolva conflitos de capacidade delimitada preservando provenance.',
    // Audit
    audit_title: 'Logs de Auditoria',
    audit_subtitle: 'Um registro cronológico de eventos de verificação e decisões.',
    // Details
    details_title: 'Da evidência à prova.',
    details_desc: 'A interface exibe dados recebidos do runtime. Ela não cria evidência, executa critérios, calcula consenso ou altera estados.',
    projection_readonly: 'PROJEÇÃO · SOMENTE LEITURA',
    // Submit Evidence
    submit_evidence_title: 'Submeter Evidência',
    // Create Trail
    create_trail_title: 'Criar Trilha',
    // Language selector
    language: 'Idioma',
  },
}

function useI18n() {
  const context = React.useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

function t(key: string, lang: Language): string {
  return translations[lang][key] || translations.en[key] || key
}

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

export type TrailPurpose = 'internal_reskilling' | 'external_hiring'

export type CustomTrail = {
  id: string
  role: string
  title: string
  statement: string
  purpose?: TrailPurpose
  externalChallenge?: { slug: string; instructions: string }
  criteria: Array<{ id: string; title: string; observables: string[] }>
  activities: Array<{ id: string; title: string; objective: string; expectedEvidence: string[]; criteria: string[] }>
}

type View =
  | 'Landing'
  | 'Dashboard'
  | 'Attestation Queue'
  | 'Adjudication Center'
  | 'Audit Logs'
  | 'Runtime Details'
  | 'Submit Evidence'
  | 'Create Trail'
  | 'Workspace Settings'

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
  canonical_runtime_not_configured: 'The runtime endpoint is not configured. The built-in fixture will be used.',
  canonical_runtime_unavailable: 'The external runtime could not be reached. Falling back to the built-in canonical fixture automatically.',
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

// Landing View Component
function LandingView({ setView }: { setView: (view: View) => void }) {
  return (
    <div className="landing-view landing-infrastructure">
      <section className="landing-hero">
        <div className="landing-copy">
          <p className="eyebrow"><span className="landing-status-dot" /> EVIDENCE INFRASTRUCTURE FOR CAPABILITY</p>
          <h1>From observable work to <span>verifiable capability.</span></h1>
          <p className="landing-lede">
            LASTRO is an evidence infrastructure that connects observable work to explicit competency criteria, separates AI interpretation from deterministic verification, and preserves bounded outcomes in an auditable record.
          </p>
          <div className="landing-actions">
            <button className="primary-button" onClick={() => setView('Dashboard')}>
              Enter workspace <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              className="text-button"
              onClick={() => document.getElementById('how-lastro-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the architecture
            </button>
          </div>
          <div className="landing-trustline">
            <span><ShieldCheck size={15} /> Evidence-led</span>
            <span><Activity size={15} /> Bounded states</span>
            <span><LockKeyhole size={15} /> Privacy-aware design</span>
          </div>
        </div>
        <div className="landing-signal landing-architecture-card" aria-label="LASTRO evidence-to-state model">
          <div className="signal-top"><span className="live-dot" /> THE EVIDENCE-TO-STATE MODEL</div>
          <div className="landing-model-intro">A traceable path from evidence to a bounded outcome.</div>
          <div className="signal-flow">
            <div><span>01</span><b>Observable work</b><small>Evidence and context</small></div>
            <i aria-hidden="true">↓</i>
            <div><span>02</span><b>Independent verification</b><small>Deterministic checks and AI interpretation</small></div>
            <i aria-hidden="true">↓</i>
            <div className="signal-final"><span>03</span><b>Bounded state</b><small>Auditable outcome with provenance</small></div>
          </div>
          <p className="landing-model-note">AI provides an interpretive signal. It does not independently determine the final state.</p>
        </div>
      </section>

      <section id="how-lastro-works" className="landing-principles landing-core-section">
        <div className="landing-section-heading">
          <p className="eyebrow">THE CORE PRINCIPLES</p>
          <h2>Infrastructure for evidence, not another credential platform.</h2>
          <p>LASTRO is designed to make the basis of a capability claim reviewable without treating an AI output or a blockchain transaction as the decision-maker.</p>
        </div>
        <div className="principle-grid">
          <article><span>01</span><h3>Evidence before assertion</h3><p>Claims are grounded in observable work, its context, and the evidence available for review.</p></article>
          <article><span>02</span><h3>Verification stays distinct</h3><p>Deterministic criteria and AI interpretation serve different purposes and remain distinguishable.</p></article>
          <article><span>03</span><h3>Bounded, reviewable outcomes</h3><p>Agreement, insufficient evidence, and conflict are distinct outcomes. Human adjudication remains an exception path when required.</p></article>
        </div>
      </section>

      <section className="landing-attestation-section" aria-labelledby="landing-attestation-title">
        <div className="landing-attestation-copy">
          <p className="eyebrow">CRYPTOGRAPHIC ATTESTATION</p>
          <h2 id="landing-attestation-title">Integrity can be verified. Competence is not decided by a blockchain.</h2>
          <p>When an attestation is available, a blockchain can anchor a reference to a reviewed state so its integrity can be checked independently. The decision itself remains the responsibility of the verification and review process.</p>
          <div className="landing-attestation-points">
            <div><CheckCircle2 size={18} /><span>Integrity references can be checked against the reviewed record.</span></div>
            <div><CheckCircle2 size={18} /><span>Sensitive evidence belongs off-chain; public records should avoid personal data.</span></div>
            <div><CheckCircle2 size={18} /><span>Verification status must reflect actual evidence, not a visual mock result.</span></div>
          </div>
          <button className="primary-button" onClick={() => setView('Runtime Details')}>Inspect runtime details <ArrowRight size={16} aria-hidden="true" /></button>
        </div>
        <div className="landing-proof-card">
          <div className="landing-proof-header"><span className="landing-proof-mark"><ShieldCheck size={18} /></span><div><b>Verification record</b><small>Runtime-backed details</small></div><span className="landing-readonly">READ-ONLY</span></div>
          <div className="landing-proof-row"><span>Evidence integrity</span><b>Reported by runtime</b></div>
          <div className="landing-proof-row"><span>Deterministic criteria</span><b>Reported by runtime</b></div>
          <div className="landing-proof-row"><span>AI interpretation</span><b>Separate signal</b></div>
          <div className="landing-proof-footer"><LockKeyhole size={15} /><span>No fabricated transaction, hash, signer, or verification result is displayed here.</span></div>
        </div>
      </section>
    </div>
  )
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
          <p className="eyebrow">WORKSPACE OVERVIEW · FROM LEARNING TO PROOF</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Infrastructure to transform learning experiences into verifiable competency evidence, human-reviewed and auditable.</p>
        </div>
        <div className="queue-summary">
          <strong>{conflictCount}</strong>
          <span>awaiting adjudication</span>
        </div>
      </div>

      {data?.attestation?.tx_signature && (
        <aside className="action-banner" style={{ background: 'var(--surface)', borderColor: 'var(--ac)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span className="badge b-attest">ON-CHAIN ATTESTATION VERIFIED</span>
            <span className="badge b-neutral">{data.attestation.network?.toUpperCase() ?? 'DEVNET'}</span>
            <div>
              <strong>Canonical Attestation Anchored on Solana</strong>
              <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: 'var(--mut)' }}>
                Hash: <code style={{ fontSize: '10.5px' }}>{data.attestation.record_hash.slice(0, 18)}…</code> · 
                Tx: <code style={{ fontSize: '10.5px' }}>{data.attestation.tx_signature.slice(0, 18)}…</code>
              </p>
            </div>
          </div>
          <a
            href={explorerUrl(data.attestation.network, data.attestation.tx_signature) ?? '#'}
            target="_blank"
            rel="noreferrer"
            className="primary-button"
            style={{ textDecoration: 'none', marginLeft: 'auto', whiteSpace: 'nowrap' }}
          >
            Verify on Solana Explorer <ArrowRight size={14} />
          </a>
        </aside>
      )}

      <div className="metrics-grid">
        <div className="metric-card"><strong>{totalCount}</strong><span>Total attestations</span></div>
        <div className="metric-card metric-green"><strong>{demonstratedCount}</strong><span>Demonstrated</span></div>
        <div className="metric-card metric-amber"><strong>{conflictCount}</strong><span>Awaiting review</span></div>
        <div className="metric-card"><strong>{inDevelopmentCount}</strong><span>In development</span></div>
      </div>
      <section className="content-card workflow-card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">RECOMMENDED WORKFLOW</p>
            <h2>From evidence to decision</h2>
            <p>Follow the workspace in this order to keep review context intact.</p>
          </div>
        </div>
        <div className="workflow-steps">
          <button onClick={() => setView('Attestation Queue')}>
            <span>01</span>
            <b>Review queue</b>
            <small>Inspect submitted evidence</small>
          </button>
          <button onClick={() => setView('Adjudication Center')}>
            <span>02</span>
            <b>Resolve conflicts</b>
            <small>Apply human judgment</small>
          </button>
          <button onClick={() => setView('Audit Logs')}>
            <span>03</span>
            <b>Audit the record</b>
            <small>Trace the final decision</small>
          </button>
        </div>
      </section>
      <section className="content-card overview-card">
        <div className="card-heading">
          <div>
            <h2>Scenario summary</h2>
            <p>Counts from the synthetic scenarios bundled with this demo — not live production activity.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="secondary-button" onClick={() => setView('Submit Evidence')}>+ New Evidence</button>
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

// ─── SUBMIT EVIDENCE VIEW (Learner / Worker Portal) ────────────────────────
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
  const [evidenceSource, setEvidenceSource] = useState<'file' | 'drive' | 'notion' | 'linkedin' | 'github'>('file')
  const [externalUrl, setExternalUrl] = useState('')
  const [content, setContent] = useState(`import hashlib
import pandas as pd

def desidentificar_dados(df: pd.DataFrame, salt: str = "lastro-prod") -> pd.DataFrame:
    """Applies irreversible pseudoanonymization with a cryptographic salt."""
    df_clean = df.copy()
    df_clean["cpf_hash"] = df_clean["cpf"].apply(lambda v: hashlib.sha256(f"{v}:{salt}".encode()).hexdigest())
    df_clean = df_clean.drop(columns=["nome", "cpf", "email"])
    return df_clean

# Execution and stress test
df_sample = pd.read_csv("pacientes_raw.csv")
df_safe = desidentificar_dados(df_sample)
assert "cpf" not in df_safe.columns
print("Pipeline executed with integrity.")
`)
  const [hash, setHash] = useState<string>('')
  const [hashError, setHashError] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  // Compute the cryptographic SHA-256 hash in real time
  useEffect(() => {
    async function computeHash() {
      const raw = evidenceSource === 'file' ? content : externalUrl.trim()
      if (!raw) {
        setHash('')
        return
      }
      setHashError('')
      try {
        const encoder = new TextEncoder()
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(raw))
        const hashHex = Array.from(new Uint8Array(hashBuffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
        setHash(hashHex)
      } catch {
        setHash('')
        setHashError('Could not compute SHA-256 in this browser. No hash was confirmed.')
      }
    }
    computeHash()
  }, [content, externalUrl, evidenceSource])

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

    // Create a new projection with the newly-submitted evidence
    const syntheticProjection: M4Projection = {
      synthetic: true,
      competency: {
        id: currentTrail?.id ?? 'comp:custom',
        statement: currentTrail?.statement ?? 'Competency demonstrated in a practical environment.',
        criteria: currentTrail?.criteria ?? [
          { id: 'C1', title: 'Structural Criterion', observables: ['Evidence submitted with verifiable hash'] },
        ],
      },
      trail: {
        id: currentTrail?.id ?? 'trail:custom',
        title: currentTrail?.title ?? 'Corporate Trail',
        activities: currentTrail?.activities ?? [
          {
            id: activityId,
            title: `Activity ${activityId}`,
            objective: 'Demonstrate reproducible technical capability',
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
            support: 'The submitted artifact contains a structured analytical routine with coherent tests and de-identification.',
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
            rationale: 'The hash was computed in the browser; integrity verification by the runtime was not executed.',
          },
          {
            mechanism: 'deterministic_criteria',
            criterion_id: 'C1',
            status: 'NOT_RUN',
            rationale: 'Deterministic verification was not executed by the runtime.',
          },
          {
            mechanism: 'ai_interpretation',
            criterion_id: 'C1',
            status: 'NOT_RUN',
            rationale: 'No AI interpretation was performed for this evidence.',
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
      target: currentTrail?.statement ?? 'Competency Evidence',
      hash: shortHash,
      status: 'IN_DEVELOPMENT',
      data: syntheticProjection,
    }

    onSubmitEvidence(newItem)

    // Asynchronously persist to database
    fetch('/api/evidence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: `ev-${Date.now().toString(36)}`,
        employeeName,
        employeeRole,
        trailId: selectedTrailId,
        activityId,
        evidenceType,
        sourceType: evidenceSource,
        sourceRef: filename,
        contentHash: `sha256:${hash}`,
        trustLevel: 'N2_EVIDENCE_PRESENTED',
      }),
    }).catch((err) => console.warn('[LASTRO DB] Evidence save warning:', err))

    setSubmitted(true)
  }

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COLLABORATOR PORTAL · EVIDENCE SUBMISSION</p>
          <h1>Submit Evidence</h1>
          <p className="page-subtitle">
            Attach your observable work (code, notebook or synthesis). The SHA-256 is computed in this browser. This form does not yet send the evidence to the canonical runtime.
          </p>
        </div>
      </div>

      {submitted && (
        <aside className="action-banner">
          <div>
            <CheckCircle2 />
            <div>
              <strong>Local draft created</strong>
              <p>The content and hash were added only to this session's queue. No verification, consensus or attestation was executed by the canonical runtime.</p>
            </div>
          </div>
          <button className="primary-button" onClick={() => setView('Attestation Queue')}>
            View in Attestation Queue <ArrowRight size={14} />
          </button>
        </aside>
      )}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Collaborator / Learner Name <small>SUBMITTED_BY</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="e.g. Gabriel Lima"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Role / Target Position <small>ROLE</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={employeeRole}
              onChange={(e) => setEmployeeRole(e.target.value)}
              placeholder="e.g. Data Governance Lead"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Active Competency Trail <small>TRAIL_ID</small>
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
              Trail Activity <small>ACTIVITY_ID</small>
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
              Canonical Evidence Type <small>EVIDENCE_TYPE</small>
            </label>
            <select
              className="form-select"
              value={evidenceType}
              onChange={(e) => setEvidenceType(e.target.value)}
            >
              <option value="analysis_artifact">analysis_artifact (Notebook .ipynb / Script .py)</option>
              <option value="briefing">briefing (Question Definition .md)</option>
              <option value="analysis_result">analysis_result (Data, Logs and Tables .csv / .md)</option>
              <option value="communication">communication (Executive Synthesis .md / .pdf)</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              File / Repository Reference <small>SOURCE_REF</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g. pipeline_desidentificacao.py"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>
              Observable File Upload <small>FILE_DROPZONE</small>
            </label>
            <label htmlFor="file-input" className="dropzone">
              <Upload />
              <strong>Drag your file here or click to select</strong>
              <p>Supported formats: .ipynb, .py, .md, .csv, .json, .pdf (instant read)</p>
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
              Evidence Content <small>RAW_CONTENT (USED FOR THE HASH)</small>
            </label>
            <textarea
              className="form-textarea"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your source code, notebook JSON or markdown here..."
              required
            />
          </div>
        </div>

        {hashError && <p className="runtime-error" role="alert">{hashError}</p>}
        {hash && !hashError && (
          <div className="hash-preview-card">
            <div>
              <span className="eyebrow ac">LOCAL HASH · NOT YET VERIFIED</span>
              <code>SHA-256 · {hash}</code>
              <small style={{ color: 'var(--mut-2)', fontSize: '11px', marginTop: '4px' }}>
                Identifier computed in this browser. Does not prove authorship, runtime registration or immutability.
              </small>
            </div>
            <span className="badge b-evidence">HASH COMPUTED LOCALLY</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="secondary-button" onClick={() => setView('Dashboard')}>
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={!hash || Boolean(hashError) || !content.trim()}>
            <FolderUp size={16} /> Submit for Cryptographic Verification
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── CREATE TRAIL VIEW (Organization / HR Trail Builder) ─────────────────────
function CreateTrailView({
  onSaveTrail,
  setView,
}: {
  onSaveTrail: (newTrail: CustomTrail) => void
  setView: (view: View) => void
}) {
  const [role, setRole] = useState('Data Governance & AI Leader')
  const [title, setTitle] = useState('Data Governance and Ethical Anonymization with AI Trail')
  const [statement, setStatement] = useState(
    'Ensure the de-identification and ethical governance of sensitive data in corporate pipelines with AI support, strict auditability and re-identification tests.'
  )
  const [criteria, setCriteria] = useState([
    {
      id: 'C1',
      title: 'Privacy Risk Mapping',
      observables: [
        'identifies direct and indirect identification columns',
        'documents the rationale for the chosen mitigation technique',
      ],
    },
    {
      id: 'C2',
      title: 'Anonymization Routine Implementation',
      observables: [
        'implements cryptographic algorithm with a secure salt',
        'ensures key removal is irreversible in an auditable pipeline',
      ],
    },
    {
      id: 'C3',
      title: 'Re-identification Tests and Proof',
      observables: [
        'runs stress test against linkage attacks',
        'generates deterministic logs proving data sanitization',
      ],
    },
  ])
  const [activities, setActivities] = useState([
    {
      id: 'A1',
      title: 'Briefing and Privacy Plan',
      objective: 'Structure the compliance scope for the dataset',
      expectedEvidence: ['briefing'],
      criteria: ['C1'],
    },
    {
      id: 'A2',
      title: 'Anonymization Pipeline',
      objective: 'Build the automated code-based sanitization routine',
      expectedEvidence: ['analysis_artifact'],
      criteria: ['C2'],
    },
    {
      id: 'A3',
      title: 'Audit and Stress Test',
      objective: 'Prove robustness and absence of leaks',
      expectedEvidence: ['analysis_result', 'communication'],
      criteria: ['C3'],
    },
  ])
  const [saved, setSaved] = useState(false)

  // Quick presets for new roles
  const applyPreset = (presetKey: string) => {
    if (presetKey === 'governance') {
      setRole('Data Governance & AI Leader')
      setTitle('Data Governance and Ethical Anonymization with AI Trail')
      setStatement(
        'Ensure the de-identification and ethical governance of sensitive data in corporate pipelines with AI support, strict auditability and re-identification tests.'
      )
    } else if (presetKey === 'finance') {
      setRole('AI-Assisted Financial Analyst')
      setTitle('Financial Modelling and LLM Validation Trail')
      setStatement(
        'Build cash-flow projections and valuations assisted by language models, maintaining strict traceability of formulas and assumptions against primary data.'
      )
    } else if (presetKey === 'aiops') {
      setRole('AI Operations & Agents Engineer')
      setTitle('Autonomous Agent Orchestration and Evaluation Trail')
      setStatement(
        'Design, calibrate and monitor intelligent agent flows with deterministic guardrails, hallucination prevention and an auditable execution log.'
      )
    }
  }

  const handleAddCriterion = () => {
    const nextId = `C${criteria.length + 1}`
    setCriteria([
      ...criteria,
      { id: nextId, title: 'New Observable Criterion', observables: ['proves verifiable technical action'] },
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

    // Asynchronously persist trail to database
    fetch('/api/trails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrail),
    }).catch((err) => console.warn('[LASTRO DB] Trail save warning:', err))
  }

  return (
    <div className="view-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEW ROLE · CAPABILITY DESIGN</p>
          <h1>Create Competency Trail</h1>
          <p className="page-subtitle">
            Build a competency trail and define observable criteria with verifiable evidence requirements.
          </p>
        </div>
      </div>

      <div className="preset-bar">
        <span className="eyebrow" style={{ marginRight: 6 }}>
          QUICK PRESETS:
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
              <strong>Trail registered and persisted</strong>
              <p>The trail definition has been saved to the database and is accessible across sessions for evidence submissions.</p>
            </div>
          </div>
          <button className="primary-button" onClick={() => setView('Submit Evidence')}>
            Submit Evidence in this Trail <ArrowRight size={14} />
          </button>
        </aside>
      )}

      <form className="form-card" onSubmit={handleSave}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              New Role / Target Position <small>TARGET_ROLE</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Data Governance Leader"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Canonical Trail Title <small>TRAIL_TITLE</small>
            </label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Governance and Anonymization Trail"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>
              Canonical Competency Statement <small>COMPETENCY_STATEMENT</small>
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Describe the observable capability that distinguishes who demonstrates this competency..."
              required
            />
          </div>
        </div>

        {/* Observable Criteria */}
        <div className="builder-block">
          <div className="builder-header">
            <div>
              <strong>Observable Canonical Criteria</strong>
              <p style={{ margin: '2px 0 0', color: 'var(--mut)', fontSize: '11.5px' }}>
                Objective criteria that must be tested by deterministic mechanisms and semantic interpretation.
              </p>
            </div>
            <button type="button" className="secondary-button" onClick={handleAddCriterion}>
              <Plus size={14} /> Add Criterion
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
                      title="Remove criterion"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div style={{ paddingLeft: '4px' }}>
                  <small style={{ color: 'var(--mut-2)', fontSize: '10px', textTransform: 'uppercase' }}>
                    Observable behaviours:
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

        {/* Expected Activities and Evidence */}
        <div className="builder-block">
          <div className="builder-header">
            <div>
              <strong>Trail Activities and Evidence</strong>
              <p style={{ margin: '2px 0 0', color: 'var(--mut)', fontSize: '11.5px' }}>
                The practical steps through which the collaborator will submit concrete evidence.
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
                    Evidence: {act.expectedEvidence.join(', ')}
                  </span>
                </div>
                <p style={{ margin: '2px 0 0', color: 'var(--mut)', fontSize: '12px' }}>
                  <b>Objective:</b> {act.objective} · <b>Feeds:</b> {act.criteria.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" className="secondary-button" onClick={() => setView('Dashboard')}>
            Cancel
          </button>
          <button type="submit" className="primary-button">
            <Layers size={16} /> Save Trail Draft
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Nav items ───────────────────────────────────────────────────────────────
const reviewNavItems: [typeof LayoutDashboard, View][] = [
  [LayoutDashboard, 'Dashboard'],
  [ClipboardCheck, 'Attestation Queue'],
  [ShieldCheck, 'Adjudication Center'],
  [Activity, 'Audit Logs'],
  [FileCode2, 'Runtime Details'],
]

const operationNavItems: [typeof FolderUp, View][] = [
  [FolderUp, 'Submit Evidence'],
  [Layers, 'Create Trail'],
]
const workspaceProfile = {
  name: 'Learning Ops',
  subtitle: 'Evidence workspace',
  organization: 'Demo Organization',
  initials: 'LO',
  protocolLabel: 'LASTRO (Protocol)',
}

// ─── Default Initial Trail ───────────────────────────────────────────────────
const initialDefaultTrail: CustomTrail = {
  id: 'trail:applied-data-analysis',
  role: 'Data Analyst',
  title: 'Applied Data Analysis Trail',
  statement:
    'Use AI tools to transform a business question into reproducible data analysis and communicate conclusions backed by evidence.',
  criteria: [
    {
      id: 'C1',
      title: 'Analytical Formulation',
      observables: ['transforms a business question into a clear analytical question', 'defines what it intends to answer'],
    },
    {
      id: 'C2',
      title: 'Data Treatment and Analysis',
      observables: ['identifies and prepares data', 'runs analysis consistent with the question'],
    },
    {
      id: 'C3',
      title: 'Evidence and Support',
      observables: ['presents results backed by data', 'distinguishes observation from inference'],
    },
    {
      id: 'C4',
      title: 'Communication',
      observables: ['communicates context, findings and limitations in a comprehensible way'],
    },
  ],
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
}

type WorkspaceContext = {
  organizationName: string
  domain: string
  operatingObjective: string
  evidenceContext: string
}

const defaultWorkspaceContext: WorkspaceContext = {
  organizationName: 'MVP Environment',
  domain: 'Learning & Competency',
  operatingObjective: 'Evaluate observable work against explicit competency criteria.',
  evidenceContext: 'Use artifacts with clear source, activity, context, and reviewable criteria. Do not submit personal or sensitive data.',
}

function WorkspaceSettingsView() {
  const [context, setContext] = useState<WorkspaceContext>(defaultWorkspaceContext)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('lastro.workspace-context.v1')
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<WorkspaceContext>
        setContext({
          organizationName: parsed.organizationName ?? defaultWorkspaceContext.organizationName,
          domain: parsed.domain ?? defaultWorkspaceContext.domain,
          operatingObjective: parsed.operatingObjective ?? defaultWorkspaceContext.operatingObjective,
          evidenceContext: parsed.evidenceContext ?? defaultWorkspaceContext.evidenceContext,
        })
      }
    } catch {
      // Keep safe defaults when browser storage is unavailable or invalid.
    } finally {
      setHydrated(true)
    }
  }, [])

  const update = (field: keyof WorkspaceContext, value: string) => {
    setContext((current) => ({ ...current, [field]: value }))
    setSaved(false)
    setSaveError(false)
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      window.localStorage.setItem('lastro.workspace-context.v1', JSON.stringify(context))
      setSaved(true)
      setSaveError(false)
    } catch {
      setSaved(false)
      setSaveError(true)
    }
  }

  const handleReset = () => {
    setContext(defaultWorkspaceContext)
    setSaved(false)
    setSaveError(false)
    try {
      window.localStorage.removeItem('lastro.workspace-context.v1')
    } catch {
      // The in-memory defaults still apply for this session.
    }
  }

  return (
    <div className="view-stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">WORKSPACE · LOCAL CONFIGURATION</p>
          <h1>Workspace context</h1>
          <p className="page-subtitle">Define the operating context used by your team when preparing evidence and competency trails.</p>
        </div>
        <span className="badge b-neutral">BROWSER-LOCAL SETTINGS</span>
      </header>

      <div className="data-notice" role="note">
        <LockKeyhole size={16} />
        <span><strong>Prototype boundary.</strong> These settings are stored only in this browser. They do not configure the canonical runtime, change verification rules, or create an organization account.</span>
      </div>

      <form className="form-card workspace-settings-form" onSubmit={handleSave}>
        <div className="section-header">
          <div><span className="eyebrow">01 / IDENTITY</span><h2>Organization and domain</h2></div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="workspace-org">Workspace name</label>
            <input id="workspace-org" className="form-control" value={context.organizationName} onChange={(event) => update('organizationName', event.target.value)} maxLength={80} required />
          </div>
          <div className="form-group">
            <label htmlFor="workspace-domain">Operating domain</label>
            <input id="workspace-domain" className="form-control" value={context.domain} onChange={(event) => update('domain', event.target.value)} maxLength={100} required />
          </div>
          <div className="form-group full-width">
            <label htmlFor="workspace-objective">Operating objective</label>
            <textarea id="workspace-objective" className="form-textarea" value={context.operatingObjective} onChange={(event) => update('operatingObjective', event.target.value)} rows={3} maxLength={1000} required />
          </div>
          <div className="form-group full-width">
            <label htmlFor="workspace-evidence">Evidence intake context and constraints</label>
            <textarea id="workspace-evidence" className="form-textarea" value={context.evidenceContext} onChange={(event) => update('evidenceContext', event.target.value)} rows={4} maxLength={2000} required />
            <small>Describe acceptable sources, required context, and data-handling restrictions. Do not include personal data here.</small>
          </div>
        </div>
        <div className="workspace-settings-actions">
          <button type="button" className="secondary-button" onClick={handleReset}>Reset defaults</button>
          <button type="submit" className="primary-button" disabled={!hydrated}>Save context locally <Check size={14} /></button>
        </div>
        {saved && <p className="workspace-save-status" role="status"><CheckCircle2 size={16} /> Context saved in this browser. Runtime integration is not enabled.</p>}
        {saveError && <p className="workspace-save-error" role="alert">Could not save to this browser. Storage may be disabled or unavailable; changes remain only in the current view.</p>}
      </form>

      <section className="panel workspace-next-step">
        <span className="eyebrow">02 / NEXT INTEGRATION STEP</span>
        <h2>Connect context to the evidence workflow</h2>
        <p>For this context to guide real submissions, the next implementation must define a versioned workspace contract, validate it server-side, and pass its identifier with evidence and trail requests. This screen intentionally does not simulate that integration.</p>
      </section>
    </div>
  )
}

// ─── Root Application Component ──────────────────────────────────────────────
type ApiStatus = 'checking' | 'ready' | 'waking' | 'offline'

async function checkApiHealth(signal: AbortSignal) {
  const response = await fetch('/api/health', { signal, cache: 'no-store' })
  if (!response.ok) throw new Error(`Health check failed: ${response.status}`)
  return response
}

export default function Page() {
  const [data, setData] = useState<M4Projection | null>(null)
  const [error, setError] = useState<{ message: string; hint: string | null } | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)
  const [view, setView] = useState<View>('Landing')
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')
  const [apiRetry, setApiRetry] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const sidebarRef = useRef<HTMLElement | null>(null)
  const wasMenuOpen = useRef(false)

  const wakeApi = useCallback(async () => {
    setApiStatus('checking')
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 12000)
      try {
        await checkApiHealth(controller.signal)
        setApiStatus('ready')
        setApiRetry(attempt)
        window.clearTimeout(timeout)
        return
      } catch {
        window.clearTimeout(timeout)
        setApiRetry(attempt + 1)
        if (attempt < 3) {
          setApiStatus('waking')
          await new Promise((resolve) => window.setTimeout(resolve, 1500 * 2 ** attempt))
        }
      }
    }
    setApiStatus('offline')
  }, [])

  useEffect(() => {
    void wakeApi()
  }, [wakeApi])

  useEffect(() => {
    if (!menuOpen) {
      if (wasMenuOpen.current) {
        menuButtonRef.current?.focus()
        wasMenuOpen.current = false
      }
      return
    }

    wasMenuOpen.current = true
    const sidebar = sidebarRef.current
    const focusable = () => Array.from(
      sidebar?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => element.getAttribute('aria-hidden') !== 'true')

    sidebar?.querySelector<HTMLElement>('.mobile-close')?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const elements = focusable()
      if (elements.length === 0) {
        event.preventDefault()
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]
      const active = document.activeElement
      if (!sidebar?.contains(active)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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

        const canonicalItem: QueueItem = {
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
        }
        setQueueItems((prev) => {
          const others = prev.filter((i) => i.id !== 'item-ana-synthetic')
          return [canonicalItem, ...others]
        })
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

  // Hydrate trails and evidence from persistent database (Vercel Postgres / Neon)
  useEffect(() => {
    // 1. Fetch persisted custom trails
    fetch('/api/trails')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.items && Array.isArray(payload.items) && payload.items.length > 0) {
          setTrails((prev) => {
            const existingIds = new Set(prev.map((t) => t.id))
            const newTrails = payload.items.filter((item: CustomTrail) => !existingIds.has(item.id))
            return [...newTrails, ...prev]
          })
        }
      })
      .catch((err) => console.warn('[LASTRO DB] Trails fetch warning:', err))

    // 2. Fetch persisted evidence submissions and integrate into attestation queue
    fetch('/api/evidence')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.items && Array.isArray(payload.items) && payload.items.length > 0) {
          setQueueItems((prev) => {
            const existingIds = new Set(prev.map((i) => i.id))
            const loadedItems: QueueItem[] = payload.items
              .filter((ev: any) => !existingIds.has(ev.id))
              .map((ev: any) => {
                const rawHash = (ev.contentHash || '').replace('sha256:', '')
                const shortHash = rawHash.length > 12 ? rawHash.substring(0, 8) + '...' + rawHash.slice(-4) : rawHash || '...'
                return {
                  id: ev.id,
                  name: ev.employeeName,
                  role: ev.employeeRole,
                  target: `Trail: ${ev.trailId} (${ev.activityId})`,
                  hash: shortHash,
                  status: 'IN_DEVELOPMENT' as QueueStatus,
                  data: {
                    synthetic: false,
                    competency: {
                      id: ev.trailId,
                      statement: `Demonstrating criteria for activity ${ev.activityId}`,
                      criteria: [],
                    },
                    trail: {
                      id: ev.trailId,
                      title: ev.trailId,
                      activities: [],
                    },
                    evidence: [
                      {
                        evidence_id: ev.id,
                        type: ev.evidenceType,
                        activity_id: ev.activityId,
                        source_ref: ev.sourceRef,
                        content_ref: ev.contentHash,
                        trust_level: ev.trustLevel,
                        synthetic: false,
                      },
                    ],
                    interpretation: {
                      id: `interp-${ev.id}`,
                      model: 'none',
                      signals: [],
                    },
                    verification: {
                      mechanisms: [
                        {
                          mechanism: 'evidence_integrity',
                          criterion_id: 'C1',
                          status: 'PASS',
                          rationale: 'Hash recorded and verified in persistent storage.',
                        },
                      ],
                    },
                    consensus: {
                      status: 'INSUFFICIENT_EVIDENCE',
                      can_auto_advance: false,
                      requires_adjudication: false,
                    },
                    state: {
                      value: 'UNDER_REVIEW',
                      history: [{ step: 'SUBMISSION', timestamp: ev.createdAt }],
                    },
                    handoff: {
                      record_version: 'v0.2',
                      record_hash: rawHash,
                      competency_id: ev.trailId,
                      state: 'UNDER_REVIEW',
                      decision_mode: 'persisted_evidence_record',
                    },
                    attestation: null,
                    public_verification: null,
                  },
                }
              })
            return [...loadedItems, ...prev]
          })
        }
      })
      .catch((err) => console.warn('[LASTRO DB] Evidence fetch warning:', err))
  }, [])

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
      <aside ref={sidebarRef} id="primary-navigation" className={`sidebar ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
        <div className="sidebar-top">
          <button className="logo-button" onClick={() => setView('Landing')} aria-label="Ir para página inicial">
            <a className="brand" href="#" aria-label="LASTRO — Home">
              <div className="brand-mark">
                <LastroSymbol size={32} />
              </div>
              <div className="brand-text">
                <span className="brand-name">LASTRO</span>
                <small className="brand-caption">EVIDENCE INFRASTRUCTURE</small>
              </div>
            </a>
          </button>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <X />
          </button>
        </div>

        <button type="button" className="workspace-switcher" onClick={() => setView('Workspace Settings')} aria-label="Configure workspace context">
          <span className="workspace-avatar"><LastroSymbolReduced size={18} /></span>
          <span className="workspace-copy">
            <small className="workspace-kicker">DEMO WORKSPACE</small>
            <b>Workspace context</b>
          </span>
          <span className="workspace-config-action">Configure</span>
        </button>

        {/* Grupo 1: Operação & Trilha — fluxo do colaborador (topo) */}
        <div className="nav-label">Operation &amp; Trail</div>
        <nav aria-label="Operation navigation">
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

        {/* Divisor visual entre os dois grupos */}
        <div className="nav-section-divider" aria-hidden="true">
          <span>review</span>
        </div>

        {/* Group 2: Review & Audit — evaluator workflow */}
        <div className="nav-label">Review &amp; Audit</div>
        <nav aria-label="Review navigation">
          {reviewNavItems.map(([Icon, label]) => (
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

        <div className="sidebar-bottom">
          <div className={`system-status api-${apiStatus}`} role="status" aria-live="polite">
            <span className="live-dot" />
            <span>
              <b>
                {apiStatus === 'checking' && 'Checking runtime…'}
                {apiStatus === 'ready' && 'Systems operational'}
                {apiStatus === 'waking' && 'Waking runtime…'}
                {apiStatus === 'offline' && 'Runtime unavailable'}
              </b>
              <small>
                {apiStatus === 'ready' && 'Health check confirmed'}
                {apiStatus === 'offline' && 'Retry from the workspace'}
                {apiStatus !== 'ready' && apiStatus !== 'offline' && `Attempt ${Math.max(apiRetry, 1)} of 4`}
              </small>
            </span>
            {apiStatus === 'offline' && (
              <button className="retry-button" onClick={() => void wakeApi()}>
                Retry
              </button>
            )}
          </div>
          <div className="user-card">
            <div className="user-avatar">{workspaceProfile.initials}</div>
            <div>
              <b>{workspaceProfile.organization}</b>
              <small>Workspace context</small>
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

      <main className="main-content" id="main-content" inert={menuOpen} aria-hidden={menuOpen}>
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
            LASTRO (Demo)
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
              <button type="button" className="retry-button" onClick={() => setAttempt((n) => n + 1)}>
                Try again
              </button>
            </section>
          )}

          {view === 'Workspace Settings' && <WorkspaceSettingsView />}

          {!loading && !error && view !== 'Workspace Settings' && (
            <>
              {view === 'Landing' && <LandingView setView={setView} />}
              {view === 'Dashboard' && (
                <DashboardView data={data} queueItems={queueItems} setView={setView} />
              )}
              {view === 'Attestation Queue' && <QueueView items={queueItems} setView={setView} />}
              {view === 'Adjudication Center' && <AdjudicationView items={queueItems} setView={setView} />}
              {view === 'Audit Logs' && <AuditView data={data} />}

              {/* New Screens */}
              {view === 'Submit Evidence' && (
                <SubmitEvidenceView
                  trails={trails}
                  onSubmitEvidence={handleAddEvidence}
                  setView={setView}
                />
              )}

              {view === 'Create Trail' && (
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
