import { CompetencySession } from "../pipeline.js";
import { providerFromEnv } from "../ai/provider.js";
import { ANA, SUBJECT } from "../scenario.js";

export interface M4Verification {
  mechanism: "evidence_integrity" | "deterministic_criteria" | "ai_interpretation";
  criterion_id: string;
  status: "PASS" | "FAIL";
  rationale: string;
}

export interface M4Projection {
  synthetic: boolean;
  competency: {
    id: string;
    statement: string;
    criteria: Array<{ id: string; title: string; observables: string[] }>;
  };
  trail: {
    id: string;
    title: string;
    activities: Array<{
      id: string;
      title: string;
      objective: string;
      expectedEvidence: string[];
      criteria: string[];
    }>;
  };
  evidence: Array<{
    evidence_id: string;
    type: string;
    activity_id: string;
    source_ref: string;
    content_ref: string;
    trust_level: string;
    synthetic: boolean;
  }>;
  interpretation: {
    id: string;
    model: string;
    signals: Array<{
      signal_id: string;
      criterion_id: string;
      support: string;
      confidence: number;
      evidence_refs: string[];
    }>;
  };
  verification: { mechanisms: M4Verification[] };
  consensus: {
    status: "AGREEMENT" | "INSUFFICIENT_EVIDENCE" | "CONFLICT" | "HUMAN_ADJUDICATION";
    criteria: Array<{
      criterion_id: string;
      status: string;
      verifications: M4Verification[];
    }>;
    can_auto_advance: boolean;
    requires_adjudication: boolean;
  };
  state: {
    value: "NOT_STARTED" | "IN_DEVELOPMENT" | "UNDER_REVIEW" | "DEMONSTRATED";
    history: unknown[];
  };
  handoff: {
    record_version: string;
    record_hash: string;
    competency_id: string;
    state: string;
    decision_mode: string;
  };
  /** Complete, hash-verifiable M2→M3 record for operator-side attestation. */
  reviewed_state_record: ReturnType<CompetencySession["handoff"]>;
  attestation: null;
  public_verification: null;
}

export async function buildM4SyntheticProjection(): Promise<M4Projection> {
  const session = new CompetencySession(SUBJECT);
  const analysis = session.submit(ANA.analysis());
  session.submit(ANA.briefing());
  session.submit(ANA.preparation());
  session.submit({ ...ANA.results(), relatedEvidenceIds: [analysis.evidence_id] });
  session.submit(ANA.synthesis());

  await session.interpret(providerFromEnv());
  session.submitForVerification();
  const consensus = session.consensusAdvance();
  const handoff = session.handoff();

  if (session.state.value !== "DEMONSTRATED") {
    throw new Error(`M4 synthetic projection requires DEMONSTRATED; got ${session.state.value}`);
  }

  const mechanisms = consensus.criteria.flatMap((criterion) => criterion.verifications);
  const uniqueMechanisms = new Map(mechanisms.map((item) => [item.mechanism, item]));

  return {
    synthetic: true,
    competency: {
      id: "comp:data-analysis-reproducible",
      statement: "Usar ferramentas de IA como apoio para transformar uma pergunta de negócio em uma análise de dados reproduzível e comunicar conclusões sustentadas por evidências.",
      criteria: [
        { id: "C1", title: "Formulação", observables: ["transforma uma necessidade/pergunta de negócio em uma pergunta analítica clara", "define o que pretende responder"] },
        { id: "C2", title: "Tratamento e análise", observables: ["identifica/prepara os dados necessários", "executa uma análise coerente com a pergunta", "registra passos suficientes para reprodução"] },
        { id: "C3", title: "Evidência", observables: ["apresenta resultados apoiados pelos dados", "diferencia observação, interpretação e limitação", "evita conclusões que não sejam sustentadas pelo material apresentado"] },
        { id: "C4", title: "Comunicação", observables: ["comunica resultado, contexto e limitações de forma compreensível para o público definido"] },
      ],
    },
    trail: {
      id: "trail:applied-data-analysis",
      title: "Trilha de Análise de Dados Aplicada",
      activities: [
        { id: "A1", title: "Formular a pergunta", objective: "transformar um problema de negócio em uma pergunta analítica", expectedEvidence: ["briefing"], criteria: ["C1"] },
        { id: "A2", title: "Preparar e explorar os dados", objective: "preparar o conjunto de dados e identificar padrões relevantes", expectedEvidence: ["analysis_artifact"], criteria: ["C2"] },
        { id: "A3", title: "Executar análise reproduzível", objective: "responder à pergunta analítica por meio de uma análise reproduzível", expectedEvidence: ["analysis_artifact", "analysis_result"], criteria: ["C2", "C3"] },
        { id: "A4", title: "Comunicar resultado", objective: "transformar a análise em uma comunicação útil para decisão", expectedEvidence: ["communication"], criteria: ["C3", "C4"] },
      ],
    },
    evidence: session.evidences.map((e) => ({
      evidence_id: e.evidence_id,
      type: e.type,
      activity_id: e.activity_id,
      source_ref: e.source_ref,
      content_ref: e.content_ref,
      trust_level: e.trust_level,
      synthetic: e.provenance.synthetic,
    })),
    interpretation: {
      id: session.interpretation!.interpretation_id,
      model: `${session.interpretation!.model.provider}/${session.interpretation!.model.name}`,
      signals: session.relation!.signals.map((s) => ({
        signal_id: s.signal_id,
        criterion_id: s.criterion_id,
        support: s.support,
        confidence: s.confidence,
        evidence_refs: s.evidence_refs.map((r) => r.evidence_id),
      })),
    },
    verification: { mechanisms: [...uniqueMechanisms.values()] },
    consensus: {
      status: consensus.status,
      criteria: consensus.criteria,
      can_auto_advance: consensus.can_auto_advance,
      requires_adjudication: consensus.requires_adjudication,
    },
    state: { value: session.state.value, history: session.state.history },
    handoff: {
      record_version: handoff.record_version,
      record_hash: handoff.record_hash,
      competency_id: handoff.competency_id,
      state: handoff.state,
      decision_mode: handoff.decision.mode,
    },
    reviewed_state_record: handoff,
    attestation: null,
    public_verification: null,
  };
}
