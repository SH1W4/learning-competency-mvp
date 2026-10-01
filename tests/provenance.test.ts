import { describe, expect, it } from "vitest";
import { reviewFor, underReview } from "./helpers.js";
import { verifyHandoff } from "../src/provenance/trace.js";

describe("M2.6 — proveniência e handoff para o M3", () => {
  it("cada critério mostra o que veio da evidência, da IA e do revisor", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, { C3: { action: "correct", corrected_support: "supports", note: "ok após ler a síntese", evidence_refs: [{ evidence_id: s.evidences.at(-1)!.evidence_id }] } }, true, env));
    const trace = s.trace();
    for (const c of trace.criteria) {
      const origins = new Set(c.chain.map((n) => n.origin));
      expect(origins).toEqual(new Set(["evidence", "ai", "reviewer"]));
      expect(c.chain.at(-1)!.kind).toBe("final");
    }
    const c3 = trace.criteria.find((c) => c.criterion_id === "C3")!;
    expect(c3.chain.find((n) => n.kind === "review_decision")!.detail).toMatch(/correct → supports/);
  });

  it("handoff não carrega conteúdo bruto e detecta alteração", async () => {
    const { s, env } = await underReview();
    s.review(reviewFor(s, {}, true, env));
    const h = s.handoff();
    expect(h.state).toBe("DEMONSTRATED");
    expect(h.synthetic).toBe(true);
    const json = JSON.stringify(h);
    for (const ev of s.evidences) expect(json).not.toContain(ev.content.slice(0, 40));
    expect(h.evidence.every((e) => /^[0-9a-f]{64}$/.test(e.content_hash))).toBe(true);
    expect(verifyHandoff(h)).toBe(true);
    
    // Campo alterado
    expect(verifyHandoff({ ...h, state: "IN_DEVELOPMENT" })).toBe(false);
    expect(verifyHandoff({ ...h, subject: "hacked@email.com" })).toBe(false);
    
    // Hash alterado
    expect(verifyHandoff({ ...h, record_hash: "0000000000000000000000000000000000000000000000000000000000000000" })).toBe(false);
  });

  it("handoff é determinístico para a mesma sessão", async () => {
    const a = await underReview();
    a.s.review(reviewFor(a.s, {}, true, a.env));
    const b = await underReview();
    b.s.review(reviewFor(b.s, {}, true, b.env));
    expect(a.s.handoff().record_hash).toBe(b.s.handoff().record_hash);
  });
});
