> **Nota de manutenção (2026-10-02):** este documento contém decisões e exemplos de interface de uma etapa anterior. Não use seus nomes de competência, modelos de credencial, hashes ou formatos de saída como contrato atual sem conferir as fontes canônicas do repositório.

# #03 — Guia de Integração Técnica & Blueprint de Frontend: Learning Competency MVP

**Documento:** 03 / Handoff de Arquitetura & Especificação de Integração  
**Projeto:** Learning Competency MVP  
**Design System de Referência:** Proposta LASTRO v0.1 (JP Fernandes — pendente de deliberação pela equipe)  
**Pasta:** `00_INDENTIDADE_&_INTERFACE` & `07_ANALISE_PARTICIPANTES/JX`  
**Data-base:** 01 de Outubro de 2026  
**Público-alvo:** JP Fernandes (UX/UI & Design), Erick (Produto, Pitch & Roteiro de Demo) e JX e JP Carvalho (Arquitetura, Backend & Suporte Técnico)  
**Status:** HISTÓRICO — referência de colaboração; não é a especificação técnica canônica. Para o contrato atual, use `docs/product/USE_CASE.md`, `src/domain/useCase.ts` e a documentação de arquitetura.  

---

## 🎯 1. Propósito deste Guia: Apoiar e Desbloquear, sem Engessar

O backend do **Learning Competency MVP** está **100% implementado, congelado e testado** (suíte atual de 62 testes no Vitest cobrindo ingestão, proveniência determinística, contratos Zod e atestação on-chain na Solana Devnet via Memo Program).

O objetivo deste documento **não é prescrever como a interface deve ser desenhada ou como o vídeo deve ser gravado** — a sensibilidade visual pertence ao **JP Fernandes** e a narrativa do produto pertence ao **Erick**.

O papel deste guia é atuar como uma **ponte de engenharia**:
1. Entregar os **contratos de dados reais** gerados pelo backend para que o frontend consuma dados vivos sem precisar inventar mocks arbitrários.
2. Oferecer uma **sugestão de jornada de 4 momentos**, alinhada ao tempo de 3 minutos da Colosseum, servindo como ponto de partida ou inspiração.
3. Consolidar os **tokens e a gramática visual** concebidos pelo próprio JP Fernandes em seu documento de identidade, facilitando a consulta rápida.

> **Princípio de Colaboração:**  
> *Rigor matemático e fidelidade aos dados no motor; total liberdade criativa e estética na ponta.*

---

## 🗺️ 2. Jornada Narrativa da Demonstração (Sugestão em 4 Momentos)

Para apoiar o Erick na gravação do vídeo de 3 minutos e o JP Fernandes na organização do fluxo, desenhamos uma proposta de jornada dividida em 4 momentos. 

*Fiquem à vontade para unir telas, usar modais, abas, split-screen ou scroll contínuo conforme acharem esteticamente mais potente.*

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│        MOMENTO 1        │     │        MOMENTO 2        │     │        MOMENTO 3        │     │        MOMENTO 4        │
│   Catálogo da Empresa   │ ──► │  Espaço da Colaboradora │ ──► │   Painel do Avaliador   │ ──► │  Certificado Verificável│
│ (Critérios Observáveis) │     │ (Evidências Reais .md)  │     │ (IA Sugere / Humano OK) │     │ (Solana Memo Anti-Fraude)
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

---

## 🖥️ 3. Blueprint de Referência dos 4 Momentos

### 🔹 MOMENTO 1 — A Visão da Empresa: O Fim do "Curso de Prateleira"
* **O que a cena precisa transmitir:** Que a organização não avalia funcionários por "horas de vídeo assistidas", mas por critérios técnicos observáveis no trabalho real.
* **Dados fornecidos pelo backend:**
  * Competência: `Engenharia de Prompt para Análise de Dados Financeiros`
  * Critérios C1 a C4 (definidos em `src/domain/useCase.ts`):
    * **C1:** Estruturação de Prompts Complexos com Contexto
    * **C2:** Prevenção e Tratamento de Alucinações
    * **C3:** Otimização Iterativa de Consultas
    * **C4:** Documentação e Rastreabilidade do Raciocínio da IA
* **Ideia de composição visual (Sugestão):** Card institucional escuro com os critérios listados, badges de status neutros e um indicador visual de que a organização audita competências baseadas em evidências.

---

### 🔹 MOMENTO 2 — A Submissão da Colaboradora (Ana)
* **O que a cena precisa transmitir:** A colaboradora não preenche um questionário de múltipla escolha. Ela submete artefatos de trabalho genuínos (código, relatórios, notebooks).
* **Dados fornecidos pelo backend (`fixtures/synthetic/ana/`):**
  * Colaboradora: **Ana** (Cientista de Dados Júnior / FinTech)
  * Artefatos submetidos:
    * `a1_briefing.md` (Contextualização do pipeline financeiro)
    * `a2_preparacao.ipynb` (Limpeza e sanitização dos dados)
    * `a3_analise.ipynb` (Prompt chaining com verificação cruzada de alucinação)
    * `a4_sintese.md` (Relatório executivo final)
* **Ideia de composição visual (Sugestão):** Cards de arquivo com metadados reais (linhas de código, tipo de arquivo, hash preliminar do artefato), transmitindo a sensação de um ambiente de trabalho profissional e autêntico.

---

### 🔹 MOMENTO 3 — O Coração do Produto: IA Sugere, Humano Arbitra
* **O que a cena precisa transmitir (O "Aha Moment"):** A IA analisa e correlaciona as evidências, mas **não tem autoridade para emitir o certificado**. A decisão soberana é humana.
* **Dados fornecidos pelo backend (`out/reviewed-state.json` — Motor M2):**
  * Sugestão da IA para os critérios C1 a C4 (ex.: C1, C2 e C4 demonstrados; C3 requereu evidência complementar).
  * Decisão humana do revisor: aprovação fundamentada com justificativa técnica.
  * Assinatura do revisor: `Revisor Sênior: Carlos Eduardo (Tech Lead)`
* **Gramática visual recomendada (do Design System do JP Fernandes):**
  * **Sugestão da IA:** Cards com visual provisório / tracejado (`border: 1px dashed var(--b-med)`).
  * **Decisão Humana:** Contorno sólido e definitivo (`border: 1px solid var(--b-high)`).
  * **Botões de Ação do Revisor:** Aprovar, Rejeitar, Solicitar Evidência.

---

### 🔹 MOMENTO 4 — A Prova Matemática: Verificação On-Chain & Anti-Fraude
* **O que a cena precisa transmitir:** A credencial não é uma imagem PNG nem um PDF falsificável. Ela possui lastro criptográfico imutável registrado na Solana Devnet.
* **Dados fornecidos pelo backend (`out/attestation.json` — Motor M3):**
  * `credentialId`: `cred_ana_fintech_2026_c1_c4`
  * `merkleRoot` / `sha256Hash`: Hash determinístico das evidências e da decisão humana.
  * `solanaTxSignature`: Hash real da transação na Solana Devnet.
  * Link direto do Explorer:  
    `https://explorer.solana.com/tx/<signature>?cluster=devnet`
* **Destaque Visual:**
  * **O Azul Prova (`#1683FF`):** Aplicado com exclusividade no botão ou badge de verificação on-chain, coroando a credencial como auditada e matematicamente incontestável.
  * **Interação Anti-Fraude (Opcional, se o time curtir):** Um botão de simulação "Testar Violação / Fraude" que altera 1 byte de um artefato e mostra o hash divergindo instantaneamente, provando a robustez da solução.

---

## 🎨 4. Guia Rápido de Tokens (Extraídos da Proposta de JP Fernandes)

Para conveniência de implementação do frontend, compilamos aqui os tokens centrais definidos no documento de identidade do JP Fernandes (`#00_LASTRO — Identidade v0.1.html`):

### 1. Paleta de Superfície e Contraste
```css
:root {
  /* Fundo e superfícies */
  --bg-deep:      #080809;   /* Fundo da aplicação */
  --bg-card:      #0F0F11;   /* Cards de conteúdo */
  --bg-hover:     #17171A;   /* Estados interativos */

  /* Linhas e separadores */
  --b-low:        #1A1A1E;   /* Bordas sutis */
  --b-med:        #26262B;   /* Divisórias de seção */
  --b-high:       #3A3A42;   /* Bordas ativas / foco */

  /* Tipografia */
  --t-hi:         #EDEDEE;   /* Títulos e textos de destaque */
  --t-med:        #9E9EA4;   /* Texto de corpo e rótulos */
  --t-dim:        #5C5C64;   /* Metadados, hashes e timestamps */

  /* A Cor da Prova (Uso reservado para atestação/Solana) */
  --blue-proof:   #1683FF;   /* Azul Prova — a certeza criptográfica */
  --blue-glow:    rgba(22, 131, 255, 0.15);
}
```

### 2. A Regra Semiótica das Bordas (Lógica da Proposta Visual)
* `Dashed` (Tracejado): Trabalho da IA ou estado pendente/sugerido.
* `Solid Cinza`: Ações e artefatos de trabalho da colaboradora.
* `Solid Branco / Alto Contraste`: Atesto e decisão soberana humana.
* `Azul #1683FF`: Registro on-chain consolidado na Solana.

---

## 📦 5. Contratos de Dados (Como Conectar Frontend ao Backend)

O backend do repositório já gera os arquivos JSON prontos após a execução do pipeline. Para rodar o pipeline e gerar os arquivos em `/out`:

```bash
npm run demo
```

Isso gera dois arquivos que o frontend pode ler diretamente via `fetch` local ou importar como JSON estático:

1. **`out/reviewed-state.json` (Produzido pelo M2 / JP Carvalho):**  
   Contém o array de evidências com hashes SHA-256, os critérios avaliados e a decisão final do revisor.
2. **`out/attestation.json` (Produzido pelo M3 / JX):**  
   Contém o identificador da credencial, o timestamp ISO, o payload serializado e a assinatura da transação na Solana Devnet.

---

## 🎬 6. Requisitos Técnicos & Dicas para a Demonstração (Colosseum)

Recomendações técnicas focadas exclusivamente nas regras de avaliação da banca da Colosseum:

1. ⏱️ **Teto Inegociável de 3 Minutos:**  
   O comitê da Colosseum desqualifica ou penaliza severamente vídeos que ultrapassam 3 minutos. O ritmo da interface deve permitir que o Erick mostre a transição da dor (mercado) para a solução (prova on-chain) dentro dessa janela.
2. 🔍 **Legibilidade de Hashes e Telas:**  
   Como a banca avaliará o produto em vídeo, elementos com hashes ou código (como a transação da Solana e o explorer) devem ter bom tamanho de fonte e contraste nítido em 1080p.
3. 🎯 **O Ponto Crítico para os Jurados:**  
   Os jurados de Web3 costumam desconfiar de certificados em blockchain puramente decorativos. O valor único do nosso produto é demonstrar que **a blockchain armazena a prova da auditoria humana e dos artefatos reais**, e não apenas um crachá vazio.

---

## 🏁 7. Divisão de Papéis & Sinergia da Equipe

* **UX/UI, Design System & Frontend:** **JP Fernandes**  
  *Autonomia total sobre o desenho das interfaces, paleta, micro-interações e implementação do código visual.*
* **Produto, Narrativa & Pitch:** **Erick**  
  *Autonomia total sobre a narrativa da demo, roteiro de gravação e condução do pitch para investidores e banca.*
* **M2 — Camada de Revisão Humana:** **JP Carvalho**  
  *Responsável pelo motor do M2, contratos de evidência, lógica de revisão e integridade do `reviewed-state.json`.*
* **Arquitetura, M1, M3 & Solana:** **JX**  
  *Responsável pelo pipeline de proveniência determinística, atestação on-chain na Solana, suíte de 44 testes e suporte contínuo de engenharia para o time.*
