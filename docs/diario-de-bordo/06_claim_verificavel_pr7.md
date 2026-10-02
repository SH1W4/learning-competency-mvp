# 06. Claim Verificável — PR #7

**Data:** 2026-10-02  
**Status:** MERGED

## Contexto

Após o fechamento técnico do MVP, foi introduzida uma camada experimental e aditiva para representar de forma explícita uma declaração limitada derivada de um estado previamente revisado.

## Decisão

- A nova camada representa uma declaração vinculada à competência, ao estado, às evidências e à revisão que originou esse estado.
- A declaração possui escopo explícito e permanece vinculada ao registro revisado que lhe dá suporte.
- A validação da declaração verifica consistência e completude das relações declaradas.
- A mudança é aditiva e não altera o fluxo principal M1 → M2 → M3, a máquina de estados, o contrato de IA ou a atestação existente.
- O trabalho foi mantido deliberadamente pequeno para preservar o freeze técnico do MVP.

## Evidência de Integração

- **PR:** #7 — feat: add bounded verifiable claim layer
- **Resultado:** integrado à main via squash merge.
- **CI:** validação automatizada concluída com sucesso antes do merge.

## Consequências

O MVP passa a possuir uma representação explícita de **claim limitado e suportado**, mantendo separadas as noções de evidência, revisão, estado, atestação e verdade.

A camada também estabelece uma base para pesquisas futuras sobre claims verificáveis, sem transformar essa implementação em um protocolo geral.

## Limitações

Esta camada estabelece apenas consistência e rastreabilidade estrutural. Ela não demonstra, por si só, a verdade da competência, a correção da evidência, a validade universal do estado ou qualquer garantia adicional de mérito.

**Princípio preservado:** integridade ≠ correção; atestação ≠ verdade.