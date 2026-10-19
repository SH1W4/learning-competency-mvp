# LASTRO — Public Validation Boundaries

**Document type:** public scope and evidence summary  
**Status note:** this is not a live engineering tracker. Refer to the current source code, tests, and linked proof records for candidate-specific verification.

## What the MVP demonstrates

The current MVP is a bounded technical demonstration using synthetic evidence. It separates source evidence, AI interpretation, deterministic checks, consensus outcomes, competency state, and attestation.

The repository also documents a historical Solana Devnet attestation for one defined synthetic record. That evidence supports the integrity relationship for that record; it does not establish universal competency or prove that the currently published frontend journey is fully integrated end-to-end.

## What remains unestablished

The public evidence must not be interpreted as proving:

- durable public retrieval of a complete record together with its matching verification report;
- a fully integrated, persistent frontend-to-attestation workflow;
- conformance to a separately specified contract;
- production readiness or independent security certification;
- customer adoption, a live customer deployment, product-market fit, willingness to pay, or ROI.

A successful test, build, preview, deployment, or historical transaction is evidence only for the exact behavior and candidate it covers. It does not automatically validate a later commit or a broader claim.

## Evidence required for stronger claims

Before making a stronger integration or release claim, the exact candidate should have evidence for:

1. stable record identity and persistence across reads and restarts;
2. independent verification that binds the attestation, expected signer, network, payload, and record hash;
3. public retrieval of the exact persisted record and its matching verification result;
4. explicit negative-path behavior for missing, invalid, conflicting, or unverifiable evidence;
5. tests and live end-to-end inspection tied to the exact candidate commit;
6. a separate, authorized separate-contract-conformance decision where such a claim is intended.

Signing material must remain outside source control and the browser. No personal evidence belongs on-chain.

## Interpretation boundaries

- AI interpretation is an input signal, not the decision authority.
- Consensus outcomes remain `AGREEMENT`, `INSUFFICIENT_EVIDENCE`, and `CONFLICT`.
- Human adjudication is an exception-resolution path and must preserve prior verification results and provenance.
- A `DEMONSTRATED` state applies only to a defined capability under a defined evidence contract and context.

## Public documentation rule

Keep the public repository focused on reproducible implementation, bounded research, and evidence needed to evaluate the MVP. Engineering task assignments, detailed closure sequencing, and internal coordination belong outside this public summary.

This document deliberately summarizes the public evidence boundary rather than tracking individual tasks or contributors.
