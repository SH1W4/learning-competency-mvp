import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  // Simple health check endpoint
  // Returns 200 if the server is running
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        'cache-control': 'no-store',
      },
    },
  )
}
