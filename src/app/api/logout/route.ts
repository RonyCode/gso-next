import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const userLogoutResponse = NextResponse.json(
    { message: 'User is logged out', sucess: true },
    { status: 200 },
  )

  userLogoutResponse.cookies.set({
    name: 'next-auth.session-token',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  userLogoutResponse.cookies.set({
    name: '__Secure-next-auth.session-token',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  userLogoutResponse.cookies.set({
    name: 'next-auth.csrf-token',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  userLogoutResponse.cookies.set({
    name: '__Host-next-auth.csrf-token',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  userLogoutResponse.cookies.set({
    name: 'next-auth.callback-url',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  userLogoutResponse.cookies.set({
    name: '__Secure-next-auth.callback-url',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  return userLogoutResponse
}
