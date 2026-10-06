# Project Status

## Status atual

**Fase:** MVP tecnicamente fechado (Vertical Slice concluído) — feature freeze.

**Estado do repositório:** fundação documental e técnica estabelecidas; M1 fechado como especificação operacional; M2 implementado com pipeline de ponta a ponta; M3 fechado com atestação e verificação na Solana concluídas; handoff M2 → M3 validado e endurecido (integridade do JSON, assinante e sem dados pessoais on-chain). O ciclo vertical está executável (M1 -> M2 -> M3). Interface/UX/UI em progresso final e validação externa de mercado em curso.

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

### Arquitetura (Versões Futuras)

O vertical slice técnico do MVP está 100% fechado. O modelo de produto e a arquitetura definitiva permanecem abertos para versões futuras e escaláveis. Isso inclui:

- schema/mecanismo final e descentralizado de attestation;
- caminho de verificação distribuído;
- persistência mínima estruturada (ex: BD off-chain real);
- limites finais definitivos entre dados off-chain e registro on-chain.

### Mercado e validação

- workflow atual confirmado externamente;
- alternativas/concorrentes investigados com fontes;
- buyer/problem owner/program owner confirmados;
- evidência externa de demanda;
- pricing e modelo comercial, que permanecem hipóteses.

### Hackathon

- vertical slice executável: concluído
- testes: implementados (52 passando)
- demo reproduzível: implementado
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

**Status: DONE**

Resultado esperado:

`evidência → extração → interpretação → relação com competência → revisão`

Owner:

**JP Carvalho / Joaopedro0s**

Documento principal:

- `tasks/M2_EVIDENCE_AI_REVIEW.md`

### M3 — Estado, atestação e Solana

**Status: DONE**

Resultado esperado:

`revisão → estado → attestation → Solana → verificação`

Owner:

**JX / SH1W4**

Suporte técnico:

**JP Carvalho / Joaopedro0s**, quando solicitado.

O suporte não altera o ownership, as decisões ou a responsabilidade final de M3.

Hardening do handoff M2 → M3 (validação cruzada, a pedido do owner do M3):

- `verify` recalcula o hash do `reviewed-state.json` via `verifyHandoff()` e rejeita JSON adulterado;
- `verify` valida o assinante da transação (`ATTESTER_PUBKEY`);
- payload on-chain `m3.attestation.v2` sem `subject` em claro (`subject_ref` pseudônimo);
- `attest` recusa handoff com `record_hash` inconsistente.

Registro: `docs/diario-de-bordo/05_hardening_handoff_m2_m3.md`

Documento principal:

- `tasks/M3_STATE_ATTESTATION.md`

### Interface — UX/UI do vertical slice

**Status: READY FOR IMPLEMENTATION**

Owner:

**JP Fernandes**

Resultado esperado:

`fluxo técnico definido → telas → navegação → evidência → revisão → estado → attestation → verificação`

A interface deve materializar o fluxo do produto e da arquitetura, sem criar lógica paralela.

**Handoff disponível:** `docs/handoff/M3_TO_INTERFACE.md`

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

**Próximo movimento:** refinamento de interface e continuação da validação externa. O ciclo técnico vertical do MVP (M1 → M2 → M3) está concluído e validado.

## Regra de status

Este documento não substitui decisões do time.

Para decisões materiais, registrar contexto, decisão, alternativas e consequências em `docs/decisions/`.
