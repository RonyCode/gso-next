import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json()
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ corporation: body }),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    const { message } = await res.json()
    return NextResponse.json({ message }, { status: 400 })
  }
  const response = await res.json()
  return NextResponse.json(response)
}
