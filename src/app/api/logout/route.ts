import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'

export async function GET(request: Request) {
  deleteCookies()

  return redirect('/')
}
