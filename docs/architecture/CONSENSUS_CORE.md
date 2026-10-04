# Consensus Core — Working Specification

## Objetivo

Reduzir a dependência de julgamento individual na transformação de evidências em estados de competência, exigindo convergência entre mecanismos de verificação independentes antes de atualizar o estado.

O Consensus Core não pretende eliminar julgamento humano. Ele desloca a intervenção humana para os casos em que as verificações são insuficientes, conflitantes ou exigem decisão contextual.

**Regra de independência:** o Deterministic Rule Check não consome sinais, confiança ou classificação produzidos pela IA. Ele opera diretamente sobre o contrato da competência, atividades, tipos de evidência e evidências presentes.

## Princípio

O sistema deve preferir:

**evidência + verificações independentes + regras explícitas → convergência → estado**

em vez de:

**evidência → interpretação individual → estado**

Consenso não é simplesmente contagem de votos. É convergência verificável entre mecanismos que observam aspectos diferentes do mesmo caso.

## Posição arquitetural

```
EVIDENCE
   ↓
┌─────────────────────────────────────────────┐
│ Independent Verification Mechanisms         │
│                                             │
│ • Evidence / Integrity Check                │
│ • Deterministic Rule Check                  │
│ • Statistical / Robustness Check             │
│ • AI Interpretation                          │
│ • Source / Provenance Check                  │
└─────────────────────────────────────────────┘
   ↓
CONSENSUS CORE
   ├── AGREEMENT → STATE UPDATE
   ├── INSUFFICIENT EVIDENCE → REQUEST / HOLD
   └── CONFLICT → HUMAN ADJUDICATION
   ↓
ATTESTATION
   ↓
VERIFICATION
```

## Mecanismos de Verificação Independentes (MVP)

O Consensus Core do MVP opera com **três** mecanismos de verificação distintos, separando rigidamente a validação estrutural da interpretação semântica:

### 1. Evidence Integrity Check (Estrutural)

Verifica a existência, origem identificável, integridade criptográfica (`sha256` recalculado e comparado com `contentHash`) e associação da evidência ao sujeito e atividade corretos. **Falha fechada (fail-closed)** em caso de qualquer adulteração pós-ingestão.

### 2. Deterministic Criteria Check (Estrutural)

Aplica regras objetivas e pré-definidas diretamente sobre os metadados e a estrutura da evidência canônica (ex: "a atividade C2 possui um artefato do tipo `analysis_artifact` vinculado?").

**Nota crítica:** Este verificador **não consome** sinais, confiança, resumos ou classificações geradas pela IA. Ele valida a *cobertura estrutural* exigida pelo contrato da competência.

### 3. AI Interpretation (Semântico)

Modelos de linguagem interpretam o conteúdo semântico da evidência (ex: "o briefing realmente formula uma pergunta analítica clara?"). A saída é tratada como um sinal interpretativo, não como autoridade final.

---

> **Nota sobre Statistical / Robustness Check:** A arquitetura prevê a adição futura de verificações estatísticas (tamanho de amostra, estabilidade, baseline) para cenários de múltiplas observações. No entanto, esta camada está explicitamente classificada como **Future Research / M4+** e não faz parte do escopo de verificação do MVP atual, que foca na trilha curta de evidência única.

## Consensus Core

O Consensus Core recebe os resultados dos mecanismos e aplica regras explícitas.

Cada resultado deve preservar:

`mechanism → input/reference → result → rationale → version → timestamp`

### Consensus outcomes

O Consensus Core deve distinguir os seguintes resultados canônicos:

- **AGREEMENT** — verificações compatíveis e requisitos satisfeitos;
- **INSUFFICIENT_EVIDENCE** — evidência ou robustez insuficiente;
- **CONFLICT** — verificações relevantes divergem;
- **HUMAN_ADJUDICATION** — decisão contextual necessária.

Esses são **resultados de consenso**, não estados operacionais de revisão.

O estado da competência não deve ser atualizado enquanto o caso estiver em `CONFLICT` ou `INSUFFICIENT_EVIDENCE`.

## Dimensões de convergência

O sistema não deve reduzir toda a decisão a um único score opaco.

Devem ser preservadas dimensões separadas, quando aplicáveis:

- integridade da evidência;
- aderência aos critérios;
- robustez dos dados;
- convergência interpretativa;
- qualidade/proveniência da fonte;
- requisitos de governança.

Uma regra de decisão pode exigir condições mínimas em cada dimensão.

## Papel humano

A intervenção humana não é uma etapa normal do pipeline. O Consensus Core existe precisamente para reduzir a dependência de revisão individual. **Human Adjudication** é a camada de exceção acionada somente quando:

- há conflito entre verificações;
- a evidência é ambígua;
- o critério depende de contexto não formalizado;
- há contestação;
- o impacto da decisão exige resolução adicional;
- as regras existentes não cobrem o caso.

A decisão de adjudicação deve preservar:

- responsável;
- evidências consideradas;
- critérios;
- justificativa;
- resultado;
- timestamp;
- versão das regras;
- referências às verificações anteriores.

Nenhuma verificação anterior deve ser apagada para produzir uma decisão final.

## O que o Consensus Core não afirma

O Consensus Core não prova:

- verdade absoluta;
- ausência de viés;
- mérito universal;
- competência em qualquer contexto;
- correção automática de avaliações subjetivas.

Ele reduz dependência de julgamento individual ao exigir múltiplas condições verificáveis e tornar divergências explícitas.

## Relação com Governance / Compliance

Governance / Compliance define as condições e regras sob as quais o Consensus Core pode produzir um resultado de processo.

```
GOVERNANCE / COMPLIANCE
        ↓
CONSENSUS CORE
        ↓
STATE UPDATE
```

A governança permanece responsável por:

- critérios de elegibilidade;
- independência;
- conflitos de interesse;
- regras de escalonamento;
- necessidade de adjudicação humana;
- versionamento das políticas.

O Consensus Core operacionaliza essas regras.

## Relação com Attestation

A atestação deve representar o estado produzido pelo processo e permitir reconstruir quais condições de governança e verificação sustentaram sua emissão.

O MVP não precisa colocar os resultados completos de todos os mecanismos on-chain. O registro local deve preservar o contexto necessário; a attestation pode carregar uma representação mínima e verificável desse contexto.

## MVP

A primeira implementação não precisa introduzir múltiplos modelos ou infraestrutura complexa.

O MVP pode começar com:

1. Evidence / Integrity Check;
2. Deterministic Rule Check;
3. AI Interpretation;
4. Governance / Compliance;
5. Consensus Core;
6. Human Adjudication somente quando necessário.

O Statistical / Robustness Check deve ser ativado quando a decisão depender de múltiplas observações ou inferências estatísticas.

## Evolução

A arquitetura deve permitir adicionar novos mecanismos sem alterar o conceito central:

`NEW VERIFIER → CONSENSUS CORE`

Isso permite substituir ou adicionar verificadores sem transformar qualquer mecanismo individual em autoridade absoluta.

## Questão de pesquisa

> Qual o menor conjunto de verificações independentes necessário para produzir um estado de competência suficientemente consistente, auditável e verificável, mantendo intervenção humana apenas onde a automação não é adequada?

## Interface boundary

The frontend exposes Consensus Core results and provenance but does not reproduce its rules. UI state must remain a projection of the domain decision; no frontend code may independently advance competency state or manufacture verification results.
