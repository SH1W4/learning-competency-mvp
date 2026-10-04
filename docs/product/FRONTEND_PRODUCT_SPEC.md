# Frontend Product Specification — LASTRO

**Status:** implementation contract  
**Audience:** frontend engineer, UX/UI owner, product/architecture reviewers  
**Source of truth:** `docs/product/PITCH_ARCHITECTURE.md`, `docs/product/USER_JOURNEYS.md`, `docs/architecture/CONSENSUS_CORE.md`, `docs/architecture/GOVERNANCE_COMPLIANCE_LAYER.md`

> **Core invariant:** the frontend is a projection of the existing product architecture. It must not invent business logic, verification logic, competency rules, or parallel state transitions.
>
> **Narrative boundary:** the frontend has two presentation layers. The **MVP demonstrable layer** exposes Evidence → Verification → Consensus → Competency State → Proof. The **Strategic / Research layer** may present Work Change → Role Delta → Competency Gap → Requalification as future direction, but must not imply that those backend capabilities are already implemented or validated.

---

## 1. Product objective

LASTRO turns observable work evidence into a bounded, verifiable competency state.

The frontend must make this progression understandable:

```text
WORK
  ↓
EVIDENCE
  ↓
INTERPRETATION
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

The frontend is not the place where these rules are invented. It visualizes and exposes the state produced by the existing domain pipeline.

**Document status:** implementation contract aligned with the current M4 product/documentation baseline.

### Primary product statement

> **Evidence-backed competency.**

### Aha moment

> **A demonstrated competency stops being only a claim inside the application and becomes a verifiable state backed by evidence.**

Blockchain is infrastructure for the proof layer, not the product story.

---

## 2. Product scope

### MVP wedge

```text
Evidence → Competency → Verification → State → Attestation → Verification
```

### Strategic narrative

```text
Work Change → Role Delta → Competency Gap → Requalification → Proof of Competency
```

The strategic layer is presented as a product direction and research hypothesis. It must not be represented by the frontend as a commercially validated capability.

### Explicit non-goals

The frontend must not imply that LASTRO is:

- an LMS replacement;
- a universal competency framework;
- a recruiting or hiring system;
- a marketplace;
- a universal credentialing platform;
- a system that eliminates human judgment;
- a system that guarantees truth;
- a system that stores sensitive personal data on-chain.

---

## 3. Canonical demo journey

The primary demo follows exactly this order:

```text
ORGANIZATION
↓
WORK CHANGE
↓
ROLE DELTA
↓
COMPETENCY GAP
↓
REQUALIFICATION
↓
EVIDENCE
↓
VERIFICATION
↓
CONSENSUS
↓
DEMONSTRATED
↓
ATTESTATION
↓
PUBLIC VERIFICATION
```

The interface should allow a juror or evaluator to understand the complete story without needing to inspect source code.

---

## 4. Route model

The frontend should be organized around the product narrative rather than around backend modules.

Recommended route structure:

| Route | Purpose |
|---|---|
| `/` | Product entry / dashboard |
| `/work-change` | Work-change signals |
| `/role` | Role Delta |
| `/competencies` | Competency state and gaps |
| `/requalification` | Development path |
| `/evidence` | Evidence inspection |
| `/verification` | Verification mechanisms and consensus |
| `/proof` | Competency proof and public verification |

A single-page implementation may be used if the chosen frontend architecture makes this clearer. These routes describe the information architecture, not a requirement to introduce unnecessary routing complexity.

---

# 5. Global domain model

The UI should operate on a shared product model.

```ts
type ProductContext = {
  organization: Organization;
  role: Role;
  competencies: Competency[];
  activities: Activity[];
  evidence: Evidence[];
  verifications: Verification[];
  consensus?: ConsensusDecision;
  competencyStates: CompetencyStateRecord[];
  attestation?: Attestation;
};
```

The exact TypeScript representation may follow the existing implementation contracts. Do not duplicate domain types merely for UI convenience if reusable types already exist.

---

## 6. Core domain objects

### Organization

Represents the organization defining or observing a competency need.

Minimum display information:

- name;
- context;
- role being analyzed;
- relevant competency need.

### Role

Represents the role whose work is changing.

Minimum display information:

- role name;
- previous responsibilities;
- current responsibilities;
- tools;
- required competencies.

### Competency

Represents a defined capability with criteria.

Minimum display information:

- name;
- description;
- criteria;
- current state;
- evidence coverage.

### Activity

Represents an observable task or activity in a trail.

Minimum display information:

- title;
- description;
- competency relation;
- expected evidence;
- completion state.

### Evidence

Evidence is the primary object supporting a competency claim.

Minimum display information:

- evidence identifier;
- type;
- origin/source;
- activity;
- criterion;
- provenance;
- integrity/hash reference;
- interpretation status;
- verification status.

**Important:** evidence and interpretation are separate concepts.

### Verification

Represents one verification mechanism applied to the evidence/context.

The UI must preserve the distinction between mechanisms.

Current conceptual mechanisms include:

- Evidence Integrity;
- Deterministic Rule Check;
- Statistical / Robustness;
- AI Interpretation;
- Source / Provenance.

### Consensus

Represents the convergence result across verification mechanisms.

Supported outcomes:

- `AGREEMENT`;
- `INSUFFICIENT_EVIDENCE`;
- `CONFLICT`;
- `HUMAN_ADJUDICATION`.

### Competency State

The competency state represents only what the evidence, verification and governance process supports.

Current state vocabulary:

- `NOT_STARTED`;
- `IN_DEVELOPMENT`;
- `UNDER_REVIEW`;
- `DEMONSTRATED`.

Do not invent additional competency states in the frontend.

### Attestation

Represents a recorded competency state/event.

Minimum display information:

- competency;
- state;
- decision;
- record hash;
- attestation reference;
- public verification reference.

Attestation is not the full evidence payload.

---

# 7. Screen specifications

## Screen 1 — Work Change

### Goal

Answer:

> **Como o trabalho está mudando?**

### Show

- competencies being tracked;
- competencies changing;
- task-change signals;
- identified gaps;
- relevant role context.

### Narrative

The screen establishes why a competency system needs to represent change instead of only static profiles.

### Important limitation

Dynamic Role Architecture is a research hypothesis. If this screen uses synthetic change data, label it clearly as demo/synthetic data.

### Primary CTA

`Ver impacto no papel`

Leads to Role Delta.

---

# 8. Screen 2 — Role Delta

### Goal

Show the difference between the previous and current role representation.

### Compare

| Dimension | Before | Now |
|---|---|---|
| Tasks | previous tasks | current tasks |
| Responsibilities | previous | current |
| Tools | previous | current |
| Competencies | previous | current |

Each meaningful change should expose:

- source/evidence reference when available;
- confidence/context when the underlying data supports it;
- affected competency.

### Primary CTA

`Ver gaps de competência`

---

# 9. Screen 3 — Competency Gap

### Goal

Make competency state visible.

Each competency card should show:

- competency name;
- required state;
- current state;
- criteria;
- evidence coverage;
- gap status.

### State presentation

Use explicit labels, not ambiguous color-only indicators.

Example:

```text
NOT_STARTED
IN_DEVELOPMENT
UNDER_REVIEW
DEMONSTRATED
```

### Primary CTA

For a gap:

`Ver requalificação`

For a demonstrated competency:

`Ver evidências`

---

# 10. Screen 4 — Requalification

### Goal

Connect a competency gap to concrete activities and expected evidence.

### Show

- target competency;
- missing criteria;
- recommended activities;
- expected evidence;
- current progress;
- next observable proof.

### Important constraint

This screen does not claim that the system has validated an optimal learning path unless such logic actually exists.

Use wording such as:

- "recommended activity";
- "expected evidence";
- "proposed path".

Avoid:

- "guaranteed path";
- "optimal training";
- "automatically certified".

### Primary CTA

`Ver evidências`

---

# 11. Screen 5 — Evidence

### Goal

Make evidence inspectable.

### Evidence card

Each evidence item should expose, when available:

```text
Evidence ID
Type
Source / Origin
Activity
Criterion
Integrity / Hash
Provenance
Interpretation
Verification status
```

### Evidence detail

Clicking an evidence item should open a detail view/panel containing:

1. source material metadata;
2. activity relation;
3. criterion relation;
4. extracted information;
5. AI interpretation;
6. provenance;
7. integrity information;
8. verification results.

### Critical distinction

The UI must visually distinguish:

**Observed evidence**

from

**AI interpretation**

from

**Human review**

from

**Consensus decision**

Never present AI interpretation as if it were the original evidence.

### Primary CTA

`Verificar evidência`

---

# 12. Screen 6 — Verification

### Goal

Show how the competency state was reached.

The interface must show mechanisms separately.

Canonical representation:

```text
Evidence Integrity       PASS
Deterministic Rules      PASS
AI Interpretation        PASS
Consensus                AGREEMENT
```

Additional mechanisms may appear when actually implemented.

### Never use

A single opaque score such as:

```text
87% competency confidence
```

as the primary decision representation.

The product is based on converging mechanisms, not one magical score.

### Verification mechanism component

Each mechanism should expose:

- name;
- status;
- what it checked;
- relevant evidence/criteria;
- result;
- short rationale;
- provenance when available.

### Deterministic Rule Check

The UI must make clear that deterministic checks are independent from AI interpretation.

Do not describe it as:

> "AI confirmed the rule."

Prefer:

> "Deterministic rule check passed against the defined criteria and eligible evidence."

### AI Interpretation

Present AI as an interpretive/assistive mechanism.

Never state:

> "AI proved the competency."

Prefer:

> "AI interpretation supports the criterion."

### Primary CTA

`Ver decisão de consenso`

---

# 13. Screen 7 — Consensus

### Goal

Explain the final convergence decision.

### Supported outcomes

| Outcome | Meaning |
|---|---|
| AGREEMENT | Verification mechanisms converge sufficiently for the covered scenario |
| INSUFFICIENT_EVIDENCE | Available evidence does not support advancement |
| CONFLICT | Verification mechanisms disagree |
| HUMAN_ADJUDICATION | Human intervention is required |

### AGREEMENT

Show:

- participating mechanisms;
- their results;
- convergence;
- resulting state;
- decision timestamp/context.

### INSUFFICIENT_EVIDENCE

Show:

- what is missing;
- which criterion remains unsupported;
- next evidence needed.

### CONFLICT

Show:

- conflicting mechanisms;
- points of divergence;
- why automatic advancement did not occur;
- human review path.

### HUMAN_ADJUDICATION

Show:

- reason for escalation;
- review context;
- reviewer decision when available;
- provenance of the decision.

### Critical principle

Human adjudication is an explicit exception layer, not a hidden fallback.

---

# 14. Screen 8 — Proof of Competency

### Goal

Deliver the product's strongest visual moment.

The screen should answer:

> **O que foi demonstrado, com base em quê, e como outra pessoa pode verificar?**

### Show

```text
COMPETENCY
STATE
EVIDENCE REFERENCES
DECISION
RECORD HASH
ATTESTATION
PUBLIC VERIFICATION
```

### Example hierarchy

```text
Data Analysis
────────────────────────
DEMONSTRATED

Supported by
3 evidence references

Verification
AGREEMENT

Record
<hash>

Attestation
<m3.attestation.v2 reference>

Public verification
[ Verify ]
```

### Aha moment

The most important visual transition is:

```text
claim
  ↓
evidence
  ↓
verification
  ↓
demonstrated state
  ↓
verifiable proof
```

---

# 15. Evidence state model

If the frontend needs an evidence lifecycle, use only states supported by the implementation.

Recommended presentation states:

- `MISSING`;
- `SUBMITTED`;
- `PROCESSING`;
- `INTERPRETED`;
- `VERIFIED`;
- `CONFLICTED`.

These are **UI/presentation states** unless corresponding domain states already exist.

Do not persist a new backend state merely because the frontend needs a label.

---

# 16. Competency state model

Use the existing domain vocabulary:

```text
NOT_STARTED
    ↓
IN_DEVELOPMENT
    ↓
UNDER_REVIEW
    ↓
DEMONSTRATED
```

Possible failure/non-advancement paths:

```text
UNDER_REVIEW
    ↓
INSUFFICIENT_EVIDENCE
    ↓
remain UNDER_REVIEW / collect more evidence
```

```text
UNDER_REVIEW
    ↓
CONFLICT
    ↓
HUMAN_ADJUDICATION
```

The frontend must not perform these transitions itself.

---

# 17. Verification state model

Verification mechanisms should have explicit states such as:

```text
PASS
FAIL
INSUFFICIENT
CONFLICT
NOT_RUN
```

Only use a state when it is supported by the underlying mechanism.

Do not transform `INSUFFICIENT` into `FAIL`.

Do not transform `CONFLICT` into a lower confidence score.

---

# 18. Component vocabulary

The frontend should favor reusable domain components.

Recommended components:

- `ProductHeader`
- `JourneyStepper`
- `OrganizationContext`
- `RoleDeltaCard`
- `CompetencyCard`
- `CompetencyStateBadge`
- `GapCard`
- `RequalificationCard`
- `EvidenceCard`
- `EvidenceTimeline`
- `EvidenceDetail`
- `VerificationPanel`
- `VerificationMechanism`
- `ConsensusStatus`
- `ConsensusDecision`
- `ProvenanceTimeline`
- `AttestationCard`
- `ProofPanel`
- `PublicVerification`

These are vocabulary recommendations, not mandatory file names.

---

# 19. Interaction rules

## Evidence

Clicking an evidence item:

```text
Evidence Card
→ Evidence Detail
→ Interpretation
→ Verification
→ Provenance
```

## Verification

Clicking a mechanism:

```text
Verification Mechanism
→ What was checked
→ Input/context
→ Result
→ Rationale
```

## Consensus

Clicking the consensus result:

```text
Consensus
→ Mechanism results
→ Convergence/divergence
→ Governance outcome
→ State transition
```

## Attestation

Clicking the attestation:

```text
Attestation
→ Record
→ Hash/reference
→ Public verification
```

The user should be able to move from a final claim backward to its supporting evidence.

---

# 20. Provenance visualization

Provenance must remain explicit.

Recommended chain:

```text
EVIDENCE
  ↓
AI INTERPRETATION
  ↓
VERIFICATION
  ↓
CONSENSUS
  ↓
COMPETENCY STATE
  ↓
ATTESTATION
```

Each stage should identify its origin where the underlying record supports it.

Existing origin vocabulary:

```text
evidence
ai
reviewer
consensus
system
```

The UI must not collapse all origins into a generic "system generated" label.

---

# 21. Synthetic demo data

The hackathon demo may use synthetic data.

Synthetic data must be visually identifiable where confusion with real customer evidence could occur.

Recommended label:

> **Demo scenario — synthetic data**

Do not imply:

- customer deployment;
- production traction;
- pilot results;
- validated market demand;
- real organizational data.

The demo exists to prove the technical/product flow.

---

# 22. Frontend data contract

The frontend should consume the domain state already produced by the backend/pipeline.

Conceptual read model:

```ts
type FrontendReadModel = {
  organization: {
    id: string;
    name: string;
  };

  role: {
    id: string;
    name: string;
    previous?: RoleSnapshot;
    current: RoleSnapshot;
  };

  competencies: CompetencyView[];

  activities: ActivityView[];

  evidence: EvidenceView[];

  verification: VerificationView[];

  consensus?: ConsensusView;

  competencyState?: CompetencyStateView;

  attestation?: AttestationView;
};
```

This is a conceptual UI contract. Existing domain types should be reused where possible.

### No parallel domain logic

Do not create frontend versions of:

- consensus rules;
- competency advancement rules;
- deterministic criteria;
- attestation validation;
- evidence eligibility;
- governance rules.

The frontend renders results.

---

# 23. Data loading and failure states

Every major screen must define at least:

- loading;
- loaded;
- empty;
- error;
- unavailable/not-supported.

Example:

```text
Loading evidence...
No evidence available.
Evidence could not be loaded.
Verification not available for this record.
```

Do not fabricate fallback values that look like real verification results.

---

# 24. Responsive behavior

The demo must work on desktop first, with responsive behavior preserved for smaller screens.

### Desktop

Prioritize:

1. narrative;
2. current state;
3. evidence;
4. verification;
5. proof.

### Mobile

Use vertical progressive disclosure.

Recommended order:

```text
State
↓
Why
↓
Evidence
↓
Verification
↓
Proof
```

Avoid dense multi-column verification tables on narrow screens.

---

# 25. UX principles

### 1. Evidence before assertion

Whenever the UI makes a competency claim, the user should be able to reach its supporting evidence.

### 2. State before detail

Show the current competency state first, then explain how it was reached.

### 3. Mechanisms stay separate

Do not merge independent verification mechanisms into one visual score.

### 4. Explainability without overload

Expose rationale progressively. The first layer should be understandable to a non-technical evaluator; deeper layers can expose technical detail.

### 5. Human judgment remains visible

Human review is not hidden when it occurs.

### 6. Technical infrastructure is subordinate to product value

Solana should appear at the proof/integrity layer, not dominate the home screen.

### 7. No false certainty

Use precise language:

- "supports";
- "verified against";
- "meets the defined criteria";
- "agreement";
- "insufficient evidence";
- "requires adjudication".

Avoid:

- "guaranteed";
- "objective truth";
- "bias-free";
- "AI certified".

---

# 26. Visual hierarchy for the demo

The evaluator should understand these five things in order:

```text
1. WHAT changed?
2. WHAT competency is affected?
3. WHAT evidence exists?
4. HOW was it verified?
5. WHAT can now be verified externally?
```

The interface should not lead with:

- blockchain;
- hashes;
- technical architecture;
- model names;
- implementation details.

Those are supporting proof.

---

# 27. What the frontend must NOT invent

The frontend must not independently invent:

- competency criteria;
- role definitions;
- evidence validity;
- verification results;
- consensus decisions;
- state transitions;
- governance policies;
- reviewer authority;
- attestation validity;
- market claims;
- customer traction.

If data does not exist, the UI should represent the missing state explicitly.

---

# 28. Implementation order

Build in this order:

### P0 — Shell

- app shell;
- navigation;
- journey indicator;
- global demo context;
- responsive layout.

### P1 — Core wedge

- Competency;
- Evidence;
- Verification;
- Consensus;
- Competency State.

### P2 — Proof

- Attestation;
- record hash;
- public verification.

### P3 — Strategic narrative

- Work Change;
- Role Delta;
- Competency Gap;
- Requalification.

These screens are strategic/research narrative unless corresponding backend capabilities are explicitly implemented and validated.

This order protects the MVP wedge even if time becomes constrained. The strategic screens remain presentation-layer context and must not be mistaken for implemented backend capabilities.

---

# 29. Definition of Done

The frontend is considered ready for the hackathon demo when:

### Product

- [ ] The evaluator can understand the problem without reading technical documentation.
- [ ] The aha moment is visible.
- [ ] The wedge is clear.
- [ ] Strategic hypotheses are not presented as validated facts.

### Journey

- [ ] The canonical demo can be executed end-to-end.
- [ ] The user can move from work change to proof.
- [ ] Evidence can be inspected.
- [ ] Verification mechanisms are visible separately.
- [ ] Consensus is visible.
- [ ] Competency state is explicit.
- [ ] Attestation can be inspected.
- [ ] Public verification path is visible.

### Integrity

- [ ] No frontend business logic duplicates backend rules.
- [ ] No opaque competency score replaces the verification model.
- [ ] AI interpretation is visibly distinct from evidence.
- [ ] Human adjudication is visible when applicable.
- [ ] Provenance remains inspectable.
- [ ] Synthetic data is clearly identified.

### Technical

- [ ] Existing tests remain passing.
- [ ] Typecheck remains passing.
- [ ] Frontend does not modify the frozen core without an explicit architecture decision.
- [ ] No unnecessary new backend abstractions are introduced.
- [ ] Demo works from a clean environment according to the repository setup instructions.

---

# 30. Final implementation principle

> **The frontend should make the architecture legible. It should not become a second architecture.**

The strongest implementation is therefore not the one with the most screens or effects.

It is the one where an evaluator can follow:

```text
Work
→ Evidence
→ Verification
→ Consensus
→ Demonstrated Competency
→ Attestation
→ Public Proof
```

and understand why each step exists.

---

## Related documents

- `docs/product/PITCH_ARCHITECTURE.md`
- `docs/product/USER_JOURNEYS.md`
- `docs/architecture/CONSENSUS_CORE.md`
- `docs/architecture/GOVERNANCE_COMPLIANCE_LAYER.md`
- `docs/evaluation/01_PRODUCT.md`
- `docs/evaluation/02_ARCHITECTURE.md`
- `docs/evaluation/03_VERIFICATION_AND_GOVERNANCE.md`
- `docs/evaluation/04_DEMO_AND_PROOF.md`
- `docs/PROJECT_STATUS.md`
- `docs/PROJECT_HANDOFF.md`
