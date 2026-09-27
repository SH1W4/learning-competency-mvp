# Attestation Model — Working Specification

## Objetivo

Definir o que o MVP pretende atestar antes de codificar a integração final com Solana.

## Princípio

A attestation representa um **estado ou evento definido**, e não um arquivo inteiro.

## Modelo conceitual

```
SUBJECT
COMPETENCY
STATE
EVIDENCE_REFERENCE
REVIEW_CONTEXT
ISSUED_AT
EXPIRY
```

## Relação com Solana Attestations

A documentação atual do Solana Attestation System organiza o modelo em:

```
Credential
    ↓
Schema
    ↓
Attestation
```

Uma Credential representa a autoridade de atestação e seus signatários autorizados. O Schema define os campos e tipos da attestation e pode ser versionado. A Attestation contém os dados e metadados da declaração. citeturn0search0turn0search1turn0search3

A biblioteca oficial documentada pela Solana pode ser instalada como `sas-lib` para JavaScript/TypeScript ou pelo cliente Rust correspondente. citeturn0search5

## Candidato de schema

Nome provisório:

`competency-state.v0.1`

Campos candidatos:

- subject_ref;
- competency_ref;
- state;
- evidence_ref;
- review_ref;
- issued_at;
- expiry;
- schema_version.

### Importante

Este não é ainda o schema final.

Antes da implementação final, o time deve validar:

1. qual é o sujeito da attestation;
2. quem é a autoridade;
3. quem é o signer;
4. qual estado está sendo atestado;
5. qual referência de evidência deve ser preservada;
6. se há necessidade de expiry;
7. quais dados devem permanecer off-chain.

## Segurança conceitual

Não colocar na attestation:

- documento pessoal bruto;
- dados sensíveis desnecessários;
- conteúdo integral da evidência;
- informação que possa ser evitada por uma referência/hash.

## Verificação

A prova de demo deve mostrar que uma terceira parte consegue consultar a attestation e validar sua estrutura e autoridade.

## Fonte técnica

Solana documenta que somente signatários autorizados da Credential podem criar atestações e que a Attestation deve obedecer ao Schema associado. citeturn0search4turn0search6
