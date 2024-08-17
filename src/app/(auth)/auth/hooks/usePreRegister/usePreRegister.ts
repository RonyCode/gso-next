import { toast } from 'react-toastify'

import { type IPreRegisterUserSchema } from '@/app/(auth)/auth/schemas/IPreRegisterUserSchema'
import { fetchWrapper } from '@/functions/fetch'
import {
  type ResponseFetchFailed,
  type ResponseUserSigned,
} from '@/types/index'
import { z } from 'zod'

export const usePreRegister = (): {
  preRegisterUser: (
    data: IPreRegisterUserSchema,
  ) => Promise<ResponseUserSigned | ResponseFetchFailed | undefined>
} => {
  const preRegisterUser = async (
    data: IPreRegisterUserSchema,
  ): Promise<ResponseUserSigned | ResponseFetchFailed | undefined> => {
    try {
      return await fetchWrapper<ResponseUserSigned>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/pre-cadastro-usuario`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data?.email),
        },
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: false,
          status: 'failure',
          code: 400,
          message: error.message,
        } satisfies ResponseFetchFailed
      }
      if (error instanceof Error) {
        return {
          data: false,
          status: 'failure',
          code: 400,
          message: error.message,
        } satisfies ResponseFetchFailed
      }
      toast.error('Something went wrong with your login.')
    }
  }

  return {
    preRegisterUser,
  }
}
