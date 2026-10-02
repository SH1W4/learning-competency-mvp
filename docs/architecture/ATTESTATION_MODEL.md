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

## Implementação atual

O MVP usa o **Solana Memo Program** como âncora de integridade. O payload é versionado (`m3.attestation.v2`) e vincula `mvp`, versão, `subject_ref`, `competency`, `state`, `record_hash`, `attester` e `timestamp`.

O verificador, quando recebe o `ReviewedStateRecord`, recalcula sua integridade e exige correspondência dos campos relevantes do payload com o registro. A assinatura da transação também pode ser comparada ao emissor esperado.

Isso é diferente de **Solana Attestation Service (SAS)**. SAS permanece uma possível evolução futura, não o mecanismo usado pelo MVP atual.

## Verificação

A demonstração permite que uma terceira parte confirme a existência da referência e a correspondência entre o payload on-chain e o registro revisado.

## Limites

A atestação não prova, por si só:

- a correção da evidência;
- a verdade da competência;
- o mérito do indivíduo;
- a validade universal do estado.

A migração para SAS, caso necessária, permanece como trabalho futuro. O MVP atual já possui um mecanismo concreto de atestação e verificação via Memo.
