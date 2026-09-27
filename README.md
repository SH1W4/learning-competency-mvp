# Learning Competency MVP

> MVP experimental para desenvolvimento de competências, organização de evidências de aprendizagem, interpretação assistida por IA e atestação verificável em Solana.

**Idioma principal:** Português (Brasil) · [English version](README.en.md)

## 1. Contexto

A tese do projeto evoluiu de uma plataforma centrada apenas em microcredenciais para uma abordagem mais ampla de **desenvolvimento de competências**.

A hipótese de trabalho é que uma organização pode definir uma competência desejada, associá-la a uma trilha curta de desenvolvimento e, a partir das atividades realizadas pela pessoa e das evidências produzidas, construir uma representação estruturada do estado daquela competência.

A IA atua na organização e interpretação das evidências, com revisão humana. Solana entra como camada de integridade, atestação e verificabilidade.

Esta formulação representa a direção atual do projeto e permanece sujeita à validação do time.

## 2. O que o MVP precisa provar

O MVP deve demonstrar, de ponta a ponta, uma transformação mínima:

`organização/programa → competência → trilha curta → pessoa → atividades → evidências → IA + revisão humana → estado de competência → atestação → Solana → verificação`

A pergunta central do MVP é:

> **É possível transformar uma competência desejada em uma trilha curta, reunir evidências produzidas pela pessoa, interpretá-las com IA e revisão humana, representar um estado de competência e preservar uma prova verificável desse estado?**

O objetivo do hackathon não é construir todo o produto futuro, mas demonstrar esse fluxo de forma concreta e compreensível.

## 3. Campo de ação atual

### Entra no MVP

- uma competência ou capacidade concreta;
- uma trilha curta e controlada;
- uma pessoa percorrendo essa trilha;
- poucos tipos de evidência;
- estruturação e interpretação assistidas por IA;
- revisão humana dos resultados da IA;
- representação mínima de um estado de competência;
- um objeto mínimo de atestação/prova;
- Solana como camada de integridade e verificabilidade;
- uma forma simples de verificar o resultado.

### Deliberadamente fora do MVP

- LMS completo;
- marketplace de cursos;
- plataforma completa de recrutamento;
- catálogo amplo de cursos;
- integrações institucionais extensas;
- metodologia definitiva de competências;
- múltiplos mercados simultaneamente;
- modelo definitivo de monetização;
- documentos pessoais ou sensíveis armazenados diretamente on-chain.

Esses itens podem permanecer como visão, hipótese ou evolução futura, mas não devem ampliar automaticamente o escopo do MVP.

## 4. Papel da IA

A IA é uma **camada de interpretação e organização**, não uma autoridade institucional.

No MVP, ela pode:

- estruturar informações presentes nas evidências;
- relacionar evidências a competências;
- sintetizar sinais de desenvolvimento;
- identificar inconsistências ou pontos que precisam de revisão;
- apoiar a construção de um estado de competência.

A revisão humana permanece parte do fluxo.

A IA não deve, sozinha, declarar que uma competência foi oficialmente reconhecida nem transformar uma inferência em verificação institucional.

## 5. Papel de Solana

Solana não é apresentada como substituta da instituição, do avaliador ou da evidência.

No MVP, sua função é explorar uma camada de:

- integridade;
- atestação;
- registro de estado/evento relevante;
- verificabilidade.

Informações pessoais ou documentos sensíveis não devem ser colocados diretamente on-chain. O objeto exato da atestação e o mecanismo técnico ainda devem ser definidos e validados pelo time.

## 6. Princípio de confiança

O projeto deve manter separadas quatro coisas:

`evidência → interpretação → revisão humana → verificação`

Uma evidência apresentada não é automaticamente uma competência comprovada.

Uma interpretação da IA não é automaticamente uma confirmação institucional.

O sistema deve evitar afirmar mais do que os dados e as verificações disponíveis sustentam.

## 7. Arquitetura conceitual atual

```text
ORGANIZAÇÃO / PROGRAMA
        ↓
COMPETÊNCIA DESEJADA
        ↓
TRILHA CURTA
        ↓
PESSOA
        ↓
ATIVIDADES
        ↓
EVIDÊNCIAS
        ↓
IA + REVISÃO HUMANA
        ↓
ESTADO DE COMPETÊNCIA
        ↓
ATTESTATION / PROOF
        ↓
SOLANA
        ↓
VERIFICAÇÃO
```

Essa é uma arquitetura conceitual de trabalho, não uma especificação técnica final.

## 8. Relação entre Drive e GitHub

O projeto utiliza dois espaços com funções diferentes:

**Drive — contexto e governança**
- atas;
- pesquisas;
- análises;
- evolução da tese;
- documentos de produto;
- referências;
- decisões e materiais de alinhamento.

**GitHub — execução técnica**
- código;
- arquitetura técnica promovida a partir de decisões validadas;
- especificações de implementação;
- testes;
- issues;
- pull requests;
- histórico de mudanças.

A regra é simples:

> **Uma hipótese não vira automaticamente uma implementação. Uma decisão validada pode ser promovida para o GitHub.**

## 9. Estrutura do repositório

```text
.
├── docs/
│   ├── product/
│   ├── architecture/
│   └── decisions/
├── src/
└── tests/
```

A estrutura será expandida somente quando houver necessidade real de implementação.

## 10. Princípios de trabalho

1. Não afirmar mais do que as evidências sustentam.
2. Separar evidência, interpretação, revisão humana, estado de competência e verificação.
3. Manter o humano no circuito quando a interpretação exigir julgamento.
4. Não colocar dados pessoais sensíveis diretamente on-chain.
5. Registrar decisões relevantes de produto e arquitetura.
6. Não transformar uma hipótese em requisito sem validação.
7. Manter o MVP pequeno o suficiente para ser demonstrado de ponta a ponta.

## 11. Estado atual

**Fase:** delimitação do MVP → especificação técnica.

**Status do repositório:** scaffold inicial.

**Próxima decisão:** validar coletivamente o campo de ação do MVP antes de consolidar a arquitetura técnica.

Veja a [Issue #1](https://github.com/SH1W4/learning-competency-mvp/issues/1).
