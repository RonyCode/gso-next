import { NextResponse } from 'next/server'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { signOut } from 'next-auth/react'

export async function GET(request: Request) {
  deleteCookies()
  return NextResponse.redirect(
    new URL(process.env.NEXT_PUBLIC_NEXT_URL + '/auth', request.url),
  )
}
