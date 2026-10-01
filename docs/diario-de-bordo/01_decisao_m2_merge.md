# Diário de Bordo - Registro 01: Merge M2 e Decisões

**Data:** 01 de Outubro de 2026
**Fase:** Finalização do M2 e Início do M3

## O que aconteceu
- Realizado o merge da branch `feat/m2-evidence-ai-review` (JP Carvalho) para a branch `main`.
- O código do M2 trouxe toda a fundação em Node/TypeScript para:
  - Ingestão e normalização de evidências.
  - Extração e validação do contrato da IA (com `zod`).
  - Fluxo de revisão humana.
  - Testes (39/39 passando).

## Decisões Arquiteturais Tomadas
Respondemos de forma assertiva às perguntas deixadas na implementação do M2 para focar na velocidade do Hackathon:

1. **Provedor de IA:** Utilizaremos um LLM real (Anthropic/OpenAI) para o *wow factor* da demonstração. O motor heurístico fica para rodar testes locais rápido.
2. **Persistência:** Foco pragmático no uso de arquivos JSON locais (`out/reviewed-state.json`) como nossa camada de estado. Sem tempo perdido com setup de bancos de dados.
3. **Handoff M3:** O payload gerado pelo M2 foi validado. Somente hashes (off-chain storage pattern) e metadados de estado irão para a rede Solana.
4. **Resolução de Conflitos de Sinais:** Se houver múltiplas evidências para a mesma competência, validamos a regra de aceitar o sinal de "maior suporte" após revisão.

## Próximos Passos
- Avançar para o desenvolvimento da camada **M3** (Solana/Attestation).
- Criar a mecânica de transação on-chain recebendo o handoff do M2.
