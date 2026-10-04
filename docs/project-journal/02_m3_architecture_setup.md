# Project Journal — Entry 02: M3 Architecture Setup

**Date:** October 1, 2026  
**Phase:** Initial M3 implementation

## What was completed

- The Solana integration layer was established.
- The first version of attestation for the state produced by M2 was implemented.
- The architecture adopted a clear boundary between off-chain data and the minimum reference required on-chain.

## Decisions

1. Secrets remain local and must not be published.
2. Full evidence content is not sent to the chain.
3. The attestation references the integrity of the reviewed state.
4. Devnet failure handling must allow controlled repetition of the demonstration.

## Next step

Execute and validate the end-to-end Devnet attestation.
