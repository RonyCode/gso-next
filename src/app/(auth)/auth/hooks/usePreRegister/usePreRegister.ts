import { toast } from 'react-toastify'

import { PreRegisterUserSchema } from '@/app/(auth)/auth/schemas/PreRegisterUserSchema'
import { fetchWrapper } from '@/functions/fetch'
import { z } from 'zod'
import { ResponseUserSigned } from '../../../../../../types/index'

export const usePreRegister = () => {
  const preRegisterUser = async (data: PreRegisterUserSchema) => {
    const { email } = data
    try {
      return await fetchWrapper<ResponseUserSigned>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/pre-cadastro-usuario`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: false,
          status: 'failure',
          code: 400,
          message: error.message,
        }
      }
      if (error instanceof Error) {
        return {
          data: false,
          status: 'failure',
          code: 400,
          message: error.message,
        }
      }
      toast.error('Something went wrong with your login.')
    }
  }

  return {
    preRegisterUser,
  }
}
