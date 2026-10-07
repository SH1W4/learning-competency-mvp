# src/

Implementação do vertical slice atual do LASTRO.

O código desta pasta materializa o fluxo:

```
Evidence
   ↓
AI Interpretation
   +
Independent Verification
   ↓
Consensus Core
   ↓
Competency State
   ↓
Attestation / Verification
```

domain/      tipos e caso de uso canônico
evidence/    ingestão, normalização e extração de evidências
ai/          contrato de saída da IA + provedores (heurístico e LLM opcional)
relation/    relação evidência → critério
consensus/   convergência dos mecanismos independentes
state/       estados de competência e transições
provenance/  trace de proveniência + handoff para o Integrity Layer
solana/      atestação e verificação on-chain
pipeline.ts  orquestra as etapas (CompetencySession)
cli/demo.ts  roda o cenário sintético Ana

## Limite semântico

A IA interpreta evidências, mas não determina o estado final. Verificação determinística opera independentemente dos sinais da IA. O Consensus Core produz o resultado; conflito pode entrar em adjudicação humana excepcional.

Para a implementação atual, consulte `docs/architecture/DOMAIN_MODEL.md`, `docs/architecture/CONSENSUS_CORE.md`, `docs/architecture/EVIDENCE_PIPELINE.md` e `docs/evaluation/04_DEMO_AND_PROOF.md`.
