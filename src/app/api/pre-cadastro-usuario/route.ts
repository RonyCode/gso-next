import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email } = await request.json()

  if (email === null && email === '')
    return NextResponse.json({ message: 'Erro parâmetros necessários' })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/pre-cadastro`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  )

  if (!res.ok) {
    return NextResponse.json({ ...(await res?.json()) }, { status: 400 })
  }
  const data = await res.json()
  return NextResponse.json(
    {
      data: true,
      status: 'success',
      code: 200,
      id_request: data.id_request,
      message: 'Email enviado com sucesso!',
    },
    { status: 200 },
  )
}
