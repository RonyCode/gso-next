import { NextResponse } from 'next/server'
export async function GET() {
  const res = await fetch('http://192.168.100.50/services/estados', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    )
  }
  const data = await res.json()

  return NextResponse.json(data)
}
