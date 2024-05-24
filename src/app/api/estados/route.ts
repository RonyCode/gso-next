import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/services/states`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
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
