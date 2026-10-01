import { Connection, PublicKey } from '@solana/web3.js';

/**
 * M3 — Verificação: dado um record_hash e uma tx_signature,
 * confirma que o hash foi registrado on-chain via Memo Program.
 *
 * Uso:
 *   npx tsx src/solana/verify.ts <record_hash> <tx_signature>
 */

export async function verifyAttestation(
  recordHash: string,
  txSignature: string,
  networkUrl: string = 'https://api.devnet.solana.com'
): Promise<{ verified: boolean; payload?: object; error?: string }> {
  const connection = new Connection(networkUrl, 'confirmed');

  let tx;
  try {
    tx = await connection.getParsedTransaction(txSignature, {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed',
    });
  } catch (e) {
    return { verified: false, error: `Falha ao buscar transação: ${e}` };
  }

  if (!tx) {
    return { verified: false, error: 'Transação não encontrada na rede.' };
  }

  // Percorre as instruções da transação buscando o Memo Program
  const MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
  const instructions = tx.transaction.message.instructions;

  for (const ix of instructions) {
    if ('programId' in ix && ix.programId.toBase58() === MEMO_PROGRAM_ID) {
      // O Memo Program retorna dados como string parsed
      const parsed = ix as any;
      const memoStr = parsed?.parsed ?? parsed?.data;
      if (!memoStr) continue;

      let payload: any;
      try {
        payload = JSON.parse(typeof memoStr === 'string' ? memoStr : Buffer.from(memoStr, 'base64').toString('utf-8'));
      } catch {
        continue;
      }

      if (payload?.record_hash === recordHash) {
        return { verified: true, payload };
      }
    }
  }

  return {
    verified: false,
    error: `record_hash "${recordHash}" não encontrado na transação ${txSignature}.`,
  };
}

// CLI Runner
async function main() {
  const [, , arg1, arg2] = process.argv;
  
  let txSignature = arg1;
  let recordHash = arg2;

  if (!txSignature) {
    console.error('Uso: npx tsx src/solana/verify.ts <tx_signature> [record_hash]');
    process.exit(1);
  }

  // Se não passou recordHash, tentamos ler do out/reviewed-state.json
  if (!recordHash) {
    try {
      const fs = await import('fs');
      const content = fs.readFileSync('out/reviewed-state.json', 'utf-8');
      const record = JSON.parse(content);
      recordHash = record.record_hash;
      console.log(`📖 Lendo record_hash do out/reviewed-state.json: ${recordHash}`);
    } catch (e) {
      console.error('⚠️ Não foi possível ler out/reviewed-state.json e nenhum record_hash foi passado como argumento.');
      process.exit(1);
    }
  }

  console.log(`\n🔍 Verificando atestação on-chain...`);
  console.log(`   record_hash : ${recordHash}`);
  console.log(`   tx          : ${txSignature}\n`);

  const result = await verifyAttestation(recordHash as string, txSignature as string);

  if (result.verified) {
    console.log('✅ VERIFICADO — A atestação existe e o hash confere.');
    console.log('\nPayload on-chain:');
    console.log(JSON.stringify(result.payload, null, 2));
  } else {
    console.log('❌ NÃO VERIFICADO');
    console.log(`Motivo: ${result.error}`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('verify.ts')) {
  main().catch(console.error);
}
