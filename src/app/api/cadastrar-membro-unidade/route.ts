import { type NextRequest, NextResponse } from 'next/server'

import { type ISaveMemberSchema } from '@/schemas/SaveMemberSchema'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: ISaveMemberSchema = await request.json()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/member/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_corporation: body?.id_corporation,
        id_company: body?.id_company,
        id_member: body?.id_member,
      }),
    },
  )
  if (!res.ok) {
    const { message } = await res.json()
    return NextResponse.json({ message }, { status: 401 })
  }
  const response = await res.json()
  return NextResponse.json(response)
}
