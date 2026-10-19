# Public Publication Boundary

## Purpose

This document defines the intended scope of the public LASTRO MVP repository: executable behavior, reproducible evidence, and claims that can be inspected against implementation and tests.

## Public by design

Keep source code, tests, synthetic fixtures, API contracts, and concise architecture/evaluation documentation public when needed to reproduce, inspect, or challenge a product claim.

Public technical transparency does not require publishing every research draft, internal decision log, working note, or future component.

## Do not publish without explicit authorization

- Credentials, private keys, signing material, access tokens, or passwords.
- Personal, customer, partner, or confidential third-party data.
- Material covered by an NDA or other contractual restrictions.
- Internal deliberations, negotiation positions, and unreleased commercial or competitive strategy.
- Operational runbooks or working artifacts that are not necessary for public reproduction or evaluation.

Secrets belong in an appropriate secret manager, never in source control or documentation.

## Release review

Before adding or changing public material:

1. Classify the file by its actual contents, not only its directory.
2. Verify that public claims match the current implementation and available evidence.
3. Label synthetic examples clearly and distinguish them from customer evidence.
4. Inspect sensitive identifiers, metadata, and accidental credentials.
5. Use dedicated secret scanning in addition to manual review.
6. Publish only the minimum information needed for the intended public claim.

For diligence requiring restricted detail, prepare a purpose-specific package and share it through an access-controlled channel rather than placing it in the public repository.

## Intellectual-property boundary

Open implementation and reproducibility are deliberate choices for the current MVP. They do not automatically determine the disclosure policy for future components. Any future proprietary prompt, heuristic, model, dataset, or competitive implementation detail must be classified before publication; its public contract can be documented separately when appropriate.

## Governing principle

**Publish enough to reproduce and audit the claims. Keep unrelated internal strategy and restricted working knowledge outside the public surface.**
