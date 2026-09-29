# Sprint de Execução 001 — Vertical Slice

**Data:** 29/09/2026  
**Fase:** 6 — VERTICAL SLICE  
**Objetivo:** sair da fundação documental e produzir os primeiros artefatos executáveis, evidências de demanda e a ponte técnica até a verificação.

## Regra deste sprint

Não abrir novas frentes de produto. Cada contribuição deve produzir código, teste, evidência de campo, decisão técnica ou integração verificável.

A ordem é:

```
GATE 0 — validar M1.1
       ↓
M2 — evidência + IA + revisão
       ↓
M3 — estado + attestation + Solana
       ↓
INTEGRAÇÃO — vertical slice
       ↓
M4 — validação + demo
```

M4.1 pode avançar em paralelo porque gera evidência externa e não depende da implementação completa.

## Ownership

| Frente | Owner | Papel neste sprint |
| --- | --- | --- |
| M1.1 / decisão do caso de uso | SH1W4 + time | fechar e preservar a hipótese operacional antes de alterações estruturais |
| M2 — evidência, IA e revisão | JP Carvalho / Joaopedro0s | implementar o fluxo técnico de evidência, interpretação, relação com competência, revisão e proveniência |
| M3 — estado, attestation e Solana | SH1W4 / JX | transformar o resultado revisado em estado verificável e implementar a ponte com Solana |
| M4.1 — validação de demanda | Erick / erickandregarcia-ai | produzir evidência externa estruturada |
| Interface — UX/UI do vertical slice | JP Fernandes | materializar o fluxo definido em telas, navegação, evidência, revisão, estado, attestation e verificação |
| Integração M2 → M3 → Interface → M4 | SH1W4 / JX | garantir coerência do vertical slice |

## Frente de Interface — JP Fernandes

**Status:** EXECUÇÃO A PARTIR DA DEFINIÇÃO PROGRESSIVA DO FLUXO  
**Owner:** JP Fernandes

Escopo inicial:

- I1 — mapear telas necessárias;
- I2 — definir fluxo de navegação;
- I3 — interface de evidência;
- I4 — interface de interpretação e revisão;
- I5 — visualização do estado;
- I6 — resultado, attestation e verificação;
- I7 — implementação da interface;
- I8 — validação do fluxo completo.

Regra: a interface materializa o fluxo definido pelo produto e pela arquitetura; não cria lógica de produto paralela.

## Execução imediata

### 1. GATE 0 — caso de uso

O M1 foi fechado como especificação operacional v0.1.

A referência canônica atual é:

- contexto organizacional definido;
- competência definida;
- trilha curta definida;
- contrato de evidência definido;
- estados mínimos definidos;
- cenário sintético de demonstração definido.

Qualquer alteração estrutural deve ser registrada como decisão explícita.

### 2. M2 — caminho crítico

JP Carvalho executa:

- M2.1 — ingestão de evidências;
- M2.2 — normalização/extração;
- M2.3 — contrato de saída da IA;
- M2.4 — relação evidência → competência;
- M2.5 — revisão humana;
- M2.6 — proveniência;
- M2.7 — testes críticos.

**Importante:** M2.5 não deve ser tratado como concluído antes de M2.4. A execução segue as dependências.

### 3. M3 — preparar e depois implementar

JX executa:

- M3.1 — estado mínimo;
- M3.2 — payload de attestation;
- M3.3 — mecanismo Solana;
- M3.4 — emissão;
- M3.5 — verificação;
- M3.6 — testes de integridade.

M3.1–M3.3 podem ter investigação/preparação antecipada, mas o modelo final deve respeitar o que M2 realmente produz.

### 4. Interface — materializar o fluxo

JP Fernandes trabalha sobre o contrato já definido por produto e arquitetura.

A interface deve tornar demonstrável:

```
EVIDÊNCIA
   ↓
INTERPRETAÇÃO
   ↓
REVISÃO
   ↓
ESTADO
   ↓
ATTESTATION
   ↓
VERIFICAÇÃO
```

A implementação visual deve priorizar clareza, rastreabilidade e capacidade de demonstrar o fluxo completo, sem introduzir novas regras de negócio.

### 5. M4 — validação externa em paralelo

Erick executa:

- M4.1 — entrevistas focadas;
- M4.2 — registro de sinais reais;
- preparação de M4.3 — alternativas/concorrentes.

Nenhuma percepção será registrada como validação sem fonte, contexto e data.

## Critério de saída do sprint

O sprint termina quando houver:

1. caso de uso definido o suficiente para implementação;
2. primeiro fluxo de evidência entrando no sistema;
3. interpretação de IA separada da evidência original;
4. revisão humana funcional ou demonstrável;
5. modelo de estado definido;
6. attestation mínima implementada ou com contrato técnico fechado;
7. caminho de verificação reproduzível;
8. primeiros sinais externos de demanda documentados;
9. testes críticos do fluxo;
10. interface suficiente para demonstrar o cenário canônico.

## O que NÃO faremos agora

- marketplace;
- LMS completo;
- recrutamento;
- tokenomics;
- dashboards complexos;
- múltiplos casos de uso;
- expansão para vários padrões de credenciais;
- novas camadas de documentação sem necessidade de decisão.

## Regra de conclusão

**Código sem teste não fecha a tarefa.  
Opinião sem fonte não vira validação.  
AI sem revisão não vira estado.  
Attestation sem verificação não fecha o fluxo.  
Interface sem fluxo definido não vira produto.**
