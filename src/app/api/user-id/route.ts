import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useUserStore } from '@/stores/user/userStore'
import { UserType } from '../../../../types/index'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const token = request.headers.get('Authorization')
  const id = session?.id
  if (id) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-id/${82}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (res.ok) {
      const result = await res.json()
      return NextResponse.json(result)
    }
  }
  return NextResponse.json({ error: 'Usuário não encontrado' })
}
