import { NextResponse } from 'next/server'

export async function OPTIONS(request: Request) {
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? [
          `${process.env.API_NEXT}`,
          `${process.env.API_GSO}`,
          `${process.env.NEXTAUTH_URL}`,
        ]
      : [
          `${process.env.API_GSO}`,
          `${process.env.API_NEXT}`,
          `${process.env.NEXTAUTH_URL}`,
        ]

  const origin = request.headers.get('origin')
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': origin || '*',
      },
    })
  }
}
