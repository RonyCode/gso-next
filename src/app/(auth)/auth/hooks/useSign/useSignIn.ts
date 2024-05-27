import { signIn } from 'next-auth/react'

import { type ResultSignIn } from '../../../../../../types/index'

import { type ISignInSchema } from '@/app/(auth)/auth/schemas/SignInSchema'
import { toast } from '@/ui/use-toast'

export const useSignIn = (): {
  signInWithCredentials: (data: ISignInSchema) => Promise<ResultSignIn>
  signInWithGoogle: () => Promise<void>
} => {
  async function signInWithGoogle(): Promise<void> {
    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
      })
    } catch (error) {
      // display error message to user
      toast({
        variant: 'danger',
        title: 'Error: Falha ao logar no Google 🤯',
        description: 'Erro ao tentar logar tente novamente! 🤯',
      })
    }
  }
  const signInWithCredentials = async (
    data: ISignInSchema,
  ): Promise<ResultSignIn> => {
    if (data === null) {
      return {} as unknown as ResultSignIn
    }
    const { email, senha } = data
    const result = await signIn('credentials', {
      email,
      senha,
      is_user_external: 0,
      redirect: false,
    })
    return result as unknown as ResultSignIn
  }
  return {
    signInWithCredentials,
    signInWithGoogle,
  }
}
