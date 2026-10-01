# Diário de Bordo - Registro 02: Setup e Arquitetura M3 (Solana)

**Data:** 01 de Outubro de 2026
**Fase:** Implementação Inicial do M3

## O que foi realizado
- Instalação e travamento de versões das bibliotecas essenciais de Web3 (`@solana/web3.js`, `bs58`, `dotenv`).
- Implementação da prova de conceito do M3 (`src/solana/attest.ts` e `src/solana/demo.ts`).

## Decisões Técnicas e Melhores Práticas Adotadas
Para garantir a maturidade do repositório desde o primeiro dia, as seguintes práticas foram estabelecidas:

1. **Gestão de Segredos (SecOps):** A chave privada efêmera da carteira é gerada e isolada localmente no arquivo `.env`. Verificamos a integridade do `.gitignore` para garantir risco zero de vazamento de credenciais no GitHub.
2. **Design Pattern de Blockchain (Off-chain Storage):** O contrato de atestação utiliza o *SPL Memo Program* na Solana. Em vez de enviar o JSON inteiro (o que seria caro e comprometeria dados privados), apenas metadados mínimos e a âncora criptográfica (`record_hash`) são publicados. Isso alcança o nível N4 de verificação sem onerar a rede.
3. **Resiliência (Error Handling):** O motor prevê falhas de *Rate Limit* nativas da Devnet e aplica tratamento de exceção elegante, indicando fluxo de fallback (faucet manual) sem estourar *stack traces* desnecessários.

## Próximos Passos
- Executar a atestação ponta a ponta gerando o primeiro registro na Devnet Explorer.
