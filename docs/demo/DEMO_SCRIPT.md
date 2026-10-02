# Roteiro da Demonstração — Learning Competency MVP

> **Duração alvo:** 3 minutos
> **Audiência:** Jurados do Colosseum (técnicos e não-técnicos)
> **Regra:** A demo prova o fluxo, não enumera features. Cada passo existe para construir o Aha Moment.
> **Aha Moment:** O instante em que uma decisão humana se torna matematicamente inalterável.

---

## 🗣️ Abertura — O Problema (0:00 – 0:30)

**Quem fala:** Erick

> "Em 2026, toda empresa está gastando para treinar seus times em IA — ChatGPT Enterprise, Copilot, workshops, Coursera.
>
> Mas a taxa de conclusão de vídeos só mede se a pessoa *deixou a aba aberta*.
>
> O resultado? Todo candidato coloca no LinkedIn que 'domina IA generativa'. Nenhum gestor sabe quem realmente resolve problemas com IA e quem só assistiu vídeos.
>
> **As empresas estão pagando pela ilusão de competência.**
>
> O Learning Competency fecha esse ciclo. Vou mostrar como."

---

## ⚙️ Passo 1 — A organização define a competência (0:30 – 0:45)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 1 — Catálogo / Visão L&D]** (Interface web desenvolvida por JP/Erick)

> "Uma área de L&D corporativa define a competência: *usar IA de forma aplicada para resolver um problema de negócio real*. Quatro critérios observáveis: formular o problema com clareza, tratar dados com senso crítico, executar análises assistidas por IA, e comunicar conclusões executivas."

**Visual na Tela 1:**
- Header institucional limpo com badge `L&D Portal / Competency Framework`.
- Card de destaque da competência: `IA-APLICADA-01 — Resolução Analítica com IA`.
- Grid com os 4 critérios observáveis (`C1` a `C4`), cada um com sua descrição e peso.

---

## 📂 Passo 2 — A pessoa entrega evidências reais (0:45 – 1:05)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 2 — Espaço da Colaboradora (Ana)]**

> "A Ana, profissional em desenvolvimento prático de IA, não faz um quiz de múltipla escolha. Ela entrega 4 evidências reais de trabalho: o briefing do problema de negócio, o notebook onde usou IA para explorar os dados, o dataset tratado e uma síntese executiva.
>
> Cada arquivo entra no sistema com seu próprio hash criptográfico — a impressão digital matemática inviolável do que foi entregue."

**Visual na Tela 2:**
- Perfil: *Ana Silva (Business Analyst)*.
- Timeline de submissão com os 4 cards de artefatos.
- Abaixo de cada arquivo: o `content_hash` (SHA-256 resumido, ex: `7f8a9b...`) com badge `Íntegro`.

---

## 🤖 Passo 3 — A IA interpreta. Ela propõe, não decide. (1:05 – 1:35)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 3 — Painel de Auditoria & IA (Lado Esquerdo)]**

> "A IA lê cada evidência e cruza com a rubrica da organização.
>
> Ela identifica que C1, C2 e C3 estão plenamente sustentados pelas evidências. Mas sinaliza o critério C4 como incerto — a análise técnica está excelente, mas a síntese executiva para diretoria ficou rasa.
>
> **A IA não decide. Ela não emite certificados. Ela apenas propõe uma pré-análise estruturada para economizar tempo do gestor.**"

**Visual na Tela 3 (Painel IA):**
- Card destacado com aviso: `🤖 Assistive AI Extractor — Proposta Não Vinculante`.
- Tabela de critérios: `C1, C2, C3` com tags verdes `SUPPORTS (Presente)`, e `C4` com tag âmbar `UNCERTAIN (Lacuna Detectada)`.
- Estado sugerido: `UNDER_REVIEW`.

---

## 👤 Passo 4 — O Revisor Humano decide e assina (1:35 – 2:00)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 3 — Painel de Decisão Humana (Lado Direito)]**

> "O líder técnico ou mentor da Ana abre o painel. Ele revisa a sugestão da IA em 2 minutos. Ele concorda com os critérios técnicos, mas valida C4 manualmente porque a Ana apresentou a síntese verbalmente na reunião executiva.
>
> Ele registra a nota de auditoria e clica em Aprovar.
>
> É a decisão humana que formalmente transiciona o estado para `DEMONSTRATED`."

**Visual na Tela 3 (Ação do Revisor):**
- Card do Revisor: `Mentor: Erick / JX`.
- Campo de justificativa preenchido: *"Síntese validada em apresentação oral ao board"*.
- Clique no botão de ação: **[Aprovar Competência & Assinar]**.
- Animação sutil de transição de estado de `UNDER_REVIEW` ➔ `DEMONSTRATED`.

---

## ⚡ Passo 5 — O Aha Moment: Handoff → Hash → Solana (2:00 – 2:30)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 4 — Certificado Imutável & Atestação On-Chain]**

> "Aqui acontece o Aha Moment do nosso produto.
>
> No instante em que o gestor aprova, o sistema gera o `ReviewedStateRecord` — o documento canônico que amarra: as evidências da Ana, a extração da IA e a assinatura humana do revisor.
>
> O documento fecha. E gera **um único hash SHA-256 definitivo**.
>
> Não expomos nenhum dado pessoal na blockchain. **Ancoramos apenas esse hash no Memo Program da Solana.**"

**Visual na Tela 4:**
- Certificado digital com design premium.
- Box de integridade criptográfica:
  - `Record Hash`: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
  - `Solana TX`: Link direto para o Solana Explorer (Devnet).
- O Erick clica no link e o Solana Explorer abre na tela, comprovando o hash gravado no bloco.

---

## 🔍 Passo 6 — Verificação Pública com 1 Clique (2:30 – 2:50)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 4 — Verificador Público Integrado]**

> "Como um recrutador, cliente ou auditor independente verifica isso sem precisar de login ou permissão?
>
> Basta acessar o verificador público e clicar em Verificar."

**Visual na Tela 4:**
- O Erick clica no botão **[Verificar Autenticidade On-Chain]**.
- A interface faz a chamada RPC na Solana Devnet e exibe instantaneamente:
  - Badge verde com check: `✅ ATESTAÇÃO VÁLIDA — CONFIRMADA NA SOLANA (SLOT #3129482)`.
  - Mostra que o hash do documento bate exatamente com o memo da blockchain.

---

## 🔴 Passo 7 — Anti-Fraude ao Vivo: Detecção de Adulteração (2:50 – 3:10)

**Quem fala:** Erick
**O que mostrar:** **[UI: Tela 4 — Simulação de Adulteração / Teste de Estresse]**

> "E se alguém tentar forjar uma credencial ou alterar os critérios aprovados depois do fato?"

**Ação na Tela 4:**
- O Erick clica no botão de demonstração: **[Simular Adulteração de Dados]** (que altera silenciosamente 1 caractere no registro local).
- O verificador roda novamente automaticamente.
- A tela acende um banner vermelho de segurança máxima:
  - `❌ ALERTA DE SEGURANÇA: FRAUDE DETECTADA`.
  - Mensagem: *"O hash dos dados locais não coincide com o registro imutável da Solana. O documento foi adulterado após a assinatura do revisor."*

> "O documento foi manipulado. O hash mudou. A Solana prova a fraude instantaneamente.
>
> Isso é confiança verificável matemática, e não apenas uma imagem de certificado que qualquer pessoa pode forjar no Photoshop."

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

## 🏛️ Pitch Oficial Colosseum (Banca Internacional — Inglês)

> Para uso na submissão, slides e pitch deck internacional:

### The Hook (0:00 – 0:30)
> *"Every company is spending millions training their workforce on AI. But in 2026, anyone can fake an AI certificate. The video completion rate only measures if someone left a browser tab open.*
>
> *How do enterprises actually verify who can solve real problems with AI versus who just watched videos?"*

### The Thesis
> *"Learning Competency is the verifiable proof engine for applied AI competencies. We don't issue vanity badges.*
>
> *We close the loop: **Real evidence → AI extraction → Human review → On-chain Solana attestation**."*

### The Execution & Proof
> *"Our MVP is live. We have 52 passing tests, a strict Zod-governed AI boundary, and live Devnet proof on Solana.*
>
> *We turn vague training into cryptographic, employer-verifiable competence."*

---

## 🎯 Guia de Entrevistas para o Erick (M4 — Validação de Demanda)

> **Regra de ouro nas conversas com RH/L&D:** Nunca comece falando de blockchain ou tokens. Foque 100% no fluxo de trabalho e na dor real do gestor.

### As 5 Perguntas de Ouro:

1. *"Hoje a empresa está investindo em treinar ou incentivar os colaboradores a usarem ferramentas de IA generativa (ChatGPT, Copilot, etc.)?"*
2. *"Como vocês avaliam se o funcionário realmente aprendeu a aplicar IA no trabalho ou se ele só concluiu as aulas passivamente?"*
3. *"Vocês sentem insegurança ou risco sobre como o time usa IA (ex: alucinações, falta de checagem, copiar e colar sem critério)?"*
4. *"Quanto tempo um gestor ou líder técnico gasta hoje para avaliar o trabalho prático de alguém que concluiu um treinamento?"*
5. *"Se vocês tivessem uma ferramenta que recebesse as evidências reais do trabalho (prompts, código, resultados), fizesse uma pré-análise com IA, deixasse o gestor aprovar em 2 minutos e gerasse uma prova verificável, vocês teriam interesse em rodar um projeto piloto com uma equipe de 5 a 10 pessoas?"*

### Como Registrar e Classificar o Sinal:
- **Dados do contato:** Nome, cargo, empresa, tamanho do time.
- **Frases exatas (quotes):** Ex.: *"Hoje a gente não tem como medir nada, só confiamos no certificado"*.
- **Classificação:**
  - **Sinal Fraco:** *"Muito legal a ideia."* (curiosidade sem compromisso)
  - **Sinal Forte:** *"Quero ver como funciona"*, *"Podemos rodar com meu time mês que vem"*, *"Me conecta com a equipe"*.
- **Destino:** Registrar em `docs/validation/DEMAND_VALIDATION.md`.

---

*"A pergunta que guiou cada decisão técnica foi: que evidência ainda falta para que um avaliador independente chegue à mesma conclusão sozinho? É essa pergunta que queremos continuar respondendo."*
