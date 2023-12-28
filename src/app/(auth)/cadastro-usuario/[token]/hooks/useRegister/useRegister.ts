import { toast } from 'react-toastify'

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema'
import { fetchWrapper } from '@/functions/fetch'
import { z } from 'zod'

export const useRegister = () => {
  const registerUser = async (data: RegisterUserSchema) => {
    try {
      const { email, senha, nome, confirmaSenha, telefone } = data
      await fetchWrapper(
        `${process.env.REACT_APP_NEXT_URL}/api/cadastrar-usuario`,
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
