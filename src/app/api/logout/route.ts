import { NextResponse } from 'next/server'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { signOut } from 'next-auth/react'

export async function GET(request: Request) {
  deleteCookies()

  await signOut({
    callbackUrl: '/auth',
    redirect: false,
  })

  return NextResponse.redirect(new URL('/auth', request.url))
}
