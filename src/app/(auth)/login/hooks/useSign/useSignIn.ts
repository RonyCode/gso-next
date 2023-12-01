import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema'
import { z } from 'zod'
import * as React from 'react'
import { toast } from '@/ui/use-toast'
import { ResultSignIn } from '@/types'

export const useSignIn = () => {
  async function signInWithGoogle() {
    try {
      await signIn('google', {
        callbackUrl:
          new TextEncoder().encode(process.env.NEXTAUTH_URL) + '/dashboard',
      })
    } catch (error) {
      // display error message to user
      toast({
        variant: 'destructive',
        title: 'Error: Falha ao logar no Google 🤯',
        description: 'Erro ao tentar logar tente novamente! 🤯',
      })
    }
  }
  const signInWithCredentials = async (data: SignInSchema) => {
    const { email, senha, is_user_external: isUserExternal } = data
    const result = await signIn('credentials', {
      email,
      senha,
      isUserExternal,
      redirect: false,
    })
    return result as unknown as ResultSignIn
  }
  return {
    signInWithCredentials,
    signInWithGoogle,
  }
}
