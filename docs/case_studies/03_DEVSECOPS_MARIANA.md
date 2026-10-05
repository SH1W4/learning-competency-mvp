# 03 — DevSecOps: Mariana — Security Review of AI-Generated Code

> **Public status:** Engineering expansion blueprint.  
> **Evidence status:** Scenario design from the case-study source; not presented as a deployed customer implementation.

## Case metadata

| Field | Value |
|---|---|
| Vertical | Software engineering / cybersecurity |
| Scenario organization | CloudScale Technologies |
| Persona | Mariana — Mid-level Backend Engineer |
| Reviewer | AppSec Lead / Principal Engineer |
| Status in source | Expansion into software engineering and information security |

The source identifies this as an expansion scenario. 

## 1. Context & problem

The scenario focuses on the increasing use of AI coding assistants and the resulting need to verify whether developers can identify and remediate vulnerabilities in AI-generated code. The case explicitly names injection, authorization and prompt-injection risks. 

## 2. Audited competency matrix

| Criterion | Observable capability |
|---|---|
| C1 | Detection of security flaws in AI-generated code |
| C2 | Sanitization and protection against prompt-injection / jailbreak paths |
| C3 | Automated security testing |
| C4 | Secure management of secrets |



## 3. Evidence contract

The source defines four artifacts:

1. `pull_request_diff.patch`
2. `test_security_exploit.ts`
3. `prompt_security_guardrails.py`
4. `analise_post_mortem_vulnerabilidade.md`



## 4. Verification model

The proposed pipeline is:

```
Code / tests / analysis
      ↓
Deterministic hashing
      ↓
AI pre-analysis
      ↓
AppSec review
      ↓
Attested decision
```

The source describes human AppSec review as the final decision layer. 

## 5. Attestation and organizational value

The source proposes a verifiable credential anchored on Solana Devnet and describes potential use in security/compliance contexts. 

Those are **future application claims**, not current evidence of SOC 2 / ISO 27001 outcomes.

## 6. Why this matters to LASTRO

The case tests whether the same evidence-to-state architecture can operate where the competency criteria are technical, adversarial and testable.

It therefore serves as a useful **vertical expansion hypothesis**, while the current MVP remains bounded to its canonical scenario.
