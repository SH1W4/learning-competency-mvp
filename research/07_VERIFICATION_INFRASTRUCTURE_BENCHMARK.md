# 07 — Verification Infrastructure Benchmark

**Status:** Initial architectural research completed  
**Date:** 2026-10-04  
**Scope:** CRE, AVS/restaking-based verification, optimistic oracle/dispute systems, first-party oracle infrastructure, and proof-based verification  
**Type:** Research / architecture benchmark  
**Not:** Product decision, implementation plan, or claim that any external infrastructure is superior in all contexts

---

## 1. Purpose

This document investigates infrastructure that could support the LASTRO verification layer and its **Consensus Core**.

The question is not:

> Which system has the best consensus?

The relevant question is:

> Which infrastructure can execute or validate independent verification mechanisms over evidence, produce results with meaningful integrity guarantees, and feed those results into LASTRO's domain-level Consensus Core?

This distinction is fundamental.

LASTRO's Consensus Core is a **semantic/domain mechanism** for determining whether evidence and independent verification results support a bounded competency state.

External infrastructure may provide:

- distributed execution;
- independent operators;
- cryptographic reports;
- economic security;
- dispute resolution;
- proof generation;
- oracle data;
- on-chain attestation.

It does **not automatically become the competency authority**.

---

## 2. Canonical LASTRO Architecture

The current architecture remains:

```
WORK / ACTIVITY
      ↓
EVIDENCE
      ↓
INDEPENDENT VERIFICATION
      ├─ Integrity
      ├─ Deterministic Rules
      ├─ AI Interpretation
      └─ Robustness / other verifiers
      ↓
GOVERNANCE / COMPLIANCE
      ↓
CONSENSUS CORE
      ├─ AGREEMENT → STATE
      ├─ INSUFFICIENT_EVIDENCE → HOLD
      └─ CONFLICT → HUMAN ADJUDICATION
                              ↓
                            STATE
      ↓
ATTESTATION
      ↓
PUBLIC VERIFICATION
```

External infrastructure should therefore be evaluated as an **adapter or verification substrate**, not as a replacement for this semantic model.

---

## 3. Research Questions

### Q1 — Distributed execution

Can the infrastructure execute the same verification logic independently across multiple operators?

### Q2 — Result convergence

Can independently produced results be cryptographically or economically converged into a trusted result?

### Q3 — Evidence compatibility

Can the infrastructure operate on the evidence types relevant to LASTRO rather than only numerical market data or predefined oracle feeds?

### Q4 — Semantic independence

Does the infrastructure provide independent verification, or does it merely aggregate multiple observations of the same source?

### Q5 — Dispute handling

What happens when verification mechanisms disagree?

### Q6 — Provenance

Can LASTRO preserve which mechanism produced which result and under which execution conditions?

### Q7 — Solana compatibility

Can the resulting proof/report be anchored to the current Solana-based attestation layer?

### Q8 — Operational burden

What infrastructure, permissions, economics, and deployment dependencies would LASTRO inherit?

### Q9 — Appropriate boundary

Should the technology become part of the MVP, an optional adapter, or remain research?

---

## 4. Candidate Classes

The research separates five classes:

1. **CRE / DON workflow infrastructure**
2. **AVS / restaking-based verification**
3. **Optimistic oracle / dispute systems**
4. **First-party oracle infrastructure**
5. **Proof-based verification**

These classes solve different problems and should not be treated as interchangeable.

---

# 5. Chainlink CRE

## 5.1 What it provides

Chainlink Runtime Environment (CRE) is an orchestration layer for workflows running across Chainlink Decentralized Oracle Networks.

According to the current documentation:

- workflows can be written using Go or TypeScript;
- a Workflow DON orchestrates execution;
- capabilities can be provided by specialized Capability DONs;
- nodes independently execute requested operations;
- results are cryptographically verified and aggregated using BFT consensus;
- capability execution automatically includes consensus;
- workflows can combine off-chain APIs, computation, blockchain reads and writes;
- workflows can be simulated before production deployment.

Source: Chainlink CRE documentation.  
https://docs.chain.link/cre/overview

## 5.2 Relevance to LASTRO

CRE maps naturally to the requirement:

```
verification request
      ↓
distributed execution
      ↓
independent node results
      ↓
DON consensus
      ↓
verified result
      ↓
LASTRO Consensus Core
```

This is particularly relevant if a LASTRO verifier needs to execute outside the primary application environment.

Examples worth investigating:

- deterministic evidence checks;
- integrity/provenance verification;
- replicated computation;
- external system observation;
- verification of a bounded evidence predicate.

## 5.3 Important boundary

CRE consensus is **not the same consensus as LASTRO Consensus Core**.

CRE answers approximately:

> Did the distributed execution nodes converge on the same execution result?

LASTRO answers:

> Do the independent verification mechanisms provide sufficient and compatible evidence to support this competency state?

Therefore:

```
CRE consensus
      ↓
verified verifier result
      ↓
LASTRO Consensus Core
      ↓
competency state
```

not:

```
CRE consensus = competency consensus
```

## 5.4 Solana relevance

Chainlink documentation records CRE Solana write support, including DON-signed reports to Solana programs on Mainnet and Devnet through the Keystone Forwarder. Later releases also added Solana workflow stability and simulation improvements.

Sources:
- https://docs.chain.link/changelog/cre-cli-v1-24-0--execution-observability-and-solana-write
- https://docs.chain.link/changelog/cre-cli-v1-25-0--solana-mainnet-simulation-and-discovery-hints-add62

This makes CRE particularly relevant to the current LASTRO architecture because Solana is already the integrity anchor.

## 5.5 Constraints

Current documentation states:

- simulation is available without deployment approval;
- production workflow deployment requires approval;
- CRE workflows are stateless per trigger execution;
- deployment and operational infrastructure become an external dependency.

Therefore CRE should initially be treated as an **experimental verification adapter**, not a hard dependency of the MVP.

## 5.6 Preliminary assessment

**Fit: HIGH**

Best candidate for the first experimental integration because it combines:

- distributed execution;
- built-in consensus;
- external API access;
- computation;
- on-chain interaction;
- Solana support.

---

# 6. AVS / Restaking-Based Verification

## 6.1 What the model provides

EigenLayer's AVS model allows services to define tasks that are performed and validated by independent operators, using restaked security and service-specific validation rules.

The EigenLayer whitepaper describes AVSs as services that require distributed validation semantics, including categories such as oracle networks and other middleware systems.

Source:
https://docs.eigenlayer.xyz/assets/files/EigenLayer_WhitePaper-88c47923ca0319870c611decd6e562ad.pdf

## 6.2 Relevance to LASTRO

The architectural fit is potentially strong:

```
LASTRO verification task
          ↓
AVS operators
   ├─ operator A
   ├─ operator B
   ├─ operator C
   └─ ...
          ↓
service-specific validation
          ↓
verified result
          ↓
LASTRO Consensus Core
```

This could eventually allow a LASTRO ecosystem in which specialized verification services are operated independently.

Examples:

- evidence integrity verifier;
- competency-criterion verifier;
- robustness verifier;
- domain-specific verifier;
- provenance verifier.

## 6.3 Important distinction

An AVS provides **security and validation infrastructure**.

It does not automatically define what constitutes competency.

The LASTRO domain rules would still need to define:

- competency criteria;
- eligible evidence;
- verification contracts;
- conflict semantics;
- state transitions.

## 6.4 Economic/security tradeoff

The EigenLayer research identifies significant costs and design challenges around bootstrapping, capital cost, economic incentives, and the security relationship between an AVS and its underlying security layer.

Therefore the architecture may be powerful but operationally heavier than CRE for an early MVP.

## 6.5 Preliminary assessment

**Fit: HIGH potential / HIGH complexity**

AVS becomes particularly interesting if LASTRO evolves from a product into a **network of independent verification services**.

For the current MVP, this should remain research.

---

# 7. Optimistic Oracle / Dispute Systems

## 7.1 UMA

UMA describes its Optimistic Oracle as a decentralized system for bringing arbitrary verifiable data on-chain through assertions and dispute arbitration.

OOv3 is specifically designed around data asserters and escalation managers.

Source:
https://docs.uma.xyz/

## 7.2 Relevance

The model is attractive for a different problem:

```
ASSERTION
    ↓
challenge period
    ↓
DISPUTE?
 ├─ no → accepted
 └─ yes → arbitration
```

This maps well to:

- externally observable claims;
- attestations that can be challenged;
- dispute-heavy workflows;
- claims where continuous active verification is unnecessary.

## 7.3 Why it is not the primary LASTRO mechanism

LASTRO's normal path is intended to reduce dependence on individual human judgment through **independent verification mechanisms converging before state transition**.

Optimistic verification assumes a different default:

> an assertion is accepted unless challenged.

That can complement LASTRO but does not naturally replace its Consensus Core.

UMA is therefore better viewed as a possible **dispute/escalation adapter** than as the core verification substrate.

## 7.4 Preliminary assessment

**Fit: MEDIUM**

Potentially useful for contested attestations or external claims, but not the primary architecture for competency verification.

---

# 8. First-Party Oracle Infrastructure

## 8.1 API3

API3's architecture centers on first-party oracles: data providers themselves sign their data, allowing cryptographic verification of source identity and data authenticity.

Its feeds can aggregate multiple first-party sources.

Source:
https://docs.api3.org/oev/in-depth/data-feeds/

## 8.2 Relevance

This is valuable when the question is:

> What did a trusted external source report?

For example:

```
external system
      ↓
first-party signed data
      ↓
verification
      ↓
LASTRO evidence
```

This could become an **evidence ingestion source**.

## 8.3 Limitation

API3 primarily addresses **data authenticity and oracle delivery**.

It does not provide the semantic competency pipeline:

```
evidence → competency interpretation → independent verification → state
```

Therefore it is complementary rather than competitive with LASTRO's Consensus Core.

## 8.4 Preliminary assessment

**Fit: LOW–MEDIUM as verification infrastructure; HIGH as external evidence source in suitable domains.**

---

# 9. Proof-Based Verification

## 9.1 Succinct / SP1

Succinct provides SP1 and a decentralized prover network for generating proofs of software execution.

Source:
https://docs.succinct.xyz/

## 9.2 Relevance

Proof systems attack a different part of the trust problem:

```
computation
    ↓
cryptographic proof
    ↓
independent verification
```

This is extremely attractive when a verifier can be expressed as a deterministic computation whose correctness can be proven.

Potential LASTRO use cases:

- prove deterministic transformation of evidence;
- prove execution of a bounded verifier;
- prove that a state transition followed defined rules;
- prove that an attestation was derived from a specific canonical input.

## 9.3 Limitation

A proof can establish:

> “This computation was performed correctly.”

It does not automatically establish:

> “The underlying evidence is truthful.”

Nor does it determine whether a competency criterion is semantically appropriate.

Therefore proof infrastructure is a strong **integrity layer**, but not a complete competency authority.

## 9.4 Preliminary assessment

**Fit: HIGH for deterministic verification; LOW as a standalone semantic solution.**

---

# 10. Comparative Matrix

| Capability | CRE | AVS | UMA OO | API3 | Proof Network |
|---|---:|---:|---:|---:|---:|
| Distributed execution | HIGH | HIGH | LOW | MEDIUM | HIGH |
| Built-in consensus | HIGH | SERVICE-DEPENDENT | DISPUTE/VOTE | AGGREGATION | PROOF-BASED |
| Independent verification | HIGH | HIGH | CONDITIONAL | SOURCE-BASED | HIGH |
| Arbitrary computation | HIGH | HIGH | LOW/MEDIUM | LOW | HIGH |
| External APIs | HIGH | SERVICE-DEPENDENT | INDIRECT | HIGH | SERVICE-DEPENDENT |
| Dispute resolution | LIMITED | SERVICE-DEPENDENT | HIGH | LOW | LOW |
| Cryptographic execution proof | REPORT/CONSENSUS | SERVICE-DEPENDENT | ASSERTION/ARBITRATION | SIGNATURES | HIGH |
| Solana fit | HIGH | RESEARCH REQUIRED | CHAIN-DEPENDENT | CHAIN-DEPENDENT | CHAIN-DEPENDENT |
| Semantic competency model | NO | NO | NO | NO | NO |
| Suitable as LASTRO Consensus Core | NO | NO | NO | NO | NO |
| Suitable as LASTRO verifier adapter | HIGH | HIGH | MEDIUM | MEDIUM | HIGH |
| MVP complexity | MEDIUM | HIGH | MEDIUM | MEDIUM | HIGH |

**Interpretation:** none of the evaluated systems should replace LASTRO's domain-level Consensus Core.

---

# 11. Key Architectural Finding

The research reveals three distinct layers that should not be conflated.

## Layer 1 — Source / Evidence

What happened or what was observed?

Examples:

- work activity;
- submitted artifact;
- external system record;
- signed source data;
- execution trace.

## Layer 2 — Verification Infrastructure

Can a claim, computation, source, or predicate be independently verified?

Possible infrastructure:

- local deterministic verifier;
- CRE/DON;
- AVS;
- optimistic oracle;
- proof system;
- first-party oracle.

## Layer 3 — Domain Consensus

Do the available verification results support a competency state?

This is the role of:

**LASTRO Consensus Core.**

The architecture should therefore remain:

```
EVIDENCE
   ↓
VERIFICATION INFRASTRUCTURE
   ↓
VERIFIER RESULTS
   ↓
LASTRO CONSENSUS CORE
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
```

---

# 12. Most Important Finding

The strongest architectural conclusion is:

> **LASTRO should not choose a universal external consensus provider. It should define a verifier adapter boundary.**

This makes external infrastructures replaceable.

Example:

```
                  LASTRO
                     │
             VERIFICATION API
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
     LOCAL          CRE           AVS
    verifier       adapter       adapter
       │             │             │
       └─────────────┼─────────────┘
                     ↓
              CONSENSUS CORE
                     ↓
              COMPETENCY STATE
                     ↓
                ATTESTATION
```

This preserves the domain architecture while allowing the infrastructure layer to evolve.

---

# 13. Recommended Research Direction

## R-001 — CRE experimental adapter

Build a controlled experiment around **one deterministic verifier**.

The first candidate should not be AI interpretation.

Preferred order:

1. deterministic rule verification;
2. evidence integrity/provenance verification;
3. robustness verifier;
4. AI interpretation replication;
5. more complex external verification.

Reason:

The first experiment should isolate whether distributed execution improves the reliability/provenance of a verifier without introducing semantic ambiguity.

## R-002 — AVS architecture study

Do not implement yet.

Investigate:

- operator model;
- task definition;
- quorum;
- slashing;
- economic cost;
- operator independence;
- data privacy;
- evidence availability;
- Solana interoperability;
- dispute semantics.

## R-003 — Proof-based verifier study

Investigate whether a deterministic LASTRO verifier can be represented as a provable computation.

The target would be:

```
canonical evidence
      ↓
deterministic verifier
      ↓
proof of execution
      ↓
verifiable result
      ↓
Consensus Core
```

## R-004 — Optimistic dispute adapter

Keep UMA-like systems as a potential exception mechanism for contested external claims rather than as the normal competency path.

---

# 14. Decision Boundary

This research does **not** authorize:

- replacing the Consensus Core with CRE;
- replacing the Consensus Core with AVS;
- making blockchain the competency authority;
- making an oracle the source of semantic truth;
- adding a second consensus layer merely for narrative purposes;
- introducing external infrastructure into the MVP without a bounded experiment.

It does authorize further investigation of:

**Verification Adapter → external distributed verification → LASTRO Consensus Core.**

---

# 15. Current Research Assessment

| Question | Current conclusion |
|---|---|
| Is CRE useful to LASTRO? | Yes, strong experimental fit |
| Is CRE the LASTRO Consensus Core? | No |
| Is AVS potentially stronger long-term? | Possibly, especially for a verification network |
| Is AVS better for the current MVP? | No evidence yet |
| Is UMA a competitor to CRE? | Not directly; different trust model |
| Is API3 a competency verifier? | No; primarily source/oracle infrastructure |
| Are proof networks relevant? | Yes, especially for deterministic verification |
| Should LASTRO depend on one infrastructure? | No |
| Should the architecture expose verifier adapters? | Yes |
| Is an external consensus layer required? | No |
| Is further experimentation justified? | Yes |

---

# 16. Open Questions

1. Can a CRE workflow execute a LASTRO deterministic verifier without changing its semantics?
2. What exactly constitutes an independent verifier in the LASTRO model?
3. Does running the same verifier on multiple DON nodes provide meaningful independence if the verifier code is identical?
4. When should diversity of verification methods matter more than replication of one method?
5. Can different verifiers be weighted or typed without creating an opaque scoring system?
6. Can proof systems establish enough provenance to make verifier results independently auditable?
7. What evidence must remain off-chain when distributed verification is introduced?
8. What is the minimal cryptographic payload required for a verifier result?
9. Would an AVS eventually allow third parties to provide specialized competency verifiers?
10. How should disputes between infrastructure-level consensus and LASTRO-level consensus be represented?
11. Can CRE and proof systems coexist as different verifier adapters?
12. What is the smallest experiment that demonstrates genuine architectural value rather than merely adding infrastructure?

---

# 17. Research Conclusion

The investigation does not show that CRE is universally better than other verification infrastructures.

It shows something more important for LASTRO:

> **The infrastructure problem and the competency-consensus problem are different problems.**

CRE is currently the strongest candidate for a near-term distributed-verification experiment because it combines workflow orchestration, independent node execution, BFT consensus, off-chain capabilities and Solana integration.

AVS has potentially greater strategic significance if LASTRO evolves toward a network of independent verification services, but it carries substantially greater architectural and economic complexity.

UMA is strongest for assertion/dispute workflows. API3 is strongest as a source-authenticity/oracle layer. Proof networks are strongest where deterministic computation itself can be cryptographically proven.

Therefore the current architectural hypothesis is:

```
LASTRO
  = domain-level competency verification and consensus

CRE / AVS / Proofs / Oracles
  = replaceable verification infrastructure
```

The next research-to-engineering step should be a **single controlled CRE verifier experiment**, with no change to the semantics of the existing Consensus Core.

---

## 18. Sources

### Primary

- Chainlink CRE documentation — https://docs.chain.link/cre/overview
- Chainlink CRE Solana Write release — https://docs.chain.link/changelog/cre-cli-v1-24-0--execution-observability-and-solana-write
- Chainlink CRE Solana simulation release — https://docs.chain.link/changelog/cre-cli-v1-25-0--solana-mainnet-simulation-and-discovery-hints-add62
- EigenLayer Whitepaper — https://docs.eigenlayer.xyz/assets/files/EigenLayer_WhitePaper-88c47923ca0319870c611decd6e562ad.pdf
- EigenLayer EIGEN Whitepaper — https://docs.eigenlayer.xyz/assets/files/EIGEN_Token_Whitepaper-0df8e17b7efa052fd2a22e1ade9c6f69.pdf
- UMA Documentation — https://docs.uma.xyz/
- API3 Data Feeds Documentation — https://docs.api3.org/oev/in-depth/data-feeds/
- API3 Integration Documentation — https://docs.api3.org/dapps/integration/index.html
- RedStone AVS Documentation — https://docs.redstone.finance/docs/network-tokenomics/restaking-avs/redstone-avs/
- Succinct Documentation — https://docs.succinct.xyz/

### Evidence discipline

This document distinguishes:

- **Observed:** capabilities documented by the respective infrastructure provider.
- **Interpreted:** architectural implications for LASTRO.
- **Hypothesis:** potential future value requiring experimentation.
- **Decision:** current architectural boundary.
- **Unknown:** questions that remain unresolved.

No external provider is treated as evidence that LASTRO's competency model is valid, commercially demanded, or universally applicable.
