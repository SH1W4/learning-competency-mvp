# 01 — FinTech: Ana — Financial AI Analysis

> **Public status:** MVP anchor scenario.  
> **Evidence status:** Synthetic / reproducible demonstration.  
> **Do not interpret this document as customer validation.**

## Case metadata

| Field | Value |
|---|---|
| Project | Learning Competency MVP / LASTRO |
| Vertical | Financial market / FinTech B2B |
| Scenario | Nexus Capital |
| Persona | Ana — Junior Data Scientist |
| Reviewer | Carlos Eduardo — AI Tech Lead |
| MVP status | Official canonical scenario |
| Implementation | `fixtures/synthetic/ana/` |
| Validation | 44 Vitest tests, according to the source case study |

The source document explicitly identifies this as the official MVP scenario and says it is implemented in synthetic fixtures. fileciteturn0file3L9-L13

## 1. Context & problem

The scenario describes a financial organization using LLMs for credit-risk analysis and quarterly financial-statement summarization. The narrative contrasts course completion with demonstrated ability to produce evidence-supported financial analysis. fileciteturn0file3L14-L22

The problem is therefore framed as:

> training completion or a credential is not equivalent to demonstrated capability in a defined work context.

## 2. Audited competency matrix

| Criterion | Description |
|---|---|
| C1 | Structuring complex prompts for dense economic contexts and constrained outputs |
| C2 | Active hallucination mitigation using cross-checking / verification chains |
| C3 | Iterative query optimization to improve precision and reduce token cost |
| C4 | Traceability and documentation of source data versus inference |

These four criteria are specified in the source case. fileciteturn0file3L23-L30 fileciteturn0file3L34-L37

## 3. Evidence artifacts

The source identifies four synthetic project artifacts:

1. `a1_briefing.md` — analytical scope and risk appetite.
2. `a2_preparacao.ipynb` — data cleaning and preparation.
3. `a3_analise.ipynb` — chained analysis and validation.
4. `a4_sintese.md` — executive synthesis with traceable conclusions.

fileciteturn0file3L38-L47

For the current repository, the canonical fixture content describes a synthetic operations-analysis scenario and should be treated as the implementation source of truth. Do not infer that the PDF's fictional financial narrative is itself the runtime fixture.

## 4. Verification flow

The case describes:

```
Evidence artifacts
      ↓
SHA-256 integrity
      ↓
AI preliminary interpretation
      ↓
Human review
      ↓
Reviewed competency state
      ↓
Solana Devnet attestation
```

The source specifically describes the AI as identifying demonstrated criteria and a gap, followed by human review and a final reviewed state. fileciteturn0file3L48-L59

The broader LASTRO MVP documentation remains authoritative for the exact implementation semantics.

## 5. Attestation

The source describes anchoring the deterministic payload on Solana Devnet via the Memo Program and exposing a transaction that can be independently inspected. fileciteturn0file3L60-L67

For the actual reproducible command path, use:

```bash
npm run demo
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
```

## 6. What this case demonstrates

This case is useful because it provides the **narrow vertical slice** required to understand the MVP:

```
DEFINED COMPETENCY
        ↓
OBSERVABLE EVIDENCE
        ↓
AI INTERPRETATION
        ↓
INDEPENDENT / DETERMINISTIC CHECKS
        ↓
CONSENSUS
        ↓
BOUNDED COMPETENCY STATE
        ↓
ATTESTATION
```

It demonstrates the mechanism; it does **not** demonstrate market adoption, customer ROI, or universal competency assessment.

## 7. References

- [MVP README](../../README.md)
- [Project status](../PROJECT_STATUS.md)
- [Demo & technical proof](../evaluation/04_DEMO_AND_PROOF.md)
- [Claims & limitations](../evaluation/05_LIMITATIONS_AND_CLAIMS.md)
