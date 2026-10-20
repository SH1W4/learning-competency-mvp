import { NextResponse } from 'next/server'
import { listEvidencesFromDb, saveEvidenceToDb, StoredEvidence } from '@/app/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const items = await listEvidencesFromDb()
    return NextResponse.json({ items }, {
      status: 200,
      headers: {
        'cache-control': 'no-store',
        'x-lastro-source': 'postgres-db',
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to list evidence' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.trailId || !body.activityId || !body.contentHash) {
      return NextResponse.json({ error: 'Missing required evidence fields' }, { status: 400 })
    }

    const newEvidence: StoredEvidence = {
      id: body.id || `ev-${Date.now().toString(36)}`,
      employeeName: body.employeeName || 'Anonymous',
      employeeRole: body.employeeRole || 'Contributor',
      trailId: body.trailId,
      activityId: body.activityId,
      evidenceType: body.evidenceType || 'analysis_artifact',
      sourceType: body.sourceType || 'file',
      sourceRef: body.sourceRef || 'unknown',
      contentHash: body.contentHash,
      trustLevel: body.trustLevel || 'N2_EVIDENCE_PRESENTED',
      createdAt: new Date().toISOString(),
    }

    const saved = await saveEvidenceToDb(newEvidence)
    return NextResponse.json({ success: true, savedToDb: saved, item: newEvidence }, {
      status: 201,
      headers: { 'cache-control': 'no-store' },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to persist evidence' }, { status: 500 })
  }
}
