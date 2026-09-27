# Evidence Pipeline

## Objetivo

Separar claramente fonte, extração, interpretação, revisão, estado e verificação.

## Pipeline

```
INGEST
  ↓
NORMALIZE
  ↓
EXTRACT
  ↓
INTERPRET
  ↓
RELATE TO COMPETENCY
  ↓
REVIEW
  ↓
UPDATE STATE
  ↓
ATTEST
  ↓
VERIFY
```

## 1. Ingest

Recebe uma evidência produzida ou apresentada pela pessoa.

Exemplos iniciais:

- documento;
- URL;
- resultado de atividade;
- repositório;
- avaliação.

O MVP deve escolher poucos tipos.

## 2. Normalize

Converte a entrada para uma representação interna estável.

Nenhuma normalização deve destruir a referência à fonte original.

## 3. Extract

Extrai somente informações observáveis na evidência.

Exemplo:

- título;
- data;
- instituição;
- descrição;
- resultado;
- arquivo/referência.

## 4. Interpret

A IA pode produzir inferências.

Exemplo:

- competências candidatas;
- relação entre evidência e critério;
- sinais de desenvolvimento;
- pontos que exigem revisão.

Inferências devem permanecer identificáveis como inferências.

## 5. Relate to competency

A interpretação deve responder:

- qual competência está sendo analisada;
- qual evidência sustenta o sinal;
- qual critério da competência é relevante;
- qual nível de confiança existe.

## 6. Review

O humano pode:

- aceitar;
- corrigir;
- rejeitar;
- solicitar nova evidência.

A revisão deve ser registrada.

## 7. Update state

O sistema produz um estado estruturado.

O estado não deve afirmar mais do que as evidências e a revisão permitem.

## 8. Attest

Somente um estado/evento definido deve ser atestado.

Não transformar o arquivo inteiro em uma attestation sem necessidade.

## 9. Verify

A verificação deve permitir recuperar a attestation e confirmar:

- credencial;
- schema;
- signer;
- dados;
- validade;
- referência relevante.

## Proveniência

Cada campo importante deve poder responder:

> veio diretamente da evidência, foi inferido pela IA ou foi confirmado na revisão?

## Trust model

- N1 — Self-declared
- N2 — Evidence presented
- N3 — Evidence analyzed
- N4 — Source verified

N4 depende de mecanismo externo autenticado.
