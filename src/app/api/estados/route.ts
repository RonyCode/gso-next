import { NextResponse } from 'next/server';
export async function GET() {
  const res = await fetch('https://brasilaberto.com/api/v1/states');
  const data = await res.json();
  return NextResponse.json(data);
}
