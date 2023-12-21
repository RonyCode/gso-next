import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const nameQueue = searchParams.get('namequeue')
  const res = await fetch(
    `${process.env.API_GSO}/services/amqp/consume/${nameQueue}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  const data = await res.json()
  return NextResponse.json(data)
}
