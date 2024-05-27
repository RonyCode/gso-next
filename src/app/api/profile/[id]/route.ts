import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const id = params.id
  const token = request.headers.get('Authorization')

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
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    )
  }
  // const data = await res.json()
  return NextResponse.json(await res.json())
}
