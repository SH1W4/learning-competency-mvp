# Team Roles & Decision Governance

> **Status:** vigente / versão pública atualizada  
> **Versão:** v1.1  
> **Data-base:** 07 de outubro de 2026
>
> Esta versão representa a governança operacional atual do LASTRO. A versão anterior permanece como histórico no Drive e não define o estado atual do repositório público.

## 01 / Propósito

Esta governança define como o LASTRO distribui responsabilidades, ownership, interfaces e decisões entre as pessoas que participam do projeto.

Ela existe para manter o projeto coerente enquanto a arquitetura, a implementação e a demonstração evoluem. Ownership significa responsabilidade de condução, não exclusividade de contribuição.

## 02 / Princípios

- **Clareza:** cada frente relevante possui uma responsabilidade identificável.
- **Ownership:** cada frente possui alguém responsável por conduzir sua execução.
- **Colaboração:** ownership não impede contribuição, revisão ou questionamento de outras pessoas.
- **Rastreabilidade:** decisões que alteram o sistema devem deixar registro.
- **Separação epistemológica:** evidência, interpretação, verificação, consenso, estado e attestation não devem ser tratados como a mesma coisa.
- **IA sem autoridade:** interpretação por IA é sinal semântico; não determina sozinha o estado de competência.
- **Escopo:** pesquisa pode ampliar conhecimento sem ampliar automaticamente o MVP.
- **Evolução:** mudanças estruturais de responsabilidade devem ser refletidas em nova versão de governança.

## 03 / Pessoas

### JX — Architecture, AI & Systems

Responsável pela coerência da arquitetura, fronteiras entre evidência e interpretação, IA, verificação, consenso, proveniência, integração técnica crítica e attestation.

É o owner técnico de M3 e da fronteira de integridade/atestação.

### JP Carvalho — Technical Implementation & M4 Integration

Responsável pela implementação técnica atribuída ao backlog, especialmente ingestão e normalização de evidências, contratos de IA, integração técnica, testes, pull requests e componentes necessários ao fluxo do produto.

No fechamento atual, é co-responsável pela integração técnica e execução de M4.

### Erick — Research, Validation & M4 Closing

Responsável por pesquisa, documentação, contexto, organização operacional, validação externa, comunicação e preparação da narrativa do produto.

No fechamento atual, é co-responsável por validação e fechamento de M4.

### JP Fernandes — UX/UI & Interface

Responsável por UX/UI, identidade visual, navegação e apresentação do fluxo na interface.

A interface materializa a arquitetura existente e não cria lógica semântica paralela sem alinhamento.

## 04 / Ownership de milestones

| Frente | Responsável | Entrega principal |
|---|---|---|
| **M1 — Fundamentos** | JX + equipe | Tese, domínio, evidências e fundações arquiteturais |
| **M2 — Evidência / IA / implementação** | JP Carvalho | Ingestão, normalização, extração, contratos de IA, integração técnica e testes |
| **M3 — Integridade / attestation / verificação** | JX | Estado, integridade, handoff, attestation, verificação e prova Solana |
| **M4 — Integração / validação / demonstração** | JP Carvalho + Erick | Integração do produto, validação, demonstração e narrativa |
| **UX/UI / interface** | JP Fernandes | Experiência e apresentação do fluxo |

## 05 / Interfaces

### M1 → M2

Contexto, tese, critérios e estrutura necessária para representar evidências.

### M2 → M3

Evidências normalizadas, resultados de interpretação, decisões de implementação e informação necessária para representar o estado.

### M3 → M4

Fluxo verificável, artefatos técnicos, provas, limites do que é real, simulado ou mock e interfaces necessárias para demonstração.

### Pesquisa / validação → Produto

Casos, necessidades, evidências externas, críticas e sinais que possam reduzir incertezas prioritárias.

### UX/UI → Produto

Interface e apresentação do fluxo sem alterar a lógica central de evidência, verificação, consenso, estado ou attestation.

## 06 / Regra de decisão

Uma contribuição pode ser proposta por qualquer integrante.

Ela se torna requisito ou mudança oficial do projeto somente depois da decisão apropriada ser registrada.

- **Execução:** o owner decide dentro do próprio escopo.
- **Produto:** mudanças no fluxo central ou requisito devem ser registradas.
- **Arquitetura:** mudanças com impacto estrutural exigem decisão técnica rastreável.
- **Escopo:** nova vertical, persona principal ou camada estrutural não entra automaticamente.

Alterações em evidência, IA, verificação, consenso, estado, attestation ou integração devem permanecer rastreáveis.

## 07 / Regra de escopo

Pesquisa pode descobrir mais possibilidades do que o MVP consegue construir.

**Pesquisa →** pode expandir nossa compreensão.  
**MVP →** só expande quando existe justificativa para o ciclo atual.

Antes de incorporar algo novo:

1. Isso reduz uma incerteza prioritária?
2. Isso é necessário para o ciclo atual?
3. Isso altera o fluxo central ou representa uma aplicação futura?
4. O que sai do escopo se isso entrar?

## 08 / Comunicação

- **Grupo:** coordenação, bloqueios, decisões e próximos passos.
- **Documentação:** memória, pesquisa, hipóteses, críticas e contexto.
- **GitHub:** código, issues, tarefas, decisões técnicas, PRs e histórico de implementação.

Regra simples:

> **Grupo para coordenar; documentação para aprofundar; GitHub para executar.**

## 09 / Regra epistemológica

O projeto deve preservar as seguintes fronteiras:

**Evidence ≠ Interpretation**  
**Interpretation ≠ Verification**  
**Verification ≠ Consensus**  
**Consensus ≠ Competency State**  
**Competency State ≠ Attestation**

A IA pode interpretar evidências e propor sinais semânticos, mas não é autoridade final sobre o estado.

A verificação independente não consome confiança, resumo ou classificação produzida pela IA.

O consenso integra resultados das verificações e determina o resultado operacional previsto pelo protocolo. Casos de conflito podem seguir para adjudicação humana excepcional.

## 10 / Critério de boa governança

A estrutura está funcionando quando qualquer participante consegue responder:

- Qual é minha frente?
- Qual é minha entrega?
- De quem dependo?
- Quem depende de mim?
- O que posso decidir sozinho?
- O que precisa voltar para o grupo?
- Onde meu trabalho está registrado?

## 11 / Evolução

Esta versão substitui a distribuição operacional anterior no repositório público.

O histórico anterior permanece preservado no Drive para rastreabilidade e não deve ser interpretado como a governança atual do GitHub.

Mudanças estruturais futuras devem gerar nova versão, preservando o histórico das decisões anteriores.
