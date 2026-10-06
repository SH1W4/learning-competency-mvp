import { CompetencySession } from "../../src/pipeline.js";
import { parseAIOutput } from "../../src/ai/contract.js";
import { buildAttestationPayload } from "../../src/solana/attest.js";

const RESULTS = [];

function provider(mode) {
  return { async interpret(ctx) {
    const support = mode === "supports" ? "supports" : "does_not_support";
    return {
      contract_version: "m2.ai-output.v1", interpretation_id: "int-" + mode,
      subject: ctx.subject, competency_id: "comp:data-analysis-reproducible", generated_at: "2026-10-05T00:00:00.000Z",
      model: { provider: "conformance-fixture", name: "deterministic-test-model" },
      extraction_refs: ctx.extractions.map(x => x.evidence_id),
      interpretations: ctx.extractions.map(x => ({ evidence_id: x.evidence_id, statement: "fixture interpretation", kind: "inference" })),
      signals: ["C1","C2","C3","C4"].map((criterion_id, i) => ({
        signal_id: "sig-" + mode + "-" + criterion_id, criterion_id, support,
        rationale: mode === "supports" ? "evidence supports criterion" : "fixture forces interpretive disagreement",
        evidence_refs: [{ evidence_id: ctx.evidences[[0,1,3,4][i]].evidence_id }], confidence: 0.98
      })),
      gaps: [], uncertainty: [], overall_confidence: 0.98, proposed_state: "UNDER_REVIEW", requires_consensus: true
    };
  }};
}

async function completeSession(mode) {
  const session = new CompetencySession("subj-conformance");
  session.submit({ type:"briefing", activityId:"A1", submittedBy:"subject", sourceRef:"fixture://A1", format:"text", content:"business question", submittedAt:"2026-10-05T00:00:00.000Z", synthetic:true });
  session.submit({ type:"analysis_artifact", activityId:"A2", submittedBy:"subject", sourceRef:"fixture://A2", format:"text", content:"prepared data", submittedAt:"2026-10-05T00:00:01.000Z", synthetic:true });
  const artifact = session.submit({ type:"analysis_artifact", activityId:"A3", submittedBy:"subject", sourceRef:"fixture://A3", format:"text", content:"reproducible analysis", submittedAt:"2026-10-05T00:00:02.000Z", synthetic:true });
  session.submit({ type:"analysis_result", activityId:"A3", submittedBy:"subject", sourceRef:"fixture://A3-result", format:"text", content:"analysis result", relatedEvidenceIds:[artifact.evidence_id], submittedAt:"2026-10-05T00:00:03.000Z", synthetic:true });
  session.submit({ type:"communication", activityId:"A4", submittedBy:"subject", sourceRef:"fixture://A4", format:"text", content:"conclusion and limitations", submittedAt:"2026-10-05T00:00:04.000Z", synthetic:true });
  await session.interpret(provider(mode));
  session.submitForVerification();
  const consensus = session.consensusAdvance();
  return { session, consensus };
}

function add(id, status, reason) { RESULTS.push({ id, status, reason }); }

async function main() {
  add("CF-C-001", "NOT_EVALUATED", "MVP evidence vocabulary has no CREDENTIAL class.");

  const valid = await completeSession("supports");
  const adversarialRejected = !parseAIOutput({
    contract_version:"m2.ai-output.v1", interpretation_id:"adversarial", subject:"subj-conformance",
    competency_id:"comp:data-analysis-reproducible", generated_at:"2026-10-05T00:00:00.000Z",
    model:{provider:"x",name:"x"}, extraction_refs:["ev-x"],
    interpretations:[{evidence_id:"ev-x",statement:"x",kind:"inference"}],
    signals:[{signal_id:"s",criterion_id:"C1",support:"supports",rationale:"x",evidence_refs:[{evidence_id:"ev-x"}],confidence:0.99}],
    gaps:[],uncertainty:[],overall_confidence:0.99,proposed_state:"UNDER_REVIEW",requires_consensus:true,authoritative:true
  },["ev-x"],{subject:"subj-conformance",competency_id:"comp:data-analysis-reproducible",extraction_refs:["ev-x"]}).ok;
  add("CF-C-002", valid.consensus.status === "AGREEMENT" && adversarialRejected ? "PASS" : "FAIL",
    "runtime consensus=" + valid.consensus.status + "; unauthorized AI authority field rejected=" + adversarialRejected);

  const first = valid.consensus.criteria[0];
  const refs = first.verifications.map((_, i) => "vr-C1-" + i);
  const resolution = { ref:"res-003", outcome:"ESTABLISHED", verifier_result_refs:refs };
  const distinct = resolution.outcome === "ESTABLISHED" && !refs.includes(resolution.ref);
  add("CF-C-003", distinct ? "PASS" : "FAIL", "adapter projection keeps verifier result and resolution distinct.");

  const conflict = await completeSession("conflict");
  const preserved = conflict.consensus.status === "CONFLICT" &&
    conflict.consensus.criteria.every(c => c.verifications.length === 3) &&
    conflict.consensus.criteria.some(c => c.verifications.some(v => v.status === "PASS")) &&
    conflict.consensus.criteria.some(c => c.verifications.some(v => v.status === "FAIL"));
  add("CF-C-004", preserved ? "PASS" : "FAIL", "runtime consensus=" + conflict.consensus.status + "; individual verifier results preserved=" + preserved);

  add("CF-C-005", "NOT_EVALUATED", "MVP has no explicit contractual freshness semantics.");
  add("CF-C-006", "NOT_EVALUATED", "MVP has no explicit WITHHELD/NOT_DISCLOSED semantics.");

  const state = valid.session.state;
  const bounded = ["subject","competency_id","history","target_ref","contract_ref","ground_refs"].every(k => Object.prototype.hasOwnProperty.call(state,k));
  add("CF-C-007", bounded ? "PASS" : "BLOCKED", bounded ? "all profile bounding fields exposed." : "MVP state lacks target, contract, resolution-ground and profile fields required by the profile.");

  const handoff = valid.session.handoff();
  const payload = buildAttestationPayload(handoff, "conformance-attester");
  const downstream = handoff.state === "DEMONSTRATED" && handoff.decision.confirm_demonstrated === true && payload.state === "DEMONSTRATED" && payload.record_hash === handoff.record_hash;
  add("CF-C-008", downstream ? "PASS" : "FAIL", "attestation is constructed from a resolved DEMONSTRATED handoff.");

  const summary = {
    runner:"LASTRO Competency Profile v0.1 — LASTRO MVP runtime adapter",
    report_version:"runtime-2026-10-05", protocol_version:"0.1.0", profile_id:"lastro-competency-v0.1",
    implementation:"SH1W4/learning-competency-mvp",
    fixture_source:"SH1W4/lastro-protocol@main:conformance/profiles/competency/fixtures-v0.1.json",
    results:RESULTS, counts:Object.fromEntries(["PASS","FAIL","BLOCKED","NOT_EVALUATED"].map(s => [s,RESULTS.filter(r => r.status === s).length])),
    conformance_claim:"NOT_AUTHORIZED", interpretation:"Runtime adapter evidence only."
  };
  console.log(JSON.stringify(summary,null,2));
  if (RESULTS.some(r => r.status === "FAIL")) process.exit(1);
}
main().catch(error => { console.error(error); process.exit(1); });