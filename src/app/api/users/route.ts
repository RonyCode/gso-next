import { NextResponse } from 'next/server'

export async function GET(request: Request): Promise<NextResponse> {
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/user/get-all`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 1,
      },
    },
  )
  const result = await res.json()
  return NextResponse.json(result)
}
