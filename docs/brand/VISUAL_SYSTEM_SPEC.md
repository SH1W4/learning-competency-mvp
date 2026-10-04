# LASTRO — Visual System Specification v0.2

**Status:** working visual specification aligned with LASTRO Identity v0.2  
**Owner:** JP Fernandes — UX/UI, Interface & Product Presentation  
**Scope:** visual identity, symbol, composition, product application and handoff  
**Related:** BRANDBOOK_DRAFT.md · LASTRO_IDENTIDADE_v0.2.html · DESIGN_BRIEF_JP_FERNANDES.md · FRONTEND_PRODUCT_SPEC.md

> This document translates the brand direction into executable visual criteria. It does not redefine the product architecture or create parallel product semantics.

## 01. North Star

The identity should communicate:

**WORK × LEARNING × COMPETENCY × EVIDENCE × VERIFICATION**

The visual system should make the core product mechanism legible:

**EVIDENCE → INTERPRETATION → INDEPENDENT VERIFICATION → CONSENSUS → COMPETENCY STATE → ATTESTATION → PUBLIC VERIFICATION**

The visual language should feel like infrastructure for evidence and verification — not a course platform, generic crypto product, or AI showcase.

## 02. Identity hierarchy

### Level 1 — Symbol

An independent graphic mark that works in avatar, favicon, GitHub, WhatsApp and small product applications.

### Level 2 — Visual identity

Symbol + typography + composition + color + derived graphic elements + application rules.

### Level 3 — Verbal identity

**LASTRO**, supported by:

- **Competências que deixam lastro.**
- **Evidence-backed competency.**
- **From evidence to verifiable competency.**

### Level 4 — Product

The identity enters the product without replacing functional clarity.

### Level 5 — Infrastructure

Attestation, verification and Solana appear as infrastructure when relevant, not as the center of the identity.

## 03. Symbol

### Current conceptual language

The current symbol communicates integrity and verification without depending on literal crypto, AI, education or blockchain imagery.

- **Ring** — integrity / verification;
- **Layered V forms** — evidence and state;
- **Blue diamond** — proof / attestation.

These meanings define the current visual grammar.

### Independence rule

The symbol must not depend on:

- AI;
- blockchain;
- Solana;
- certificates;
- diplomas;
- coins;
- brains;
- literal chains.

The symbol should remain recognizable independently of the product's technical implementation.

### Current reference assets

- `learning-competency-symbol-v0.svg`
- `learning-competency-symbol-reference-flat.png`
- `learning-competency-symbol-reference-3d.png`

## 04. Color system

### Core palette

| Function | Value | Semantic role |
|---|---|---|
| Black | `#000000` | primary background / base |
| White | `#FFFFFF` | primary text / contrast |
| Gray | `#D9D9D9` | secondary text / structural contrast |
| Surface | `#2A2A2E` | restrained elevated surfaces |
| Proof Blue | `#1683FF` | proof / attestation / verification |

### Blue rule

Blue is **semantic, not decorative**.

Use it to signal:

- proof;
- attestation;
- verification;
- verified state;
- public proof.

Do not introduce additional accent colors without explicit design approval.

Do not use blue simply to make a composition more visually attractive.

### General rules

- no gradients as a default visual language;
- no neon treatment;
- black remains the dominant base;
- white and gray carry most information;
- blue remains controlled and meaningful.

## 05. Typography

The current identity uses:

- **Inter Tight**
- **JetBrains Mono**

### Recommended roles

**Inter Tight**
- primary interface text;
- headings;
- navigation;
- explanatory copy;
- presentation titles.

**JetBrains Mono**
- technical metadata;
- identifiers;
- states;
- evidence references;
- hashes;
- timestamps;
- system labels;
- compact technical annotations.

Typography should support an editorial/technical hierarchy without making the interface feel like a developer console.

## 06. Composition

Prioritize:

- generous negative space;
- strong alignment;
- clear hierarchy;
- restrained density;
- geometric structure;
- layers;
- thin structural lines;
- editorial rhythm;
- deliberate asymmetry where useful;
- high contrast.

Avoid:

- excessive cards;
- decorative containers;
- dense dashboard layouts;
- visual noise;
- excessive borders;
- crypto-generic compositions.

The interface should feel **structured, not crowded**.

## 07. Visual grammar

The canonical visual grammar is:

**EVIDENCE → AI INTERPRETATION → INDEPENDENT VERIFICATION → CONSENSUS → COMPETENCY STATE → ATTESTATION → PUBLIC VERIFICATION**

### Semantic distinction

Each layer must have a visually distinguishable role:

- **Evidence** — source material or observable work;
- **Interpretation** — structured meaning proposed from evidence;
- **Independent Verification** — checks performed independently of the AI interpretation;
- **Consensus** — convergence or disagreement between verification mechanisms;
- **Competency State** — bounded system state;
- **Attestation** — integrity/reference representation;
- **Public Verification** — action/result for checking the proof.

### Human Adjudication

Human Adjudication is an **exception path** for ambiguity or conflict.

It must not appear as a mandatory step in the primary visual flow.

## 08. Competency states

The product states are:

**NOT_STARTED · IN_DEVELOPMENT · UNDER_REVIEW · DEMONSTRATED**

These are semantic product states.

They must not be visually confused with:

- evidence maturity;
- confidence scores;
- credential types;
- verification mechanism types.

**DEMONSTRATED** should communicate supported competency state, not absolute truth or permanent certification.

## 09. Consensus outcomes

The visual system may represent:

**AGREEMENT · INSUFFICIENT_EVIDENCE · CONFLICT · HUMAN_ADJUDICATION**

These outcomes must remain clearly distinguishable.

- **AGREEMENT** — verification mechanisms converge;
- **INSUFFICIENT_EVIDENCE** — evidence does not support advancement;
- **CONFLICT** — independent mechanisms disagree;
- **HUMAN_ADJUDICATION** — exception requiring human judgment.

Do not represent these as a single numeric confidence score.

## 10. Evidence and provenance

Evidence should visually preserve its origin and context.

Prefer visual cues for:

- source;
- timestamp;
- activity;
- evidence type;
- provenance;
- verification mechanism;
- decision context.

AI interpretation must be visually distinguishable from original evidence.

Synthetic/demo evidence must be explicitly labeled as synthetic when used in product presentation.

## 11. Graphic elements

Prefer:

- evidence fragments;
- trajectories;
- layers;
- restrained nodes and connections;
- state transitions;
- verification marks;
- provenance trails;
- geometric structures;
- bounded diagrams;
- evidence-to-state transformations.

Avoid:

- literal blockchains;
- coins;
- rockets;
- generic AI brains;
- humanoid robots;
- excessive neon;
- glowing Web3 interfaces;
- decorative verification badges without semantic meaning.

Derived elements should belong to one coherent visual language and should not reproduce the symbol literally in every component.

## 12. Iconography

Iconography should use:

- simple geometry;
- consistent stroke/weight logic;
- high contrast;
- minimal detail;
- fast recognition;
- digital-product compatibility.

Avoid literal crypto/AI/education clichés.

Icons should communicate function, not decorate empty space.

## 13. Images and illustrations

When images are required, prioritize:

- people in real work or learning contexts;
- observable activity;
- evidence;
- collaboration;
- analysis;
- systems;
- editorial abstractions.

Avoid generic stock imagery that makes LASTRO look like a corporate training platform.

Do not place the symbol over every image. The mark should have intentional use.

## 14. Product application

The visual system must support the product architecture rather than reinterpret it.

The MVP interface should make the following legible:

**EVIDENCE → VERIFICATION → CONSENSUS → COMPETENCY STATE → ATTESTATION → PUBLIC VERIFICATION**

AI interpretation may appear between evidence and verification, but must never visually imply that AI alone proves competency.

Human Adjudication appears only when the system enters the exception path.

The frontend should follow `FRONTEND_PRODUCT_SPEC.md`; this document defines visual language, not a second interaction architecture.

## 15. Strategic narrative layer

The product may visually present the research/strategic narrative:

**WORK CHANGE → ROLE DELTA → COMPETENCY GAP → REQUALIFICATION**

This layer should be clearly distinguishable from the technically closed MVP wedge.

It must not visually imply that Dynamic Role Architecture or full requalification infrastructure is already commercially validated.

When space is constrained, prioritize the core wedge:

**Evidence → Verification → Consensus → Competency State → Proof**

## 16. Responsiveness and scale

Test the symbol and primary visual elements at:

- 16–24 px — favicon / minimum icon;
- 32–64 px — interface / avatar;
- 128–256 px — GitHub / WhatsApp / profile;
- 512 px+ — presentation / cover;
- wide compositions — documentation / decks / landing pages.

Tests should verify:

- recognition;
- shape closure;
- stroke/weight stability;
- contrast;
- disappearance of fine details;
- semantic legibility.

## 17. Clear space and proportions

The final production system should document:

- minimum clear space;
- symbol proportions;
- minimum recommended size;
- symbol/wordmark relationship;
- horizontal and vertical lockups where necessary;
- isolated mark usage.

These are production specifications and may be refined by the design owner without changing the semantic identity.

## 18. Backgrounds and variants

Minimum required variants:

### Primary
Symbol on dark background.

### Monochrome
Single-color version that does not depend on blue.

### Inverted
Light-background version when required.

### Reduced
Simplified version for small sizes if the symbol requires it.

Do not create arbitrary variants merely to increase the asset count.

## 19. Priority applications

First priority:

1. MVP frontend;
2. hackathon presentation;
3. GitHub;
4. documentation;
5. public verification/proof surfaces;
6. WhatsApp/team communication.

Later:

- social;
- validation materials;
- templates;
- external presentations;
- institutional materials.

## 20. Do / Don't

### DO

- preserve high contrast;
- use black as the visual base;
- preserve negative space;
- use blue semantically;
- distinguish evidence from interpretation;
- distinguish verification from competency state;
- distinguish consensus outcomes;
- represent Human Adjudication as an exception;
- maintain consistency across product, presentation and documentation;
- test at small sizes.

### DON'T

- turn the symbol into a blockchain icon;
- use certificate imagery as the primary metaphor;
- make AI/robots the visual language;
- use neon as default;
- create a separate visual identity for every channel;
- imply absolute truth;
- imply AI is the competency authority;
- present Human Adjudication as a routine pipeline step;
- invent product capabilities through visual treatment.

## 21. Handoff expected from JP Fernandes

### Symbol

- geometric refinement;
- primary / monochrome / accent versions;
- reduced version if necessary;
- scale tests;
- clear-space rules;
- usage rules.

### System

- validated palette;
- typography hierarchy;
- derived graphic elements;
- initial iconography;
- image treatment;
- composition rules;
- responsive behavior.

### Product

- application to the vertical slice;
- visual state system;
- evidence vs interpretation;
- verification;
- consensus outcomes;
- competency states;
- attestation;
- public verification.

### Applications

- GitHub;
- WhatsApp;
- presentation;
- documentation;
- MVP interface.

### Handoff package

Deliver editable/source files where possible, final exports, and sufficient rules for another designer to reproduce the system without depending on the original author.

## 22. Acceptance criteria

The visual system is not complete merely because the symbol looks good.

It should answer:

1. Does the symbol work without the wordmark?
2. Does it work at small sizes?
3. Does it work in monochrome?
4. Is there consistency between product, presentation and documentation?
5. Does the identity communicate evidence, competency and verification without depending on blockchain?
6. Can the interface distinguish evidence, interpretation, verification, consensus, state and proof?
7. Is Human Adjudication clearly an exception?
8. Can another designer reproduce the system?
9. Is semantic blue used consistently?
10. Are validated capabilities distinguishable from research/strategic hypotheses?

## 23. Governance rule

Design can propose and test.

Visual decisions must not silently alter:

- product thesis;
- MVP flow;
- architecture;
- competency model;
- role of AI;
- role of independent verification;
- role of Consensus Core;
- Human Adjudication semantics;
- role of attestation/Solana.

If a visual decision requires a product or architecture change, it must return to the product/architecture owners.

## 24. Status

**v0.2 — working visual specification aligned with LASTRO Identity v0.2.**

The canonical visual reference is `docs/brand/LASTRO_IDENTIDADE_v0.2.html`.

This specification makes the visual system executable while preserving the distinction between **identity, product semantics and research hypotheses**.