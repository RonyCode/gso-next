import { NextResponse } from 'next/server'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { signOut } from 'next-auth/react'

export async function GET(request: Request) {
  deleteCookies()

  if (typeof window !== 'undefined') {
    deleteCookies()

    await signOut({
      redirect: false,
    })
  }

  // return NextResponse.next()
  return NextResponse.redirect(
    new URL(process.env.NEXT_PUBLIC_NEXT_URL!, request.url),
  )
}
