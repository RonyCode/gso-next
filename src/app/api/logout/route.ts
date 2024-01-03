import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'

export async function GET(request: Request) {
  deleteCookies()

  const userLogoutResponse = NextResponse.json(
    { message: 'User is logged out', sucess: true },
    { status: 200 },
  )

  userLogoutResponse.cookies.set({
    name: 'next-auth.session-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  userLogoutResponse.cookies.set({
    name: '__Secure-next-auth.session-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  userLogoutResponse.cookies.set({
    name: 'next-auth.csrf-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  userLogoutResponse.cookies.set({
    name: '__Host-next-auth.csrf-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  userLogoutResponse.cookies.set({
    name: 'next-auth.callback-url',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  userLogoutResponse.cookies.set({
    name: '__Secure-next-auth.callback-url',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  return redirect('/')
}
