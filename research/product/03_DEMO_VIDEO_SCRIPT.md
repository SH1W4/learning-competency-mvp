# LASTRO MVP: 3-Minute Demo Video Script & Storyboard

**Objective:** Pitch the problem, explain the Consensus Core, showcase the live production app (`lastro-learn.vercel.app`), and prove immutable Solana Devnet anchoring.  
**Target Length:** 3:00 (180 seconds)  
**Tone:** Confident, senior engineering maturity, zero hype, epistemically disciplined.  

---

## 🎬 Pre-Recording Setup Checklist (Before hitting record)
- [ ] **Tab 1 — Live App:** Open `https://lastro-learn.vercel.app` at least 2 minutes prior (to ensure the Render backend instance is warm and responding in <1s).
- [ ] **Tab 2 — Solana Explorer:** Open `https://explorer.solana.com/tx/22wJ3t6LDdFMWK3rs4yK1S6GR6e7GEmLPeSjagBUwZCUXYKiuG5LS6gDP9ZSr6TkPCkn5hf3fyNVKH3xA7amDZdX?cluster=devnet`.
- [ ] **Tab 3 — GitHub Repo:** Open `https://github.com/SH1W4/learning-competency-mvp` displaying the verified CI badges and README.
- [ ] **Resolution:** 1080p (1920x1080), browser zoom at 100% or 110% for crisp typography.

---

## 0:00 - 0:35 | The Problem & The Insight (The Hook)
**Visual:**
- Start with a quick slide or headline: *"Certificates prove attendance. AI can fake assignments. How do we prove demonstrated capability?"*
- Transition to the terminal showing a quick test run (`npm test` — 80 tests passing in 3s) or an architectural diagram showing the pipeline:  
  `Work Evidence → Independent Verifiers + AI Interpretation → Consensus Core → Solana Anchor`.

**Voiceover:**
> *"The internet is flooded with digital certificates, badges, and AI-generated resumes, but they share a fatal flaw: they lack verifiable proof of capability. As generative AI makes it trivial to fake assignments, traditional credentials lose their trust. 
> 
> LASTRO does not issue another certificate. We built the infrastructure that connects observable work evidence to strict competency criteria, runs independent verification, and anchors the resulting state immutably on Solana."*

---

## 0:35 - 1:15 | The Engine: AI-Assisted, Verification-Led
**Visual:**
- Show the architectural diagram highlighting the **Consensus Core** separation:
  - Branch A: **Semantic Interpretation** (AI extracts signals, but does NOT hold final authority).
  - Branch B: **Deterministic Checks** (Evidence integrity, required activities, objective criteria).
  - Convergence: **Consensus Core** (`AGREEMENT` → Auto-advance; `CONFLICT` → Human Adjudication exception).

**Voiceover:**
> *"Here is our core insight: no single signal should decide capability. AI interprets and extracts signals, but it is not the judge. Deterministic rules verify artifact integrity independently. 
> 
> Our Consensus Core combines both. If mechanisms agree, the state advances automatically to Demonstrated. If there is insufficient evidence or conflicting signals, the system fails-closed and routes to human adjudication. We eliminate AI hallucination from capability decisions."*

---

## 1:15 - 2:15 | Live Platform Walkthrough (Production Next.js App)
**Visual:**
- Switch to Tab 1: `https://lastro-learn.vercel.app`.
- **Action 1:** Point cursor to the top header: `"From evidence to proof."` and the badge `"PROJECTION · READ-ONLY"`.
- **Action 2:** Show the synthetic scenario banner: *"Synthetic Scenario — Ana (Data Analyst)"*.
- **Action 3:** Highlight the status cards:
  - **Competency State:** `DEMONSTRATED`
  - **Consensus Result:** `AGREEMENT` (all 4 criteria C1, C2, C3, C4 converged).
- **Action 4:** Scroll smoothly through the criteria cards:
  - C1: Problem formulation (`PASS`).
  - C2: Data preparation & reproducible notebook (`PASS`).
  - C3: Evidence & analytical findings (`PASS`).
  - C4: Communication & limitations synthesis (`PASS`).
- **Action 5:** Point out that this frontend has zero business logic and does not recalculate state: it is a read-only projection consuming our hosted backend on Render.

**Voiceover:**
> *"This is LASTRO running live in production at lastro-learn.vercel.app. We are observing the canonical synthetic scenario of Ana, an aspiring data analyst. 
> 
> Notice the 'PROJECTION · READ-ONLY' badge: our frontend is architecturally incapable of spoofing or recalculating domain state. It connects to our canonical runtime backend, reflecting real evidence artifacts: briefing, cleaning notebook, analysis result, and communication synthesis. 
> 
> All independent mechanisms have passed across all four criteria, producing an uncontested AGREEMENT outcome."*

---

## 2:15 - 2:45 | On-Chain Proof on Solana Devnet
**Visual:**
- Switch to Tab 2: Solana Explorer (`cluster=devnet`).
- **Action 1:** Highlight the transaction status: `Success`.
- **Action 2:** Scroll to the **Memo Program** instruction showing the `m3.attestation.v2` JSON payload:
  - `record_hash`: `d695f62bd0c26d97cd323142e7cb9c2fffa8c4a54782e650003d3c91bdbb4065`
  - `competency`: `comp:data-analysis-reproducible`
  - `state`: `DEMONSTRATED`
  - `subject_ref`: privacy-preserving pseudonymized subject reference.
- **Action 3:** Briefly show that sensitive data stayed off-chain, while the cryptographic proof is permanent.

**Voiceover:**
> *"Once consensus is reached, the resulting state hash is anchored on Solana Devnet via our Memo attestation protocol. 
> 
> Sensitive data and raw evidence stay off-chain for privacy, while the cryptographic hash and competency state are anchored forever. Anyone can independently verify this proof on-chain without relying on our servers or databases. The capability proof belongs to the learner permanently."*

---

## 2:45 - 3:00 | Conclusion & Vision (The Outro)
**Visual:**
- Switch to Tab 3 (GitHub repository / LASTRO logo).
- Text on screen:  
  **LASTRO — From work evidence to verifiable capability.**  
  *Live Demo:* lastro-learn.vercel.app  
  *Code & Tests:* github.com/SH1W4/learning-competency-mvp  

**Voiceover:**
> *"With 80 passing tests, strict epistemic discipline, a production Next.js frontend, and real Solana Devnet anchoring, LASTRO proves that human capability can be verified with cryptographic integrity. 
> 
> Thank you."*

