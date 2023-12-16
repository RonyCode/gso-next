import { NextResponse } from 'next/server'
export async function GET() {
  const res: Response = await fetch(`${process.env.API_GSO}/api/auth/cidades`)
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    )
  }
  const data = await res.json()
  return NextResponse.json(data)
}
