import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // const res = await fetch(`${process.env.API_GSO}/api/auth/estados`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  // if (!res.ok) {
  //   return NextResponse.json(
  //     { message: res.statusText },
  //     { status: res.status },
  //   )
  // }
  // const data = await res.json()
  //
  // return NextResponse.json(data)
  return NextResponse.json([{ data: 'data' }])
}
