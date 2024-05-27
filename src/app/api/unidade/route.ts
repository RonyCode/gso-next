import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const idCorporation = searchParams.get('id-corporation')
  const idCompany = searchParams.get('id-company')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company?id-corporation=${idCorporation}&id-company=${idCompany}`,
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
  const { companies } = await res.json()
  return NextResponse.json(companies)
}
