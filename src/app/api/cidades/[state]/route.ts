import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } },
) {
  const state = params.state
  const res: Response = await fetch(
    `${process.env.REACT_APP_API_GSO}/api/auth/cidades/${state}`,
  )
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    )
  }
  const data = await res.json()
  return NextResponse.json(data)
}
