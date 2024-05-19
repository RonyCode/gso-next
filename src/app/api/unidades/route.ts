import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const $idCorporation = searchParams.get('id-corporation')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/companies/${$idCorporation}`,
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
