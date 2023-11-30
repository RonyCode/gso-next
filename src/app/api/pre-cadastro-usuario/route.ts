import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin: string | null = request.headers.get('origin');
  const email = await request.json();

  if (!email)
    return NextResponse.json({ message: 'Erro parâmetros necessários' });

  const res = await fetch(`${process.env.API_GSO}/api/auth/pre-cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*'
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message: message }, { status: 400 });
  }
  // const { data } = await res.json();
  return NextResponse.json(await res.json());
}
