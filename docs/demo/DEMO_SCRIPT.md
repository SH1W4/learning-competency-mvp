# Roteiro da Demonstração — Learning Competency MVP

> **Duração alvo:** 3 minutos
> **Audiência:** Jurados do Colosseum (técnicos e não-técnicos)
> **Regra:** A demo prova o fluxo, não enumera features. Cada passo existe para construir o Aha Moment.
> **Aha Moment:** O instante em que uma decisão humana se torna matematicamente inalterável.

---

## 🗣️ Abertura — O Problema (0:00 – 0:30)

**Quem fala:** Erick

> "Toda organização tem uma pergunta sem resposta simples:
> *como eu sei que alguém realmente desenvolveu uma competência?*
>
> Cursos concluídos, certificados emitidos, horas de treinamento computadas — nada disso prova o que a pessoa produziu.
>
> O Learning Competency MVP fecha esse ciclo em três partes: evidência real, revisão humana, e prova imutável na blockchain. Vou mostrar como."

---

## ⚙️ Passo 1 — A organização define a competência (0:30 – 0:45)

**Quem faz:** Erick
**O que mostrar:** Tela inicial / `docs/product/USE_CASE.md`

> "Uma área de L&D define: a competência é 'transformar uma pergunta de negócio em análise de dados reproduzível'. Quatro critérios observáveis. Uma trilha de quatro atividades."

**Visual:** Tela mostrando a competência `LID-01` com os critérios `C1–C4` já definidos.

---

## 📂 Passo 2 — A pessoa entrega evidências (0:45 – 1:05)

**Quem faz:** Erick
**O que mostrar:** `fixtures/synthetic/ana/` — os artefatos da Ana

> "A Ana, analista júnior, entrega: um briefing analítico, um notebook de preparação, uma análise reproduzível e uma síntese executiva.
>
> Cada arquivo entra no sistema com seu próprio hash de integridade — a impressão digital imutável do que foi submetido."

**Visual:** Lista dos 4 artefatos com seus `content_hash` exibidos ao lado.

---

## 🤖 Passo 3 — A IA interpreta. Ela propõe, não decide. (1:05 – 1:35)

**Quem faz:** Erick
**O que mostrar:** Output do `npm run demo` (pipeline M2)

> "A IA lê cada evidência e cruza com os critérios da rubrica.
>
> Ela identifica que C1, C2 e C3 estão presentes. O critério C4 está incerto — a análise está lá, mas a síntese das conclusões está rasa.
>
> **Ela não decide. Ela propõe.**"

**Visual:** Saída do CLI mostrando os critérios avaliados com status `supports / uncertain`.

> "O estado da Ana é `UNDER_REVIEW`. A bola está com o revisor humano."

---

## 👤 Passo 4 — O Revisor decide (1:35 – 2:00)

**Quem faz:** Erick
**O que mostrar:** Revisão no CLI / interface de review

> "O líder técnico da Ana abre o sistema. Ele lê o que a IA propôs, revisa o notebook dela e concorda — mas corrige C4 manualmente: ela entregou a síntese na apresentação verbal, e o líder registra isso.
>
> Ele aprova. O estado muda de `UNDER_REVIEW` para `DEMONSTRATED`."

**Visual:** Animação do estado mudando. O campo `reviewer: 'JX'` e `action: 'approve'` visíveis.

---

## ⚡ Passo 5 — O Aha Moment: Handoff → Hash → Solana (2:00 – 2:30)

**Quem faz:** Erick
**O que mostrar:** Output do hash + link do Solana Explorer

> "Esse é o momento central da nossa proposta.
>
> No instante em que o revisor aprova, o sistema gera o `ReviewedStateRecord` — um documento canônico contendo: as evidências originais, o que a IA propôs, e o que o humano decidiu.
>
> Esse documento fecha. E gera **um único hash SHA-256**."

**Visual:** Terminal exibindo o `record_hash` gerado — ex: `a1b2c3d4...`

> "Nós não colocamos os documentos da Ana na blockchain.
>
> **Só ancoramos esse hash** — a impressão digital matemática da decisão — no Memo Program da Solana."

**Visual:** Link do Solana Explorer abre no navegador. O hash é visível no payload da transação.

> *(pausa de 2 segundos)*
>
> "Aqui está. Timestamp. Hash. Rede pública. Inalterável."

---

## 🔍 Passo 6 — Verificação (2:30 – 2:50)

**Quem faz:** Erick
**O que mostrar:** `npx tsx src/solana/verify.ts <hash> <tx>`

> "Agora, qualquer verificador — um recrutador, uma auditoria, outra organização — pode checar de forma independente."

```
npx tsx src/solana/verify.ts a1b2c3d4... <txSignature>
```

**Visual:** Tela exibe `✅ VERIFICADO — hash confere com o registro on-chain.`

---

## 🔴 Passo 7 — Anti-fraude: o sistema detecta adulteração (2:50 – 3:10)

**Quem faz:** Erick
**O que mostrar:** Edição manual do JSON + re-verificação

> "E se alguém tentar manipular o registro depois?"

**Ação:** JX abre o arquivo `out/reviewed-state.json` e muda `state: "DEMONSTRATED"` para `state: "IN_DEVELOPMENT"`.

**Visual:** Salva o arquivo. Roda o verificador novamente:

```
npx tsx src/solana/verify.ts a1b2c3d4... <txSignature>
```

**Visual:** Tela exibe em vermelho: `❌ VERIFICAÇÃO FALHOU — hash do documento não confere com o registro on-chain.`

> "O documento foi adulterado. O hash mudou. A Solana não mente.
>
> Isso é o que chamamos de confiança verificável, não confiança declarada."

---

## 🎤 Fechamento — Por que isso importa (3:10 – 3:30)

**Quem fala:** Erick

> "LMSs entregam cursos. Plataformas de certificado emitem badges. Ferramentas de avaliação medem desempenho.
>
> Nenhuma fecha o ciclo entre a evidência que a pessoa produziu, a decisão de um humano qualificado, e a verificação independente por qualquer terceiro.
>
> O Learning Competency fecha esse ciclo — e torna cada decisão matematicamente auditável.
>
> Obrigado."

---

## 📋 Checklist pré-demo

- [ ] `out/reviewed-state.json` gerado via `npm run demo`
- [ ] Saldo SOL na Devnet (`solana airdrop 2` se necessário)
- [ ] Transação de atestação realizada via `npm run m3:attest`
- [ ] Link do Solana Explorer copiado e testado
- [ ] Arquivo JSON de adulteração pronto para edição ao vivo
- [ ] Terminal com fonte grande (≥ 18px) e tema escuro

---

## 🧩 Sequência técnica de comandos

```bash
# 1. Gerar o ReviewedStateRecord (M2)
npm run demo

# 2. Ver o hash gerado
cat out/reviewed-state.json | grep record_hash

# 3. Ancorar na Solana (M3)
npm run m3:attest

# 4. Verificação positiva
npx tsx src/solana/verify.ts <record_hash> <txSignature>

# 5. Simular adulteração: editar reviewed-state.json manualmente
# (mudar state para "IN_DEVELOPMENT")

# 6. Verificação negativa — detecta adulteração
npx tsx src/solana/verify.ts <record_hash> <txSignature>
```

---

*"A pergunta que guiou cada decisão técnica foi: que evidência ainda falta para que um avaliador independente chegue à mesma conclusão sozinho? É essa pergunta que queremos continuar respondendo."*
