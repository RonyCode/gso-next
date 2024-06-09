import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json()

  if (body.id_corporation === null || body.name === '')
    return NextResponse.json({ message: 'Erro parametros necessários' })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ company: body }),
    },
  )

  if (!res.ok) {
    const { message } = await res.json()
    return NextResponse.json({ message }, { status: 400 })
  }
  const response = await res.json()
  return NextResponse.json(response)
}
