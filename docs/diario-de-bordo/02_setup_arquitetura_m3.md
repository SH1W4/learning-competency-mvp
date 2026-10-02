# Diário de Bordo — Registro 02: Setup e Arquitetura M3

**Data:** 01 de Outubro de 2026
**Fase:** Implementação inicial do M3

## O que foi realizado

- A camada de integração com Solana foi estabelecida.
- Foi implementada a primeira versão da atestação do estado produzido pelo M2.
- A arquitetura adotou uma fronteira clara entre dados off-chain e a referência mínima necessária on-chain.

## Decisões

1. Segredos permanecem locais e não devem ser publicados.
2. O conteúdo integral das evidências não é enviado à cadeia.
3. A atestação referencia a integridade do estado revisado.
4. O tratamento de falhas da Devnet deve permitir repetição controlada da demonstração.

## Próximo passo

Executar e validar a atestação ponta a ponta na Devnet.

