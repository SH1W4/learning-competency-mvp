# LASTRO — Product Specifications

This directory contains product requirements, user journeys, MVP boundary contracts, and frontend specifications for LASTRO.

---

## Product Thesis

> **We turn changing work into evidence-based competency intelligence, requalification pathways, and verifiable competency states.**

The MVP proves a narrower vertical slice before expanding toward organizational intelligence:
```
Observable Work → Evidence → Independent Verification → Consensus → Competency State → Attestation → Verification
```

---

## Product Documents

| Document | Purpose & Scope |
|---|---|
| [USE_CASE.md](USE_CASE.md) | Concrete FinTech competency scenario (Ana), 4 learning activities, 4 evidence types, and criteria mapping. |
| [USER_JOURNEYS.md](USER_JOURNEYS.md) | Core user journeys: Organization (defining criteria), Learner (producing evidence), and Evaluator/Auditor (verifying state). |
| [MVP_CONTRACT.md](MVP_CONTRACT.md) | Formal MVP scope boundary: what is strictly implemented vs. what remains out of scope. |
| [FRONTEND_PRODUCT_SPEC.md](FRONTEND_PRODUCT_SPEC.md) | Next.js read-only projection specification: components, state rendering, proxy boundary, and theme tokens. |
| [PITCH_ARCHITECTURE.md](PITCH_ARCHITECTURE.md) | Narrative architecture connecting product problem, technical insight, demo flow, and business hypotheses. |

---

## Live Product Deployment (Milestone M4)

- **Production Frontend:** [https://lastro-learn.vercel.app](https://lastro-learn.vercel.app) (Next.js read-only projection)
- **Hosted Runtime API:** [https://lastro-m4-runtime.onrender.com](https://lastro-m4-runtime.onrender.com/health) (Render web service)
- **Solana Devnet Anchor:** [Tx 22wJ3t6...](https://explorer.solana.com/tx/22wJ3t6LDdFMWK3rs4yK1S6GR6e7GEmLPeSjagBUwZCUXYKiuG5LS6gDP9ZSr6TkPCkn5hf3fyNVKH3xA7amDZdX?cluster=devnet)
