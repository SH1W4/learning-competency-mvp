# Contribuição

Este repositório é a base técnica de execução do Learning Competency MVP.

## Princípios

- O MVP deve permanecer centrado no vertical slice definido em `docs/product/MVP_CONTRACT.md`.
- Decisões de produto e arquitetura devem ser explícitas antes de alterar o fluxo central.
- Evidência, interpretação da IA, revisão humana, estado e verificação devem permanecer distinguíveis.
- Não transformar hipóteses de produto em requisitos silenciosamente.
- Não adicionar complexidade apenas porque uma tecnologia é interessante.
- Toda mudança relevante deve deixar rastreabilidade no GitHub.

## Fluxo de trabalho

1. Leia `skills/learning-competency/SKILL.md`.
2. Consulte o contrato do MVP e a documentação da área afetada.
3. Verifique as issues abertas relacionadas.
4. Faça a menor alteração coerente com o objetivo.
5. Adicione ou atualize testes quando houver mudança de comportamento.
6. Atualize a documentação quando a mudança alterar contrato ou arquitetura.
7. Prefira commits pequenos e explicáveis.
8. Use Pull Requests para mudanças que precisem de revisão do time.

## Antes de implementar

Classifique a solicitação como:

- decisão de produto;
- decisão de arquitetura;
- implementação;
- experimento;
- validação;
- documentação;
- hipótese futura.

Se a classificação não estiver clara, registre a dúvida antes de ampliar o escopo.

## Integridade

Não inventar:

- usuários;
- tração;
- resultados de validação;
- evidências;
- competências;
- verificações externas;
- dados de demonstração apresentados como dados reais.

Dados sintéticos podem ser usados no MVP quando identificados como tal.

## Escopo

A pergunta de controle é:

> Esta mudança ajuda a provar o fluxo competência → trilha → evidência → IA/revisão → estado → attestation → verificação?

Se não, ela deve ser tratada como futura ou mantida fora do MVP.
