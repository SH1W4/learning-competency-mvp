# Visão da Demonstração — Learning Competency MVP

> **Objetivo:** demonstrar o fluxo técnico do MVP, não enumerar funcionalidades.

## Fluxo

1. Uma competência é definida.
2. Uma pessoa produz evidências em uma trilha curta.
3. A evidência é processada e interpretada com apoio de IA.
4. Verificações independentes avaliam integridade e critérios objetivos.
5. O Consensus Core verifica a convergência.
6. O sistema representa o estado quando há acordo; casos conflitantes seguem para adjudicação humana.
7. O registro é atestado na Solana Devnet.
8. Uma terceira parte pode verificar a integridade do registro.

## Aha moment

O ponto central da demonstração é mostrar a passagem de um estado revisado para uma referência verificável de integridade.

A blockchain não determina o mérito da competência. Ela permite verificar a correspondência entre o registro apresentado e a referência anteriormente ancorada.

## Demonstração técnica

### 1. Interface Web Pública (M4 Live)
- **Aplicação:** [https://lastro-learn.vercel.app](https://lastro-learn.vercel.app) (Next.js read-only projection)
- **Runtime:** [https://lastro-m4-runtime.onrender.com](https://lastro-m4-runtime.onrender.com/health) (Hosted API no Render)

### 2. Fluxo Local e Testes
```bash
# Execução da demonstração canônica no terminal
npm run demo

# Demonstração da exceção de adjudicação humana em caso de conflito
npm run demo:adjudication

# Validação completa do ciclo E2E na Solana Devnet
npm run m4:e2e:devnet

# Verificação independente da atestação ancorada
npm run m3:verify 22wJ3t6LDdFMWK3rs4yK1S6GR6e7GEmLPeSjagBUwZCUXYKiuG5LS6gDP9ZSr6TkPCkn5hf3fyNVKH3xA7amDZdX d695f62bd0c26d97cd323142e7cb9c2fffa8c4a54782e650003d3c91bdbb4065
```

## Cenário

Os dados utilizados na demonstração são sintéticos (persona Ana, 4 atividades, 4 evidências) e não representam usuário, piloto, cliente ou tração reais.

## Documentos Relacionados

- [Roteiro Oficial do Vídeo de 3 Minutos](../../research/product/03_DEMO_VIDEO_SCRIPT.md) — Roteiro segundo a segundo com falas e telas.
- [Demo & Technical Proof](../evaluation/04_DEMO_AND_PROOF.md) — Especificação técnica de prova, fixture de fallback e métricas de teste.
- [Contrato de Demonstração Reprodutível](REPRODUCIBLE_DEMO_CONTRACT.md) — Contrato de execução da demo.
