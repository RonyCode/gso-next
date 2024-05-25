import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const cep = searchParams.get('cep')
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return NextResponse.json(result)
}
