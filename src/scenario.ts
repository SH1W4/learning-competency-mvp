/** Loads the SYNTHETIC canonical scenario (Ana) from fixtures/. Used by the demo and by tests. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { EvidenceSubmission, Reviewer } from "./domain/types.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures", "synthetic", "ana");
const read = (f: string) => readFileSync(join(ROOT, f), "utf8");

export const SUBJECT = "person:ana-synthetic";
export const REVIEWER: Reviewer = { id: "reviewer:instrutor-synthetic", name: "Instrutor (sintético)", role: "instrutor responsável pela trilha" };

type Sub = Omit<EvidenceSubmission, "relatedEvidenceIds">;
const base = { submittedBy: SUBJECT, synthetic: true } as const;

export const ANA = {
  briefing: (): Sub => ({ ...base, type: "briefing", activityId: "A1", sourceRef: "fixtures/synthetic/ana/a1_briefing.md", format: "markdown", content: read("a1_briefing.md") }),
  preparation: (): Sub => ({ ...base, type: "analysis_artifact", activityId: "A2", sourceRef: "fixtures/synthetic/ana/a2_preparacao.ipynb", format: "ipynb", content: read("a2_preparacao.ipynb") }),
  analysis: (): Sub => ({ ...base, type: "analysis_artifact", activityId: "A3", sourceRef: "fixtures/synthetic/ana/a3_analise.ipynb", format: "ipynb", content: read("a3_analise.ipynb") }),
  results: (): Sub => ({ ...base, type: "analysis_result", activityId: "A3", sourceRef: "fixtures/synthetic/ana/a3_resultados.md", format: "markdown", content: read("a3_resultados.md") }),
  synthesis: (): Sub => ({ ...base, type: "communication", activityId: "A4", sourceRef: "fixtures/synthetic/ana/a4_sintese.md", format: "markdown", content: read("a4_sintese.md") }),
};
