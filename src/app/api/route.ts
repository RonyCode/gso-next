import { NextResponse } from 'next/server'

export async function OPTIONS(request: Request) {
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? [
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
          `${process.env.API_NEXT}`,
          `${process.env.API_GSO}`,
          `${process.env.NEXTAUTH_URL}`,
          'http://127.0.0.1:3000',
        ]
      : [
          `${process.env.API_GSO}`,
          `${process.env.API_NEXT}`,
          `${process.env.NEXTAUTH_URL}`,
          'http://127.0.0.1:3000',
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
