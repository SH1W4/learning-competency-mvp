# Avaliação de Hackathon — Learning Competency MVP
**Skill aplicada:** hackathon-evaluator  
**Data:** 01 de Outubro de 2026  
**Checkpoint:** Before implementation freeze  
**Avaliador:** JX / SH1W4 (via Antigravity)

> Esta avaliação aplica o framework red-team. O objetivo é encontrar fraquezas antes que um jurado o faça. Não manufatura pontos positivos.

---

## A. Diagnóstico Executivo

O ponto mais forte da submissão é a **coerência interna**: a tese está clara, o fluxo está implementado com contratos explícitos, e os limites entre IA, revisão humana e atestação on-chain são um dos melhores exemplos de responsabilidade de IA que um jurado técnico pode ver num hackathon. O M2 (39 testes passando) e o M3 (transação real na Devnet confirmada) provam que o fluxo vertical funciona de ponta a ponta.

O maior risco não resolvido é a **ausência completa de evidência externa de demanda**. Toda a validação do problema existe como hipótese interna da equipe. Um jurado rigoroso vai perguntar: "alguém fora da equipe confirmou que esse problema existe e que pagaria por uma solução?" A resposta hoje é: não. Isso eleva o risco da dimensão de Tração para nível crítico.

---

## B. Dimensões

### 1. Founder + Market Fit
| Item | Avaliação |
|---|---|
| Evidência atual | Governança v1.0 com papéis definidos (Erick, JP Carvalho, JP Fernandes, JX). Divisão clara: pesquisa, M2, branding/UX, arquitetura/blockchain. |
| Demonstrado | Complementaridade técnica real: full-stack + arquitetura + UX + pesquisa/mercado. |
| Apenas hipótese | Conexão entre experiência dos fundadores e o problema de L&D específico. Não há narrativa de "por que nós?". |
| Prova faltando | Não há história de fundador conectada ao problema. Não há menção de experiência prévia com L&D, educação corporativa ou blockchain. |
| Risco | **Médio.** Um jurado não consegue entender por que essa equipe específica está posicionada para resolver esse problema. |
| Ação recomendada | Erick deve escrever 3 frases: por que este problema, por que agora, por que esta equipe. Incluir no README ou pitch. |

---

### 2. Insight
| Item | Avaliação |
|---|---|
| Evidência atual | A distinção `evidência ≠ interpretação ≠ decisão humana ≠ verificação` está implementada em código, não apenas em slides. Isso é raro. |
| Demonstrado | O sistema rejeita `DEMONSTRATED` por IA. Só revisor humano pode confirmar. A IA propõe, nunca decide. Isso é o insight central materializado. |
| Apenas hipótese | Que essa distinção é o que as organizações precisam (em oposição a "emitir certificados mais bonitos"). |
| Prova faltando | Nenhuma entrevista ou dado externo confirma que o problema é a **falta de rastreabilidade da evidência**, não a falta de um LMS ou ferramenta de avaliação. |
| Risco | **Baixo para avaliadores técnicos. Médio para avaliadores de mercado.** |
| Ação recomendada | Adicionar no README uma sentença curta diferenciando este produto de: "não é um LMS; não é um emissor de certificados; é um sistema que fecha o ciclo entre evidência, interpretação revisada e verificação." |

---

### 3. Product + Execution
| Item | Avaliação |
|---|---|
| Evidência atual | Fluxo completo: M1 (spec), M2 (TypeScript, 39 testes), M3 (transação real Devnet). |
| Demonstrado | `EVIDÊNCIA → EXTRAÇÃO → INTERPRETAÇÃO → REVISÃO HUMANA → ESTADO → ATTESTATION → SOLANA`. Cada seta tem código e teste. |
| Apenas hipótese | Interface (JP Fernandes ainda não entregou). Demo reproduzível end-to-end com um usuário real. |
| Prova faltando | Não há `npm run demo` funcional que um jurado possa rodar e ver o fluxo completo em menos de 3 minutos. A demo script existe mas depende de LLM (opcional) e sem UI. |
| Risco | **Médio-Alto.** O pipeline técnico existe, mas a demonstração para não-técnicos não existe ainda. Sem interface, o jurado vê um CLI. |
| Ação recomendada | Prioridade máxima: JP Fernandes deve entregar ao menos uma tela de revisão e uma tela de verificação. Sem UI, o produto é invisível para 80% dos jurados. |

---

### 4. Potential Market Size
| Item | Avaliação |
|---|---|
| Evidência atual | `COMPETITIVE_LANDSCAPE.md` existe como framework de pesquisa. Não há números, não há mercado definido. |
| Demonstrado | Nenhum mercado demonstrado. |
| Apenas hipótese | "L&D corporativo tem o problema." |
| Prova faltando | Tamanho do mercado endereçável, buyer, frequência e custo do problema. |
| Risco | **Alto.** Um jurado pode atacar diretamente: "qual é o mercado?" e não há resposta documentada. |
| Ação recomendada | Erick deve produzir uma estimativa razoável com fonte: ex. tamanho do mercado de L&D corporativo Brasil/global, porcentagem que usa avaliação de competências, potencial de receita por organização. |

---

### 5. Founder Communication
| Item | Avaliação |
|---|---|
| Evidência atual | README bem escrito, tese clara. Governança documentada. |
| Demonstrado | Quem lê o README entende o que está sendo construído. |
| Apenas hipótese | Que a narrativa do pitch reflete o que foi construído. |
| Prova faltando | Não há `docs/demo/DEMO_SCRIPT.md` populado (existe mas possivelmente vazio). Não há pitch deck. |
| Risco | **Médio.** A narrativa técnica é forte; a narrativa de pitch (1 minuto) não existe. |
| Ação recomendada | Erick + JX devem travar o roteiro da demo em 5 passos: problema → fluxo → demo → mercado → equipe. |

---

### 6. Viability
| Item | Avaliação |
|---|---|
| Evidência atual | GTM existe como documento. |
| Demonstrado | Nada demonstrado. |
| Apenas hipótese | Que L&D pagaria por isso. Que o revisor humano é o comprador. Que o modelo de precificação funciona. |
| Prova faltando | Quem paga, quanto, e por qual workflow específico. |
| Risco | **Médio.** Esperado para um hackathon, mas deve ser declarado como hipótese, não como fato. |
| Ação recomendada | Documentar uma hipótese de precificação com base em comparáveis: ex. "plataformas de assessment cobram $X por usuário/mês; nossa hipótese é $Y por ciclo de avaliação de competência." |

---

### 7. Traction
| Item | Avaliação |
|---|---|
| Evidência atual | Zero tração externa documentada. |
| Demonstrado | Nenhum sinal externo de demanda (E0). |
| Apenas hipótese | Que organizações têm o problema descrito. |
| Prova faltando | 1 entrevista com L&D. 1 pessoa de RH que confirmou o workflow. Qualquer sinal externo. |
| Risco | **CRÍTICO. Esta é a maior vulnerabilidade da submissão.** Um jurado pode descartar o projeto por completo por falta de evidência de demanda. |
| Ação recomendada | Meta imediata (Erick): fazer ao menos 2 conversas com profissionais de L&D antes da submissão. Registrar o que disseram (problema, workflow, frequência). Mesmo 1 entrevista com transcrição parcial eleva de E0 para E2. |

---

### 8. Technical Credibility
| Item | Avaliação |
|---|---|
| Evidência atual | 39 testes cobrindo o caminho crítico. Separação de domínios exemplar (`ingest → normalize → extract → interpret → relate → review → state → attest`). Proveniência preservada. Contracts validados com Zod. |
| Demonstrado | Altíssimo. Um avaliador técnico pode clonar e rodar `npm test` em 2 minutos. |
| Apenas hipótese | Que o provedor LLM real produz outputs válidos consistentemente. |
| Prova faltando | Teste com LLM real (não apenas heurístico). |
| Risco | **Baixo.** Esta é a dimensão mais forte da submissão. |
| Ação recomendada | Rodar o demo completo com `AI_PROVIDER=anthropic` pelo menos uma vez antes da submissão. Capturar o output como evidência. |

---

### 9. Solana Relevance
| Item | Avaliação |
|---|---|
| Evidência atual | Transação real na Devnet confirmada. Payload off-chain correto (apenas hash + metadados). |
| Demonstrado | O Memo Program foi usado corretamente. Não há tokenomics desnecessário. Não há DAO. Sem token especulativo. |
| Apenas hipótese | Que o verifier consegue usar o `record_hash` para verificar independentemente. |
| Prova faltando | Um script ou endpoint de verificação: dado um `record_hash`, provar que foi registrado on-chain. Este é o passo final do fluxo e ainda não existe. |
| Risco | **Médio.** Sem verificação, a atestação é uma afirmação de integridade que não pode ser checada. O ciclo não fecha. |
| Ação recomendada | Implementar `src/solana/verify.ts`: recebe `record_hash` e `tx_signature`, busca a transação e confirma que o hash está no Memo. |

---

### 10. Submission Integrity
| Item | Avaliação |
|---|---|
| Evidência atual | Repositório com histórico cronológico. Commits semânticos. Diário de Bordo. Governança documentada. |
| Demonstrado | Trabalho feito durante a competição (branch feat/m2 mergeada hoje, M3 implementado hoje). |
| Hipótese | Que a documentação pré-existente ao hackathon é adequadamente disclosada. |
| Prova faltando | Verificar se o README declara explicitamente o que existia antes de 25/09 vs. o que foi construído durante o hackathon. |
| Risco | **Baixo-Médio.** Se documentação anterior ao hackathon não for identificada, pode gerar questionamento de integridade. |
| Ação recomendada | Adicionar uma seção "Histórico da competição" no README: "Iniciado em 25/09/2026. O que existia antes: [nada / apenas ideia]. O que foi construído durante: M1 spec, M2 pipeline, M3 atestação." |

---

## C. Ledger de Evidências

| Afirmação | Nível | Fonte | Status |
|---|---|---|---|
| O fluxo técnico funciona end-to-end | E3 | 39 testes + tx Devnet | ✅ Demonstrado |
| A IA propõe, nunca decide DEMONSTRATED | E3 | `state.ts` + `tests/review.test.ts` | ✅ Demonstrado |
| Atestação na Solana é verificável | E1 | Transação existe, verifier não existe | ⚠️ Incompleto |
| Organizações têm dificuldade de rastrear competências | E0 | Nenhuma entrevista | ❌ Não validado |
| L&D pagaria pela solução | E0 | Nenhuma conversa documentada | ❌ Não validado |
| O mercado é relevante | E1 | Argumento lógico sem pesquisa | ❌ Hipótese |
| A equipe tem fit com o problema | E1 | Governança docs | ⚠️ Não narrado |

---

## D. Red-Team Findings

### 🔴 Crítico
**C1 — Zero evidência externa de demanda**  
O projeto não tem uma única entrevista, conversa, ou dado externo que confirme que o problema existe como descrito. O `DEMAND_VALIDATION.md` lista as perguntas, mas não os resultados. Para um jurado experiente, isso é bloqueante. A tese pode ser logicamente coerente e tecnicamente brilhante — mas sem nenhum sinal de mercado, é uma hipótese sofisticada.

---

### 🟠 Major
**M1 — Verificação on-chain não está implementada**  
A atestação foi criada. O `record_hash` está no Memo da Devnet. Mas não existe nenhuma forma de um verifier confirmar isso programaticamente. O ciclo `ATTESTATION → SOLANA → VERIFICATION` está incompleto. O último passo é o mais visível para um jurado.

**M2 — Não há interface**  
O pipeline técnico existe. Mas sem UI, é um CLI TypeScript. 80% dos jurados não vão clonar o repositório e rodar `npm test`. A demo precisa ser visual.

---

### 🟡 Moderado
**Mo1 — Narrativa de fundador ausente**  
Não há resposta para: "por que vocês são as pessoas certas para construir isso?" Não há conexão entre a experiência dos membros da equipe e o problema de L&D escolhido.

**Mo2 — Mercado sem número**  
Nenhuma estimativa de tamanho de mercado com fonte. Aceito como hipótese, mas deve ser explicitamente rotulado.

**Mo3 — Demo script não populado**  
O arquivo `docs/demo/DEMO_SCRIPT.md` existe mas provavelmente está vazio ou incompleto. Sem roteiro de demo, a apresentação improvisa.

---

### 🔵 Minor
**Mi1 — Aviso de line-ending (CRLF)**  
Git reportou LF→CRLF warnings nos commits. Adicionar `.gitattributes` com `* text=auto` previne isso e mantém o repositório limpo em ambientes Windows/Linux.

**Mi2 — Vulnerabilidades npm**  
`npm audit` reportou 9 vulnerabilidades (7 moderate, 1 high, 1 critical). Rodar `npm audit fix` antes da submissão.

---

## E. Demo Audit

| Passo | Implementado? | Testado? | Demonstrável? |
|---|---|---|---|
| 1. Organização define competência | ✅ (USE_CASE.md + useCase.ts) | ✅ (unitário) | ⚠️ Só via código |
| 2. Pessoa segue trilha | ✅ (fixtures/synthetic/ana/) | ✅ | ⚠️ Só via CLI |
| 3. Evidência submetida | ✅ (ingest.ts) | ✅ (7 testes) | ⚠️ Só via CLI |
| 4. IA interpreta evidência | ✅ (provider.ts + contract.ts) | ✅ (8 testes) | ⚠️ Heurístico por default |
| 5. Revisor aceita/corrige/rejeita | ✅ (review.ts) | ✅ (9 testes) | ⚠️ Só via JSON fixture |
| 6. Estado muda | ✅ (state.ts) | ✅ | ⚠️ Só via código |
| 7. Atestação criada | ✅ (attest.ts) | ✅ (tx real) | ✅ Link no Explorer |
| 8. Registro Solana visível | ✅ | ✅ | ✅ Explorer link existe |
| 9. Verifier checa resultado | ❌ Não implementado | ❌ | ❌ |

**Momento da prova** (per skill §18): A transação no Solana Explorer é atualmente o único passo visualmente convincente para não-técnicos. É o âncora da demo.

---

## F. Submission Readiness

**PARTIALLY READY**

O motor técnico (M1+M2+M3 parcial) está funcional e testado. Mas a submissão não está pronta porque:
1. Não há evidência externa de demanda (crítico).
2. O ciclo de verificação não fecha (major).
3. Não há interface para demo visual (major).

---

## G. Próximas Ações (Priorizadas)

| Prioridade | Responsável | Ação | Impacto |
|---|---|---|---|
| 1 | Erick | Fazer 2 entrevistas com L&D e registrar resultado em `docs/validation/` | Eleva tração de E0 para E2 |
| 2 | JX | Implementar `src/solana/verify.ts` — recebe hash, confirma on-chain | Fecha o ciclo ATTESTATION → VERIFICATION |
| 3 | JP Fernandes | Entregar ao menos 2 telas: revisão + verificação | Torna o produto visível para jurados não-técnicos |
| 4 | Erick + JX | Redigir DEMO_SCRIPT.md: 5 passos, máx 3 min | Elimina improviso na apresentação |
| 5 | JX | `npm audit fix` + `.gitattributes` | Higiene do repositório |
| 6 | Equipe | Adicionar seção "por que esta equipe" no README | Responde fundador-market fit |
