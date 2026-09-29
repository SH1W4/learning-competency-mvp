# Project Status

## Status atual

**Fase:** definição final do MVP → implementação técnica / vertical slice.

**Estado do repositório:** fundação documental estabelecida; M1 fechado como especificação operacional; M2 e M4.1 em execução; M3 preparado para avançar conforme o contrato produzido por M2; interface/UX/UI agora possui ownership definido.

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
- caso de uso operacional definido em M1;
- framework inicial de análise competitiva documentado;
- modelo inicial de go-to-market documentado;
- responsabilidades e governança de decisão documentadas;
- ownership da frente de interface/UX/UI definido para JP Fernandes.

## O que ainda precisa ser fechado

### Produto

- refinamentos do caso de uso que surgirem durante a implementação;
- contrato final da saída da IA;
- modelo mínimo de revisão humana;
- estados canônicos conforme o comportamento real do vertical slice.

### Arquitetura

- schema/mecanismo final de attestation;
- caminho de verificação;
- persistência mínima necessária;
- limites finais entre dados off-chain e registro on-chain.

### Mercado e validação

- workflow atual confirmado externamente;
- alternativas/concorrentes investigados com fontes;
- buyer/problem owner/program owner confirmados;
- evidência externa de demanda;
- pricing e modelo comercial, que permanecem hipóteses.

### Hackathon

- vertical slice executável;
- testes;
- demo reproduzível;
- pitch coerente com o que foi realmente construído;
- disclosure de trabalho pré-existente quando aplicável.

## Milestones ativos

### M1 — Caso de uso concreto

**Status: DONE**

Resultado:

`organização → competência → trilha → pessoa → atividade → evidência`

Documento principal:

- `tasks/M1_CONCRETE_USE_CASE.md`

### M2 — Evidência, IA e revisão

**Status: IN PROGRESS**

Resultado esperado:

`evidência → extração → interpretação → relação com competência → revisão`

Owner:

**JP Carvalho / Joaopedro0s**

Documento principal:

- `tasks/M2_EVIDENCE_AI_REVIEW.md`

### M3 — Estado, atestação e Solana

**Status: TODO / PREPARAÇÃO**

Resultado esperado:

`revisão → estado → attestation → Solana → verificação`

Owner:

**JX / SH1W4**

Documento principal:

- `tasks/M3_STATE_ATTESTATION.md`

### Interface — UX/UI do vertical slice

**Status: OWNERSHIP DEFINED**

Owner:

**JP Fernandes**

Resultado esperado:

`fluxo técnico definido → telas → navegação → evidência → revisão → estado → attestation → verificação`

A interface deve materializar o fluxo do produto e da arquitetura, sem criar lógica paralela.

### M4 — Validação, demonstração e submissão

**Status: IN PROGRESS**

M4.1 está em execução.

Owner da validação de demanda:

**Erick / erickandregarcia-ai**

## Governança

Responsabilidades e classes de decisão estão documentadas em:

`docs/governance/TEAM_ROLES.md`

A regra permanece:

> Uma proposta pode vir de qualquer integrante; ela se torna requisito do projeto somente após a decisão apropriada ser registrada.

## Foundation Freeze

A fundação documental necessária para iniciar a implementação está estabelecida.

A partir daqui, novos documentos devem existir somente quando resolverem uma decisão, especificação, evidência ou necessidade real de execução.

**Próximo movimento:** executar o vertical slice, conectando M2, M3, interface e validação externa.

## Regra de status

Este documento não substitui decisões do time.

Para decisões materiais, registrar contexto, decisão, alternativas e consequências em `docs/decisions/`.
