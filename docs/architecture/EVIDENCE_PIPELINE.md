# Evidence Pipeline

## Objetivo

Separar claramente fonte, extração, interpretação, revisão, governança, estado e verificação.

## Pipeline

INGEST → NORMALIZE → EXTRACT → INTERPRET → RELATE → REVIEW → GOVERNANCE / COMPLIANCE → UPDATE STATE → ATTEST → VERIFY

## Princípios

### Evidência

A evidência deve preservar referência à sua origem e representar aquilo que foi efetivamente produzido ou apresentado.

### Extração

A extração deve permanecer distinguível de qualquer inferência posterior.

### Interpretação

A IA pode identificar relações, sinais e pontos que exigem revisão. Essas saídas são propostas, não decisões finais.

### Relação com competência

Cada sinal relevante deve poder ser relacionado à competência e ao critério que o sustenta.

### Revisão humana

O revisor pode aceitar, corrigir, rejeitar ou solicitar nova evidência. A decisão deve ser registrada.

A revisão humana não deve, isoladamente, ser tratada como garantia suficiente contra favoritismo, conflito de interesse ou inconsistência entre avaliadores.

### Governance / Compliance

A camada de governança verifica se as condições necessárias para transformar revisão em mudança de estado foram satisfeitas.

Ela deve considerar critérios, independência, conflitos de interesse, divergências, justificativas e regras de decisão. Seu núcleo de consenso não deve ser reduzido a uma simples contagem de votos.

Consulte `GOVERNANCE_COMPLIANCE_LAYER.md`.

### Estado

O estado representa somente o que as evidências, a revisão e as regras de governança permitem sustentar.

### Atestação

A atestação representa um estado ou evento definido, não o conteúdo integral da evidência.

### Verificação

A verificação deve permitir confirmar a integridade e a referência da atestação.

## Proveniência

Para informações relevantes, deve ser possível distinguir se vieram diretamente da evidência, de uma interpretação assistida, da revisão humana ou da decisão de governança.

## Modelo de confiança

O MVP trabalha com níveis conceituais de confiança. A definição e os mecanismos finais de verificação permanecem sujeitos a evolução futura.
