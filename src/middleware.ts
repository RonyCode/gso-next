import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? [
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
          'https://wsgso.000webhostapp.com/',
          'https://gso-next-three.vercel.app',
          'http://54.232.66.174',
          `${process.env.API_GSO}`,
          `${process.env.API_NEXT}`,
          `${process.env.NEXTAUTH_URL}`,
          'http://127.0.0.1:3000',
        ]
      : [
          `${process.env.API_GSO}`,
          'https://gso-next-three.vercel.app',
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

  const token = request.cookies.get('token')?.value
  const sessaoToken = request.cookies.get('next-auth.session-token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value
  const regex = /[.!]/g
  const tokenPayload = token?.replaceAll(regex, '+')
  const response = NextResponse.next()

  // SE TEM NÃO TEM SESSION-TOKEN VERIFICA O TOKEN
  if (!refreshToken && sessaoToken) {
    if (token) {
      // RENOVA OS TOKENS
      const resp = await fetch(
        `${process.env.API_GSO}/api/auth/refresh-token/${tokenPayload}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      // SALVA NOVOS COKKIES
      if (resp.ok) {
        const tokenRes = await resp?.json()
        response.cookies.set({
          name: 'token',
          value: tokenRes.token,
          httpOnly: true,
          maxAge: 1000,
          path: '/',
        })
        response.cookies.set({
          name: 'refresh_token',
          value: tokenRes.refresh_token,
          httpOnly: true,
          maxAge: 900,
          path: '/',
        })
        return response
      } else {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
    }
    if (!token && sessaoToken) {
      return NextResponse.redirect(new URL('/api/logout', request.url))
    }
  }

  // SE NÃO TEM O REFRESH-TOKEN PROTEGE TUDO
  if (!sessaoToken) {
    if (request.nextUrl.pathname === '/auth') {
      return response
    } else {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  // SE JÁ LOGADO IMPEDE PAGINA DE LOGIN
  if (sessaoToken && request.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/dashboard/:path*',
    '/private/:path*',
    '/about/:path*',
    '/contact/:path*',
    '/profile/:path*',
  ],
}
