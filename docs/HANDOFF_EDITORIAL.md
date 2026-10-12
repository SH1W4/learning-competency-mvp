# LASTRO — Guia editorial público

## Objetivo

Este documento orienta a leitura e a comunicação pública do LASTRO sem substituir o contrato do produto, a implementação ou os testes.

## Fontes públicas de referência

1. [Visão do produto](evaluation/01_PRODUCT.md)
2. [Arquitetura](evaluation/02_ARCHITECTURE.md)
3. [Verificação e governança](evaluation/03_VERIFICATION_AND_GOVERNANCE.md)
4. [Demonstração e prova técnica](evaluation/04_DEMO_AND_PROOF.md)
5. [Limitações e afirmações](evaluation/05_LIMITATIONS_AND_CLAIMS.md)
6. [Tese do produto](../research/product/PRODUCT_THESIS.md)
7. [Pesquisa e evidências externas](../research/RELATED_WORK_AND_EVIDENCE.md)

## Regras de comunicação

- Descrever apenas o comportamento que pode ser verificado no código, nos testes ou em uma prova reproduzível.
- Identificar explicitamente cenários sintéticos e não os apresentar como evidência de clientes, pilotos ou adoção.
- Não converter hipóteses de mercado, buyer, pricing, ROI ou product-market fit em fatos.
- Não afirmar independência estatística ou operacional de verificadores apenas porque existem mecanismos distintos.
- Descrever Solana como âncora de integridade/atestação de um registro definido, não como autoridade que determina a verdade da competência.
- Distinguir consenso, resolução, estado de competência e attestation.
- Se uma afirmação não puder ser ligada a evidência atual, qualificá-la ou removê-la.

## Limite de autoridade

O código e os testes definem o comportamento executável atual. Os contratos públicos definem o escopo pretendido. A pesquisa informa hipóteses, mas não altera silenciosamente o contrato do produto.

Este guia não contém planos internos de execução, mapas de repositórios privados, atribuição de tarefas ou estratégia comercial não publicada.
