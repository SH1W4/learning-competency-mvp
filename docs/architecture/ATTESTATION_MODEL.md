# Attestation Model — Working Specification

## Objetivo

Definir o que o MVP pretende representar antes de evoluções futuras da integração de atestação.

## Princípio

A atestação representa um **estado ou evento definido**, e não um arquivo inteiro.

## Modelo conceitual

SUBJECT → COMPETENCY → STATE → EVIDENCE REFERENCE → REVIEW CONTEXT → ISSUED AT

## Fronteira de dados

Dados sensíveis, documentos pessoais e conteúdo integral de evidências devem permanecer fora da cadeia quando não forem necessários para a verificação.

A camada on-chain deve carregar somente a representação mínima necessária para ancorar e verificar o estado definido.

## Verificação

A demonstração deve permitir que uma terceira parte confirme a existência da referência e a correspondência com o registro revisado.

## Limites

A atestação não prova, por si só:

- a correção da evidência;
- a verdade da competência;
- o mérito do indivíduo;
- a validade universal do estado.

A arquitetura definitiva de atestação e os mecanismos distribuídos de verificação permanecem como trabalho futuro.
