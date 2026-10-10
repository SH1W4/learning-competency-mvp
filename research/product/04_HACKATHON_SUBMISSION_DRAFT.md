# LASTRO MVP: Hackathon Submission Draft (Devpost / Dorahacks)

*This document contains the finalized copy to copy-paste into the hackathon submission platform.*

---

## Project Name
LASTRO

## Elevator Pitch
Infrastructure to transform learning experiences into verifiable evidence of competency, independently reviewed by a multi-mechanic consensus engine and cryptographically anchored on Solana.

## 💡 Inspiration
The credentialing system is broken. In an era where AI can generate essays and solve tests in seconds, traditional digital certificates have lost their signal-to-noise ratio. Employers and institutions can no longer trust a generic PDF certificate. We realized that to restore trust in human capability, we needed to move away from "Trust me, they passed" to "Here is the immutable cryptographic proof of their demonstrated evidence."

## ⚙️ What it does
LASTRO is an enterprise-grade platform for Verifiable Capabilities. Instead of just issuing a certificate, LASTRO processes submitted learning evidence through our proprietary **M4 Consensus Engine**. 
1. **Evidence Ingestion:** Collects multi-modal evidence.
2. **Deterministic Checks:** Validates integrity and metadata.
3. **AI Interpretation:** Uses LLMs to gauge alignment with learning criteria.
4. **Strict Consensus:** Only allows state advancement if AI and Deterministic checks agree. If they conflict, it fails-closed and triggers Human Adjudication.
5. **Solana Anchoring:** Once demonstrated, the final state transition and its hash are anchored on the Solana blockchain (Devnet), creating an immutable, publicly verifiable credential that the learner owns forever.

## 🛠️ How we built it
We architected LASTRO with a strict separation of concerns, heavily prioritizing security and verifiable state:
- **Backend (M4 Engine):** Built in TypeScript, handling the complex pipeline of semantic extraction, deterministic validation, and AI interpretation. It acts as the ultimate authority.
- **Blockchain (Solana):** We integrated `@solana/web3.js` to anchor competency handoffs to the Devnet, ensuring high-throughput, low-cost immutability.
- **Frontend (Next.js):** A highly polished, read-only UI built with Next.js App Router, TailwindCSS, and modern Web Design principles. It acts strictly as a projection of the Canonical Backend.
- **Security:** We implemented a "Zero Trust" proxy architecture where the frontend is mathematically incapable of mutating domain state or spoofing attestations.

## ⚠️ Challenges we ran into
Our biggest challenge was resolving the "AI Hallucination" problem. If we relied purely on LLMs to grade competencies, a hallucination could result in an invalid credential being minted on-chain. 
We solved this by engineering the **Consensus Engine**. The AI is demoted to just a "signal provider". Its output must align perfectly with deterministic checks (like metadata and semantic boundaries) before the Consensus Engine allows an automatic state transition. If there is a mismatch, the system safely triggers a `CONFLICT` status.

## 🏆 Accomplishments that we're proud of
- Achieving a **79-test passing E2E suite** that validates the entire pipeline from evidence ingestion to Solana anchoring during the short timeframe of a hackathon.
- Successfully extracting a pure, read-only UI layer that fails-closed, preventing any frontend-side credential spoofing.
- Bridging the gap between EdTech and Web3 in a way that provides immediate, real-world utility without requiring the end-user to understand cryptography.

## 📚 What we learned
We learned that the true value of blockchain in education isn't in tokenizing students, but in acting as an immutable notary for human capability. We also learned how to architect strict domain boundaries to keep Web3 integration secure and decoupled from volatile UI logic.

## 🚀 What's next for LASTRO
- **Mainnet Launch:** Migrating our Solana integration from Devnet to Mainnet-Beta.
- **Institutional Pilots:** Onboarding our first B2B educational partners to issue real-world micro-credentials.
- **Zero-Knowledge Proofs:** Implementing ZK-proofs so learners can prove they have a competency without revealing the underlying sensitive evidence.
