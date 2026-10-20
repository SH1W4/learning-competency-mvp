/**
 * LASTRO — Persistent Storage Layer for Vercel Postgres / Neon
 *
 * Implements native Zero-Dependency SQL execution over HTTP for Neon / Vercel Postgres.
 * Reads POSTGRES_URL or DATABASE_URL provided by Vercel Postgres integration.
 * If no database is configured, gracefully falls back to deterministic local/synthetic storage.
 */

export type StoredEvidence = {
  id: string
  employeeName: string
  employeeRole: string
  trailId: string
  activityId: string
  evidenceType: string
  sourceType: string
  sourceRef: string
  contentHash: string
  trustLevel: string
  createdAt: string
}

export type StoredTrail = {
  id: string
  role: string
  title: string
  purpose: string
  statement: string
  criteria: Array<{ id: string; title: string; observables: string[] }>
  activities: Array<{ id: string; title: string; objective: string; expectedEvidence: string[]; criteria: string[] }>
  createdAt: string
}

function getConnectionString(): string | null {
  return process.env.POSTGRES_URL || process.env.DATABASE_URL || null
}

/**
 * Execute an SQL query against Neon / Vercel Postgres via native HTTP SQL API.
 */
export async function queryNeon<T = unknown>(
  sqlText: string,
  params: unknown[] = []
): Promise<{ rows: T[]; rowCount: number }> {
  const connectionString = getConnectionString()
  if (!connectionString) {
    throw new Error('POSTGRES_URL or DATABASE_URL is not set')
  }

  // Parse host from connection string
  // Format: postgres://user:pass@ep-xyz.region.neon.tech/dbname?sslmode=require
  let host = ''
  try {
    const parsed = new URL(connectionString)
    host = parsed.hostname
  } catch {
    throw new Error('Invalid database connection string format')
  }

  const endpoint = `https://${host}/sql`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': connectionString,
    },
    body: JSON.stringify({
      query: sqlText,
      params,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Neon Postgres HTTP query failed (${res.status}): ${errorText}`)
  }

  const data = await res.json()
  return {
    rows: (data.rows || []) as T[],
    rowCount: data.rowCount ?? (data.rows ? data.rows.length : 0),
  }
}

let schemaInitialized = false

/**
 * Ensure database tables and seed data exist.
 */
export async function ensureDatabaseSchema(): Promise<boolean> {
  if (schemaInitialized) return true
  const conn = getConnectionString()
  if (!conn) return false

  try {
    // 1. Table for canonical M4 projections
    await queryNeon(`
      CREATE TABLE IF NOT EXISTS m4_projections (
        scenario VARCHAR(64) PRIMARY KEY,
        record_hash VARCHAR(128) NOT NULL,
        attestation_tx VARCHAR(128),
        network VARCHAR(32),
        payload JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 2. Table for submitted evidence
    await queryNeon(`
      CREATE TABLE IF NOT EXISTS submitted_evidence (
        id VARCHAR(64) PRIMARY KEY,
        employee_name VARCHAR(128) NOT NULL,
        employee_role VARCHAR(128) NOT NULL,
        trail_id VARCHAR(128) NOT NULL,
        activity_id VARCHAR(64) NOT NULL,
        evidence_type VARCHAR(64) NOT NULL,
        source_type VARCHAR(64) NOT NULL,
        source_ref VARCHAR(255) NOT NULL,
        content_hash VARCHAR(128) NOT NULL,
        trust_level VARCHAR(64) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 3. Table for custom trails
    await queryNeon(`
      CREATE TABLE IF NOT EXISTS custom_trails (
        id VARCHAR(128) PRIMARY KEY,
        role VARCHAR(128) NOT NULL,
        title VARCHAR(255) NOT NULL,
        purpose VARCHAR(64) DEFAULT 'internal_reskilling',
        statement TEXT NOT NULL,
        criteria JSONB NOT NULL,
        activities JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    schemaInitialized = true
    return true
  } catch (err) {
    console.warn('[LASTRO DB] Schema initialization warning:', err)
    return false
  }
}

// ─── Canonical Seed / Store ──────────────────────────────────────────────────

export async function getCanonicalProjectionFromDb(scenario: string) {
  const conn = getConnectionString()
  if (!conn) return null

  try {
    await ensureDatabaseSchema()
    const { rows } = await queryNeon<{ payload: any }>(
      'SELECT payload FROM m4_projections WHERE scenario = $1 LIMIT 1',
      [scenario]
    )
    if (rows.length > 0 && rows[0].payload) {
      const p = rows[0].payload
      return typeof p === 'string' ? JSON.parse(p) : p
    }
    return null
  } catch (err) {
    console.warn('[LASTRO DB] Error reading canonical projection:', err)
    return null
  }
}

export async function saveCanonicalProjectionToDb(scenario: string, payload: any) {
  const conn = getConnectionString()
  if (!conn) return false

  try {
    await ensureDatabaseSchema()
    const recordHash = payload.handoff?.record_hash || ''
    const attestationTx = payload.attestation?.tx_signature || null
    const network = payload.attestation?.network || 'devnet'

    await queryNeon(
      `
      INSERT INTO m4_projections (scenario, record_hash, attestation_tx, network, payload, updated_at)
      VALUES ($1, $2, $3, $4, $5::jsonb, CURRENT_TIMESTAMP)
      ON CONFLICT (scenario) DO UPDATE SET
        record_hash = EXCLUDED.record_hash,
        attestation_tx = EXCLUDED.attestation_tx,
        network = EXCLUDED.network,
        payload = EXCLUDED.payload,
        updated_at = CURRENT_TIMESTAMP
      `,
      [scenario, recordHash, attestationTx, network, JSON.stringify(payload)]
    )
    return true
  } catch (err) {
    console.warn('[LASTRO DB] Error saving canonical projection:', err)
    return false
  }
}

// ─── Evidence Persistence ────────────────────────────────────────────────────

export async function listEvidencesFromDb(): Promise<StoredEvidence[]> {
  const conn = getConnectionString()
  if (!conn) return []

  try {
    await ensureDatabaseSchema()
    const { rows } = await queryNeon<any>(`
      SELECT 
        id, employee_name, employee_role, trail_id, activity_id, 
        evidence_type, source_type, source_ref, content_hash, trust_level, 
        created_at 
      FROM submitted_evidence 
      ORDER BY created_at DESC 
      LIMIT 100
    `)
    return rows.map((r) => ({
      id: r.id,
      employeeName: r.employee_name,
      employeeRole: r.employee_role,
      trailId: r.trail_id,
      activityId: r.activity_id,
      evidenceType: r.evidence_type,
      sourceType: r.source_type,
      sourceRef: r.source_ref,
      contentHash: r.content_hash,
      trustLevel: r.trust_level,
      createdAt: r.created_at,
    }))
  } catch (err) {
    console.warn('[LASTRO DB] Error listing evidences:', err)
    return []
  }
}

export async function saveEvidenceToDb(evidence: StoredEvidence): Promise<boolean> {
  const conn = getConnectionString()
  if (!conn) return false

  try {
    await ensureDatabaseSchema()
    await queryNeon(
      `
      INSERT INTO submitted_evidence (
        id, employee_name, employee_role, trail_id, activity_id, 
        evidence_type, source_type, source_ref, content_hash, trust_level, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING
      `,
      [
        evidence.id,
        evidence.employeeName,
        evidence.employeeRole,
        evidence.trailId,
        evidence.activityId,
        evidence.evidenceType,
        evidence.sourceType,
        evidence.sourceRef,
        evidence.contentHash,
        evidence.trustLevel,
        evidence.createdAt,
      ]
    )
    return true
  } catch (err) {
    console.warn('[LASTRO DB] Error saving evidence:', err)
    return false
  }
}

// ─── Custom Trails Persistence ───────────────────────────────────────────────

export async function listTrailsFromDb(): Promise<StoredTrail[]> {
  const conn = getConnectionString()
  if (!conn) return []

  try {
    await ensureDatabaseSchema()
    const { rows } = await queryNeon<any>(`
      SELECT id, role, title, purpose, statement, criteria, activities, created_at
      FROM custom_trails
      ORDER BY created_at DESC
      LIMIT 50
    `)
    return rows.map((r) => ({
      id: r.id,
      role: r.role,
      title: r.title,
      purpose: r.purpose || 'internal_reskilling',
      statement: r.statement,
      criteria: typeof r.criteria === 'string' ? JSON.parse(r.criteria) : r.criteria,
      activities: typeof r.activities === 'string' ? JSON.parse(r.activities) : r.activities,
      createdAt: r.created_at,
    }))
  } catch (err) {
    console.warn('[LASTRO DB] Error listing trails:', err)
    return []
  }
}

export async function saveTrailToDb(trail: StoredTrail): Promise<boolean> {
  const conn = getConnectionString()
  if (!conn) return false

  try {
    await ensureDatabaseSchema()
    await queryNeon(
      `
      INSERT INTO custom_trails (id, role, title, purpose, statement, criteria, activities, created_at)
      VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8)
      ON CONFLICT (id) DO UPDATE SET
        role = EXCLUDED.role,
        title = EXCLUDED.title,
        purpose = EXCLUDED.purpose,
        statement = EXCLUDED.statement,
        criteria = EXCLUDED.criteria,
        activities = EXCLUDED.activities
      `,
      [
        trail.id,
        trail.role,
        trail.title,
        trail.purpose,
        trail.statement,
        JSON.stringify(trail.criteria),
        JSON.stringify(trail.activities),
        trail.createdAt,
      ]
    )
    return true
  } catch (err) {
    console.warn('[LASTRO DB] Error saving trail:', err)
    return false
  }
}
