import { describe, expect, it } from "vitest";
import { CompetencySession } from "../src/pipeline.js";
import { HeuristicProvider } from "../src/ai/provider.js";
import { ANA, SUBJECT } from "../src/scenario.js";
import { fixedEnv } from "../src/util.js";
import { reviewFor } from "./helpers.js";

describe("M2.7 — fluxo crítico ponta a ponta (cenário sintético Ana)", () => {
  it("NOT_STARTED → IN_DEVELOPMENT → UNDER_REVIEW → DEMONSTRATED", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    expect(s.state.value).toBe("NOT_STARTED");
    s.submit(ANA.briefing());
    expect(s.state.value).toBe("IN_DEVELOPMENT");
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());
    await s.interpret(new HeuristicProvider(env));
    s.submitForReview();
    s.review(reviewFor(s, {}, true, env));
    expect(s.state.history.map((h) => h.to)).toEqual(["IN_DEVELOPMENT", "UNDER_REVIEW", "DEMONSTRATED"]);
  });

  it("Consensus Core promove automaticamente quando há convergência", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());
    await s.interpret(new HeuristicProvider(env));
    s.submitForReview();

    const result = s.consensusAdvance();

    expect(result.status).toBe("AGREEMENT");
    expect(s.state.value).toBe("DEMONSTRATED");
    expect(s.state.history.at(-1)).toMatchObject({ by: "consensus", to: "DEMONSTRATED" });
    expect(s.handoff().decision.mode).toBe("consensus");
  });

  it("Consensus Core não promove sem evidência suficiente", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    await s.interpret(new HeuristicProvider(env));

    expect(() => s.submitForReview()).toThrow(/A3.*A4|atividades sem evidência/);
  });

  it("evidência faltando bloqueia o envio para revisão", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    await s.interpret(new HeuristicProvider(env));
    expect(() => s.submitForReview()).toThrow(/A3.*A4|atividades sem evidência/);
  });

  it("nova evidência invalida a interpretação anterior", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    await s.interpret(new HeuristicProvider(env));
    s.submit(ANA.preparation());
    expect(s.interpretation).toBeUndefined();
    expect(() => s.submitForReview()).toThrow(/interprete/);
  });

  it("não aceita evidência nova durante a revisão", async () => {
    const env = fixedEnv();
    const s = new CompetencySession(SUBJECT, env);
    s.submit(ANA.briefing());
    s.submit(ANA.preparation());
    const a = s.submit(ANA.analysis());
    s.submit({ ...ANA.results(), relatedEvidenceIds: [a.evidence_id] });
    s.submit(ANA.synthesis());
    await s.interpret(new HeuristicProvider(env));
    s.submitForReview();
    expect(() => s.submit(ANA.synthesis())).toThrow(/UNDER_REVIEW/);
  });
});
