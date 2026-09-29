import { describe, expect, it } from "vitest";
import { reviewFor, underReview, fullSession } from "./helpers.js";
import { HeuristicProvider } from "../src/ai/provider.js";
import { transition, initialState, TransitionError } from "../src/state/state.js";
import { ANA } from "../src/scenario.js";
import { ValidationError } from "../src/util.js";

describe("M2.5 — revisão humana", () => {
  it("aceitar tudo + confirmação explícita → DEMONSTRATED com referência às evidências", async () => {
    const { s, env } = await underReview();
    const out = s.review(reviewFor(s, {}, true, env));
    expect(s.state.value).toBe("DEMONSTRATED");
    expect(out.criteria.every((c) => c.final_assessment === "supports" && c.evidence_refs.length > 0)).toBe(true);
    const last = s.state.history.at(-1)!;
    expect(last).toMatchObject({ from: "UNDER_REVIEW", to: "DEMONSTRATED", by: "reviewer" });
    expect(last.reason).toMatch(/ev_/);
  });

  it("aceitar tudo SEM confirmação mantém UNDER_REVIEW", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, false, env));
    expect(s.state.value).toBe("UNDER_REVIEW");
  });

  it("revisor corrige um sinal → volta para IN_DEVELOPMENT e a correção fica separada da IA", async () => {
    const { s, env } = await underReview();
    const out = s.review(reviewFor(s, { C3: { action: "correct", corrected_support: "partially_supports", note: "falta tamanho da amostra" } }, false, env));
    const c3 = out.criteria.find((c) => c.criterion_id === "C3")!;
    expect(c3.ai_assessment).toBe("supports");
    expect(c3.final_assessment).toBe("partially_supports");
    expect(s.state.value).toBe("IN_DEVELOPMENT");
  });

  it("revisor rejeita um sinal", async () => {
    const { s, env } = await underReview();
    const out = s.review(reviewFor(s, { C2: { action: "reject", note: "notebook não reproduz" } }, false, env));
    expect(out.criteria.find((c) => c.criterion_id === "C2")!.final_assessment).toBe("does_not_support");
    expect(s.state.value).toBe("IN_DEVELOPMENT");
  });

  it("revisor pede mais evidência → pedido registrado e pessoa pode reenviar", async () => {
    const { s, env } = await underReview();
    const out = s.review(reviewFor(s, { C4: { action: "request_more_evidence", note: "enviar apresentação" } }, false, env));
    expect(out.evidence_requests).toEqual([{ criterion_id: "C4", note: "enviar apresentação" }]);
    expect(s.state.value).toBe("IN_DEVELOPMENT");
    expect(() => s.submit(ANA.synthesis())).not.toThrow();
  });

  it("não permite confirmar DEMONSTRATED com critério pendente", async () => {
    const { s, env } = await underReview();
    expect(() => s.review(reviewFor(s, { C1: { action: "reject", note: "pergunta vaga" } }, true, env))).toThrow(/confirm_demonstrated exige/);
    expect(s.state.value).toBe("UNDER_REVIEW");
  });

  it("valida a decisão: correct sem nota, reject sem motivo, sinal sem decisão", async () => {
    const { s, env } = await underReview();
    const r = reviewFor(s, { C1: { action: "correct" }, C2: { action: "reject" } }, false, env);
    r.decisions = r.decisions.filter((d) => d.criterion_id !== "C4");
    try {
      s.review(r);
      expect.unreachable();
    } catch (e) {
      const msg = (e as ValidationError).issues.join(" | ");
      expect(msg).toMatch(/correct" exige corrected_support/);
      expect(msg).toMatch(/reject" exige uma nota/);
      expect(msg).toMatch(/sinal sem decisão/);
    }
  });

  it("não aceita revisão antes da trilha completa", async () => {
    const { s, env } = fullSession();
    await s.interpret(new HeuristicProvider(env));
    expect(() => s.review(reviewFor(s, {}, true, env))).toThrow(/UNDER_REVIEW/);
  });

  it("só o revisor pode levar a DEMONSTRATED (nem IA nem sistema)", () => {
    let st = initialState("p", "c");
    st = transition(st, "IN_DEVELOPMENT", "system", "x", "ev", "t");
    st = transition(st, "UNDER_REVIEW", "system", "x", "ok", "t");
    expect(() => transition(st, "DEMONSTRATED", "ai", "model", "acho que sim", "t")).toThrow(TransitionError);
    expect(() => transition(st, "DEMONSTRATED", "system", "x", "auto", "t")).toThrow(TransitionError);
  });
});
