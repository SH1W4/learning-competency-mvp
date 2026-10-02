# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Aprendizado em competências com evidências reais" width="100%" />
</p>

<h3 align="center">Da evidência de aprendizagem ao estado verificável de competência.</h3>

<p align="center"><strong>Evidência → interpretação com IA → revisão humana → estado → prova</strong></p>

[![CI](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml/badge.svg)](https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml)
![Testes](https://img.shields.io/badge/testes-62%20passando-success)
![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF)

## O problema

Um certificado pode mostrar conclusão. Ele não necessariamente preserva o que uma pessoa demonstrou.

O Learning Competency explora outro modelo:

**atividade de desenvolvimento → evidência → interpretação → revisão humana → estado de competência → prova verificável**

## Princípio central

### A IA não decide competência.

A IA auxilia a interpretação das evidências. A decisão permanece com um revisor humano.

| Evidência | Interpretação | Decisão | Prova |
|---|---|---|---|
| O que foi produzido | Análise assistida por IA | Revisão humana | Atestação verificável |

## O que construímos

### M1 — Caso de uso concreto

Um cenário focado de desenvolvimento corporativo para uma competência de análise de dados aplicada.

### M2 — Evidência, IA e revisão

Pipeline em TypeScript/Node que recebe evidências, extrai informações observáveis, relaciona-as aos critérios da competência, produz uma interpretação assistida por IA e registra a revisão humana.

### M3 — Estado, atestação e verificação

O estado revisado é representado por um registro determinístico. Sua integridade pode ser ancorada na Solana Devnet e verificada posteriormente.

    Evidência
       ↓
    Interpretação com IA
       ↓
    Revisão humana
       ↓
    Estado de competência
       ↓
    Integridade do registro
       ↓
    Atestação
       ↓
    Verificação

### Limite importante

A Solana **não determina de forma independente se uma pessoa possui uma competência**.

Ela fornece uma camada de integridade e verificação sobre um estado previamente revisado.

Dados sensíveis de aprendizagem permanecem off-chain.

## Prova

- 62 testes automatizados passando;
- vertical slice M1 → M2 → M3 implementado;
- handoff M2 → M3 endurecido;
- atestação demonstrada na Devnet;
- detecção de adulteração e validação do assinante cobertas por testes;
- dados sintéticos de demonstração identificados como sintéticos.

[Ver a transação de referência na Devnet →](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

## O que este MVP afirma — e o que não afirma

Ele demonstra que um fluxo de desenvolvimento de competência pode produzir evidências estruturadas, auxiliar sua interpretação, registrar revisão humana, representar um estado limitado e preservar uma referência verificável de integridade.

Ele **não** afirma:

- substituir avaliação humana;
- ser um LMS completo;
- definir um framework universal de competências;
- provar a verdade ou o mérito de uma competência por blockchain;
- colocar dados sensíveis de aprendizagem on-chain;
- possuir pricing, tração ou modelo comercial definitivo validados.

## Início rápido

    npm install
    npm test
    npm run typecheck
    npm run demo

Para a demonstração na Solana Devnet:

    npm run m3:attest
    npm run m3:verify <tx_signature> [record_hash]

## Documentação

| Área | Recurso |
|---|---|
| Produto | [Contrato do MVP](docs/product/MVP_CONTRACT.md) · [Jornadas](docs/product/USER_JOURNEYS.md) · [Caso de uso](docs/product/USE_CASE.md) |
| Arquitetura | [Pipeline de evidências](docs/architecture/EVIDENCE_PIPELINE.md) · [Modelo de atestação](docs/architecture/ATTESTATION_MODEL.md) |
| Execução | [Status](docs/PROJECT_STATUS.md) · [Diário de bordo](docs/diario-de-bordo/) |
| Demo | [Visão da demonstração](docs/demo/DEMO_SCRIPT.md) |

Detalhes de mercado, validação de demanda e estratégia operacional são mantidos separadamente deste repositório público.

## Equipe

| Pessoa | Contribuição central |
|---|---|
| Erick | Pesquisa, contexto, mercado e operação |
| JP Carvalho | M2 — pipeline de evidências, IA e revisão |
| JP Fernandes | Branding, UX/UI e interface |
| JX | Arquitetura, IA, evidências, atestação e Solana |

## Histórico

Início em 25 de setembro de 2026.

O projeto evoluiu de um conceito inicial de microcredenciais para um vertical slice focado, rastreável e verificável.

**M1 → M2 → M3 → Hardening → Feature Freeze**

## Licença

A licença e os termos de distribuição serão definidos antes da publicação de uma versão final.
