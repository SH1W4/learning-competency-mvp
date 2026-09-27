# Avaliação de Hackathon 001 — Baseline

**Status:** Baseline  
**Data:** 27/09/2026  
**Tipo:** Red-team / avaliação interna  
**Base:** estado observável do repositório na data da avaliação  
**Objetivo:** estabelecer o primeiro diagnóstico antes da implementação do vertical slice  
**Método:** `skills/hackathon-evaluator/SKILL.md`

> Esta avaliação é um diagnóstico interno, não uma pontuação oficial do hackathon. Ela registra hipóteses, evidências e lacunas para orientar a execução.

---

## 1. Resumo executivo

O projeto apresenta uma **tese bem articulada e uma estrutura de execução acima do nível esperado para uma fase inicial**, especialmente na separação entre evidência, interpretação por IA, decisão humana, estado de competência e verificação.

O principal risco identificado é objetivo:

> **A cadeia central ainda está predominantemente documentada como intenção arquitetural e de produto; ela ainda não está demonstrada como produto executável de ponta a ponta.**

O ativo mais forte neste momento é a clareza do mecanismo proposto.

A principal lacuna é a ausência de evidência suficiente de:

- implementação do fluxo vertical completo;
- testes;
- demonstração reproduzível;
- validação externa de demanda;
- tração;
- attestation verificável efetivamente executada na Solana.

Portanto, o projeto está em transição de **fundação conceitual/arquitetural** para **produto demonstrável**.

---

## 2. Estado geral

| Área | Diagnóstico |
|---|---|
| Tese | Forte |
| Estrutura de execução | Forte |
| Arquitetura | Forte, ainda parcialmente hipotética |
| Documentação | Forte |
| Caso de uso | Em validação |
| Implementação | Inicial / não demonstrada |
| Testes | Não demonstrados |
| Demo | Não demonstrada |
| Validação externa | Não demonstrada |
| Tração | Não demonstrada |

### Leitura visual

```text
TESE                 ██████████
ESTRUTURA            ██████████
ARQUITETURA          █████████░
DOCUMENTAÇÃO         ██████████
CASO DE USO          ██████░░░░
IMPLEMENTAÇÃO        ██░░░░░░░░
TESTES               ░░░░░░░░░░
DEMO                 ░░░░░░░░░░
VALIDAÇÃO EXTERNA    ░░░░░░░░░░
TRAÇÃO               ░░░░░░░░░░
```

**Prontidão atual:** PARCIALMENTE PRONTO.

---

## 3. Tese e insight

### 3.1 Tese observada

A proposta central é:

**organização/programa → competência desejada → trilha curta → pessoa → atividades → evidências → IA → revisão humana → estado de competência → attestation → Solana → verificação**

A tese procura resolver a passagem entre necessidade organizacional de competência, desenvolvimento, evidências e um estado verificável de evolução.

### 3.2 Insight central

O projeto estabelece uma distinção importante:

**prova de aprendizagem ≠ prova de competência**

E também separa:

**evidência ≠ interpretação da IA ≠ decisão humana ≠ verificação**

Essa separação é tecnicamente e conceitualmente relevante porque impede que um documento, certificado ou inferência automática seja tratado isoladamente como prova suficiente de competência.

### 3.3 Diagnóstico

A formulação é forte como hipótese de produto, mas sua diferenciação ainda precisa ser validada contra fluxos existentes.

Pergunta crítica:

> Por que uma organização precisaria deste ciclo em vez de combinar LMS/LXP, avaliação, planilha/processo interno e certificado?

Essa resposta ainda não está sustentada por evidência externa suficiente.

**Nível de evidência:** E1–E2.

---

## 4. Problema e caso de uso

### Caso de uso candidato

**Programa corporativo de desenvolvimento de competências em análise de dados.**

**Responsável pelo problema:** L&D / Desenvolvimento de Pessoas / treinamento e desenvolvimento.  
**Aprendiz:** colaborador participante do programa.  
**Revisor:** gestor, instrutor ou avaliador autorizado.  
**Verificador:** pessoa autorizada a consultar a attestation e verificar sua integridade.

### Competência candidata

> Transformar uma pergunta de negócio em uma análise de dados reproduzível e comunicar conclusões sustentadas por evidências.

### Trilha candidata

1. Formular pergunta de negócio.
2. Preparar e explorar dataset.
3. Executar análise reproduzível.
4. Comunicar resultados e limitações.

### Evidências candidatas

- consulta/código;
- notebook ou relatório;
- visualização/síntese;
- apresentação ou interpretação escrita;
- avaliação.

### Diagnóstico

O caso de uso é concreto o suficiente para iniciar o MVP, mas o próprio repositório registra M1.1 como hipótese pendente de validação da equipe.

**Conclusão:** não tratar o caso de uso como decisão final até a validação prevista em M1.

**Nível de evidência:** E1.

---

## 5. Produto e execução

### O que está bem estruturado

O repositório possui:

- contrato do MVP;
- modelo de attestation;
- pipeline de evidências;
- arquitetura técnica;
- jornadas;
- caso de uso;
- plano de execução M1–M4;
- roteiro de demonstração;
- validação de demanda;
- GTM;
- papéis de equipe;
- regras operacionais do projeto.

A sequência de commits também demonstra uma evolução coerente da tese para arquitetura, produto, mercado, governança e execução.

### Lacuna crítica

O vertical slice ainda não foi demonstrado no código.

A documentação descreve o mecanismo, mas não constitui, sozinha, prova de funcionamento.

**Nível de evidência de produto funcionando ponta a ponta:** E0.

---

## 6. Auditoria do fluxo central

Estado observado para cada etapa:

| Etapa | Estado |
|---|---|
| Organização define competência | Não demonstrado como fluxo executável |
| Trilha estruturada | Não demonstrado como fluxo executável |
| Pessoa executa atividade | Não demonstrado |
| Evidência é capturada | Não demonstrado |
| IA interpreta evidência | Não demonstrado |
| Humano revisa | Não demonstrado |
| Estado de competência é definido | Não demonstrado |
| Attestation é criada | Não demonstrado |
| Registro/verificação na Solana | Não demonstrado |
| Verificação externa reproduzível | Não demonstrado |

Isso não significa que esses componentes não possam existir fora do material observado. Significa que **o repositório, neste baseline, ainda não apresenta evidência suficiente para afirmar que o fluxo completo está implementado e demonstrável**.

---

## 7. IA

### Formulação atual

A IA deve:

- ler e estruturar evidências;
- extrair informações;
- relacionar evidências à competência;
- identificar lacunas;
- sintetizar evolução;
- posteriormente, adaptar trilhas.

A IA **não deve declarar competência sozinha**.

### Controle humano

O modelo prevê:

**proposta da IA → aceitação/correção/rejeição humana → estado de competência**

Essa fronteira deve aparecer no produto e não apenas na documentação.

### Diagnóstico

A definição conceitual é coerente. O próximo teste é transformar essa fronteira em comportamento observável no MVP.

**Nível de evidência:** E2 conceitual; E0 de implementação demonstrada.

---

## 8. Estado de competência

O modelo arquitetural identifica corretamente que evidência e estado de competência não são a mesma coisa.

Ainda faltam decisões operacionais sobre:

- quais estados oficiais existirão;
- critérios de entrada em cada estado;
- quem possui autoridade para revisar;
- como ocorre uma transição;
- como correções/revisões são registradas;
- qual estado/evento merece attestation.

Esse ponto é central porque o produto não pode depender de uma classificação opaca produzida apenas pela IA.

**Nível de evidência:** E1–E2.

---

## 9. Solana e attestation

### Papel proposto

A Solana está posicionada como camada de:

- integridade;
- attestation;
- histórico;
- verificabilidade.

O projeto não depende de colocar dados pessoais ou evidências sensíveis diretamente na cadeia.

Essa separação é coerente com o princípio de minimizar exposição de dados.

### Risco atual

A attestation continua sendo, neste baseline, um modelo arquitetural.

Ainda falta demonstrar:

1. payload canônico;
2. referência de evidências;
3. revisão associada;
4. estado anterior/atual;
5. versionamento/método;
6. hash/prova;
7. escrita na Solana;
8. consulta/verificação;
9. comportamento diante de correção ou falha.

**Nível de evidência atual:** E1.

---

## 10. Mercado

A documentação já distingue papéis relevantes:

- comprador econômico;
- responsável pelo problema;
- responsável pelo programa;
- aprendiz;
- revisor;
- verificador.

Isso evita tratar “organização” como um único ator.

Porém, ainda não existe evidência externa suficiente para afirmar:

- quem paga;
- qual dor possui prioridade econômica;
- qual processo atual será substituído ou reduzido;
- qual frequência de uso existe;
- qual orçamento está disponível;
- qual wedge inicial deve ser escolhido.

O mercado também está deliberadamente amplo demais nesta fase.

**Recomendação de execução:** validar um wedge específico antes de expandir para outros contextos.

**Nível de evidência:** E1.

---

## 11. Tração e validação externa

No estado avaliado, não foram demonstrados:

- piloto ativo;
- usuário externo recorrente;
- dados reais de operação;
- compromisso de parceiro;
- intenção de pagamento;
- implantação;
- métrica de uso;
- resultado validado em campo.

Portanto:

**Tração: E0.**

Isso é especialmente relevante porque a própria documentação do projeto reconhece validação externa como uma lacuna.

---

## 12. Founder + Market Fit

A equipe apresenta combinação de:

- desenvolvimento de software;
- IA;
- arquitetura;
- dados;
- automação;
- experiência educacional/organizacional;
- documentação e pesquisa.

O repositório demonstra boa divisão de papéis.

Entretanto, o repositório, sozinho, ainda não demonstra uma vantagem de acesso ao mercado ou validação de dor específica.

Esse ponto deve ser reforçado por entrevistas, parceiros, pilotos ou outros sinais externos.

**Nível de evidência:** E1, parcialmente E2 no aspecto técnico.

---

## 13. Comunicação

A estrutura de comunicação está avançada:

- tese;
- pergunta central;
- fluxo;
- princípios;
- limites do MVP;
- arquitetura;
- demo script;
- documentação de hackathon.

O próximo teste não é produzir mais documentação, mas verificar se uma pessoa externa consegue compreender em pouco tempo:

1. qual é o problema;
2. para quem existe;
3. o que o produto faz;
4. onde a IA entra;
5. por que a revisão humana existe;
6. por que Solana é necessária;
7. o que está efetivamente funcionando.

**Nível de evidência:** E1–E2.

---

## 14. Viabilidade

A arquitetura não exige, por si só, que o produto seja um LMS completo.

A abordagem permite um MVP focado em um ciclo curto de competência e evidência.

Porém, continuam abertas:

- modelo comercial;
- precificação;
- integração com LMS/LXP/RH;
- formato final da credencial;
- operação de revisão;
- governança;
- LGPD;
- custo de infraestrutura;
- sustentabilidade do processo de attestation.

Esses pontos devem permanecer abertos até que o caso de uso e a demanda sejam validados.

**Nível de evidência:** E1.

---

## 15. Hierarquia de evidências

| Afirmação | Evidência atual |
|---|---|
| A tese é coerente | E2 |
| O modelo operacional está estruturado | E3 |
| O caso de uso escolhido é validado | E1 |
| Existe diferenciação | E1–E2 |
| A IA possui papel delimitado | E2 |
| Existe revisão humana explícita | E2 |
| Solana tem papel arquitetural coerente | E1 |
| O produto funciona ponta a ponta | E0 |
| A attestation é verificável | E0 |
| Existe demanda externa comprovada | E0 |
| Existe tração | E0 |
| Existe mercado pagante validado | E0–E1 |
| Existe demo reproduzível | E0 |

**Legenda:**

- **E0:** afirmação sem evidência demonstrada.
- **E1:** hipótese fundamentada/raciocínio.
- **E2:** sinal externo ou evidência parcial.
- **E3:** comportamento/produto demonstrado.
- **E4:** validação externa forte.

---

## 16. Principais riscos red-team

### C1 — O produto central ainda não está provado

**Risco:** o projeto pode ser percebido como arquitetura bem documentada sem produto demonstrável.

**Ação:** implementar o vertical slice M1 → M2 → M3.

### C2 — Caso de uso ainda é hipótese

**Risco:** construir tecnologia antes de validar quem possui a dor.

**Ação:** fechar M1.1 antes de cristalizar a implementação.

### C3 — Diferenciação ainda não validada

**Risco:** a solução pode ser interpretada como combinação de LMS, avaliação e certificação.

**Ação:** comparar o fluxo proposto com ferramentas/processos existentes e validar a dor com usuários.

### C4 — Estado de competência ainda não operacionalizado

**Risco:** transformar inferência da IA em autoridade.

**Ação:** definir estados, critérios, revisor e transições explícitas.

### C5 — Solana ainda é apenas arquitetura

**Risco:** blockchain parecer decorativa no demo.

**Ação:** produzir uma attestation mínima real e uma verificação reproduzível.

### C6 — Mercado excessivamente amplo

**Risco:** mensagem e MVP perderem foco.

**Ação:** escolher um wedge inicial e deixar expansão como hipótese futura.

### C7 — Documentação à frente do produto

**Risco:** continuar aumentando documentação sem aumentar evidência de funcionamento.

**Ação:** Foundation Freeze: a próxima grande contribuição deve priorizar código, teste ou validação externa.

---

## 17. Próxima sequência recomendada

A avaliação não cria novas frentes. Ela reorganiza a prioridade das já existentes:

1. **Fechar M1.1 — caso de uso concreto.**
2. **Fechar M1.2 — competência operacional.**
3. **Fechar M1.3 — trilha curta.**
4. **Fechar M1.4 — contrato de evidência.**
5. **Fechar M1.5 — estados mínimos.**
6. **Congelar M1.6 — cenário de demonstração.**
7. **Implementar M2 — evidência + IA + revisão humana.**
8. **Implementar estado de competência.**
9. **Implementar M3 — attestation.**
10. **Registrar e verificar na Solana.**
11. **Executar primeira demonstração reproduzível.**
12. **Executar validação externa.**
13. **Reavaliar o projeto com nova evidência.**

A prioridade imediata é provar:

> **“Isto funciona.”**

Depois:

> **“Alguém precisa disto.”**

E somente então:

> **“Isto pode escalar como produto.”**

---

## 18. Critério para a próxima avaliação

A próxima avaliação deve procurar principalmente evidência de:

- caso de uso validado;
- competência operacional;
- trilha executável;
- evidência ingerida;
- saída estruturada da IA;
- revisão humana observável;
- estado de competência;
- attestation;
- verificação;
- testes;
- demo reproduzível;
- primeiros sinais externos de demanda.

A avaliação seguinte não deve simplesmente repetir este documento. Ela deve medir o que mudou.

---

## 19. Conclusão do baseline

O projeto possui uma **fundação conceitual, arquitetural e operacional coerente**, mas ainda não possui evidência suficiente para sustentar as afirmações mais importantes de produto, funcionamento e mercado.

O próximo salto de maturidade não exige mais complexidade conceitual.

Exige **evidência executável**.

A regra para a próxima fase é:

> **menos afirmação, mais demonstração.**

E, para cada nova afirmação:

> **qual evidência permitiria que um avaliador independente chegasse à mesma conclusão?**
