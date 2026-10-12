# Publication Boundary

## Purpose

This document defines what belongs in the public LASTRO MVP repository. The repository is the canonical public surface for the released product, its reproducible behavior, and claims that can be inspected against implementation and tests.

## Public by design

Keep implementation, tests, synthetic fixtures, API contracts, and concise architecture/evaluation documentation public when they are needed to reproduce, inspect, or challenge a stated product claim.

Public technical transparency is intentional. It does not require publishing every research draft, internal decision log, working note, or future component.

## Do not publish

Keep the following out of this repository unless disclosure is explicitly approved and appropriately redacted:

- credentials, private keys, signing material, access tokens, or passwords;
- personal, customer, partner, or confidential third-party data;
- material covered by NDA or other contractual restrictions;
- internal deliberations, negotiation positions, and unreleased commercial or competitive strategy;
- operational runbooks or working artifacts that are not necessary for public reproduction or evaluation.

Secrets must be stored in an appropriate secret manager, never in a repository or documentation vault.

## Release review

Before adding or changing public material:

1. classify the file by its actual contents, not just its directory;
2. verify that public claims match the current implementation and available evidence;
3. label synthetic examples clearly and keep them distinct from customer evidence;
4. inspect for sensitive identifiers, metadata, and accidental credentials;
5. use dedicated secret scanning in addition to manual review;
6. publish only the minimum information needed for the intended public claim.

For investor, partner, or evaluator diligence that requires restricted detail, prepare a purpose-specific package and share it through an access-controlled channel rather than placing it in the public repository.

## Intellectual-property boundary

Open implementation and reproducibility are deliberate choices for the current MVP. They do not automatically determine the disclosure policy for future components. Any future proprietary prompt, heuristic, model, dataset, or other competitive implementation detail must be classified before publication; its public contract can be documented separately when appropriate.

## Governing principle

**Publish enough to reproduce and audit the claims. Keep unrelated internal strategy and restricted working knowledge outside the public surface.**
