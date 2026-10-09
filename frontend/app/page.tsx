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
  evidence_integrity: 'Integridade da evidência',
  deterministic_criteria: 'Critérios determinísticos',
  ai_interpretation: 'Interpretação por IA',
}

const consensusDescriptions: Record<M4Projection['consensus']['status'], string> = {
  AGREEMENT: 'Os mecanismos reportaram concordância. O estado é exibido separadamente e não é recalculado pela interface.',
  INSUFFICIENT_EVIDENCE: 'A evidência disponível foi considerada insuficiente pelo runtime. Não interprete este resultado como demonstração.',
  CONFLICT: 'Há conflito reportado. O avanço automático deve permanecer bloqueado; esta interface não resolve o conflito.',
  HUMAN_ADJUDICATION: 'O runtime indica necessidade de adjudicação humana. Esta interface não registra nem simula uma decisão humana.',
}

const stateLabels: Record<M4Projection['state']['value'], string> = {
  NOT_STARTED: 'Não iniciado',
  IN_DEVELOPMENT: 'Em desenvolvimento',
  UNDER_REVIEW: 'Em revisão',
  DEMONSTRATED: 'Demonstrado',
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
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/m4/competency?scenario=synthetic-ana', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Runtime indisponível (HTTP ${response.status}).`)
        return response.json() as Promise<M4Projection>
      })
      .then((projection) => setData(projection))
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === 'AbortError') return
        setError(cause instanceof Error ? cause.message : 'Falha ao consultar o runtime canônico.')
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const txUrl = explorerUrl(data?.attestation?.network, data?.attestation?.tx_signature)

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Navegação principal">
        <a className="brand" href="#runtime" aria-label="LASTRO — início">
          <strong className="brand-name">LASTRO</strong>
          <small className="brand-caption">COMPETÊNCIAS QUE DEIXAM LASTRO.</small>
        </a>
        <nav className="nav-list" aria-label="Seções do runtime">
          <a className="nav-item nav-item-active" href="#runtime" aria-current="page"><span>M4 · Runtime</span></a>
        </nav>
        <div className="sidebar-bottom">
          <span className="eyebrow">MODO</span>
          <span className="badge b-neutral">SOMENTE LEITURA</span>
        </div>
      </aside>

      <div className="main-area">
        <div className="page-content" id="runtime">
          <header className="page-heading runtime-heading">
            <div>
              <span className="eyebrow">M4 / RUNTIME CANÔNICO</span>
              <h1>Da evidência à prova.</h1>
              <p>A interface apresenta dados recebidos do runtime. Não cria evidência, executa critérios, calcula consenso ou altera estados.</p>
            </div>
            <span className="badge b-neutral">PROJEÇÃO · SOMENTE LEITURA</span>
          </header>

          {loading && <section className="panel runtime-panel" role="status" aria-live="polite"><span className="eyebrow">CONEXÃO</span><h2>Consultando runtime…</h2><p>Aguardando a projeção canônica.</p></section>}
          {error && <section className="panel runtime-panel runtime-error" role="alert"><span className="eyebrow">CONEXÃO</span><h2>Runtime não conectado</h2><p>{error}</p><p>Inicie o serviço M4 do MVP e configure <code>LASTRO_M4_RUNTIME_URL</code> no servidor Next.js. Nenhum dado local será usado como fallback.</p></section>}

          {data && <>
            <div className="data-notice" role="note">
              <strong>{data.synthetic ? 'Cenário sintético — Ana' : 'Registro de competência'}</strong>
              <span>Origem: runtime canônico. {data.synthetic ? 'Este cenário é demonstrativo; não constitui prova de validação externa.' : 'Os dados abaixo são apresentados conforme recebidos.'}</span>
            </div>

            <section className="panel runtime-panel" aria-labelledby="competency-title">
              <span className="eyebrow">COMPETÊNCIA · {data.competency.id}</span>
              <h2 id="competency-title">{data.competency.statement}</h2>
              <div className="runtime-state-grid">
                <div className="runtime-state-card runtime-state-current">
                  <span className="eyebrow">ESTADO DA COMPETÊNCIA</span>
                  <strong>{stateLabels[data.state.value] ?? data.state.value}</strong>
                  <code>{data.state.value}</code>
                </div>
                <div className={`runtime-state-card runtime-consensus runtime-consensus-${data.consensus.status.toLowerCase().replaceAll('_', '-')}`}>
                  <span className="eyebrow">RESULTADO DO CONSENSO</span>
                  <strong>{data.consensus.status}</strong>
                  <p>{consensusDescriptions[data.consensus.status]}</p>
                  <div className="runtime-consensus-meta">
                    <span>Avanço automático informado: <strong>{data.consensus.can_auto_advance ? 'permitido' : 'bloqueado'}</strong></span>
                    <span>Adjudicação humana requerida: <strong>{data.consensus.requires_adjudication ? 'sim' : 'não'}</strong></span>
                  </div>
                </div>
              </div>
              {data.consensus.status === 'CONFLICT' || data.consensus.requires_adjudication ? (
                <aside className="runtime-exception" role="note">
                  <strong>Revisão humana excepcional</strong>
                  <p>O runtime sinaliza conflito ou adjudicação necessária. Nenhuma decisão é tomada nesta interface e o estado não é avançado por ela.</p>
                  {data.consensus.status === 'CONFLICT' && data.consensus.can_auto_advance ? <p><strong>Inconsistência reportada:</strong> o resultado é CONFLICT, mas o runtime informou avanço automático permitido. Não trate esta projeção como autorização para avançar o estado; verificar o contrato do runtime.</p> : null}
                </aside>
              ) : null}
              <div className="runtime-subsection">
                <span className="eyebrow">CRITÉRIOS CANÔNICOS</span>
                {data.competency.criteria.map((criterion) => <article className="runtime-item" key={criterion.id}>
                  <strong>{criterion.id} · {criterion.title}</strong>
                  <ul>{criterion.observables.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>)}
              </div>
            </section>

            <section className="panel runtime-panel" aria-labelledby="trail-title">
              <span className="eyebrow">TRILHA · {data.trail.id}</span>
              <h2 id="trail-title">{data.trail.title}</h2>
              {data.trail.activities.map((activity) => <article className="runtime-item" key={activity.id}>
                <h3>{activity.id} · {activity.title}</h3>
                <p>{activity.objective}</p>
                <small>Evidências esperadas: {activity.expectedEvidence.join(', ') || 'Não informadas pelo runtime.'}</small>
              </article>)}
            </section>

            <section className="panel runtime-panel" aria-labelledby="evidence-title">
              <div className="runtime-section-heading">
                <div><span className="eyebrow">ETAPA 01 · ORIGEM</span><h2 id="evidence-title">Evidências</h2></div>
                <span className="badge b-evidence">{data.evidence.length} referência(s)</span>
              </div>
              <p className="runtime-intro">Referências recebidas do runtime; sua presença não significa, por si só, integridade verificada ou competência demonstrada.</p>
              {data.evidence.map((item) => <article className="runtime-evidence" key={item.evidence_id}>
                <div className="runtime-evidence-heading"><strong>{item.evidence_id}</strong><span className="badge b-evidence">{item.synthetic ? 'SINTÉTICA' : item.type}</span></div>
                <p>{item.type} · atividade {item.activity_id} · confiança de origem: {item.trust_level}</p>
                <dl className="runtime-metadata">
                  <div><dt>Referência de origem</dt><dd>{item.source_ref}</dd></div>
                  <div><dt>Referência de conteúdo</dt><dd>{item.content_ref}</dd></div>
                </dl>
              </article>)}
            </section>

            <section className="panel runtime-panel" aria-labelledby="integrity-title">
              <div className="runtime-section-heading">
                <div><span className="eyebrow">ETAPAS 02–03 · CHECAGENS</span><h2 id="integrity-title">Integridade e critérios</h2></div>
              </div>
              <p className="runtime-intro">Resultados de mecanismos canônicos. A interface não reexecuta nem recalcula as checagens.</p>
              <div className="runtime-verification-list">
                {data.verification.mechanisms.filter((item) => item.mechanism !== 'ai_interpretation').map((item, index) => <article className="runtime-verification-card" key={`${item.mechanism}:${item.criterion_id}:${index}`}>
                  <div className="runtime-verification-heading"><span className="eyebrow">{mechanismNames[item.mechanism]}</span><span className={`badge ${item.status === 'PASS' ? 'b-state' : 'b-neutral'}`}>{item.status}</span></div>
                  <strong>Critério {item.criterion_id}</strong><p>{item.rationale}</p>
                </article>)}
                {data.verification.mechanisms.filter((item) => item.mechanism !== 'ai_interpretation').length === 0 && <p>Nenhum resultado de integridade ou critério determinístico foi fornecido.</p>}
              </div>
            </section>

            <section className="panel runtime-panel" aria-labelledby="interpretation-title">
              <div className="runtime-section-heading">
                <div><span className="eyebrow">ETAPA 04 · INFERÊNCIA</span><h2 id="interpretation-title">Interpretação por IA</h2></div>
                <span className="badge b-ai">NÃO É FATO DE ORIGEM</span>
              </div>
              <p className="runtime-intro">Sinais interpretativos fornecidos pelo runtime. Esta camada não substitui evidência, critérios determinísticos, consenso ou decisão humana.</p>
              <div className="runtime-interpretation-meta"><span>Interpretação: <code>{data.interpretation.id}</code></span><span>Modelo: <code>{data.interpretation.model}</code></span></div>
              {data.interpretation.signals.length ? data.interpretation.signals.map((signal) => <article className="runtime-signal" key={signal.signal_id}>
                <div className="runtime-evidence-heading"><strong>{signal.signal_id}</strong><span className="badge b-ai">Critério {signal.criterion_id}</span></div>
                <p>{signal.support}</p>
                <p className="runtime-signal-confidence">Confiança informada pelo runtime: <strong>{signal.confidence}</strong></p>
                <div className="runtime-refs"><span className="eyebrow">REFERÊNCIAS ASSOCIADAS</span>{signal.evidence_refs.length ? signal.evidence_refs.map((ref) => <code key={ref}>{ref}</code>) : <span>Nenhuma referência associada informada.</span>}</div>
              </article>) : <p>Nenhum sinal interpretativo foi fornecido pelo runtime.</p>}
              {data.verification.mechanisms.filter((item) => item.mechanism === 'ai_interpretation').map((item, index) => <article className="runtime-verification-card runtime-ai-result" key={`ai:${item.criterion_id}:${index}`}>
                <div className="runtime-verification-heading"><span className="eyebrow">RESULTADO REPORTADO · CRITÉRIO {item.criterion_id}</span><span className="badge b-ai">{item.status}</span></div>
                <p>{item.rationale}</p>
              </article>)}
            </section>

            <section className="panel runtime-panel" aria-labelledby="history-title">
              <span className="eyebrow">ETAPA 06 · HISTÓRICO CANÔNICO</span>
              <h2 id="history-title">Transições de estado</h2>
              {data.state.history.length ? <ol className="runtime-history">{data.state.history.map((entry, index) => <li key={index}><pre>{JSON.stringify(entry, null, 2)}</pre></li>)}</ol> : <p>Nenhum histórico de transição foi fornecido pelo runtime.</p>}
            </section>

            <section className="panel runtime-panel" aria-labelledby="handoff-title">
              <span className="eyebrow">HANDOFF · {data.handoff.record_version}</span>
              <h2 id="handoff-title">Registro de estado revisado</h2>
              <dl className="runtime-metadata">
                <div><dt>Estado no registro</dt><dd>{data.handoff.state}</dd></div>
                <div><dt>Modo de decisão</dt><dd>{data.handoff.decision_mode}</dd></div>
                <div><dt>ID da competência</dt><dd>{data.handoff.competency_id}</dd></div>
                <div><dt>Hash do registro</dt><dd><code className="runtime-hash">{data.handoff.record_hash}</code></dd></div>
              </dl>
            </section>

            <section className="panel runtime-panel" aria-labelledby="attestation-title">
              <span className="eyebrow">ETAPAS 08–09 · PROVA</span>
              <h2 id="attestation-title">Atestação e verificação pública</h2>
              {data.attestation ? <>
                <div className="runtime-proof-status"><span className="badge b-attest">ATESTADO · REFERÊNCIA RECEBIDA</span><span className="badge b-neutral">{data.attestation.network ?? 'REDE NÃO DECLARADA'}</span></div>
                <dl className="runtime-metadata">
                  <div><dt>Versão da atestação</dt><dd>{data.attestation.version}</dd></div>
                  <div><dt>Hash do registro</dt><dd><code className="runtime-hash">{data.attestation.record_hash}</code></dd></div>
                  <div><dt>Verificação reportada</dt><dd>{String(data.attestation.verified ?? false)}</dd></div>
                  {data.attestation.tx_signature ? <div><dt>Assinatura da transação</dt><dd><code className="runtime-hash">{data.attestation.tx_signature}</code></dd></div> : null}
                </dl>
                {txUrl ? <p><a href={txUrl} target="_blank" rel="noreferrer">Abrir transação no Solana Explorer ↗</a></p> : data.attestation.tx_signature ? <p role="note">A assinatura foi recebida, mas a rede não corresponde a um cluster Solana reconhecido pela interface. Nenhum link de Explorer foi presumido.</p> : <p>O runtime não forneceu assinatura de transação.</p>}
              </> : <p>O runtime não forneceu uma atestação. Nenhuma transação está sendo inferida ou copiada para esta tela.</p>}
              {data.public_verification ? <p><a href={data.public_verification.href} target="_blank" rel="noreferrer">{data.public_verification.label} ↗</a></p> : <p>Verificação pública independente: não disponível nesta resposta.</p>}
            </section>
          </>}
        </div>
      </div>
    </main>
  )
}
