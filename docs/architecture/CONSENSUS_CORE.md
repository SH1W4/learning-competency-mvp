# Consensus Core — Working Specification

## Objetivo

Reduzir a dependência de julgamento individual na transformação de evidências em estados de competência, exigindo convergência entre mecanismos de verificação independentes.

O Consensus Core não elimina julgamento humano. Casos conflitantes, insuficientes ou contextuais seguem para adjudicação.

## Regra de independência

Os mecanismos devem observar o caso por caminhos diferentes.

~~~text
EVIDENCE
  ├── Evidence / Integrity Check
  ├── Deterministic Rule Check
  ├── Statistical / Robustness Check
  └── AI Interpretation
             ↓
       CONSENSUS CORE
        ├─ AGREEMENT → STATE
        ├─ INSUFFICIENT_EVIDENCE → HOLD
        └─ CONFLICT → HUMAN ADJUDICATION
~~~

**Regra crítica:** o Deterministic Rule Check não pode consumir sinais, confiança ou classificação produzidos pela IA.

No MVP, ele consulta diretamente o contrato da competência, atividades exigidas, tipos de evidência aceitos, associação evidência → critério e presença/integridade das evidências.

## Mecanismos

### 1. Evidence / Integrity Check
Verifica diretamente existência de evidência elegível, hash de conteúdo e origem/proveniência mínima.

### 2. Deterministic Rule Check
Aplica regras previamente definidas sobre o domínio. Exemplo: C4 requer evidência de A4; existe evidência de A4; tipo de evidência é permitido para C4; PASS.

Nenhuma saída da IA participa desse cálculo.

### 3. AI Interpretation
Interpreta evidências e propõe relação com critérios. A IA continua sendo uma verificação interpretativa, não autoridade final.

### 4. Statistical / Robustness Check
Quando a conclusão depender de múltiplas observações, padrões ou inferências estatísticas, adiciona tamanho da amostra, período, cobertura, dependência, missingness, estabilidade, baseline/comparação, incerteza e independência das fontes.

## Resultado

Cada critério preserva os resultados individuais:

~~~text
criterion
├── evidence_integrity
├── deterministic_criteria
├── ai_interpretation
└── status
~~~

O estado global só pode avançar automaticamente quando todos os critérios alcançam AGREEMENT.

### AGREEMENT
Todos os mecanismos obrigatórios passam.

### INSUFFICIENT_EVIDENCE
A evidência ou as condições determinísticas não são suficientes.

### CONFLICT
As evidências determinísticas são suficientes, mas mecanismos relevantes divergem.

## Papel humano

A adjudicação humana é acionada quando existe conflito, ambiguidade, contexto não formalizado, contestação, impacto que exige revisão adicional ou regras que não cobrem o caso.

A decisão humana não apaga verificações anteriores.

## Attestation

A atestação representa o estado produzido pelo processo. Ela não afirma que blockchain, isoladamente, prova competência.

Dados sensíveis permanecem off-chain; a referência de integridade pode ser ancorada publicamente.

## Limites

Consensus não prova verdade absoluta, ausência de viés, mérito universal ou competência em qualquer contexto.

A tese é mais restrita:

> **reduzir dependência de julgamento individual por meio de evidências, regras explícitas e mecanismos independentes de verificação.**
