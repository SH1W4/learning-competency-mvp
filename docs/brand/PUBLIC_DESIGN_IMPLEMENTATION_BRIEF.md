# Public Design Implementation Brief

## Purpose

The interface should make the LASTRO MVP understandable and inspectable without implying capabilities that have not been demonstrated. Visual design must support the product contract, evidence flow, and explicit limitations.

## Design principles

- **Evidence before claims:** distinguish source evidence, interpretation, checks, consensus, bounded state, and attestation.
- **No hidden authority:** AI interpretation is a signal, not the final decision-maker.
- **Visible uncertainty:** agreement, insufficient evidence, and conflict must remain distinct outcomes.
- **Human adjudication as exception:** show it as a conflict-resolution path, not the normal pipeline.
- **Traceable states:** labels and status indicators must map to documented runtime states.
- **Synthetic-data clarity:** identify synthetic scenarios so they cannot be mistaken for customer deployments.
- **Responsive accessibility:** preserve readable typography, contrast, focus, and usable controls across viewport sizes.
- **Claim discipline:** do not imply production readiness, customer traction, regulatory certification, or full end-to-end integration without corresponding evidence.

## Visual direction

- Minimal, high-contrast interface with restrained use of color.
- Use the established LASTRO visual system and its semantic colors consistently.
- Reserve proof-related emphasis for states that are explicitly supported by evidence.
- Prefer clear hierarchy and legible status text over decorative complexity.
- Keep the evidence and verification path understandable at each stage.

## Implementation boundary

The interface presents canonical results; it must not independently invent or recalculate competency states. Any design change that affects workflow semantics must be reflected in the product contract, implementation, and tests before being presented as implemented.

## Review checklist

- Does each visible status correspond to a documented state?
- Can a reviewer distinguish synthetic data from real-world evidence?
- Are limitations and unresolved integration steps stated accurately?
- Are error, conflict, and insufficient-evidence paths visible?
- Does the interface work on mobile and desktop without hiding critical evidence?
- Are all claims supported by current implementation or reproducible proof?
