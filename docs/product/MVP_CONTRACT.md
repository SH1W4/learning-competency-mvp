# MVP Contract

## Status

**Estado:** contrato de implementação fechado para o vertical slice v0.1  
**Objetivo:** impedir que a visão futura expanda automaticamente o MVP.

## Pergunta central

> É possível transformar uma competência desejada em uma trilha curta, reunir evidências produzidas pela pessoa, interpretá-las com IA e revisão humana, representar um estado de competência e preservar uma prova verificável desse estado?

## Fluxo obrigatório

```
ORGANIZAÇÃO
  ↓
COMPETÊNCIA
  ↓
TRILHA
  ↓
PESSOA
  ↓
ATIVIDADES
  ↓
EVIDÊNCIAS
  ↓
IA
  ↓
REVISÃO HUMANA
  ↓
ESTADO
  ↓
ATTESTATION
  ↓
SOLANA
  ↓
VERIFICAÇÃO
```

## Vertical slice

O primeiro caso deve ter:

- uma competência;
- uma trilha curta;
- uma pessoa;
- poucas atividades;
- poucos formatos de evidência;
- uma interpretação assistida;
- uma revisão humana;
- um estado de competência;
- uma attestation;
- uma consulta de verificação.

## Fora do contrato

Não são requisitos do MVP:

- LMS;
- marketplace;
- recrutamento;
- catálogo amplo;
- múltiplas organizações;
- integrações institucionais extensas;
- metodologia universal de competências;
- tokenomics;
- documentos pessoais on-chain;
- dezenas de agentes;
- automações não necessárias para a demonstração.

## Critério de conclusão

O MVP está funcional quando uma única competência percorre o fluxo completo sem intervenção manual de desenvolvimento entre as etapas.

## Regra de mudança

Qualquer mudança que altere o fluxo obrigatório deve ser tratada como decisão de produto/arquitetura antes de implementação.
