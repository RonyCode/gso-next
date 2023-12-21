import { NextRequest, NextResponse } from 'next/server'

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema'
import { limiter } from '@/app/api/config/limiter'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin: string | null = request.headers.get('origin')
  const remaining: number = await limiter.removeTokens(1)
  const body: RegisterUserSchema = await request.json()

  if (!body)
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

  const res = await fetch(`${process.env.API_GSO}/api/auth/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*',
    },
    body: JSON.stringify({ ...body }),
  })

  if (!res.ok) {
    const { message } = await res.json()
    return NextResponse.json({ message }, { status: 401 })
  }
  const { data } = await res.json()
  return NextResponse.json(data)
}
