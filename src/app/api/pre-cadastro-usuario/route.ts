import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email } = await request.json()

  if (!email)
    return NextResponse.json({ message: 'Erro parâmetros necessários' })

  const res = await fetch(
    `${process.env.REACT_APP_API_GSO}/api/auth/pre-cadastro`,
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
  return NextResponse.json(
    {
      data: true,
      status: 'success',
      code: 200,
      message: 'Email enviado com sucesso!',
    },
    { status: 200 },
  )
}
