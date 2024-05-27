import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const idCorporation = searchParams.get('id-corporation')
  const idCompany = searchParams.get('id-company')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/companies?id-corporation=${idCorporation}&id-company=${idCompany}`,
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
