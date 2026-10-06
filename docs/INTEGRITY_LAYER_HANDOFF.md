# Integrity Layer Handoff — Attestation & Verification

**Date:** 2026-10-06
**From:** JX (Integrity Layer Owner)
**To:** Interface Owner (JP Fernandes)
**Status:** Integrity Layer DONE — Ready for Interface Integration

---

## Executive Summary

The integrity layer (M3) — which includes Solana attestation and verification — is **100% complete and validated**. A pre-validated Devnet transaction is available as a fallback fixture for demo resilience.

**Live proof on Solana Devnet:**
- **Transaction:** `4yPQymfS4phDp3fWx7rrVCmajXotwZXcE2gCLkDas5K5bdv65roJT7TKRzgcbKSGTd3qK3GiEq5zGxdbRrf3MowE`
- **Explorer:** https://explorer.solana.com/tx/4yPQymfS4phDp3fWx7rrVCmajXotwZXcE2gCLkDas5K5bdv65roJT7TKRzgcbKSGTd3qK3GiEq5zGxdbRrf3MowE?cluster=devnet
- **Fallback fixture:** `fixtures/solana/devnet-fallback.json`

---

## What Was Delivered

### 1. Attestation Infrastructure (`src/solana/attest.ts`)

**Main function:** `createAttestationOnChain(record, privateKey, networkUrl)`

**Capabilities:**
- Registers attestation via SPL Memo Program (off-chain storage pattern)
- Validates handoff integrity via `verifyHandoff()`
- Generates minimal on-chain payload (no personal data in clear text)
- Uses `subject_ref` pseudonym for GDPR privacy
- Rejects adulterated handoff (inconsistent record_hash)
- Requires `DEMONSTRATED` state with valid decision

**On-chain payload (m3.attestation.v2):**
```json
{
  "mvp": "learning-competency",
  "v": "m3.attestation.v2",
  "subject_ref": "<pseudonym hash>",
  "competency": "comp:data-analysis-reproducible",
  "state": "DEMONSTRATED",
  "record_hash": "<anchor hash>",
  "attester": "<issuer public key>",
  "timestamp": "<ISO timestamp>"
}
```

### 2. Verification Infrastructure (`src/solana/verify.ts`)

**Main function:** `verifyAttestation(recordHash, txSignature, networkUrl, options)`

**Capabilities:**
- Fetches transaction from Solana (parsed transaction)
- Confirms that `record_hash` is in the on-chain payload
- Validates `reviewed-state.json` integrity (recalculates hash)
- Validates transaction signer (ATTESTER_PUBKEY)
- Validates `subject_ref` pseudonym
- Returns structured result with detailed checks

**Verification checks:**
- `hash_on_chain`: hash found in transaction
- `record_integrity`: JSON hash matches content
- `signer`: transaction signed by expected issuer
- `subject_ref`: pseudonym reference matches
- `payload_binding`: payload bound to reviewed state

### 3. Demo CLI (`src/solana/demo.ts`)

**Command:** `npm run m3:attest`

**Flow:**
1. Reads configuration from `.env` (SOLANA_PRIVATE_KEY)
2. Checks wallet balance (auto-airdrop if < 0.01 SOL)
3. Reads `out/reviewed-state.json` (Consensus Core handoff)
4. Calls `createAttestationOnChain()`
5. Returns transaction signature
6. Displays link to Solana Explorer

### 4. Verification CLI (`src/solana/verify.ts`)

**Command:** `npm run m3:verify <tx_signature> [record_hash]`

**Flow:**
1. Reads `out/reviewed-state.json` (if record_hash not provided)
2. Reads ATTESTER_PUBKEY from `.env` (or derives from SOLANA_PRIVATE_KEY)
3. Calls `verifyAttestation()`
4. Displays check results
5. Shows complete on-chain payload

### 5. Fallback Fixture

**File:** `fixtures/solana/devnet-fallback.json`

Contains pre-validated transaction details for demo resilience:
- Transaction signature and record hash
- Verification command
- All verification checks confirmed
- Scenario metadata

---

## Technical Artifacts

### Code Structure

```
src/solana/
├── attest.ts      # createAttestationOnChain(), buildAttestationPayload(), subjectRef()
├── verify.ts      # verifyAttestation(), extractSigners(), CLI runner
├── demo.ts        # npm run m3:attest
└── integration.ts # npm run test:solana:devnet
```

### Data Artifacts

**out/reviewed-state.json** (Consensus Core handoff)
- Contains `record_hash` (SHA-256 of complete JSON)
- Final state: `DEMONSTRATED`
- State transition history
- Criteria C1–C4 with associated evidence
- Adjudication metadata (if applicable)

**On-chain payload** (example from current transaction)
- Version: `m3.attestation.v2`
- Competency: `comp:data-analysis-reproducible`
- State: `DEMONSTRATED`
- Record hash: `4fff6db8838e1c40528cabbc47deeef6a34a0c60085a0f4542282996c98f27d6`
- Attester: `67QmMGjZbCrrmWibYx8JCqK7TVH7qC7WiSaEqNRifwEi`

### Configuration

**.env.example** (integrity layer parameters)
```
SOLANA_PRIVATE_KEY=<base58_key_issuer_wallet>
ATTESTER_PUBKEY=<public_key_issuer_wallet>
```

---

## Integration Points for Interface

### 1. LASTRO Flow (vertical slice)

The interface should materialize the following flow:

```
Evidence Upload
   ↓
Consensus Core (M2)
   ↓
DEMONSTRATED state
   ↓
Attestation (Integrity Layer) ← INTEGRATION POINT
   ↓
Verification (Integrity Layer) ← INTEGRATION POINT
```

### 2. Integration with Attestation

**For the interface to register an attestation:**

**Required input:**
- `ReviewedStateRecord` (Consensus Core output)
- `SOLANA_PRIVATE_KEY` (configuration)
- Network URL (default: devnet)

**Function output:**
- `tx_signature` (string)

**Transaction status:**
- Success → Display link to Solana Explorer
- Error → Display friendly message (ex: insufficient balance, invalid handoff)

**Recommended UX:**
1. "Attest Capability" button (available when state = DEMONSTRATED)
2. Show spinner during transaction submission
3. Display confirmation with Explorer link
4. Save `tx_signature` in local record

### 3. Integration with Verification

**For the interface to verify an attestation:**

**Required input:**
- `tx_signature` (from local record)
- `record_hash` (from reviewed-state.json)
- `ATTESTER_PUBKEY` (configuration)

**Function output:**
- `VerifyResult` with:
  - `verified`: boolean
  - `payload`: on-chain object
  - `checks`: object with status of each check
  - `signers`: array of signers

**Recommended UX:**
1. "Verify Attestation" button (when tx_signature exists)
2. Show spinner during network query
3. Display visual result:
   - ✅ Green: all checks passed
   - ⚠️ Yellow: check(s) failed
   - Display on-chain payload in readable format
4. Link to Solana Explorer

### 4. Fallback Usage

**For demo resilience:**

When live attestation fails (Devnet unavailable):
1. Load fallback fixture: `fixtures/solana/devnet-fallback.json`
2. Extract `tx_signature` and `record_hash`
3. Run verification command from fixture
4. Display Explorer link from fixture

**Fallback verification command:**
```bash
npm run m3:verify 4yPQymfS4phDp3fWx7rrVCmajXotwZXcE2gCLkDas5K5bdv65roJT7TKRzgcbKSGTd3qK3GiEq5zGxdbRrf3MowE 4fff6db8838e1c40528cabbc47deeef6a34a0c60085a0f4542282996c98f27d6
```

### 5. Wallet State

**Useful information for the interface:**
- Current wallet balance (SOL)
- Wallet public key
- Network connection status

**Available functions:**
```typescript
// Default connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Balance
const balance = await connection.getBalance(publicKey);

// Airdrop (devnet only)
const signature = await connection.requestAirdrop(publicKey, amount);
```

---

## Limitations & Considerations

### 1. Environment

- **Current:** Devnet (testnet)
- **Mainnet:** Not implemented (future version)
- **Airdrop:** Only works on devnet; may fail by IP rate limits

### 2. Private Keys

- **Security:** NEVER commit `.env` with real keys
- **Interface:** Should allow secure configuration (environment variables, keyring)
- **Alternative:** Consider wallet adapter (Phantom, Solflare) for production

### 3. Transaction Costs

- **Devnet:** Free (via airdrop)
- **Mainnet:** Requires real SOL
- **Estimate:** Memo Program transaction ≈ 0.000005 SOL (negligible)

### 4. Privacy

- **Personal data:** NEVER goes on-chain
- **Subject:** Represented by `subject_ref` (pseudonym hash)
- **Evidence:** Stored off-chain (local JSON / future BD)

### 5. Scalability

- **Memo payload:** Limited (~1KB)
- **Current design:** Minimal payload (fits)
- **Future:** Consider custom programs for larger payloads

---

## Dependencies

### Internal (resolved)

- ✅ `@solana/web3.js` v1.99.0
- ✅ `bs58` v6.0.0 (Base58 encoding)
- ✅ `src/provenance/trace.ts` (verifyHandoff)
- ✅ `src/util.ts` (sha256)

### External (for interface to consider)

- **Wallet Adapter (optional):** For integration with user wallets
- **IPFS / Arweave (optional):** For decentralized off-chain storage
- **Indexer (optional):** For more efficient queries

---

## Useful Commands

### Development

```bash
# Install dependencies
npm install

# Run full demo (Consensus Core → Integrity Layer)
npm run demo                    # Generates reviewed-state.json
npm run m3:attest               # Registers attestation

# Verify attestation
npm run m3:verify <tx_signature> [record_hash]

# Run tests
npm test                        # 76 tests (including integrity layer)
npm run typecheck               # TypeScript type checking

# Solana Devnet integration test
npm run test:solana:devnet
```

### Using Fallback

```bash
# Verify pre-validated transaction
npm run m3:verify 4yPQymfS4phDp3fWx7rrVCmajXotwZXcE2gCLkDas5K5bdv65roJT7TKRzgcbKSGTd3qK3GiEq5zGxdbRrf3MowE 4fff6db8838e1c40528cabbc47deeef6a34a0c60085a0f4542282996c98f27d6
```

---

## Related Documentation

### Architecture

- `docs/architecture/ATTESTATION_MODEL.md` — Attestation model
- `docs/architecture/CONSENSUS_CORE.md` — Consensus Core specification
- `docs/architecture/VERIFICATION_ADAPTER_BOUNDARY.md` — Verification adapter boundary
- `docs/architecture/TECHNICAL_ARCHITECTURE.md` — Technical architecture

### Demo & Proof

- `docs/evaluation/04_DEMO_AND_PROOF.md` — Demo and technical proof
- `fixtures/solana/devnet-fallback.json` — Pre-validated fallback fixture

### Project Status

- `docs/PROJECT_HANDOFF.md` — Overall project handoff
- `docs/PROJECT_STATUS.md` — Project status and milestones

---

## FAQ

**Q: Does the interface need to maintain `reviewed-state.json` locally?**  
A: For the current MVP, yes. The `record_hash` in the on-chain payload references the local JSON. In future versions, this may evolve to structured off-chain storage (IPFS, DB, etc.).

**Q: How should the interface handle transaction failures?**  
A: Implement retry with backoff, clear error messages (ex: "Insufficient balance", "Invalid handoff"), and allow the user to try again. Use the fallback fixture for demo resilience.

**Q: Can multiple competencies be attested for the same subject?**  
A: Yes, each attestation is an independent transaction. The `subject_ref` is calculated with the `record_hash` as salt, ensuring each competency has a unique reference.

**Q: Should the interface show the complete on-chain payload?**  
A: Recommended for transparency. Display in readable format (formatted JSON) with emphasis on critical fields (state, record_hash, attester).

**Q: How to migrate from devnet to mainnet?**  
A: Change the `networkUrl` to a mainnet endpoint, use a wallet with real SOL, and remove airdrop logic. The integrity layer code is already prepared for this.

**Q: What is the relationship between Consensus Core and Integrity Layer?**  
A: Consensus Core produces the `DEMONSTRATED` state and the `ReviewedStateRecord`. The Integrity Layer takes that record and creates an on-chain attestation. They are sequential, not parallel.

---

## Next Steps

### For Interface Owner (JP Fernandes)

1. **Primary flow:**
   - Create evidence upload screen (Consensus Core)
   - Create adjudication screen (exception path)
   - Create attestation screen (Integrity Layer) with "Attest" button
   - Create verification screen (Integrity Layer) with "Verify" button

2. **Integration:**
   - Import `createAttestationOnChain` from `src/solana/attest.ts`
   - Import `verifyAttestation` from `src/solana/verify.ts`
   - Implement error handlers and loading states
   - Integrate fallback fixture for demo resilience

3. **UX:**
   - Design clear visual flow (Consensus Core → Integrity Layer)
   - Show progress at each stage
   - Display visual confirmations (checks, badges)
   - Add links to Solana Explorer

4. **Configuration:**
   - Allow secure `SOLANA_PRIVATE_KEY` configuration
   - Allow network selection (devnet/mainnet)
   - Display wallet balance

### For Integrity Layer Owner (JX)

- Available for technical integration support
- No pending technical issues in the integrity layer
- Can assist with integration testing and troubleshooting

---

## Signature

**Handoff approved:** ✅
**Integrity Layer status:** DONE
**Ready for integration:** YES
**Known blockers:** NONE

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-10-06 | Initial integrity layer handoff (adapted to LASTRO architecture) | JX |
