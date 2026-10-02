# 06. Camada de Claim Verificável — PR #7

**Data:** 2026-10-02  
**Status:** MERGED

## Contexto

Após o fechamento técnico do MVP, foi adicionada uma camada experimental e aditiva para tornar explícita a declaração derivada do estado revisado, sem alterar o fluxo M1 → M2 → M3.

## Decisão e Implementação

1. **VerifiableClaim:** criada em src/provenance/claim.ts uma representação explícita e limitada do estado revisado.
2. **Suporte do claim:** a declaração é vinculada ao ReviewedStateRecord, à competência, ao estado, aos critérios, às evidências e à revisão humana.
3. **Verificação estrutural:** verifyClaimSupport() valida identidade do claim, escopo, confirmação do revisor, conjunto completo de evidências e suporte de todos os critérios.
4. **Testes:** adicionados testes para derivação, suporte válido, evidência inexistente, omissão/duplicação de critérios, inconsistência de escopo, alteração da confirmação do revisor e alteração do identificador do claim.
5. **Preservação do MVP:** a camada não altera a state machine, o contrato da IA, o ReviewedStateRecord, o fluxo M2 → M3 ou o payload de atestação Solana.
6. **Limite semântico:** a verificação demonstra consistência e rastreabilidade estrutural; não demonstra a verdade da competência, a correção da evidência ou a validade universal do estado.
7. **PR #7:** feat/verifiable-claim-layer foi validado pelo CI e integrado à main via squash merge.

## Evidência de Integração

- **PR:** #7 — feat: add bounded verifiable claim layer
- **Head validado antes do merge:** 717dec64b765a88617b9efc0d7978b710fff83c8
- **Merge commit:** 07527a148d3d7f39b252dd937a72eeb93292c374
- **CI:** testes, typecheck e dependency audit aprovados antes do merge.

## Consequências

- O MVP passa a possuir uma representação explícita de **claim limitado e suportado**, sem confundir claim com evidência, revisão, atestação ou verdade.
- A nova camada permanece isolada e não reabre o escopo do vertical slice.
- O trabalho cria uma ponte conceitual entre o ReviewedStateRecord existente e futuras investigações sobre claims verificáveis, mantendo o princípio de que **integridade ≠ correção** e **atestação ≠ verdade**.

## Limitações

A implementação atual é deliberadamente estrutural. Não introduz autoridade externa adicional, não altera a semântica da atestação on-chain e não constitui um protocolo geral de claims verificáveis.