# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency" width="100%" />
</p>

<h3 align="center">Da evidência de aprendizagem ao estado verificável de competência.</h3>

<p align="center"><strong>Evidência → Verificação independente → Consenso → Estado → Prova</strong></p>

[![CI](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml/badge.svg)](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml)
![Testes](https://img.shields.io/badge/testes-78%20passing-success)
![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)

## O problema

Um certificado pode mostrar conclusão. Ele não necessariamente preserva aquilo que uma pessoa realmente demonstrou.

O Learning Competency explora um modelo diferente:

**atividade de desenvolvimento → evidência → interpretação → verificação → estado de competência → prova verificável**

## Princípio central

### A IA não decide a competência.

A IA auxilia na interpretação das evidências. O sistema separa interpretação, verificação, governança e decisão de estado.

O Consensus Core reduz a dependência de julgamento individual ao exigir convergência entre mecanismos de verificação independentes. Casos conflitantes, ambíguos ou insuficientes podem ser encaminhados para adjudicação humana.

| Evidência | Interpretação | Verificação | Estado / Prova |
|---|---|---|---|
| O que foi produzido | IA assistida | Regras e mecanismos independentes | Estado verificável |

## O que construímos

### M1 — Caso de uso concreto

Um cenário corporativo focado em uma competência aplicada de análise de dados.

### M2 — Evidência, IA e revisão

Um pipeline TypeScript/Node que recebe evidências, extrai informações observáveis, relaciona evidências a critérios de competência, produz interpretação assistida por IA e registra o contexto de verificação/revisão.

### M3 — Estado, atestação e verificação

O estado de competência é representado por um registro determinístico. Sua integridade pode ser ancorada na Solana Devnet e posteriormente verificada.

    Evidência
       ↓
    Interpretação assistida
       ↓
    Verificações independentes
       ↓
    Consensus Core
       ↓
    Estado de competência
       ↓
    Atestação
       ↓
    Verificação

### Fronteira importante

A Solana **não determina independentemente se uma pessoa possui uma competência**.

Ela fornece uma camada de integridade e verificação para um estado que já foi produzido pelo processo definido.

Dados sensíveis de aprendizagem permanecem off-chain.

## Prova técnica

- suíte automatizada validada por CI;
- vertical slice M1 → M2 → M3 implementado;
- handoff M2 → M3 endurecido;
- Consensus Core com verificação determinística independente da IA;
- atestação em Solana Devnet demonstrada;
- detecção de adulteração, validação do emissor e binding do payload cobertos por testes;
- dados sintéticos da demonstração claramente identificados como sintéticos.

[Ver a transação de referência na Devnet →](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

## O que este MVP faz — e o que não afirma

O MVP demonstra que um fluxo de desenvolvimento de competência pode produzir evidências estruturadas, auxiliar sua interpretação, aplicar verificações independentes, registrar contexto de decisão, representar um estado limitado e preservar uma referência verificável de integridade.

Ele **não** afirma:

- substituir a avaliação humana em todos os casos;
- ser um LMS completo;
- definir um framework universal de competências;
- provar a verdade ou o mérito de uma competência por meio de blockchain;
- colocar dados sensíveis de aprendizagem on-chain;
- ter pricing, tração ou modelo comercial definitivo validados.

## Documentação

### Documentação de trabalho — português

A documentação principal de desenvolvimento, arquitetura, decisões e pesquisa permanece em português dentro de docs/ e research/.

### Documentação para avaliação — inglês

Para avaliadores externos e para a submissão do hackathon, consulte:

**[Evaluation Documentation — English](docs/evaluation/README.md)**

Essa camada apresenta apenas o produto, arquitetura, modelo de verificação, demonstração, limitações e claims suportados pelo MVP.

## Quick Start

    npm install
    npm test
    npm run typecheck
    npm run demo

Para a demonstração de atestação na Solana Devnet:

    npm run m3:attest
    npm run m3:verify <tx_signature> [record_hash]

## Estrutura do repositório

    src/
    ├── ai/
    ├── evidence/
    ├── relation/
    ├── review/
    ├── state/
    ├── provenance/
    ├── solana/
    ├── domain/
    └── cli/

    tests/
    fixtures/
    docs/
    research/

## Equipe

| Pessoa | Contribuição principal |
|---|---|
| Erick | Pesquisa, contexto, mercado e operações |
| JP Carvalho | M2 — pipeline de evidências, IA e revisão |
| JP Fernandes | Branding, UX/UI e interface |
| JX | Arquitetura, IA, evidências, atestação e Solana |

## Histórico do hackathon

Iniciado em 25 de setembro de 2026.

O projeto evoluiu de um conceito inicial de microcredenciais para um vertical slice focado, rastreável e verificável de competência.

**M1 → M2 → M3 → Hardening → Feature Freeze**

## Licença

Os termos de licença e distribuição serão definidos antes da publicação de uma versão final.