import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    data: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY != null || '',
  })
}
