import { describe, expect, it, vi, beforeEach } from "vitest";
import { verifyAttestation } from "../src/solana/verify.js";
import { Connection, PublicKey } from "@solana/web3.js";

// Mock do @solana/web3.js para simular a rede
vi.mock("@solana/web3.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as any,
    Connection: vi.fn(),
    sendAndConfirmTransaction: vi.fn(),
    Keypair: {
      fromSecretKey: vi.fn().mockReturnValue({ publicKey: { toBase58: () => "mocked_pubkey" } }),
    }
  };
});

describe("M3 — Attestation e Verification", () => {
  let mockGetParsedTransaction: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetParsedTransaction = vi.fn();
    (Connection as any).mockImplementation(() => ({
      getParsedTransaction: mockGetParsedTransaction
    }));
  });

  const MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';

  it("3.1: Attestation payload é gerado corretamente e usa o record_hash real", async () => {
    const { createAttestationOnChain } = await import("../src/solana/attest.js");
    const { sendAndConfirmTransaction } = await import("@solana/web3.js");
    
    (sendAndConfirmTransaction as any).mockResolvedValue("mock_signature_123");

    const record: any = {
      subject: "test_subject",
      competency_id: "test_comp",
      state: "DEMONSTRATED",
      record_hash: "hash_do_m2_real",
      synthetic: true
    };
    
    const sig = await createAttestationOnChain(record, "3yvV9J1bB2B7uFpYQ9P6M8fLwT3vFqF1j1tqH8Y9P6M8fLwT3vFqF1j1tqH8Y9P6");
    expect(sig).toBe("mock_signature_123");
    
    // O mock sendAndConfirmTransaction é chamado com (connection, transaction, [signer])
    const txArg = (sendAndConfirmTransaction as any).mock.calls[0][1];
    
    // Pega a instrução (deve ser 1 instrução pro Memo Program)
    expect(txArg.instructions).toHaveLength(1);
    const instruction = txArg.instructions[0];
    expect(instruction.programId.toBase58()).toBe(MEMO_PROGRAM_ID);
    
    // Pega o dado da instrução, que deve ser o payload JSON
    const payloadStr = instruction.data.toString("utf-8");
    const payload = JSON.parse(payloadStr);
    
    expect(payload.subject).toBe("test_subject");
    expect(payload.competency).toBe("test_comp");
    expect(payload.state).toBe("DEMONSTRATED");
    expect(payload.record_hash).toBe("hash_do_m2_real");
    expect(payload.timestamp).toBeDefined();
  });

  const mockTransaction = (memoData: any, programId: string = MEMO_PROGRAM_ID) => {
    return {
      transaction: {
        message: {
          instructions: [
            {
              programId: new PublicKey(programId),
              parsed: typeof memoData === 'string' ? memoData : JSON.stringify(memoData)
            }
          ]
        }
      }
    };
  };

  it("3.1 e 3.2: Payload de attestation preserva campos corretos e hash (Verificação positiva)", async () => {
    const validPayload = {
      mvp: "learning-competency",
      subject: "ana@synthetic.com",
      competency: "LID-01",
      state: "DEMONSTRATED",
      record_hash: "hash_correto_123",
      timestamp: new Date().toISOString()
    };
    
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(validPayload));

    const result = await verifyAttestation("hash_correto_123", "tx_valid");
    expect(result.verified).toBe(true);
    const payload = result.payload as any;
    expect(payload.record_hash).toBe("hash_correto_123");
    expect(payload.subject).toBe("ana@synthetic.com");
    expect(payload.competency).toBe("LID-01");
    expect(payload.state).toBe("DEMONSTRATED");
  });

  it("3.4: Verificação negativa (hash incorreto)", async () => {
    const validPayload = {
      mvp: "learning-competency",
      subject: "ana@synthetic.com",
      competency: "LID-01",
      state: "DEMONSTRATED",
      record_hash: "hash_diferente_999", // HASH DIFERENTE
      timestamp: new Date().toISOString()
    };
    
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(validPayload));

    const result = await verifyAttestation("hash_correto_123", "tx_valid");
    expect(result.verified).toBe(false);
    expect(result.error).toContain('não encontrado');
  });

  it("3.5: Memo inválido / malformado é ignorado/rejeitado", async () => {
    // String não-JSON
    mockGetParsedTransaction.mockResolvedValue(mockTransaction("não é json"));
    let result = await verifyAttestation("hash_correto_123", "tx_invalid");
    expect(result.verified).toBe(false);

    // Payload sem record_hash
    const semHash = { subject: "ana@synthetic.com" };
    mockGetParsedTransaction.mockResolvedValue(mockTransaction(semHash));
    result = await verifyAttestation("hash_correto_123", "tx_invalid2");
    expect(result.verified).toBe(false);
  });

  it("3.5: Rejeita quando a transação não é encontrada", async () => {
    mockGetParsedTransaction.mockResolvedValue(null);
    const result = await verifyAttestation("hash_correto_123", "tx_not_found");
    expect(result.verified).toBe(false);
    expect(result.error).toContain('não encontrada');
  });
});
