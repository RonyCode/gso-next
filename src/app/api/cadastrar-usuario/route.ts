import { type NextRequest, NextResponse } from 'next/server'

import { limiter } from '@/app/api/config/limiter'
import { type IRegisterUserSchema } from '@/schemas/RegisterUserSchema'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const remaining: number = await limiter.removeTokens(1)
  const body: IRegisterUserSchema = await request.json()

  if (body.cpf === '' || body.email === '' || body.senha === '')
    return NextResponse.json({ message: 'Erro parametros necessários' })

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'To many requests',
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/cadastro`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    },
  )

  if (!res.ok) {
    const { message } = await res.json()
    return NextResponse.json({ message }, { status: 401 })
  }
  const response = await res.json()
  return NextResponse.json(response)
}
