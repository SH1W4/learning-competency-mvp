# Diário de Bordo — Registro 01: Merge M2 e Decisões

**Data:** 01 de Outubro de 2026
**Fase:** Finalização do M2 e início do M3

## O que aconteceu

- O M2 foi integrado à branch principal.
- A base de ingestão, normalização, interpretação assistida, revisão humana e testes passou a integrar o fluxo do MVP.
- O handoff entre M2 e M3 foi preparado para preservar a rastreabilidade do estado revisado.

## Decisões

1. O MVP mantém um provedor determinístico para execução local e testes, com suporte a provedor LLM opcional.
2. A persistência do vertical slice permanece deliberadamente simples.
3. O handoff para M3 deve preservar a integridade do estado revisado sem transferir dados sensíveis desnecessários para a cadeia.
4. Conflitos entre sinais de evidência permanecem sujeitos à revisão humana.

## Próximo passo

Implementar e validar a camada M3 de atestação e verificação.

