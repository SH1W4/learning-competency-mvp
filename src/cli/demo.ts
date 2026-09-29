/**
 * Runs the SYNTHETIC canonical scenario (Ana) through M2 and writes the M2 → M3 handoff.
 *   npm run demo                       → review that confirms DEMONSTRATED
 *   npm run demo -- --review <file>    → custom review decisions (see fixtures/synthetic/ana/review_*.json)
 * AI provider: heuristic (offline) by default; AI_PROVIDER=anthropic + ANTHROPIC_API_KEY + ANTHROPIC_MODEL to use an LLM.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CompetencySession } from "../pipeline.js";
import { providerFromEnv } from "../ai/provider.js";
import { ANA, REVIEWER, SUBJECT } from "../scenario.js";
import type { CriterionId, ReviewDecision, ReviewRecord } from "../domain/types.js";
import { defaultEnv } from "../util.js";

interface ReviewFile {
  confirm_demonstrated: boolean;
  summary_note?: string;
  decisions: Array<Omit<ReviewDecision, "signal_id"> & { criterion_id: CriterionId }>;
}

const arg = (name: string) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
};

async function main() {
  const reviewPath = arg("--review") ?? "fixtures/synthetic/ana/review_demonstrated.json";
  const env = defaultEnv;
  const s = new CompetencySession(SUBJECT, env);
  const log = (m: string) => console.log(m);

  log("⚠  Cenário SINTÉTICO (Ana) — não representa usuário real, piloto ou tração.\n");
  log("1) INGEST + NORMALIZE + EXTRACT");
  s.submit(ANA.briefing());
  s.submit(ANA.preparation());
  const analysis = s.submit(ANA.analysis());
  s.submit({ ...ANA.results(), relatedEvidenceIds: [analysis.evidence_id] });
  s.submit(ANA.synthesis());
  for (const x of s.extractions) log(`   ${x.evidence_id} ${x.type.padEnd(18)} campos: ${x.fields.map((f) => f.name).join(", ")}${x.missing.length ? ` | ausentes: ${x.missing.join(", ")}` : ""}`);

  const provider = providerFromEnv(env);
  log(`\n2) INTERPRET + RELATE (provedor: ${provider.name})`);
  const rel = await s.interpret(provider);
  for (const c of rel.coverage) log(`   ${c.criterion_id} ${c.title.padEnd(22)} IA: ${c.ai_assessment}`);
  if (rel.invalid_signals.length) log(`   sinais inválidos descartados: ${rel.invalid_signals.map((x) => x.signal_id).join(", ")}`);
  log(`   estado proposto pela IA: ${s.interpretation!.proposed_state} (apenas proposta)`);

  log("\n3) SUBMIT FOR REVIEW");
  log(`   estado: ${s.submitForReview().value}`);

  log(`\n4) HUMAN REVIEW (${reviewPath})`);
  const file = JSON.parse(readFileSync(reviewPath, "utf8")) as ReviewFile;
  const decisions: ReviewDecision[] = file.decisions.flatMap((d) =>
    rel.signals.filter((sig) => sig.criterion_id === d.criterion_id).map((sig) => ({ ...d, signal_id: sig.signal_id })),
  );
  const record: ReviewRecord = {
    review_id: env.id("rev"),
    reviewer: REVIEWER,
    reviewed_at: env.now(),
    interpretation_id: s.interpretation!.interpretation_id,
    decisions,
    confirm_demonstrated: file.confirm_demonstrated,
    summary_note: file.summary_note,
  };
  const out = s.review(record);
  for (const c of out.criteria) log(`   ${c.criterion_id}: IA=${c.ai_assessment} → revisor=${c.final_assessment}`);
  for (const r of out.evidence_requests) log(`   pedido de evidência (${r.criterion_id}): ${r.note}`);
  log(`   estado final: ${s.state.value}`);

  log("\n5) PROVENANCE");
  const trace = s.trace();
  for (const c of trace.criteria) {
    log(`   ${c.criterion_id}`);
    for (const n of c.chain) log(`     [${n.origin.padEnd(8)}] ${n.kind.padEnd(15)} ${n.detail.slice(0, 110)}`);
  }

  mkdirSync("out", { recursive: true });
  const handoff = s.handoff();
  writeFileSync(join("out", "reviewed-state.json"), JSON.stringify(handoff, null, 2));
  writeFileSync(join("out", "provenance-trace.json"), JSON.stringify(trace, null, 2));
  log(`\n6) HANDOFF → M3: out/reviewed-state.json (record_hash ${handoff.record_hash.slice(0, 16)}…)`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
