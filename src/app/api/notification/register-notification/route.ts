import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log(request.body)
  return NextResponse.json('OK')
}
