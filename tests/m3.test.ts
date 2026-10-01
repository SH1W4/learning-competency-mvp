import { describe, expect, it, vi, beforeEach } from "vitest";
import { verifyAttestation } from "../src/solana/verify.js";
import { Connection, PublicKey } from "@solana/web3.js";

// Mock do @solana/web3.js para simular a rede
vi.mock("@solana/web3.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual as any,
    Connection: vi.fn(),
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
