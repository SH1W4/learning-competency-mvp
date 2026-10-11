# LASTRO — Documentation Directory Index

Bem-vindo à documentação do repositório **LASTRO (Learning Competency MVP)**. Este índice central organiza todos os módulos e documentos por objetivo, audiência e domínio técnico.

---

## Estrutura de Diretórios

```
docs/
├── architecture/       # Especificações técnicas, contratos de API e Consensus Core
├── audits/             # Relatórios formais de fechamento de milestones (M3, M4)
├── brand/              # Identidade visual, sistema de design e tokens (v0.2)
├── case_studies/       # Portfólio de estudos de caso e blueprints setoriais
├── decisions/          # Architecture Decision Records (ADRs)
├── demo/               # Scripts e contratos de demonstração técnica
├── evaluation/         # Documentação em inglês voltada para avaliadores externos
├── go-to-market/       # Estratégia de pitch, narrativas comerciais e modelo GTM
├── governance/         # Segurança, classificação de dados, papéis e auditoria
├── market/             # Análise de cenário competitivo e posicionamento
├── product/            # Especificações de produto, jornadas e contratos do MVP
├── validation/         # Protocolo de validação externa de demanda
└── [root docs]         # Status, handoffs e matrizes de governança
```

---

## 1. Para Avaliadores Externos (External Reviewers)

Para uma avaliação técnica rápida em inglês, siga a trilha estruturada em [`docs/evaluation/`](evaluation/README.md):

1. [Product Overview](evaluation/01_PRODUCT.md) — Tese do produto, dor e jornada.
2. [Architecture & Pipeline](evaluation/02_ARCHITECTURE.md) — Separação entre evidência, IA, verificação e consenso.
3. [Consensus, Governance & Attestation](evaluation/03_VERIFICATION_AND_GOVERNANCE.md) — Consensus Core e ancoragem na Solana.
4. [Demo & Technical Proof](evaluation/04_DEMO_AND_PROOF.md) — Prova on-chain ativa, métricas de teste (13 arquivos, 80 testes) e fallback.
5. [Limitations & Claims](evaluation/05_LIMITATIONS_AND_CLAIMS.md) — Fronteiras epistêmicas rigorosas.
6. [M4 Frontend Vertical Slice](evaluation/M4_FRONTEND_VERTICAL_SLICE.md) — Registro de integração pública web.
7. [M4 Devnet Proof Runbook](evaluation/M4_LOCAL_DEVNET_PROOF.md) — Guia reprodutível de atestação.

---

## 2. Status do Projeto e Fechamento de Milestones

- [PROJECT_STATUS.md](PROJECT_STATUS.md) — Estado atual dos milestones M1 a M4, limites do MVP e snapshot de testes.
- [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) — Ponto de transição operacional e checklist de validação limpa.
- [docs/audits/](audits/README.md) — Registro cronológico de auditorias:
  - [AUDIT_M3_CLOSURE.md](audits/AUDIT_M3_CLOSURE.md) — Fechamento do Milestone M3 (camada de integridade).
  - [AUDIT_M4_CLOSURE.md](audits/AUDIT_M4_CLOSURE.md) — Fechamento do Milestone M4 (produção ponta a ponta: Render + Vercel + Solana).

---

## 3. Arquitetura e Engenharia

Documentos em [`docs/architecture/`](architecture/README.md):

- [TECHNICAL_ARCHITECTURE.md](architecture/TECHNICAL_ARCHITECTURE.md) — Arquitetura de software e boundaries de módulos.
- [CONSENSUS_CORE.md](architecture/CONSENSUS_CORE.md) — Especificação formal do Consensus Core (Acordo, Insuficiência, Conflito).
- [DOMAIN_MODEL.md](architecture/DOMAIN_MODEL.md) — Modelo de domínio (Evidência, Critério, Verificador, Estado).
- [API_CONTRACT.md](architecture/API_CONTRACT.md) — Contrato canônico HTTP (`/api/m4/competency`).
- [ATTESTATION_MODEL.md](architecture/ATTESTATION_MODEL.md) — Payload `m3.attestation.v2` e Memo SPL.
- [CANONICALIZATION.md](architecture/CANONICALIZATION.md) — Hashing determinístico de estados e evidências.
- [GOVERNANCE_COMPLIANCE_LAYER.md](architecture/GOVERNANCE_COMPLIANCE_LAYER.md) — Auditoria de adjudicação humana.
- [VERIFICATION_ADAPTER_BOUNDARY.md](architecture/VERIFICATION_ADAPTER_BOUNDARY.md) — Adapters para verificadores locais e descentralizados.

---

## 4. Produto e Frontend

Documentos em [`docs/product/`](product/README.md):

- [USE_CASE.md](product/USE_CASE.md) — Caso de uso canônico da Ana (FinTech), 4 atividades e 4 evidências.
- [USER_JOURNEYS.md](product/USER_JOURNEYS.md) — Jornadas da organização, do indivíduo e do auditor.
- [MVP_CONTRACT.md](product/MVP_CONTRACT.md) — Contrato de escopo do MVP.
- [FRONTEND_PRODUCT_SPEC.md](product/FRONTEND_PRODUCT_SPEC.md) — Especificação da interface Next.js read-only.
- [PITCH_ARCHITECTURE.md](product/PITCH_ARCHITECTURE.md) — Arquitetura de comunicação visual e produto.

---

## 5. Go-To-Market e Estratégia Comercial

Documentos em [`docs/go-to-market/`](go-to-market/GTM.md):

- [01_PITCH_STRATEGY.md](go-to-market/01_PITCH_STRATEGY.md) — Estrutura completa de pitch, narrativa de 5 minutos e diferenciação.
- [GTM.md](go-to-market/GTM.md) — Modelo operacional de GTM, hipóteses de buyer e wedge.
- [COMPETITIVE_LANDSCAPE.md](market/COMPETITIVE_LANDSCAPE.md) — Posicionamento perante o ecossistema e soluções existentes.
- [DEMAND_VALIDATION.md](validation/DEMAND_VALIDATION.md) — Diretrizes para validação empírica de mercado.

---

## 6. Portfólio de Estudos de Caso

Documentos em [`docs/case_studies/`](case_studies/README.md):

- [00 — Matriz Executiva](case_studies/00_MATRIZ_EXECUTIVA.md) — Visão comparativa cross-setorial.
- [01 — FinTech / Ana](case_studies/01_FINTECH_ANA.md) — Cenário sintético implementado no MVP.
- [02 — HealthTech / Gabriel](case_studies/02_HEALTHTECH_GABRIEL.md) — Blueprint em setor regulado.
- [03 — DevSecOps / Mariana](case_studies/03_DEVSECOPS_MARIANA.md) — Blueprint em engenharia de segurança.
- [04 — Reskilling / Rafael](case_studies/04_RESKILLING_RAFAEL.md) — Blueprint em requalificação profissional e impacto.
- [05 — Trilhas Corporativas B2B](case_studies/05_TRILHAS_CORPORATIVAS_B2B.md) — Blueprint de comercialização corporativa.

---

## 7. Marca e Sistema Visual

Documentos em [`docs/brand/`](brand/README.md):

- [BRANDBOOK_DRAFT.md](brand/BRANDBOOK_DRAFT.md) — Essência, personalidade e direcionamento visual.
- [VISUAL_SYSTEM_SPEC.md](brand/VISUAL_SYSTEM_SPEC.md) — Tokens, cores, tipografia e grids.
- [DESIGN_BRIEF_JP_FERNANDES.md](brand/DESIGN_BRIEF_JP_FERNANDES.md) — Briefing de execução do time de design.
- [NAMING_EXPLORATION.md](brand/NAMING_EXPLORATION.md) — Racional do nome LASTRO.

---

## 8. Governança e Rastreabilidade

- [docs/governance/SOURCE_OF_TRUTH.md](governance/SOURCE_OF_TRUTH.md) — Definição de fontes de verdade do projeto.
- [docs/governance/SECURITY_THREAT_MODEL.md](governance/SECURITY_THREAT_MODEL.md) — Modelo de ameaças à integridade.
- [docs/governance/PUBLICATION_CLASSIFICATION_MATRIX.md](governance/PUBLICATION_CLASSIFICATION_MATRIX.md) — Classificação de artefatos públicos vs confidenciais.
- [docs/governance/TEAM_ROLES.md](governance/TEAM_ROLES.md) — Responsabilidades e divisões operacionais do time.
- [docs/governance/VAULT_BOUNDARY.md](governance/VAULT_BOUNDARY.md) — Fronteira entre repositório público e Google Drive privado.
- [docs/VAULT_MIGRATION_MAP.md](VAULT_MIGRATION_MAP.md) — Mapeamento bidirecional de migração do acervo.
- [docs/decisions/](decisions/README.md) — Architecture Decision Records.

---

## Links de Produção (M4 Ativo)

- **Aplicação Web Pública:** [https://lastro-learn.vercel.app](https://lastro-learn.vercel.app)
- **API Runtime Hospedada:** [https://lastro-m4-runtime.onrender.com/health](https://lastro-m4-runtime.onrender.com/health)
- **Prova Solana Devnet:** [Tx 22wJ3t6...](https://explorer.solana.com/tx/22wJ3t6LDdFMWK3rs4yK1S6GR6e7GEmLPeSjagBUwZCUXYKiuG5LS6gDP9ZSr6TkPCkn5hf3fyNVKH3xA7amDZdX?cluster=devnet)
