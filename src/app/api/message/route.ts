import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const nameQueue = searchParams.get('namequeue')
  const exchangeName = searchParams.get('exchangename')
  const routingKey = searchParams.get('routingkey')
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/services/amqp/consume?queue_name=${nameQueue}&exchange_name=${exchangeName}&routing_key=${routingKey}`,
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
