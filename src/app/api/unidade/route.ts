import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const idCorporation = searchParams.get('id-corporation')
  const idCompany = searchParams.get('id-company')

  if (idCorporation == null && idCompany == null) {
    return NextResponse.json(
      { message: 'id-corporation e id-company não informado' },
      { status: 400 },
    )
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company?id-corporation=${idCorporation}&id-company=${idCompany}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['unidadesFetch'] },
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
