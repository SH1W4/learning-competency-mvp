# Public Source of Truth

## Purpose

This page identifies which public artifacts govern the current LASTRO MVP. It is an evaluator-facing map, not an internal repository inventory or operational planning document.

## Authority order

When public artifacts disagree, use this order:

1. **Executable behavior:** current source code and tests define what the implementation actually does.
2. **Product contract:** the public use case and MVP contract define the bounded behavior intended for this release.
3. **Architecture:** canonical architecture and Consensus Core documentation explain the system boundaries and decision semantics.
4. **Proof and claims:** demo, attestation, verification, limitations, and claims documents define what has been demonstrated and what remains unproven.
5. **Research:** external evidence and research documents support context and hypotheses; they do not silently change the implemented product contract.
6. **History:** older records preserve context but do not override current code, tests, or explicitly current public contracts.

## Public review principle

A public claim must be traceable to implementation, tests, a reproducible artifact, or an identified external source. If the available evidence does not support a claim, qualify it or remove it.

Synthetic examples must be identified as synthetic. A successful demo does not establish customer adoption, willingness to pay, ROI, product-market fit, universal competency assessment, or independence of verification mechanisms without separate evidence.

## Public references

- [Product and MVP scope](../evaluation/01_PRODUCT.md)
- [Architecture](../evaluation/02_ARCHITECTURE.md)
- [Verification and governance](../evaluation/03_VERIFICATION_AND_GOVERNANCE.md)
- [Demo and technical proof](../evaluation/04_DEMO_AND_PROOF.md)
- [Limitations and claims](../evaluation/05_LIMITATIONS_AND_CLAIMS.md)
- [Source implementation](../../src/)
- [Automated tests](../../tests/)
