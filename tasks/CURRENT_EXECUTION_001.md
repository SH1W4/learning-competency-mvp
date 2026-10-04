# Sprint de Execução 001 — Vertical Slice

**Data:** 29/09/2026  
**Fase:** 6 — VERTICAL SLICE  
**Status:** execution / closing  
**Objetivo:** fechar o vertical slice reproduzível e converter a fundação técnica já concluída em prova pública, demo, validação externa e submissão coerente.

## Regra deste sprint

Não abrir novas frentes de produto. Cada contribuição deve produzir código, teste, evidência de campo, decisão técnica, integração verificável ou material de fechamento.

A ordem estratégica agora é:

```
PROVE
  ↓
DEMONSTRATE
  ↓
VALIDATE
  ↓
COMMUNICATE
  ↓
FINAL SUBMISSION
```

A referência estratégica para essa sequência é `docs/product/VICTORY_EXECUTION.md`.

## Estado atual

- M1 — DONE
- M2 — DONE
- M3 — DONE
- Feature Freeze — ATIVO
- Documentation Freeze — ATIVO
- Interface — execução
- M4 — execução / fechamento

A arquitetura canônica permanece:

```
Evidence
  ↓
AI Interpretation
  ↓
Independent Verification
  ↓
Consensus
  ↓
Competency State
  ↓
Attestation
  ↓
Public Verification

CONFLICT
  ↓
Human Adjudication
```

Human Adjudication é excepcional e não constitui uma etapa normal de revisão.

## Ownership

| Frente | Owner | Papel neste sprint |
| --- | --- | --- |
| M1 — caso de uso | SH1W4 + time | preservar a hipótese operacional já fechada |
| M2 — evidência, IA, verificação e consenso | JP Carvalho / Joaopedro0s | manter e apoiar a integridade do pipeline já concluído |
| M3 — estado, attestation e Solana | SH1W4 / JX | fechar a prova pública e integração necessária |
| M4 — validação de demanda | Erick / erickandregarcia-ai | produzir evidência externa estruturada |
| Interface — UX/UI | JP Fernandes | materializar o fluxo existente sem criar lógica paralela |
| Integração / fechamento | SH1W4 / JX | garantir coerência entre produto, prova, demo e submission |

## 1. PROVE — prova técnica pública

### P0.1 — Current Devnet proof

- gerar nova attestation `m3.attestation.v2` em Solana Devnet;
- executar a verificação correspondente;
- registrar transação, resultado e binding verificável;
- atualizar `docs/evaluation/04_DEMO_AND_PROOF.md`;
- atualizar o README com a prova pública atual.

**Done when:** existe uma prova atual, reproduzível e publicamente verificável, sem apresentar artefato histórico como prova corrente.

### P0.2 — Testes e integridade

Executar:

- `npm run typecheck`;
- `npm test`;
- verificação do fluxo M3;
- testes de falha/integridade relevantes.

**Done when:** CI/testes locais e o caminho de verificação suportam o estado que será demonstrado.

## 2. DEMONSTRATE — frontend e fluxo end-to-end

### P0.3 — Frontend

Implementar somente o necessário para tornar a arquitetura existente legível.

O frontend deve materializar:

```
EVIDENCE
   ↓
AI INTERPRETATION
   ↓
INDEPENDENT VERIFICATION
   ↓
CONSENSUS
   ↓
COMPETENCY STATE
   ↓
ATTESTATION
   ↓
PUBLIC VERIFICATION
```

Em caso de conflito:

```
CONFLICT
   ↓
HUMAN ADJUDICATION
```

A interface não cria novas regras de negócio, verificadores ou transições paralelas.

### P0.4 — Canonical demo

- executar o cenário sintético canônico;
- demonstrar o caminho completo;
- capturar as evidências técnicas necessárias;
- finalizar o roteiro em `docs/demo/DEMO_SCRIPT.md`.

**Done when:** outro membro da equipe consegue reproduzir a demonstração a partir de um setup limpo.

## 3. VALIDATE — buyer, wedge e demand

### P1.1 — First buyer / wedge

Identificar um buyer inicial e uma decisão recorrente.

Registrar:
- quem sente o problema;
- qual decisão está sendo tomada;
- evidência usada hoje;
- onde ocorre ambiguidade/trabalho manual;
- frequência;
- consequência de uma decisão ruim ou lenta.

### P1.2 — Demand signals

Executar entrevistas focadas e registrar:
- problem confirmation;
- buyer/wedge confirmation;
- interesse em piloto ou acesso a dados, quando existir;
- outros sinais externos verificáveis.

Nenhuma percepção vira validação sem fonte, contexto e data.

### P1.3 — Competitive landscape

Consolidar alternativas relevantes com fontes atuais, sem claims de diferenciação absoluta.

### P1.4 — Economic consequence / GTM

Testar a hipótese:

```
Evidence-backed competency
        ↓
Better decision
        ↓
Operational / financial consequence
```

Pricing, ROI e distribuição permanecem hipóteses até haver evidência externa.

## 4. COMMUNICATE — pitch e narrativa

### P1.5 — Pitch

Seguir:

```
PROBLEM
  ↓
INSIGHT
  ↓
MECHANISM
  ↓
PROOF
  ↓
VALUE
  ↓
WHY US
```

Mecanismo canônico:

> LASTRO turns evidence of work into a competency state that can be independently verified.

Blockchain deve ser apresentada como **integrity / attestation anchor**, não como autoridade sobre competência.

### P1.6 — Claims discipline

Não apresentar como fato:
- traction não comprovada;
- PMF;
- willingness to pay;
- ROI não validado;
- competência provada apenas pela blockchain;
- capacidade futura como capacidade atual.

## 5. FINAL SUBMISSION

### P2.1 — Repository / documentation audit

Revisar README, docs, tests, code, task status e demo contra o estado real.

### P2.2 — Submission freeze

Congelar:
- código;
- documentação pública;
- demo;
- pitch;
- prova pública;
- disclosures necessários.

**Done when:** GitHub, produto, validação, demo, pitch e submission contam a mesma história factual.

## O que NÃO faremos agora

- marketplace;
- LMS completo;
- recrutamento;
- tokenomics;
- dashboards complexos;
- múltiplos casos de uso;
- expansão para vários padrões de credenciais;
- novas camadas de arquitetura;
- novas camadas de documentação sem blocker concreto;
- implementação de Dynamic Role Architecture;
- segundo consenso semântico;
- dados sensíveis on-chain.

## Critério de saída do sprint

1. prova Devnet atual e verificável;
2. typecheck e testes críticos verdes;
3. fluxo end-to-end demonstrável;
4. frontend materializando a arquitetura real;
5. primeiros sinais externos de demanda documentados;
6. pitch e diferenciação alinhados às evidências;
7. repository audit concluído;
8. submission candidate congelado.

## Regra de conclusão

**Código sem teste não fecha a tarefa.**  
**Opinião sem fonte não vira validação.**  
**AI interpretation não vira estado por autoridade própria.**  
**Conflito segue para Human Adjudication como exceção.**  
**Attestation sem verificação não fecha o fluxo.**  
**Interface sem fluxo definido não vira produto.**  
**Documentação não será expandida sem blocker concreto.**