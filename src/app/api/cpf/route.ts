import { type NextRequest, NextResponse } from 'next/server'

interface CpfSchema {
  cpf: string
  dataNascimento: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: CpfSchema = await request.json()
  const { cpf, dataNascimento } = body

  const res = await fetch(
    `https://api.nfse.io/NaturalPeople/Basicinfo/taxNumber/${cpf}/${dataNascimento}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const { result } = await res.json()
  return NextResponse.json(result)
}
