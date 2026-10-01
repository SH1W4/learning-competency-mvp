import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';
import fs from 'fs';
import dotenv from 'dotenv';
import { createAttestationOnChain } from './attest.js';

dotenv.config();

async function runM3Demo() {
  console.log("🚀 Iniciando M3 Demo (Solana Attestation)...");
  
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  
  let keypair: Keypair;
  let privateKeyStr = process.env.SOLANA_PRIVATE_KEY;

  if (privateKeyStr) {
    keypair = Keypair.fromSecretKey(bs58.decode(privateKeyStr));
    console.log(`🔑 Usando carteira do .env: ${keypair.publicKey.toBase58()}`);
  } else {
    keypair = Keypair.generate();
    privateKeyStr = bs58.encode(keypair.secretKey);
    // Salva no .env para reusarmos sem perder a carteira
    fs.appendFileSync('.env', `\nSOLANA_PRIVATE_KEY=${privateKeyStr}\n`);
    console.log(`🔑 Nova carteira gerada e salva no .env: ${keypair.publicKey.toBase58()}`);
  }

  const balance = await connection.getBalance(keypair.publicKey);
  if (balance < 0.01 * LAMPORTS_PER_SOL) {
    console.log(`🪂 Saldo baixo (${balance / LAMPORTS_PER_SOL} SOL). Tentando Airdrop automático na Devnet...`);
    try {
      const signature = await connection.requestAirdrop(keypair.publicKey, 1 * LAMPORTS_PER_SOL);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed');
      console.log("✅ Airdrop concluído com sucesso!");
    } catch (e: any) {
      console.log(`\n⚠️ AIRDROP FALHOU: A Devnet da Solana costuma bloquear pedidos repetidos por IP.`);
      console.log(`\n👉 AÇÃO NECESSÁRIA PARA CONTINUAR (Fácil e Rápido):\n1. Acesse: https://faucet.solana.com/\n2. Cole seu endereço: ${keypair.publicKey.toBase58()}\n3. Selecione 1 ou 2 SOL (Devnet)\n4. Depois rode no terminal: npx tsx src/solana/demo.ts\n`);
      return;
    }
  } else {
     console.log(`✅ Saldo OK: ${balance / LAMPORTS_PER_SOL} SOL`);
  }

  console.log("\n📖 Lendo ReviewedStateRecord do M2 (out/reviewed-state.json)...");
  let realRecord;
  try {
    const fileContent = fs.readFileSync('out/reviewed-state.json', 'utf8');
    realRecord = JSON.parse(fileContent);
  } catch (err) {
    console.error("⚠️ ERRO: Falha ao ler 'out/reviewed-state.json'. Execute 'npm run demo' primeiro para gerar o Handoff do M2.");
    return;
  }

  console.log("\n⛓️ Gravando estado do Handoff (M2 -> M3) na Solana...");
  try {
      const txSig = await createAttestationOnChain(realRecord as any, privateKeyStr!);
      console.log(`🎉 Sucesso! Atestação registrada permanentemente.`);
      console.log(`🔗 Verifique no Explorer: https://explorer.solana.com/tx/${txSig}?cluster=devnet\n`);
  } catch(e) {
      console.error("Erro ao atestar:", e);
  }
}

runM3Demo();
