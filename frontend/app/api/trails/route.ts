import { NextResponse } from 'next/server'
import { listTrailsFromDb, saveTrailToDb, StoredTrail } from '@/app/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    const items = await listTrailsFromDb()
    return NextResponse.json({ items }, {
      status: 200,
      headers: {
        'cache-control': 'no-store',
        'x-lastro-source': 'postgres-db',
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to list trails' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.id || !body.role || !body.title || !body.statement) {
      return NextResponse.json({ error: 'Missing required trail fields' }, { status: 400 })
    }

    const newTrail: StoredTrail = {
      id: body.id,
      role: body.role,
      title: body.title,
      purpose: body.purpose || 'internal_reskilling',
      statement: body.statement,
      criteria: body.criteria || [],
      activities: body.activities || [],
      createdAt: new Date().toISOString(),
    }

    const saved = await saveTrailToDb(newTrail)
    return NextResponse.json({ success: true, savedToDb: saved, item: newTrail }, {
      status: 201,
      headers: { 'cache-control': 'no-store' },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to persist trail' }, { status: 500 })
  }
}
