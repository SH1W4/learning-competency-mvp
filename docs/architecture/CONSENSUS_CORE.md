# Consensus Core — Working Specification

## Objetivo

Reduzir a dependência de julgamento individual na transformação de evidências em estados de competência, exigindo convergência entre mecanismos de verificação independentes antes de atualizar o estado.

O Consensus Core não pretende eliminar julgamento humano. Ele desloca a intervenção humana para os casos em que as verificações são insuficientes, conflitantes ou exigem decisão contextual.

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

## Mecanismos de verificação

### 1. Evidence / Integrity Check

Verifica se a evidência:

- existe;
- possui origem identificável;
- está associada ao sujeito correto;
- possui integridade preservada;
- contém os elementos mínimos exigidos pelo critério.

### 2. Deterministic Rule Check

Aplica critérios objetivos e previamente definidos.

Exemplos:

- requisitos mínimos presentes;
- formato válido;
- quantidade mínima de evidências;
- critérios observáveis satisfeitos;
- condições obrigatórias cumpridas.

Quando uma decisão puder ser expressa como regra determinística, ela não deve depender de interpretação humana desnecessária.

### 3. Statistical / Robustness Check

Quando a conclusão depender de padrões ou múltiplas observações, verifica:

- tamanho da amostra;
- período observado;
- cobertura;
- dependência entre observações;
- missingness;
- estabilidade;
- comparação ou baseline quando aplicável;
- incerteza;
- qualidade e independência das fontes.

A ausência de robustez deve produzir **INSUFFICIENT_EVIDENCE**, e não uma conclusão artificialmente precisa.

### 4. AI Interpretation

Modelos podem:

- interpretar evidências;
- relacionar evidências a critérios;
- detectar inconsistências;
- propor classificação;
- identificar lacunas;
- solicitar evidência adicional.

A saída do modelo é uma **verificação interpretativa**, não uma autoridade final.

Quando possível, interpretações independentes podem ser comparadas para identificar convergência ou divergência.

## Consensus Core

O Consensus Core recebe os resultados dos mecanismos e aplica regras explícitas.

Cada resultado deve preservar:

`mechanism → input/reference → result → rationale → version → timestamp`

O núcleo deve distinguir pelo menos:

- **AGREEMENT** — verificações compatíveis e requisitos satisfeitos;
- **INSUFFICIENT_EVIDENCE** — evidência ou robustez insuficiente;
- **CONFLICT** — verificações relevantes divergem;
- **HUMAN_ADJUDICATION** — decisão contextual necessária.

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

O humano passa de mecanismo padrão de decisão para **camada de exceção e adjudicação**.

A intervenção humana é apropriada quando:

- há conflito entre verificações;
- a evidência é ambígua;
- o critério depende de contexto não formalizado;
- há contestação;
- o impacto da decisão exige revisão adicional;
- as regras existentes não cobrem o caso.

A decisão humana deve preservar:

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
- necessidade de revisão humana;
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
