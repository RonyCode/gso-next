import { signIn } from 'next-auth/react'

import { SignInSchema } from '@/app/(auth)/auth/schemas/SignInSchema'
import { toast } from '@/ui/use-toast'
import { ResultSignIn } from '../../../../../../types/index'

export const useSignIn = () => {
  async function signInWithGoogle() {
    try {
      await signIn('google', {
        callbackUrl:
          new TextEncoder().encode(process.env.NEXT_PUBLIC_NEXTAUTH_URL) +
          '/dashboard',
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
