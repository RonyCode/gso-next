import { NextRequest, NextResponse } from 'next/server';

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { limiter } from '@/app/api/config/limiter';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const origin: string | null = request.headers.get('origin');
  const remaining: number = await limiter.removeTokens(1);
  const body: SignInSchema = await request.json();
  const { email, senha, is_user_external } = body;

  if (!email || !senha)
    return NextResponse.json({ message: 'Erro parametros necessários' });

  if (remaining < 0) {
    return new NextResponse(null, {
      status: 429,
      statusText: 'To many requests',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

  const res = await fetch(`${process.env.API_GSO}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin || '*'
    },
    body: JSON.stringify({
      email,
      senha,
      is_user_external
    })
  });

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message: message }, { status: 401 });
  }
  const { data } = await res.json();
  return NextResponse.json(data);
}
