import { Connection, Keypair, Transaction, PublicKey, sendAndConfirmTransaction, TransactionInstruction } from '@solana/web3.js';
import bs58 from 'bs58';
import type { ReviewedStateRecord } from '../provenance/trace.js';

// Endereço do Memo Program nativo da Solana (usado para registrar dados arbitrários off-chain)
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

/**
 * M3.2: Registra a atestação de competência na Solana.
 * O payload é enxuto, priorizando o record_hash (comprovante de integridade).
 */
export async function createAttestationOnChain(
  record: ReviewedStateRecord,
  signerPrivateKeyBase58: string,
  networkUrl: string = 'https://api.devnet.solana.com'
): Promise<string> {
  const connection = new Connection(networkUrl, 'confirmed');
  const signer = Keypair.fromSecretKey(bs58.decode(signerPrivateKeyBase58));

  // Payload enxuto para a Blockchain (apenas metadados e Hashes)
  const attestationPayload = {
    mvp: "learning-competency",
    subject: record.subject,
    competency: record.competency_id,
    state: record.state,
    record_hash: record.record_hash, // Hash principal (âncora)
    timestamp: new Date().toISOString()
  };

  const memoData = Buffer.from(JSON.stringify(attestationPayload), 'utf-8');

  // Instrução do Memo Program
  const memoInstruction = new TransactionInstruction({
    keys: [{ pubkey: signer.publicKey, isSigner: true, isWritable: true }],
    programId: MEMO_PROGRAM_ID,
    data: memoData,
  });

  const transaction = new Transaction().add(memoInstruction);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [signer]);
    return signature;
  } catch (error) {
    throw new Error(`Falha ao registrar atestação na Solana: ${error}`);
  }
}
