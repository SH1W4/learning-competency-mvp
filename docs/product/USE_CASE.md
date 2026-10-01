# MVP Use Case

> **Status:** caso de uso canônico do MVP v0.1 — especificação operacional fechada.
> **Nota:** esta definição fecha o escopo do vertical slice; não constitui validação externa de demanda.

## 1. Contexto organizacional

**Programa:** programa interno de desenvolvimento de competências em IA Aplicada para analistas e profissionais em transição de carreira.
**Problema owner:** área de Desenvolvimento de Pessoas / L&D / treinamento e desenvolvimento.
**Learner:** colaborador participante do programa.
**Reviewer:** gestor, instrutor ou avaliador formalmente responsável pela atividade.
**Verifier:** pessoa autorizada a consultar a attestation e verificar sua integridade.

### Problema operacional do MVP

A organização precisa acompanhar o desenvolvimento de uma competência prática por meio de atividades e entregas observáveis. Para o MVP, o sistema deve organizar essas entregas, relacioná-las aos critérios da competência, apresentar uma interpretação assistida por IA e permitir que um revisor humano aceite, corrija ou rejeite a interpretação antes da atualização do estado.

O MVP não afirma que este é o único ou principal problema de L&D. Essa é a escolha de escopo para o vertical slice.

## 2. Competência canônica

> **Usar IA de forma aplicada para resolver um problema de negócio real: formular uma pergunta, usar ferramentas de IA para interpretar dados, validar os resultados com critério humano e comunicar conclusões sustentadas por evidências.**

### Critérios observáveis

**C1 — Formulação**
- transforma uma necessidade/pergunta de negócio em uma pergunta analítica clara;
- define o que pretende responder.

**C2 — Tratamento e análise**
- identifica/prepara os dados necessários;
- executa uma análise coerente com a pergunta;
- registra passos suficientes para reprodução.

**C3 — Evidência**
- apresenta resultados apoiados pelos dados;
- diferencia observação, interpretação e limitação;
- evita conclusões que não sejam sustentadas pelo material apresentado.

**C4 — Comunicação**
- comunica resultado, contexto e limitações de forma compreensível para o público definido.

### Regra

A IA pode propor sinais para C1–C4, mas não pode determinar sozinha que a competência foi demonstrada.

## 3. Trilha curta canônica

### A1 — Formular a pergunta
Objetivo: transformar um problema de negócio em uma pergunta analítica.
Ação: registrar pergunta, objetivo e indicador/resultado esperado.
Saída: briefing analítico curto.
Evidência: documento/texto estruturado.
Critérios: C1.

### A2 — Preparar e explorar os dados
Objetivo: preparar o conjunto de dados e identificar padrões relevantes.
Ação: documentar origem, preparação, variáveis relevantes e exploração inicial.
Saída: notebook ou script acompanhado de descrição dos dados.
Evidência: notebook/script + referência ao conjunto de dados.
Critérios: C2.

### A3 — Executar análise reproduzível
Objetivo: responder à pergunta analítica por meio de uma análise reproduzível.
Ação: executar consultas/código, produzir resultados e registrar o caminho analítico.
Saída: análise reproduzível.
Evidência: notebook/script/consultas + resultados.
Critérios: C2, C3.

### A4 — Comunicar resultado
Objetivo: transformar a análise em uma comunicação útil para decisão.
Ação: apresentar conclusão, evidências utilizadas e limitações.
Saída: síntese escrita ou apresentação curta.
Evidência: síntese/apresentação.
Critérios: C3, C4.

## 4. Contrato mínimo de evidência

O MVP aceita somente quatro classes de evidência:

| Tipo | Conteúdo | Proveniência mínima | Relação |
| --- | --- | --- | --- |
| briefing | pergunta e objetivo | atividade A1 + autor | C1 |
| analysis_artifact | notebook, script ou consultas | atividade A2/A3 + referência de origem | C2/C3 |
| analysis_result | resultados/tabelas/visualizações | atividade A3 + referência ao artefato | C3 |
| communication | síntese/apresentação | atividade A4 + autor | C3/C4 |

### Metadados mínimos
- evidence_id;
- type;
- source_ref;
- activity_id;
- submitted_by;
- submitted_at;
- content_ref ou referência equivalente;
- provenance.

O sistema deve distinguir:
- conteúdo observado na evidência;
- interpretação produzida pela IA;
- decisão produzida pelo reviewer.

## 5. Revisão humana

O reviewer recebe evidências originais/referências, extrações, interpretações da IA, relação proposta com C1–C4 e lacunas/incertezas.

Pode:
1. aceitar o sinal;
2. corrigir o sinal;
3. rejeitar o sinal;
4. solicitar evidência adicional.

A decisão do reviewer deve ser registrada separadamente da saída da IA.

## 6. Estado mínimo

Para o vertical slice, serão usados quatro estados de desenvolvimento:

### NOT_STARTED
Nenhuma evidência relevante foi apresentada.

### IN_DEVELOPMENT
Existem atividades/evidências em desenvolvimento, mas os critérios necessários ainda não estão suficientemente sustentados.

### UNDER_REVIEW
Há evidência suficiente para submeter o conjunto à revisão humana.

### DEMONSTRATED
O reviewer confirmou que os quatro critérios C1–C4 estão sustentados pelo conjunto de evidências definido para o cenário.

### Regra de transição

A IA pode sugerir uma transição, mas não executa sozinha a transição para DEMONSTRATED.
A transição para DEMONSTRATED exige decisão explícita do reviewer e referência às evidências utilizadas.

## 7. Cenário canônico de demonstração

Usar um participante sintético:

**Participante:** Ana — Profissional em desenvolvimento de competência em IA Aplicada
**Programa:** Trilha de IA Aplicada a Problemas de Negócio
**Problema:** entender quais fatores estão associados ao aumento de tempo de atendimento em uma operação fictícia, usando IA como apoio à análise.

### Evidências sintéticas
1. briefing com a pergunta analítica;
2. notebook com preparação/exploração;
3. análise reproduzível com resultados;
4. síntese com conclusão e limitações;
5. revisão humana simulada.

### Fluxo esperado

ORGANIZAÇÃO → COMPETÊNCIA → TRILHA → PESSOA → ATIVIDADES → EVIDÊNCIAS → IA → REVISÃO → DEMONSTRATED → ATTESTATION → SOLANA → VERIFICATION

O cenário é sintético e não deve ser apresentado como usuário real, piloto ou tração.

## 8. O que o MVP demonstra

O MVP demonstra tecnicamente:

> uma organização pode definir uma competência operacional, associá-la a uma trilha curta, reunir evidências produzidas durante essa trilha, obter uma interpretação assistida por IA, submetê-la a revisão humana e registrar um estado de desenvolvimento que pode ser atestado e posteriormente verificado.

## 9. O que o MVP NÃO demonstra

O MVP não demonstra, por si só:
- que todas as empresas possuem esse problema;
- que L&D pagará pelo produto;
- que a metodologia mede competência de forma universal;
- que o estado DEMONSTRATED equivale a domínio profissional;
- que a attestation garante a qualidade da evidência;
- que existe tração;
- que o produto é superior às alternativas existentes.

Essas questões pertencem à validação externa e às próximas fases.

## 10. Decisões do M1

| Item | Decisão |
| --- | --- |
| Contexto | programa corporativo de desenvolvimento de competências em IA Aplicada a problemas de negócio |
| Problem owner | L&D / Desenvolvimento de Pessoas |
| Learner | colaborador participante |
| Reviewer | gestor/instrutor/avaliador responsável |
| Verifier | pessoa autorizada |
| Competência | IA aplicada a problemas de negócio: formular pergunta, interpretar dados com IA, validar com critério humano, comunicar conclusões |
| Trilha | A1–A4 |
| Evidências | briefing, artefato de análise, resultado, comunicação |
| Estados | NOT_STARTED, IN_DEVELOPMENT, UNDER_REVIEW, DEMONSTRATED |
| Cenário | participante sintético + dados/caso sintéticos |
| Attestation | estado DEMONSTRATED + contexto/referências |
| Sensível on-chain | proibido |
| Validação externa | permanece em M4 |

## 11. Status

**M1 fechado como especificação operacional v0.1.**

A próxima etapa é implementar M2 sobre este contrato. Qualquer alteração na competência, trilha, evidências ou estados deve ser tratada como mudança explícita do contrato do MVP.