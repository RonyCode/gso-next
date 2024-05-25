import { toast } from 'react-toastify'

import { fetchWrapper } from '@/functions/fetch'
import { type IRegisterUserSchema } from '@/schemas/RegisterUserSchema'
import { z } from 'zod'

export const useRegister = (): {
  registerUser: (
    data: IRegisterUserSchema,
  ) => Promise<z.ZodError | Error | undefined>
} => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const registerUser = async (data: IRegisterUserSchema) => {
    try {
      const { email, senha, nome, confirmaSenha, telefone } = data
      await fetchWrapper(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cadastrar-usuario`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, nome, senha, confirmaSenha, telefone }),
        },
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error
      }
      if (error instanceof Error) {
        return error
      }
      toast.error('Something went wrong with your login.')
    }
  }

  return {
    registerUser,
  }
}
