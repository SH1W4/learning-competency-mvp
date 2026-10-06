# Handoff M3 → Interface

**Data:** 6 de Outubro de 2026  
**De:** JX (M3 Owner)  
**Para:** JP Fernandes (Interface Owner)  
**Status:** M3 CONCLUÍDO — Pronto para integração

---

## Resumo Executivo

O marco M3 (Estado, Atestação e Solana) está **100% concluído e validado**. O ciclo vertical completo M1 → M2 → M3 está executável e verificado na Solana Devnet.

**Artefato principal:** Transação confirmada na Solana Devnet  
**Hash:** `4yPQymfS4phDp3fWx7rrVCmajXotwZXcE2gCLkDas5K5bdv65roJT7TKRzgcbKSGTd3qK3GiEq5zGxdbRrf3MowE`  
**Explorer:** https://explorer.solana.com/tx/4yPQymfS4phDp3fWx7rrVCmajXotwZXcE2gCLkDas5K5bdv65roJT7TKRzgcbKSGTd3qK3GiEq5zGxdbRrf3MowE?cluster=devnet

---

## O que foi entregue

### 1. Infraestrutura de Atestação (`src/solana/attest.ts`)

**Função principal:** `createAttestationOnChain(record, privateKey, networkUrl)`

**Capacidades:**
- Registra atestação via SPL Memo Program (off-chain storage pattern)
- Valida integridade do handoff M2 → M3 via `verifyHandoff()`
- Gera payload mínimo on-chain (sem dados pessoais em claro)
- Usa `subject_ref` pseudônimo para privacidade LGPD
- Recusa handoff adulterado (record_hash inconsistente)

**Payload on-chain (m3.attestation.v2):**
```json
{
  "mvp": "learning-competency",
  "v": "m3.attestation.v2",
  "subject_ref": "<hash pseudônimo>",
  "competency": "comp:data-analysis-reproducible",
  "state": "DEMONSTRATED",
  "record_hash": "<hash âncora>",
  "attester": "<chave pública do emissor>",
  "timestamp": "<ISO timestamp>"
}
```

### 2. Infraestrutura de Verificação (`src/solana/verify.ts`)

**Função principal:** `verifyAttestation(recordHash, txSignature, networkUrl, options)`

**Capacidades:**
- Busca transação na Solana (parsed transaction)
- Confirma que o `record_hash` está no payload on-chain
- Valida integridade do `reviewed-state.json` (recalcula hash)
- Valida assinante da transação (ATTESTER_PUBKEY)
- Valida `subject_ref` pseudônimo
- Retorna resultado estruturado com checks detalhados

**Checks de verificação:**
- `hash_on_chain`: hash encontrado na transação
- `record_integrity`: hash do JSON confere com conteúdo
- `signer`: transação assinada pelo emissor esperado
- `subject_ref`: referência pseudônima confere

### 3. Demo CLI (`src/solana/demo.ts`)

**Comando:** `npm run m3:attest`

**Fluxo:**
1. Lê configuração do `.env` (SOLANA_PRIVATE_KEY)
2. Verifica saldo da carteira (faz airdrop automático se < 0.01 SOL)
3. Lê `out/reviewed-state.json` (handoff do M2)
4. Chama `createAttestationOnChain()`
5. Retorna assinatura da transação
6. Exibe link para o Solana Explorer

### 4. CLI de Verificação (`src/solana/verify.ts`)

**Comando:** `npm run m3:verify <tx_signature> [record_hash]`

**Fluxo:**
1. Lê `out/reviewed-state.json` (se record_hash não fornecido)
2. Lê ATTESTER_PUBKEY do `.env` (ou deriva da SOLANA_PRIVATE_KEY)
3. Chama `verifyAttestation()`
4. Exibe resultado dos checks
5. Mostra payload on-chain completo

---

## Artefatos Técnicos

### Estrutura de código

```
src/solana/
├── attest.ts      # createAttestationOnChain(), buildAttestationPayload(), subjectRef()
├── verify.ts      # verifyAttestation(), extractSigners(), CLI runner
└── demo.ts        # npm run m3:attest
```

### Artefatos de dados

**out/reviewed-state.json** (handoff do M2 → M3)
- Contém `record_hash` (SHA-256 do JSON completo)
- Estado final: `DEMONSTRATED`
- Histórico de transições de estado
- Critérios C1–C4 com evidências associadas
- Metadados de revisão humana

**Payload on-chain** (exemplo da transação atual)
- Versão: `m3.attestation.v2`
- Competency: `comp:data-analysis-reproducible`
- State: `DEMONSTRATED`
- Record hash: `4fff6db8838e1c40528cabbc47deeef6a34a0c60085a0f4542282996c98f27d6`
- Attester: `67QmMGjZbCrrmWibYx8JCqK7TVH7qC7WiSaEqNRifwEi`

### Configuração

**.env.example** (parâmetros M3)
```
SOLANA_PRIVATE_KEY=<chave_base58_da_carteira_emissora>
ATTESTER_PUBKEY=<chave_publica_da_carteira_emissora>
```

---

## Pontos de Integração para Interface

### 1. Fluxo principal do produto (vertical slice)

A interface deve materializar o seguinte fluxo:

```
Upload de evidências
   ↓
Ingestão (M2)
   ↓
Extração e normalização (M2)
   ↓
Interpretação IA (M2)
   ↓
Revisão humana (M2)
   ↓
Estado atualizado (M2)
   ↓
Atestação (M3) ← PONTO DE INTEGRAÇÃO
   ↓
Verificação (M3) ← PONTO DE INTEGRAÇÃO
```

### 2. Integração com Atestação

**Para a interface registrar uma atestação:**

**Input necessário:**
- `ReviewedStateRecord` (saída do M2)
- `SOLANA_PRIVATE_KEY` (configuração)
- Network URL (default: devnet)

**Output da função:**
- `tx_signature` (string)

**Status da transação:**
- Success → Exibir link para Solana Explorer
- Error → Exibir mensagem amigável (ex: saldo insuficiente, handoff inválido)

**UX recomendada:**
1. Botão "Atestar Competência" (disponível quando state = DEMONSTRATED)
2. Mostrar spinner durante envio da transação
3. Exibir confirmação com link para Explorer
4. Salvar `tx_signature` no registro local

### 3. Integração com Verificação

**Para a interface verificar uma atestação:**

**Input necessário:**
- `tx_signature` (do registro local)
- `record_hash` (do reviewed-state.json)
- `ATTESTER_PUBKEY` (configuração)

**Output da função:**
- `VerifyResult` com:
  - `verified`: boolean
  - `payload`: objeto on-chain
  - `checks`: objeto com status de cada check
  - `signers`: array de assinantes

**UX recomendada:**
1. Botão "Verificar Atestação" (quando tx_signature existe)
2. Mostrar spinner durante consulta à rede
3. Exibir resultado visual:
   - ✅ Verde: todos os checks passaram
   - ⚠️ Amarelo: check(s) falharam
   - Exibir payload on-chain em formato legível
4. Link para Solana Explorer

### 4. Estado da carteira

**Informações úteis para a interface:**
- Saldo atual da carteira (SOL)
- Chave pública da carteira
- Status da conexão com a rede

**Funções disponíveis:**
```typescript
// Connection padrão
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Saldo
const balance = await connection.getBalance(publicKey);

// Airdrop (devnet apenas)
const signature = await connection.requestAirdrop(publicKey, amount);
```

---

## Limitações e Considerações

### 1. Ambiente

- **Atual:** Devnet (testnet)
- **Mainnet:** Não implementado (será versão futura)
- **Airdrop:** Só funciona em devnet; pode falhar por IP

### 2. Chaves privadas

- **Segurança:** NUNCA commitar `.env` com chaves reais
- **Interface:** Deve permitir configuração segura (variáveis de ambiente, keyring)
- **Alternativa:** Considerar wallet adapter (Phantom, Solflare) para produção

### 3. Custos de transação

- **Devnet:** Gratuito (via airdrop)
- **Mainnet:** Requer SOL real
- **Estimativa:** Transação Memo Program = ~0.000005 SOL (negligível)

### 4. Privacidade

- **Dados pessoais:** NUNCA vão on-chain
- **Subject:** Representado por `subject_ref` (hash pseudônimo)
- **Evidências:** Armazenadas off-chain (JSON local / BD futuro)

### 5. Escalabilidade

- **Payload Memo:** Limitado (~1KB)
- **Design atual:** Payload mínimo (fit)
- **Futuro:** Considerar programas customizados para payloads maiores

---

## Dependências do M3

### Internas (já resolvidas)

- ✅ `@solana/web3.js` v1.99.0
- ✅ `bs58` v6.0.0 (codificação Base58)
- ✅ `src/provenance/trace.ts` (verifyHandoff)
- ✅ `src/util.ts` (sha256)

### Externas (para interface considerar)

- **Wallet Adapter (opcional):** Para integração com carteiras de usuário
- **IPFS / Arweave (opcional):** Para armazenamento off-chain descentralizado
- **Indexador (opcional):** Para consultas mais eficientes

---

## Comandos Úteis

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar demo completo (M1 → M2 → M3)
npm run demo                    # Gera reviewed-state.json
npm run m3:attest               # Registra atestação

# Verificar atestação
npm run m3:verify <tx_signature> [record_hash]

# Rodar testes
npm test                        # 52 testes (incluindo M3)
```

### Testes M3 específicos

Os testes de M3 estão em `tests/solana/` e cobrem:
- Geração de payload de atestação
- Cálculo de `subject_ref`
- Validação de integridade do handoff
- Extração de assinantes da transação
- Verificação completa (todos os checks)

---

## Documentação Relacionada

### Arquitetura

- `docs/architecture/ATTESTATION_MODEL.md` — Modelo de atestação
- `docs/architecture/EVIDENCE_PIPELINE.md` — Pipeline de evidências
- `docs/architecture/M2_IMPLEMENTATION.md` — Implementação do M2

### Decisões

- `docs/decisions/0001-repository-operating-model.md` — Modelo operacional

### Diário de Bordo

- `docs/diario-de-bordo/03_conclusao_ciclo_M3_atestacao.md` — Conclusão do ciclo M3
- `docs/diario-de-bordo/05_hardening_handoff_m2_m3.md` — Hardening do handoff

### Status do Projeto

- `docs/PROJECT_STATUS.md` — Status atual e milestones

---

## Perguntas Frequentes (FAQ)

**Q: A interface precisa manter o `reviewed-state.json` localmente?**  
A: Para o MVP atual, sim. O `record_hash` no payload on-chain é uma referência ao JSON local. Em versões futuras, isso pode evoluir para armazenamento off-chain estruturado (IPFS, BD, etc.).

**Q: Como a interface deve lidar com falhas de transação?**  
A: Implementar retry com backoff, mensagens de erro claras (ex: "Saldo insuficiente", "Handoff inválido"), e permitir que o usuário tente novamente.

**Q: É possível atestar múltiplas competências para o mesmo sujeito?**  
A: Sim, cada atestação é uma transação independente. O `subject_ref` é calculado com o `record_hash` como sal, garantindo que cada competência tenha uma referência única.

**Q: A interface deve mostrar o payload on-chain completo?**  
A: Recomendado para transparência. Mostrar de forma legível (JSON formatado) com destaque para os campos críticos (state, record_hash, attester).

**Q: Como migrar de devnet para mainnet?**  
A: Alterar o `networkUrl` para um endpoint mainnet, usar uma carteira com SOL real, e remover a lógica de airdrop. O código M3 já está preparado para isso.

---

## Próximos Passos Sugeridos

### Para Interface Owner (JP Fernandes)

1. **Fluxo principal:**
   - Criar tela de upload de evidências (M2)
   - Criar tela de revisão humana (M2)
   - Criar tela de atestação (M3) com botão "Atestar"
   - Criar tela de verificação (M3) com botão "Verificar"

2. **Integração:**
   - Importar `createAttestationOnChain` de `src/solana/attest.ts`
   - Importar `verifyAttestation` de `src/solana/verify.ts`
   - Implementar handlers de erro e loading states

3. **UX:**
   - Designar fluxo visual claro (M1 → M2 → M3)
   - Mostrar progresso em cada etapa
   - Exibir confirmações visuais (checks, badges)
   - Adicionar links para Solana Explorer

4. **Configuração:**
   - Permitir configurar `SOLANA_PRIVATE_KEY` (de forma segura)
   - Permitir selecionar rede (devnet/mainnet)
   - Mostrar saldo da carteira

### Para M3 Owner (JX)

- Disponível para suporte técnico em integração
- Não há pendências técnicas no M3
- Pode auxiliar com testes de integração e troubleshooting

---

## Assinatura

**Handoff aprovado:** ✅  
**M3 status:** DONE  
**Pronto para integração:** SIM  
**Bloqueios conhecidos:** NENHUM

---

## Histórico de Alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 06/10/2026 | Criação do handoff M3 → Interface | JX |
