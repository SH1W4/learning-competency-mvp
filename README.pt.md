# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Aprendizado em competências com evidências reais" width="100%" />
</p>

<h3 align="center">Da evidência de aprendizagem ao estado verificável de competência.</h3>

<p align="center">
  <strong>Evidência → interpretação com IA → revisão humana → estado → prova</strong>
</p>

<p align="center">
  <a href="#o-problema">Problema</a> ·
  <a href="#a-prova">Prova</a> ·
  <a href="#o-que-construímos">Construímos</a> ·
  <a href="#status-atual">Status</a> ·
  <a href="README.md">English</a>
</p>

<p align="center">
  <a href="https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml"><img src="https://github.com/SH1W4/learning-competency-mvp/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/testes-52%20passando-success" alt="52 testes passando">
  <img src="https://img.shields.io/badge/Solana-Devnet-9945FF" alt="Solana Devnet">
</p>

---

## O problema

> **Um certificado mostra o que alguém concluiu.  
> Não necessariamente mostra o que essa pessoa consegue demonstrar.**

O Learning Competency explora uma mudança simples:

**de registrar conclusão → para representar evidências de competência demonstrada.**

O sistema conecta todo o caminho:

\`\`\`mermaid
flowchart LR
    A["Necessidade de competência"] --> B["Trilha de desenvolvimento"]
    B --> C["Evidência real"]
    C --> D["Interpretação com IA"]
    D --> E["Revisão humana"]
    E --> F["Estado de competência"]
    F --> G["Prova verificável"]
\`\`\`

---

## A ideia central

### A IA não decide competência.

**A IA propõe. Humanos decidem. Evidências sustentam o estado.**

| Evidência | Interpretação | Decisão | Prova |
|---|---|---|---|
| O que foi produzido | O que a IA extrai/relaciona | O que o revisor aceita | O que pode ser verificado |
| Dados de origem | Proposta da IA | Revisão humana | Atestação |
| Off-chain | Off-chain | Off-chain | Registro mínimo on-chain |

Essa separação é a base do MVP.

---

# O que construímos

## 01 — M1 · Caso de uso concreto

Um cenário corporativo de L&D para uma **competência de análise de dados**.

\`\`\`text
A1  Formular pergunta
 ↓
A2  Preparar dados
 ↓
A3  Reproduzir análise
 ↓
A4  Comunicar resultados
\`\`\`

Quatro critérios observáveis conectam as atividades à competência.

---

## 02 — M2 · Evidência → IA → Revisão humana

Pipeline completo em TypeScript/Node:

\`\`\`mermaid
flowchart LR
    A["INGESTÃO"] --> B["NORMALIZAÇÃO"]
    B --> C["EXTRAÇÃO"]
    C --> D["INTERPRETAÇÃO COM IA"]
    D --> E["RELAÇÃO"]
    E --> F["REVISÃO HUMANA"]
    F --> G["ESTADO DE COMPETÊNCIA"]
\`\`\`

**Restrição central:** a camada de IA não pode, sozinha, transicionar uma pessoa para \`DEMONSTRATED\`.

O resultado revisado torna-se um \`ReviewedStateRecord\` determinístico.

---

## 03 — M3 · Estado → Atestação → Solana

O handoff real do M2 é consumido pelo M3.

\`\`\`mermaid
flowchart LR
    A["ReviewedStateRecord"] --> B["record_hash"]
    B --> C["Atestação"]
    C --> D["Solana Devnet"]
    D --> E["Verificação"]
\`\`\`

### On-chain

- \`record_hash\`
- metadados mínimos da atestação
- \`subject_ref\` pseudônimo
- assinante da transação

### Off-chain

- evidências;
- interpretação;
- revisão humana;
- registro completo de estado;
- proveniência;
- dados sensíveis.

**Solana é uma camada de integridade — não o banco de dados dos dados de aprendizagem.**

---

# A prova

<div align="center">

### 52 testes · M1 → M2 → M3 · Devnet · handoff endurecido

</div>

| Ponto de prova | Status |
|---|:---:|
| Pipeline de evidências | ✅ |
| Contrato de IA | ✅ |
| Revisão humana | ✅ |
| Handoff determinístico | ✅ |
| Detecção de adulteração | ✅ |
| Validação do assinante | ✅ |
| Sujeito não exposto em texto aberto | ✅ |
| Atestação Solana | ✅ |
| Verificação on-chain | ✅ |
| Suíte de testes | **52/52** |

### Prova na Solana Devnet

**[Ver transação de referência no Solana Explorer →](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)**

> A transação é uma prova de referência da implementação M3.  
> O payload atual usa a versão \`m3.attestation.v2\`.

---

# Por que o vertical slice importa

O valor não está em um componente isolado.

Está na **rastreabilidade entre os componentes**:

\`\`\`mermaid
flowchart TB
    A["Evidência"] --> B["Interpretação com IA"]
    B --> C["Revisão humana"]
    C --> D["Estado de competência"]
    D --> E["Proveniência"]
    E --> F["Atestação"]
    F --> G["Verificação"]

    A -. "origem" .-> E
    C -. "decisão" .-> E
    D -. "estado" .-> E
\`\`\`

Um verificador pode perguntar:

> **Qual estado foi registrado?**  
> **Qual registro o produziu?**  
> **O registro foi alterado?**  
> **Quem o ancorou?**

A blockchain **não prova sozinha que a competência subjacente é verdadeira**. Ela fornece uma camada verificável de integridade sobre o estado registrado.

---

# Hardening M2 → M3

O handoff foi endurecido em três fronteiras:

<table>
<tr>
<td width="33%" align="center">

### Integridade

\`verifyHandoff()\`

Detecta adulteração do estado revisado antes da verificação.

</td>
<td width="33%" align="center">

### Autenticidade

\`ATTESTER_PUBKEY\`

Permite validar o assinante esperado da transação.

</td>
<td width="33%" align="center">

### Privacidade

\`subject_ref\`

Evita expor o sujeito em texto aberto on-chain.

</td>
</tr>
</table>

Testes dedicados cobrem adulteração, assinante incorreto, referência de sujeito incompatível e payload malformado.

---

# Arquitetura em uma visão

\`\`\`mermaid
flowchart TB
    subgraph OFF["OFF-CHAIN"]
        A["Evidências"]
        B["IA"]
        C["Revisão humana"]
        D["Estado de competência"]
        E["Proveniência"]
        A --> B --> C --> D --> E
    end

    E --> H["record_hash"]

    subgraph ON["ON-CHAIN · SOLANA"]
        H --> I["Atestação"]
        I --> J["Verificação"]
    end
\`\`\`

**Dados sensíveis permanecem off-chain.**

Somente a representação mínima necessária atravessa essa fronteira.

---

# Status atual

| Camada | Status |
|---|:---:|
| M1 — Caso de uso concreto | ✅ CONCLUÍDO |
| M2 — Evidência, IA e revisão | ✅ CONCLUÍDO |
| M3 — Atestação e Solana | ✅ CONCLUÍDO |
| Hardening M2 → M3 | ✅ CONCLUÍDO |
| Suíte de 52 testes | ✅ PASSANDO |
| Vertical slice técnico | ✅ COMPLETO |
| Feature freeze | 🔒 ATIVO |
| UX/UI | 🔄 EM ANDAMENTO |
| M4 — Validação / Demo | 🔄 EM ANDAMENTO |

### Próxima fronteira

A fundação técnica está congelada.

O projeto agora avança para:

**interface → demonstração → validação externa de demanda**

A separação é intencional: provar o núcleo antes de expandi-lo.

---

# O que este MVP afirma — e o que não afirma

### Ele demonstra

> Uma trilha de desenvolvimento de competência pode produzir evidências estruturadas que são interpretadas, revisadas, representadas como estado e ancoradas de forma que o registro resultante possa ser verificado posteriormente.

### Ele não afirma

- ser um LMS completo;
- substituir avaliação humana;
- ser um framework universal de competências;
- colocar dados sensíveis de aprendizagem on-chain;
- que blockchain valida a competência por si só;
- possuir um modelo definitivo de monetização.

---

# Quick Start

\`\`\`bash
npm install
npm test
npm run typecheck
npm run demo
\`\`\`

O demo padrão usa um provedor heurístico determinístico.

### Solana Devnet

\`\`\`bash
npm run m3:attest
npm run m3:verify <tx_signature> [record_hash]
\`\`\`

### Provedor LLM opcional

\`\`\`bash
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=...
\`\`\`

---

# Repositório

\`\`\`text
src/
├── ai/            contrato + provedor de IA
├── evidence/      ingestão + normalização + extração
├── relation/      evidência → competência
├── review/        revisão humana
├── state/         máquina de estados
├── provenance/    trace + handoff M2 → M3
├── solana/        atestação + verificação
├── domain/        tipos centrais
└── cli/           demo

tests/             52 testes
fixtures/          cenário sintético da Ana
docs/              produto + arquitetura + validação + diário técnico
\`\`\`

---

# Documentação

| Área | Recursos |
|---|---|
| **Produto** | [Contrato do MVP](docs/product/MVP_CONTRACT.md) · [Jornadas](docs/product/USER_JOURNEYS.md) · [Caso de uso](docs/product/USE_CASE.md) |
| **Arquitetura** | [Pipeline de evidências](docs/architecture/EVIDENCE_PIPELINE.md) · [Modelo de atestação](docs/architecture/ATTESTATION_MODEL.md) · [M2](docs/architecture/M2_IMPLEMENTATION.md) |
| **Mercado** | [Cenário competitivo](docs/market/COMPETITIVE_LANDSCAPE.md) · [GTM](docs/go-to-market/GTM.md) · [Validação de demanda](docs/validation/DEMAND_VALIDATION.md) |
| **Execução** | [Project Status](docs/PROJECT_STATUS.md) · [Papéis](docs/governance/TEAM_ROLES.md) · [Contribuição](CONTRIBUTING.md) |
| **Demo** | [Roteiro](docs/demo/DEMO_SCRIPT.md) |

---

# Equipe

| Pessoa | Contribuição central |
|---|---|
| **[Erick](https://github.com/erickandregarcia-ai)** | Pesquisa, contexto, mercado e operação |
| **[JP Carvalho](https://github.com/Joaopedro0s)** | M2 — pipeline de evidências, IA e revisão |
| **[JP Fernandes](https://github.com/JpFernandes77)** | Branding, UX/UI e interface |
| **[JX](https://github.com/SH1W4)** | Arquitetura, IA, evidências, atestação e Solana |

A equipe é deliberadamente multidisciplinar: **pesquisa, produto, interface e arquitetura técnica convergem em um único vertical slice.**

---

# Histórico do hackathon

**Início:** 25 de setembro de 2026.

O projeto evoluiu de uma ideia inicial de plataforma de microcredenciais para um vertical slice concreto, rastreável e verificável.

**M1 → M2 → M3 → Hardening → Feature Freeze**

---

## Licença

A licença e os termos de distribuição serão definidos antes da publicação de uma versão final.
