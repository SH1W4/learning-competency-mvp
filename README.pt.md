# Learning Competency MVP

<p align="center">
  <img src="docs/assets/7A10DC72-A671-4078-B967-0AEC89CD7E95.png" alt="Learning Competency — Aprendizado em competências com evidências reais" width="100%" />
</p>

> **Aprender → produzir evidências → interpretar → revisar → representar o estado → verificar.**

**MVP experimental para desenvolvimento de competências, organização de evidências de aprendizagem, interpretação assistida por IA e produção de atestação verificável em Solana.**

**Idioma principal:** Português (Brasil) · [English version](README.md)

---

## Visão geral

O **Learning Competency MVP** investiga uma pergunta central:

> **Como uma organização transforma uma necessidade de competência em uma trilha de desenvolvimento, captura evidências produzidas por uma pessoa, interpreta essas evidências com apoio de IA e revisão humana e representa, de forma verificável, o estado dessa evolução?**

O repositório é a **base técnica de execução** do MVP.

O projeto está sendo construído de forma deliberadamente pequena: o objetivo não é criar uma plataforma completa de aprendizagem, mas provar um fluxo vertical, rastreável e verificável de ponta a ponta.

---

## O fluxo central

```text
ORGANIZAÇÃO / PROGRAMA
        ↓
COMPETÊNCIA DESEJADA
        ↓
TRILHA CURTA
        ↓
PESSOA
        ↓
ATIVIDADES
        ↓
EVIDÊNCIAS
        ↓
INTERPRETAÇÃO COM IA
        ↓
REVISÃO HUMANA
        ↓
ESTADO DE COMPETÊNCIA
        ↓
ATTESTATION / PROVA
        ↓
SOLANA
        ↓
VERIFICAÇÃO
```

Esse é o **fluxo que o MVP precisa provar**.

Qualquer funcionalidade que não contribua diretamente para demonstrá-lo permanece fora da implementação até que exista uma decisão explícita para incluí-la.

---

## O que estamos construindo

O MVP conecta cinco elementos que normalmente aparecem separados:

- **Necessidade organizacional** — qual competência precisa ser desenvolvida.
- **Desenvolvimento** — uma trilha curta com atividades concretas.
- **Evidências** — aquilo que a pessoa efetivamente produz durante o processo.
- **Interpretação e revisão** — IA organiza e relaciona as evidências; uma pessoa revisa a interpretação.
- **Estado verificável** — o resultado da revisão pode gerar uma representação de estado e uma atestação verificável.

A hipótese central é que o valor não está apenas em registrar cursos ou certificados, mas em **fechar o ciclo entre necessidade de competência, desenvolvimento, evidência, interpretação, revisão e verificação**.

---

## Princípios do MVP

### 1. Evidência não é interpretação

O sistema mantém separados:

```text
evidência
   ↓
extração
   ↓
interpretação
   ↓
revisão humana
   ↓
estado de competência
   ↓
verificação
```

A origem dos dados deve permanecer distinguível daquilo que foi inferido ou organizado pela IA.

### 2. IA não é autoridade institucional

A IA pode:

- estruturar evidências;
- extrair informações;
- relacionar evidências a competências;
- sintetizar sinais de desenvolvimento;
- identificar inconsistências;
- indicar pontos que precisam de revisão.

A IA não deve declarar, por conta própria, reconhecimento oficial, acreditação ou verificação institucional.

### 3. A revisão humana é explícita

A revisão humana faz parte do fluxo do produto.

O revisor pode:

- aceitar uma interpretação;
- corrigir uma interpretação;
- rejeitar uma interpretação;
- solicitar novas evidências.

### 4. Verificação é diferente de inferência

O MVP utiliza uma escala conceitual de confiança:

- **N1 — Autodeclarado**
- **N2 — Evidência apresentada**
- **N3 — Evidência analisada**
- **N4 — Fonte verificada**

A IA pode apoiar os níveis N1–N3. O nível N4 exige um mecanismo externo de verificação autenticada.

### 5. Solana é uma camada de integridade

Solana é explorada como infraestrutura para:

- atestação;
- integridade;
- registro de estado ou evento;
- verificabilidade.

Documentos sensíveis e dados pessoais brutos permanecem fora da cadeia.

O mecanismo e o esquema finais de atestação ainda precisam ser validados antes de serem considerados definitivos.

---

## Limites do MVP

### Dentro do escopo

- uma competência concreta;
- uma trilha curta e controlada;
- uma pessoa;
- poucos tipos de evidência;
- ingestão e normalização de evidências;
- interpretação assistida por IA;
- revisão humana;
- representação mínima de estado de competência;
- objeto mínimo de atestação/prova;
- integração com Solana;
- caminho simples de verificação;
- testes do fluxo crítico.

### Fora do escopo atual

- LMS completo;
- marketplace de cursos;
- plataforma de recrutamento;
- catálogo amplo de cursos;
- integrações institucionais extensas;
- metodologia universal de competências;
- múltiplos mercados simultaneamente;
- modelo definitivo de monetização;
- documentos pessoais sensíveis diretamente na cadeia;
- automações ou agentes que não sejam necessários para provar o fluxo.

Esses itens podem permanecer como hipóteses ou possibilidades futuras, mas não são requisitos da implementação atual.

---

## Arquitetura

```text
ORGANIZAÇÃO
     ↓
COMPETÊNCIA
     ↓
TRILHA
     ↓
EVIDÊNCIA
     ↓
PIPELINE DE EVIDÊNCIAS
     ↓
REVISÃO HUMANA
     ↓
ESTADO DE COMPETÊNCIA
     ↓
ATTESTATION
     ↓
SOLANA
     ↓
VERIFICAÇÃO
```

### Pipeline de evidências

```text
INGESTÃO
   ↓
NORMALIZAÇÃO
   ↓
EXTRAÇÃO
   ↓
INTERPRETAÇÃO
   ↓
RELAÇÃO COM A COMPETÊNCIA
   ↓
REVISÃO
   ↓
ATUALIZAÇÃO DO ESTADO
   ↓
ATTESTATION
   ↓
VERIFICAÇÃO
```

O pipeline preserva a proveniência e diferencia:

- dado de origem;
- informação extraída;
- interpretação produzida pela IA;
- decisão da revisão humana;
- estado resultante;
- atestação registrada.

---

## Como trabalhar neste repositório

Antes de implementar:

1. Leia a [Skill do projeto](skills/learning-competency/SKILL.md).
2. Consulte a pasta [`tasks/`](tasks/).
3. Leia a documentação relacionada à tarefa assumida.
4. Verifique as dependências e decisões ainda pendentes.
5. Implemente apenas o necessário para avançar o fluxo.
6. Adicione ou atualize os testes.
7. Registre decisões arquiteturais relevantes.
8. Mantenha hipóteses não validadas fora da implementação.

### Mapa operacional

| Diretório | Função |
|---|---|
| `tasks/` | O que precisa ser feito |
| `docs/` | Como produto, arquitetura e operação estão definidos |
| `skills/` | Contexto e regras operacionais do projeto |
| `src/` | Implementação |
| `tests/` | Validação |
| `CONTRIBUTING.md` | Regras de contribuição |

---

## Mapa de execução

O desenvolvimento está organizado em quatro marcos:

### M1 — Caso de uso concreto

Definir:

- contexto organizacional;
- competência;
- trilha;
- contrato de evidência;
- estados mínimos;
- cenário da demonstração.

### M2 — Evidência, IA e revisão

Implementar:

- ingestão;
- normalização e extração;
- contrato de saída da IA;
- relação com a competência;
- revisão humana;
- proveniência;
- testes críticos.

### M3 — Estado, atestação e Solana

Fechar e implementar:

- modelo de estado;
- carga de atestação;
- mecanismo Solana;
- registro;
- verificação;
- testes de integridade e falha.

### M4 — Validação, demonstração e submissão

Executar:

- entrevistas;
- validação de demanda;
- pesquisa competitiva;
- hipótese de entrada no mercado;
- demonstração reproduzível;
- apresentação;
- auditoria do repositório;
- preparação da submissão.

Consulte [`tasks/README.md`](tasks/README.md) para o mapa completo.

---

## Documentação

### Produto

- [Contrato do MVP](docs/product/MVP_CONTRACT.md)
- [Jornadas dos usuários](docs/product/USER_JOURNEYS.md)
- [Caso de uso](docs/product/USE_CASE.md)

### Arquitetura

- [Pipeline de evidências](docs/architecture/EVIDENCE_PIPELINE.md)
- [Modelo de atestação](docs/architecture/ATTESTATION_MODEL.md)
- [Arquitetura técnica](docs/architecture/TECHNICAL_ARCHITECTURE.md)

### Mercado e entrada no mercado

- [Cenário competitivo](docs/market/COMPETITIVE_LANDSCAPE.md)
- [Modelo de entrada no mercado](docs/go-to-market/GTM.md)
- [Validação de demanda](docs/validation/DEMAND_VALIDATION.md)

### Governança e execução

- [Status do projeto](docs/PROJECT_STATUS.md)
- [Papéis e governança de decisões](docs/governance/TEAM_ROLES.md)
- [Contribuição](CONTRIBUTING.md)
- [Skill do projeto](skills/learning-competency/SKILL.md)

### Hackathon e demonstração

- [Estrutura de execução do hackathon](docs/hackathon/README.md)
- [Roteiro da demonstração](docs/demo/DEMO_SCRIPT.md)

### Identidade

- [Diretrizes de identidade](docs/brand/README.md)
- [Rascunho do manual de marca](docs/brand/BRANDBOOK_DRAFT.md)
- [Exploração de nomes](docs/brand/NAMING_EXPLORATION.md)

---

## Regra de implementação

Uma funcionalidade pertence ao MVP somente se ajudar a provar o fluxo central.

Antes de implementar uma mudança, responda:

1. **Qual parte do fluxo ela habilita?**
2. **Que evidência demonstrará que funciona?**
3. **Qual hipótese de produto ela introduz?**
4. **Pode ser adiada sem comprometer a demonstração?**

Se a resposta não estiver clara, a mudança deve permanecer fora do MVP.

---

## Estrutura do repositório

```text
.
├── docs/
│   ├── product/
│   ├── architecture/
│   ├── market/
│   ├── go-to-market/
│   ├── governance/
│   ├── decisions/
│   ├── hackathon/
│   ├── validation/
│   ├── demo/
│   ├── brand/
│   └── PROJECT_STATUS.md
├── skills/
│   └── learning-competency/
│       └── SKILL.md
├── tasks/
├── src/
├── tests/
└── CONTRIBUTING.md
```

---

## Contexto e fonte de verdade

O projeto possui dois espaços complementares:

**Contexto do produto**

- pesquisa;
- registros de reuniões;
- evolução da tese;
- análise de produto;
- referências;
- decisões e alinhamentos da equipe.

**GitHub — execução técnica**

- código;
- testes;
- especificações de implementação;
- arquitetura validada;
- tarefas;
- issues e pull requests;
- histórico técnico.

A regra é:

> **A pesquisa informa a implementação. Uma decisão validada autoriza a implementação.**

---

## O que provamos

### M1 — Caso de Uso Concreto ✅ CONCLUÍDO
- Caso de uso canônico: competência de análise de dados em programa corporativo de L&D.
- Trilha curta: A1 (formular pergunta) → A2 (preparar dados) → A3 (reproduzir análise) → A4 (comunicar resultados).
- Quatro critérios observáveis: C1 (formulação), C2 (tratamento/análise), C3 (evidência), C4 (comunicação).

### M2 — Evidência, IA e Revisão ✅ CONCLUÍDO
- Pipeline completo em TypeScript/Node: ingestão → normalização → extração → interpretação → relação → revisão → estado.
- Contrato estrito de IA via `zod`: IA propõe, **nunca** decide `DEMONSTRATED`.
- 44 testes cobrindo o caminho crítico — todos passando.
- Handoff (`ReviewedStateRecord`) pronto para consumo pelo M3.

### M3 — Estado, Atestação e Solana ✅ CONCLUÍDO (Devnet)
- `src/solana/attest.ts`: registra atestação via SPL Memo Program (padrão de armazenamento off-chain).
- `src/solana/verify.ts`: dado um `record_hash` e `tx_signature`, confirma a prova on-chain.

> 🔗 **Prova ao vivo na Solana Devnet:**  
> [`27hwuMbf5SxA...3y3U`](https://explorer.solana.com/tx/27hwuMbf5SxAERnHa277vFLUzkutqHFkp85dmNQ2TpeVsvMw5EASoShbtipn6EqzPK15GurpJuuXE1KtCYhr3y3U?cluster=devnet)

### Interface — UX/UI ⏳ EM ANDAMENTO
- Responsável: [JP Fernandes](https://github.com/JpFernandes77).

### M4 — Validação, Demo e Submissão ⏳ EM ANDAMENTO
- Validação de demanda: [Erick](https://github.com/erickandregarcia-ai).
- Roteiro de demo: [`docs/demo/DEMO_SCRIPT.md`](docs/demo/DEMO_SCRIPT.md).

O estado detalhado do projeto está em [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md).  
Consulte também a [Análise Sistemática do Dataroom](docs/hackathon/DATAROOM_ANALYSIS.md) e o [Diário de Bordo](docs/diario-de-bordo/).

---

## Equipe

A equipe foi formada deliberadamente com perfis complementares:

| Pessoa | Contribuição central | Por que importa |
|---|---|---|
| **[Erick](https://github.com/erickandregarcia-ai)** | Pesquisa, contexto, mercado e operação | Transforma sinais externos em requisitos; garante que o produto não perde contato com o problema real |
| **[JP Carvalho](https://github.com/Joaopedro0s)** | M2 — pipeline de evidência, IA e revisão | Materializa o fluxo central em código testável e rastreável |
| **[JP Fernandes](https://github.com/JpFernandes77)** | Branding, UX/UI e interface | Torna o produto visível e compreensível para quem não vai clonar o repositório |
| **[JX](https://github.com/SH1W4)** | Arquitetura, IA, evidências, attestation e Solana | Conecta a tese técnica ao modelo de integridade e verificabilidade on-chain |

Nenhuma dessas contribuições substitui as outras. O valor está na combinação.

---

## Histórico da competição

**Hackathon iniciado:** 25 de setembro de 2026.

**O que existia antes do hackathon:** apenas a ideia inicial de uma plataforma de microcredenciais.

**O que foi construído durante o hackathon:**
- M1: definição do caso de uso canônico e contratos de evidência
- M2: pipeline completo em TypeScript (ingestão → IA → revisão humana → estado), 44 testes
- M3: infraestrutura de atestação na Solana (Memo Program, off-chain storage pattern, verificação on-chain)
- Governança operacional v1.0
- Diário de Bordo com rastreabilidade de decisões

---

## Licença

A licença e os termos de distribuição do projeto serão definidos antes da publicação de uma versão final.