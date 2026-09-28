# M1 — Concrete Use Case

Owner: SH1W4
Status: DONE
Priority: P0

## Objective

Escolher um contexto organizacional e uma competência que possam percorrer o fluxo completo do MVP.

## Resultado

O M1 foi fechado como **especificação operacional v0.1**. O fechamento do M1 significa que existe um contrato suficientemente específico para implementação; não significa validação externa de mercado.

## M1.1 — Contexto organizacional
Status: DONE
Owner: SH1W4

Contexto canônico: programa interno de desenvolvimento de competências para analistas de dados em início/intermediário de carreira.
- Problem owner: L&D / Desenvolvimento de Pessoas.
- Learner: colaborador participante.
- Reviewer: gestor, instrutor ou avaliador responsável.
- Verifier: pessoa autorizada a consultar a attestation.

## M1.2 — Competência
Status: DONE
Owner: SH1W4

Competência canônica:

> Transformar uma pergunta de negócio em uma análise de dados reproduzível e comunicar conclusões sustentadas por evidências.

Critérios observáveis: C1 formulação; C2 tratamento e análise; C3 evidência; C4 comunicação.

A IA pode propor sinais; somente a revisão humana pode confirmar o estado DEMONSTRATED.

## M1.3 — Trilha curta
Status: DONE
Owner: SH1W4

Quatro atividades:
1. A1 — formular a pergunta;
2. A2 — preparar e explorar os dados;
3. A3 — executar análise reproduzível;
4. A4 — comunicar resultado.

Cada atividade possui objetivo, ação, saída, evidência e relação com os critérios C1–C4.

## M1.4 — Contrato de evidência
Status: DONE
Owner: SH1W4

Quatro classes: briefing, analysis_artifact, analysis_result e communication.

Metadados mínimos: evidence_id, type, source_ref, activity_id, submitted_by, submitted_at, content_ref e provenance.

A cadeia deve distinguir fonte, extração, interpretação da IA e decisão do reviewer.

## M1.5 — Estados mínimos
Status: DONE
Owner: SH1W4

Estados canônicos: NOT_STARTED, IN_DEVELOPMENT, UNDER_REVIEW, DEMONSTRATED.

Regra crítica: a IA não pode executar sozinha a transição para DEMONSTRATED.

## M1.6 — Cenário de demonstração
Status: DONE
Owner: SH1W4

Cenário canônico:
- participante sintético: Ana — Analista de Dados Júnior;
- programa sintético: Trilha de Análise de Dados Aplicada;
- problema fictício: investigar fatores associados ao aumento de tempo de atendimento;
- quatro evidências sintéticas;
- revisão humana simulada;
- posterior attestation e verificação.

O cenário não representa usuário real, piloto ou tração.

## Exit criteria

**ATENDIDO.**

A cadeia organização → competência → trilha → pessoa → atividade → evidência está suficientemente especificada para implementação do vertical slice.

## Gate seguinte

**M2 desbloqueado.**

Qualquer mudança no contrato de competência, evidências ou estados deve ser registrada como decisão explícita antes de alterar a implementação.