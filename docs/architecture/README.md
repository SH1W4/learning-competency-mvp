# LASTRO — Technical Architecture

This directory contains the formal architectural specifications, data contracts, and pipeline definitions for the LASTRO Learning Competency infrastructure.

---

## Architectural Principles

1. **Separation of Concerns:** Source evidence, AI interpretation, deterministic verification, consensus, and attestation are distinct, inspectable layers.
2. **Epistemic Discipline:** A competency state represents only what the available evidence, independent checks, and governance rules mathematically support.
3. **Consensus Core Authority:** The Consensus Core is the decision engine for covered cases. Human adjudication is strictly an exception path for material conflict or ambiguity.
4. **Privacy-Preserving On-Chain Footprint:** Raw evidence and sensitive learning data remain off-chain. Only deterministic state hashes, pseudonymized subject references, and metadata bindings are anchored on-chain.

---

## End-to-End Pipeline

```
INGEST → NORMALIZE → EXTRACT → INTERPRET (AI) → RELATE
                            ↓
             INDEPENDENT VERIFICATION MECHANISMS
             ├─ Integrity Check (Structural SHA-256)
             ├─ Deterministic Criteria Check (Structural)
             └─ AI Interpretation (Semantic Proposal)
                            ↓
                      CONSENSUS CORE
             ├─ AGREEMENT → DEMONSTRATED (Automatic State Update)
             ├─ INSUFFICIENT_EVIDENCE → IN_DEVELOPMENT (Hold / Request Evidence)
             └─ CONFLICT → HUMAN ADJUDICATION (Explicit Exception Path)
                            ↓
                    REVIEWED STATE RECORD
                            ↓
                   SOLANA ATTESTATION (Devnet Memo)
                            ↓
                   PUBLIC INDEPENDENT VERIFICATION
```

---

## Architectural Specifications

| Document | Purpose & Scope |
|---|---|
| [TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md) | High-level system architecture, module boundaries, runtime components, and data flows. |
| [CONSENSUS_CORE.md](CONSENSUS_CORE.md) | Consensus rules, convergence evaluation, conflict detection, and human adjudication exceptions. |
| [DOMAIN_MODEL.md](DOMAIN_MODEL.md) | Core domain entities: `Evidence`, `Activity`, `Criterion`, `Competency`, `VerificationResult`, `StateRecord`. |
| [API_CONTRACT.md](API_CONTRACT.md) | Canonical HTTP API contract (`/health`, `/api/m4/competency`) and JSON schema responses. |
| [EVIDENCE_PIPELINE.md](EVIDENCE_PIPELINE.md) | Data ingestion, metadata extraction, semantic relation mapping, and provenance tracking. |
| [ATTESTATION_MODEL.md](ATTESTATION_MODEL.md) | `m3.attestation.v2` payload specification, Solana Memo anchoring, and cryptographic binding. |
| [CANONICALIZATION.md](CANONICALIZATION.md) | Deterministic JSON canonicalization (JCS-style key sorting, whitespace normalization, UTF-8 SHA-256). |
| [GOVERNANCE_COMPLIANCE_LAYER.md](GOVERNANCE_COMPLIANCE_LAYER.md) | Adjudicator audit logs, role permissions, conflict-of-interest controls, and compliance boundaries. |
| [VERIFICATION_ADAPTER_BOUNDARY.md](VERIFICATION_ADAPTER_BOUNDARY.md) | Modular verifier interface decoupling local verification mechanisms from external infrastructure candidates (e.g., CRE/DON). |
