import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } },
): Promise<NextResponse> {
  const state = params.state
  const res: Response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`,
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
