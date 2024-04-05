import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-id/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (res.ok) {
      const result = await res.json()
      return NextResponse.json(result)
    }
  }
  return NextResponse.json({ error: 'Usuário não encontrado' })
}
