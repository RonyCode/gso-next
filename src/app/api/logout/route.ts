import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const userLogoutResponse = NextResponse.json(
    { message: 'User is logged out', sucess: true },
    { status: 200 },
  )

  userLogoutResponse.cookies.set('next-auth.session-token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  userLogoutResponse.cookies.set('__Secure-next-auth.session-token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  userLogoutResponse.cookies.set('next-auth.csrf-token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  userLogoutResponse.cookies.set('__Host-next-auth.csrf-token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  userLogoutResponse.cookies.set('next-auth.callback-url', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  userLogoutResponse.cookies.set('next-auth.callback-url', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  userLogoutResponse.cookies.set({
    name: '__Secure-next-auth.callback-url',
    value: '',
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  return redirect('/')
}
