import { NextRequest, NextResponse } from 'next/server'

import { SignInSchema } from '@/app/(auth)/auth/schemas/SignInSchema'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin: string | null = request.headers.get('origin')
  const body: SignInSchema = await request.json()
  const { email, senha, is_user_external: isUserExternal } = body

  if (!email || !senha)
    return NextResponse.json({ message: 'Erro parametros necessários' })

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GSO}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*',
    },
    body: JSON.stringify({
      email,
      senha,
      is_user_external: isUserExternal,
    }),
  })

  if (!res.ok) {
    const { message } = await res.json()
    return NextResponse.json({ message }, { status: 401 })
  }
  const { data } = await res.json()
  return NextResponse.json(data)
}
