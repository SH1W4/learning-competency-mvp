# 02 — HealthTech: Gabriel — LLM Governance & De-identification

> **Public status:** B2B expansion blueprint.  
> **Evidence status:** Scenario design from the case-study source; not presented as a deployed customer implementation.  
> **Regulatory note:** The source discusses LGPD/HIPAA; this document does not constitute legal advice or regulatory certification.

## Case metadata

| Field | Value |
|---|---|
| Vertical | Health / diagnostic medicine / hospitals |
| Scenario organization | MedVanguarda |
| Persona | Gabriel — Data & Health Systems Governance Analyst |
| Reviewer role | DPO |
| Status in source | B2B expansion for high-regulatory-risk verticals |

The source frames this as an expansion scenario rather than the current MVP. 

## 1. Context & problem

The scenario concerns the use of LLM assistants to summarize clinical histories and electronic records while dealing with highly sensitive health data. The central competency problem is whether a professional can demonstrate safe handling and governance practices rather than merely claim knowledge of the relevant rules. 

## 2. Audited competency matrix

| Criterion | Observable capability |
|---|---|
| C1 | Automated removal of identifying information using Regex / NLP |
| C2 | Prevention of re-identification through contextual clues |
| C3 | Prompt-traffic auditing and local controls |
| C4 | Documentation and regulatory compliance reporting |



## 3. Evidence contract

The source scenario specifies four artifacts:

1. `pipeline_desidentificacao.py`
2. `log_validacao_sanitizacao.csv`
3. `arquitetura_seguranca_llm.md`
4. `relatorio_impacto_anpd.pdf`



These should be understood as **scenario-defined evidence types** until actual external pilot evidence exists.

## 4. Verification model

The case proposes:

```
Engineering artifacts
      ↓
SHA-256 integrity
      ↓
AI analysis
      ↓
DPO / human arbitration
      ↓
Reviewed state
      ↓
Attestation
```

The source explicitly places the final responsibility with the human DPO rather than the AI. 

## 5. Attestation boundary

The source proposes a Solana Devnet record linked to the evaluated credential and reviewer identity. 

For the public MVP, this should be treated as an **architecture extension**, not as proof of regulatory compliance or legal exoneration.

## 6. What this case is for

This case demonstrates how the LASTRO pattern could be adapted to a high-risk environment where:

- evidence must be specific;
- automated interpretation cannot be the final authority;
- human governance is explicit;
- provenance and integrity matter.

It is **not evidence that LASTRO is already deployed in healthcare**.

