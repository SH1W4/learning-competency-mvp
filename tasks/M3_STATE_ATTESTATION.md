# M3 — State, Attestation & Verification

Owner: SH1W4
Status: TODO
Priority: P0

## Objective

Turn a reviewed competency-development result into a bounded, verifiable state.

## Tasks

### M3.1 — Finalize state model
Owner: SH1W4
Dependency: M2.5
Deliverable: canonical MVP state representation.
Done when: state fields and allowed transitions are explicit.

### M3.2 — Finalize attestation payload
Owner: SH1W4
Dependency: M3.1
Deliverable: implementation-ready attestation schema.
Done when: subject, competency, state, evidence reference, review context, timestamp and versioning requirements are defined.

### M3.3 — Confirm Solana mechanism
Owner: SH1W4
Dependency: M3.2
Deliverable: chosen Solana attestation mechanism and integration boundary.
Done when: team can explain exactly what is recorded, by whom, and what a verifier can independently check.

### M3.4 — Implement attestation
Owner: SH1W4
Dependency: M3.3
Deliverable: working creation of the MVP attestation.
Done when: a reviewed state can produce the expected proof without placing raw sensitive evidence on-chain.

### M3.5 — Implement verification
Owner: SH1W4
Dependency: M3.4
Deliverable: simple verifier path.
Done when: a fresh verification can resolve the attestation and report only claims actually supported by the mechanism.

### M3.6 — Test integrity and failure cases
Owner: SH1W4
Dependency: M3.4 + M3.5
Deliverable: automated/manual verification tests.
Done when: invalid, missing, altered or unresolved references fail predictably.

## Exit criteria

review → state → attestation → Solana → verification works reproducibly for the canonical demo scenario.
