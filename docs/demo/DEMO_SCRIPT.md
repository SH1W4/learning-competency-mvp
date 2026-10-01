# Roteiro da Demonstração — Learning Competency MVP

> **Duração alvo:** 3 minutos  
> **Audiência:** jurados do hackathon (técnicos e não-técnicos)  
> **Regra:** a demo prova o fluxo, não enumera features.

---

## Contexto (30 seg — Erick)

> "Toda organização tem uma pergunta sem resposta simples: *como eu sei que alguém desenvolveu uma competência — de verdade?* Cursos terminados, certificados emitidos, horas de treinamento: nada disso fecha o ciclo entre o que a pessoa produziu e o que a organização consegue verificar. Nós construímos o sistema que fecha esse ciclo."

---

## O Fluxo (ao vivo — JX / JP Carvalho)

### Passo 1 — A organização define a competência (10 seg)
Mostrar `docs/product/USE_CASE.md` ou tela de definição.

> "Uma área de L&D define: a competência é 'transformar uma pergunta de negócio em análise reproduzível'. Quatro critérios observáveis. Uma trilha de quatro atividades."

---

### Passo 2 — A pessoa entrega evidências (20 seg)
Mostrar `fixtures/synthetic/ana/` — os quatro artefatos da Ana.

> "A Ana, analista júnior, entrega: um briefing analítico, um notebook de preparação, uma análise reproduzível e uma síntese com conclusões. Cada artefato vai para o sistema com hash de integridade."

---

### Passo 3 — A IA interpreta, o revisor decide (30 seg)
Rodar `npm run demo` ou mostrar output do pipeline.

> "A IA extrai sinais de cada evidência e os relaciona aos critérios C1 a C4. Ela pode propor — mas nunca decidir. O revisor recebe a interpretação, aceita, corrige ou rejeita. Aqui, o revisor confirma que C1 a C4 estão sustentados."

Mostrar estado mudando: `UNDER_REVIEW → DEMONSTRATED`.

---

### Passo 4 — A atestação vai para a Solana (20 seg)
Mostrar a transação no Solana Explorer (link da Devnet já gravado).

> "Com a revisão confirmada, o sistema cria uma atestação. O record_hash — a impressão digital do estado revisado — é registrado imutavelmente na Solana. Não os documentos. Apenas a âncora criptográfica."

**[Abrir link: Explorer Devnet]**

---

### Passo 5 — Qualquer um pode verificar (20 seg)
Rodar `npx tsx src/solana/verify.ts <hash> <tx>`.

> "Agora, qualquer verificador autorizado — um recrutador, outra organização, um auditor — pode checar: esse estado foi revisado? Esse hash confere com o que está na blockchain? A resposta é sim, com timestamp e sem depender de ninguém."

Output: `✅ VERIFICADO`

---

## Por que isso importa (30 seg — Erick)

> "Hoje, o mercado tem LMSs que entregam cursos, plataformas de certificado que emitem badges, e ferramentas de avaliação que medem desempenho. Nenhuma fecha o loop entre *a evidência que a pessoa produziu*, *a revisão humana* e *a verificação independente*. Nós fechamos esse loop — e tornamos o resultado auditável."

---

## Equipe (20 seg)

> - **Erick** — pesquisa, mercado e narrativa  
> - **JP Carvalho** — pipeline de evidência e IA (M2)  
> - **JP Fernandes** — identidade e interface  
> - **JX** — arquitetura, atestação e Solana (M3)

---

## Pergunta que fecha

> "A pergunta que guiou cada decisão técnica foi: *que evidência ainda falta para que um avaliador independente chegue à mesma conclusão sozinho?* É essa pergunta que queremos continuar respondendo."
