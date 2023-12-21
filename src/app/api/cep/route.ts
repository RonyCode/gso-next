import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cep = searchParams.get('cep')
  const res = await fetch(`https://brasilaberto.com/api/v1/zipcode/${cep}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { result } = await res.json()
  return NextResponse.json(result)
}
