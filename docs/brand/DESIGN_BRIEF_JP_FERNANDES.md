# LASTRO — Public Design Implementation Brief

**Status:** public visual direction and product-interface principles  
**Context:** LASTRO — bounded Learning Competency MVP

## Objective

Make the implemented product and its evidence boundaries legible to an evaluator. The interface should express the existing product and architecture, not introduce a second domain model.

## Public references

- [Brand identity](./LASTRO_IDENTIDADE_v0.2.html)
- [Visual system specification](./VISUAL_SYSTEM_SPEC.md)
- [Frontend product specification](../product/FRONTEND_PRODUCT_SPEC.md)
- [User journeys](../product/USER_JOURNEYS.md)
- [Product README](../../README.md)
- [Consensus Core](../architecture/CONSENSUS_CORE.md)

## Identity direction

Preserve:
- layered geometry and a stable, symmetrical support structure;
- a ring associated with integrity and verification;
- black, white, and gray as the primary palette;
- blue `#1683FF` only for proof, attestation, or explicitly verified elements;
- no text embedded in the symbol;
- strong contrast and a technical, restrained visual language.

The identity must not depend on AI, blockchain, Solana, certificates, or microcredentials to communicate the product.

## Product grammar

The interface should distinguish the following stages:

```text
EVIDENCE
   ↓
AI INTERPRETATION
   ↓
INDEPENDENT VERIFICATION
   ↓
CONSENSUS
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
   ↓
PUBLIC VERIFICATION
```

Keep these concepts separate:

- source evidence ≠ AI interpretation;
- AI interpretation ≠ verification decision;
- verification ≠ consensus;
- competency state ≠ certificate;
- attestation ≠ raw evidence;
- public integrity proof ≠ authority over a person's overall competence.

## State semantics

### Competency state

Use the product's defined competency states only:

```text
NOT_STARTED
IN_DEVELOPMENT
UNDER_REVIEW
DEMONSTRATED
```

### Consensus outcome

Use only the canonical outcomes:

```text
AGREEMENT
INSUFFICIENT_EVIDENCE
CONFLICT
```

**Human adjudication is an exception-resolution path, not a consensus outcome or a normal pipeline stage.** If invoked, the interface must preserve the prior verification results, evidence, rationale, and provenance.

Do not invent new domain states to simplify the interface.

## Proof color

Blue `#1683FF` is semantic, not decorative. Reserve it for a recorded proof, attestation, public verification, or explicitly verified state. Do not use it as a generic accent for hypotheses, AI interpretation, or unverified cards.

## Bounded MVP journey

The strategic narrative may refer to work change, role deltas, competency gaps, and requalification. These remain research/product hypotheses unless implemented and independently evidenced.

The bounded demonstration centers on:

```text
COMPETENCY
→ ACTIVITIES
→ EVIDENCE
→ AI INTERPRETATION
→ INDEPENDENT VERIFICATION
→ CONSENSUS
→ COMPETENCY STATE
→ ATTESTATION
→ PUBLIC VERIFICATION
```

The interface must not imply that every stage is connected end-to-end in the published public journey. The README and proof runbooks define the current limits.

## Data and claims

The demo may use synthetic data. Clearly identify synthetic scenarios when confusion is possible.

Never present synthetic data as a customer, pilot, production deployment, traction, or market validation. Do not imply regulatory compliance, universal competence, bias-free assessment, or production readiness without evidence.

If the backend does not supply a value, show that it is unavailable or unverified; do not invent it in the frontend.

## Minimum implementation criteria

1. Evidence and AI interpretation are visually distinct.
2. Verification and consensus are visually distinct.
3. Competency state is not presented as a certificate.
4. Human adjudication is shown only as an exception path.
5. The meaning of proof blue remains consistent.
6. Synthetic scenarios are identified.
7. Missing or unverified data is not represented as authoritative.
8. The design remains consistent across product, documentation, and demo.
9. The interface does not duplicate domain logic or create new state semantics.
10. Public claims do not exceed the implementation and evidence.

> **The interface makes the system legible; it does not become a second system.**
