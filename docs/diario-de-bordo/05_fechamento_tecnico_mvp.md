# 05. Fechamento Técnico do MVP

**Data:** 2026-10-01
**Status:** DONE

## Contexto

Após a finalização do M1 (Especificação de Caso de Uso), M2 (Evidência, IA e Revisão), havia uma última pendência para conectar o ciclo completo (Vertical Slice): garantir que o módulo M3 (Atestação na Solana e Verificação) consumisse diretamente a saída real do M2 (`ReviewedStateRecord`) em vez de utilizar registros sintéticos (dummy).

## Decisão e Implementação

1. **Eliminação do `dummyRecord`:** O script `src/solana/demo.ts` foi refatorado para consumir ativamente o arquivo `out/reviewed-state.json`, que é produzido pela pipeline completa do M2.
2. **Hash criptográfico preservado:** O `record_hash` (gerado e assinado no M2 via `src/provenance/trace.ts`) foi rigorosamente mantido, percorrendo M3 até ser registrado no payload do Memo Program na blockchain Solana.
3. **Verificação (M3):** O script `src/solana/verify.ts` foi ajustado para, quando executado, buscar automaticamente o `record_hash` da pipeline M2, ou aceitar via argumento. A verificação local vs on-chain está validada e funcional.
4. **Testes M3 Adicionados:** Cobertura de testes unitários foi introduzida para o M3 (`tests/m3.test.ts`), simulando a Solana e validando as condições de verificação positiva, negativa, payload inválido e preservação do record_hash.
5. **Micro-ciclo de Hardening (Auditoria):** Para sanar lacunas de integridade de handoff, foi adicionado:
   - Teste unitário que prova a geração correta do Payload JSON do `attest.ts` mockando a transação.
   - Reforço no `provenance.test.ts` (testes de adulteração), provando que se um único campo ou hash no documento for modificado/tampered, a validação retorna *false*.
   - Alteração em `demo.ts` para abortar imediatamente caso a `SOLANA_PRIVATE_KEY` não exista, impedindo a geração insegura e automática de chaves locais em um MVP na Devnet.
   - Clarificação total na documentação: o Vertical Slice está tecnicamente fechado, enquanto os debates arquiteturais em aberto pertencem ao escopo de versões futuras. Com isso atingimos **44 testes** 100% integrados.

## Consequências

- **Vertical Slice Concluído:** A afirmação "M1 → M2 → M3 está implementado, testável e demonstrável de ponta a ponta" agora é verdadeira tecnicamente e comprovável. O repositório reflete uma arquitetura end-to-end sem "pulos lógicos".
- **Solana como Âncora (não validadora de mérito):** Refinamos o conceito para garantir clareza técnica: a blockchain Solana não valida se o aluno "possui a competência"; ela apenas ancora o `record_hash` do estado *revisado* gerado off-chain.
- **Fechamento de Código (FREEZE):** Foi aplicado um congelamento (freeze) da camada base do produto, não cabendo adições de features não-críticas, focando-se no UI/UX (em progresso) e nas hipóteses de GTM/Validação externa.
