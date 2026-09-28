# Sprint de Execução 001 — Vertical Slice

**Data:** 28/09/2026  
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
| M1.1 / decisão do caso de uso | SH1W4 + time | fechar a hipótese antes de congelar regras |
| M2 — evidência, IA e revisão | Joaopedro0s | implementar o fluxo técnico de evidência e revisão |
| M3 — estado, attestation e Solana | SH1W4 | transformar o resultado revisado em estado verificável |
| M4.1 — validação de demanda | erickandregarcia-ai | produzir evidência externa estruturada |
| Integração M2 → M3 → M4 | SH1W4 | garantir coerência do vertical slice |

## Execução imediata

### 1. GATE 0 — fechar M1.1

**Antes de congelar implementação**, confirmar:

- contexto organizacional;
- problema;
- pessoa que executa a trilha;
- competência candidata;
- reviewer;
- cenário canônico.

**Saída:** decisão registrada ou alteração explícita da hipótese.

### 2. M2 — começar pelo caminho crítico

João executa:

- M2.1 — ingestão de evidências;
- M2.2 — normalização/extração;
- M2.3 — contrato de saída da IA;
- M2.4 — relação evidência → competência;
- M2.5 — revisão humana;
- M2.6 — proveniência;
- M2.7 — testes críticos.

**Importante:** M2.5 não deve ser tratado como concluído antes de M2.4. A mensagem de ownership é válida; a execução segue as dependências.

### 3. M3 — preparar e depois implementar

JX executa:

- M3.1 — estado mínimo;
- M3.2 — payload de attestation;
- M3.3 — mecanismo Solana;
- M3.4 — emissão;
- M3.5 — verificação;
- M3.6 — testes de integridade.

M3.1–M3.3 podem ter investigação/preparação antecipada, mas o modelo final deve respeitar o que M2 realmente produz.

O sistema de Attestations da Solana separa **Credential → Schema → Attestation**; schemas definem estrutura/versionamento e atestações são emitidas por signatários autorizados sob uma credencial. Isso deve orientar a implementação, sem transformar a documentação externa em requisito de produto além do necessário. citeturn0search7turn0search0turn0search2

### 4. M4 — validação externa em paralelo

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
10. um cenário canônico que possa virar demo.

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
Attestation sem verificação não fecha o fluxo.**
