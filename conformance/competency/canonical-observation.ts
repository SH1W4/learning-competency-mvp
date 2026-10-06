import type { CompetencySession } from "../../src/pipeline.js";
import { COMPETENCY, TRAIL } from "../../src/domain/useCase.js";
import type { ConsensusResult } from "../../src/consensus/consensus.js";
import { buildAttestationPayload } from "../../src/solana/attest.js";

export interface CompetencyCanonicalObservation {
  protocol: { version: "0.1.0" };
  profile: { id: "lastro-competency-v0.1"; version: "0.1.0" };
  scope: { implementation: string; competency_contract_ref: string; evaluation_scope: string };
  subject: { ref: string };
  competency_target: { ref: string; version: string };
  competency_contract: { ref: string; version: string };
  evidence: Array<Record<string, unknown>>;
  interpretations: Array<Record<string, unknown>>;
  verification: { mechanisms: string[]; results: Array<Record<string, unknown>> };
  resolutions: Array<Record<string, unknown>>;
  states: Array<Record<string, unknown>>;
  attestations: Array<Record<string, unknown>>;
  provenance: Array<Record<string, unknown>>;
  history: Array<Record<string, unknown>>;
}

/**
 * Semantic adapter only: it projects existing MVP objects into the protocol
 * observation surface without changing the MVP domain model.
 */
export function buildCompetencyCanonicalObservation(session: CompetencySession): CompetencyCanonicalObservation {
  if (!session.consensus || !session.interpretation) throw new Error("conformance observation requires interpretation and consensus");
  const handoff = session.handoff();
  const results = session.consensus.criteria.flatMap(c => c.verifications.map((v, i) => ({
    ref: `vr:${c.criterion_id}:${i}`, mechanism: v.mechanism, criterion_ref: c.criterion_id, status: v.status, rationale: v.rationale
  })));
  const resultRefsByCriterion = new Map<string,string[]>();
  for (const c of session.consensus.criteria) resultRefsByCriterion.set(c.criterion_id, c.verifications.map((_,i)=>`vr:${c.criterion_id}:${i}`));
  const resolutionRefs = Array.from(resultRefsByCriterion.values()).flat();
  const stateRef = `state:${handoff.state}`;
  const resolutionRef = "resolution:consensus:" + session.consensus.status;
  return {
    protocol:{version:"0.1.0"}, profile:{id:"lastro-competency-v0.1",version:"0.1.0"},
    scope:{implementation:"SH1W4/learning-competency-mvp",competency_contract_ref:"src/domain/useCase.ts#COMPETENCY+EVIDENCE_CONTRACT",evaluation_scope:"MVP vertical slice / conformance fixtures"},
    subject:{ref:session.subject},
    competency_target:{ref:COMPETENCY.id,version:"0.2"},
    competency_contract:{ref:"src/domain/useCase.ts#EVIDENCE_CONTRACT",version:"0.2"},
    evidence:session.evidences.map(e=>({ref:e.evidence_id,type:e.type,source_ref:e.source_ref,activity_ref:e.activity_id,provenance:e.provenance})),
    interpretations:[{ref:session.interpretation.interpretation_id,contract_version:session.interpretation.contract_version,model:session.interpretation.model,proposed_state:session.interpretation.proposed_state}],
    verification:{mechanisms:["evidence_integrity","deterministic_criteria","ai_interpretation"],results},
    resolutions:[{ref:resolutionRef,outcome:session.consensus.status,verifier_result_refs:resolutionRefs}],
    states:[{ref:stateRef,value:handoff.state,subject_ref:session.subject,target_ref:COMPETENCY.id,contract_ref:"src/domain/useCase.ts#EVIDENCE_CONTRACT",profile_ref:"lastro-competency-v0.1",grounds:[resolutionRef,...resolutionRefs]}],
    attestations:[buildAttestationPayload(handoff,"conformance-attester")],
    provenance:session.evidences.map(e=>({evidence_ref:e.evidence_id,source_ref:e.provenance.sourceRef,content_hash:e.provenance.contentHash,submitted_at:e.provenance.submittedAt})),
    history:handoff.state_history.map(h=>({from:h.from,to:h.to,at:h.at,by:h.by,actor:h.actor,reason:h.reason}))
  };
}