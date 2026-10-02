# Diário de Bordo - Registro 05: Hardening do Handoff M2 → M3

**Data:** 01 de Outubro de 2026
**Fase:** Feature freeze — validação cruzada do handoff M2 → M3
**Autor:** JP Carvalho (owner M2), a pedido de JX (owner M3)

## Contexto

Antes de congelar o core, o JX pediu a validação cruzada do handoff M2 → M3 em 5 pontos. Resultado da revisão:

| Ponto | Resultado |
|---|---|
| 1. `ReviewedStateRecord` representa o estado do M2 | ✅ OK |
| 2. `record_hash` derivado corretamente e íntegro | ⚠️ Gerado corretamente no M2, mas o `verify.ts` não recalculava o hash a partir do `reviewed-state.json` |
| 3. Nenhuma informação relevante do M2 se perde | ✅ OK — o registro completo fica off-chain e o `record_hash` amarra todos os campos |
| 4. A atestação ancora o estado do M2 | ⚠️ Ancora, mas a verificação não conferia **quem** assinou a transação |
| 5. Testes cobrem a fronteira | ⚠️ Faltavam casos de JSON adulterado e de assinante errado |

Também foi identificado que o `subject` era publicado em texto aberto no memo on-chain.

## O que foi endurecido (sem mudar o escopo do MVP)

1. **Integridade do `reviewed-state.json` na verificação.** `verifyAttestation()` aceita `{ record }` e chama `verifyHandoff()` antes de consultar a rede. Se alguém editar o JSON e mantiver o hash antigo, a verificação falha. O CLI (`npm run m3:verify`) passa o `out/reviewed-state.json` automaticamente.
2. **Validação do assinante.** `verifyAttestation()` aceita `{ expectedSigner }` e exige que a transação tenha sido assinada pela carteira emissora. O CLI usa `ATTESTER_PUBKEY` do `.env` (ou deriva da `SOLANA_PRIVATE_KEY`).
3. **Subject fora do payload on-chain.** O memo passa a carregar `subject_ref = sha256(subject | record_hash)` no lugar do `subject`. Só quem tem o `reviewed-state.json` consegue recalcular e conferir. Payload versionado como `m3.attestation.v2`, com o campo `attester`.

Além disso, `createAttestationOnChain()` recusa atestar um handoff cujo `record_hash` não confere com o conteúdo.

## Compatibilidade

- `verifyAttestation(recordHash, txSignature)` continua funcionando sem opções (payloads v1 seguem verificáveis pelo hash).
- `npm run m3:attest` e `npm run m3:verify` mantêm a mesma forma de uso.

## Testes

`tests/m3.test.ts`: 13 testes (eram 5). Comportamento esperado explícito para os três casos:

- JSON íntegro + emissor correto → verificado, com `checks` = hash on-chain, integridade, assinante e subject_ref;
- JSON adulterado com o hash antigo → **falha** (antes passava), sem nem consultar a rede;
- `record_hash` diferente do JSON → falha;
- mesmo hash publicado por outra carteira → **falha**;
- `subject_ref` de outra pessoa → falha;
- payload on-chain sem `subject` em claro;
- atestação recusada para handoff adulterado.

Suíte completa: **52/52 passando**.

## Estado final do handoff M2 → M3

`M2 (ReviewedStateRecord + record_hash) → verifyHandoff → M3 attest (payload v2, sem PII) → Solana → verify (hash + integridade do JSON + assinante + subject_ref)`

## Próximo passo

Revisão do conjunto pelo JX (owner M3).
