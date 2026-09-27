# Project Status

## Status atual

**Fase:** definição final do MVP → implementação técnica.

**Estado do repositório:** fundação de execução estabelecida; vertical slice ainda não implementado.

## O que já está definido como base de trabalho

- tese centrada em desenvolvimento e estado de competências;
- organização/programa como ponto de partida do fluxo;
- trilha curta como mecanismo de desenvolvimento/produção de evidência;
- evidência separada de interpretação;
- IA como camada de estruturação e interpretação;
- revisão humana explícita;
- estado de competência como representação limitada pelo que as evidências sustentam;
- attestation como representação de um estado/evento definido;
- Solana como camada de integridade e verificabilidade;
- dados sensíveis e evidências brutas mantidos fora da cadeia;
- validação externa de demanda como frente necessária;
- jornadas de organização, pessoa, revisor e verificador documentadas;
- arquitetura lógica do MVP documentada;
- estrutura de caso de uso definida, aguardando escolha/validação;
- framework inicial de análise competitiva documentado;
- modelo inicial de go-to-market documentado;
- responsabilidades e governança de decisão documentadas.

## O que ainda precisa ser fechado

### Produto

- competência concreta do primeiro caso;
- contexto organizacional concreto;
- trilha concreta;
- tipos de evidência do primeiro caso;
- critérios observáveis da competência;
- contrato final da saída da IA;
- modelo mínimo de revisão humana;
- estados canônicos do primeiro vertical slice.

### Arquitetura

- schema/mecanismo final de attestation;
- caminho de verificação;
- persistência mínima necessária;
- limites finais entre dados off-chain e registro on-chain.

### Mercado e validação

- caso de uso validado;
- problema e workflow atuais;
- alternativas/concorrentes investigados com fontes;
- buyer/problem owner/program owner identificados;
- evidência externa de demanda;
- pricing e modelo comercial, que permanecem hipóteses.

### Hackathon

- vertical slice executável;
- testes;
- demo reproduzível;
- pitch coerente com o que foi realmente construído;
- disclosure de trabalho pré-existente quando aplicável.

## Milestones ativos

### M1 — Fechar o caso demonstrativo

Resultado esperado:

`organização → competência → trilha → pessoa → atividade → evidência`

Documentos de apoio:

- `docs/product/USE_CASE.md`
- `docs/product/USER_JOURNEYS.md`

### M2 — Fechar o pipeline de interpretação

Resultado esperado:

`evidência → extração → interpretação → relação com competência → revisão`

Documentos de apoio:

- `docs/architecture/EVIDENCE_PIPELINE.md`
- `docs/architecture/TECHNICAL_ARCHITECTURE.md`

### M3 — Fechar estado e prova

Resultado esperado:

`revisão → estado → attestation → Solana → verificação`

Documentos de apoio:

- `docs/architecture/ATTESTATION_MODEL.md`
- `docs/architecture/TECHNICAL_ARCHITECTURE.md`

### M4 — Validar e demonstrar

Resultado esperado:

- testes do fluxo crítico;
- validação de demanda registrada;
- análise competitiva fundamentada;
- hipótese inicial de GTM;
- demo reproduzível;
- pitch coerente;
- disclosure de trabalho pré-existente quando aplicável.

Documentos de apoio:

- `docs/validation/DEMAND_VALIDATION.md`
- `docs/market/COMPETITIVE_LANDSCAPE.md`
- `docs/go-to-market/GTM.md`
- `docs/demo/DEMO_SCRIPT.md`

## Governança

Responsabilidades e classes de decisão estão documentadas em:

`docs/governance/TEAM_ROLES.md`

A regra permanece:

> Uma proposta pode vir de qualquer integrante; ela se torna requisito do projeto somente após a decisão apropriada ser registrada.

## Foundation Freeze

A fundação documental necessária para iniciar a implementação está estabelecida.

A partir daqui, novos documentos devem existir somente quando resolverem uma decisão, especificação, evidência ou necessidade real de execução.

**Próximo movimento:** selecionar e validar o caso concreto e iniciar o primeiro vertical slice.

## Regra de status

Este documento não substitui decisões do time. Itens em “ainda precisa ser fechado” não devem ser tratados como requisitos finais.

Para decisões materiais, registrar contexto, decisão, alternativas e consequências em `docs/decisions/`.
