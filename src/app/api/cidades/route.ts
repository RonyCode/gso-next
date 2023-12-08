import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const shorName = searchParams.get('short-name')

  const res = await fetch(`https://brasilaberto.com/api/v1/cities/${shorName}`)
  const data = await res.json()
  return NextResponse.json(data)
}
