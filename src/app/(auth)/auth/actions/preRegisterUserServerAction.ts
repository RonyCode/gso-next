'use server'

import { revalidatePath } from 'next/cache'

import {
  type IPreRegisterUserSchema,
  PreRegisterUserSchema,
} from '@/app/(auth)/auth/schemas/IPreRegisterUserSchema'

interface ReturnData {
  email: string
  status: 'success' | 'failure'
  code: number
  message: string
}

export const preRegisterUserServerActions = async (
  data: FormData | IPreRegisterUserSchema,
): Promise<IPreRegisterUserSchema> => {
  revalidatePath('/')
  try {
    if (data instanceof FormData) {
      const formData = Object.fromEntries(data.entries())
      const result = PreRegisterUserSchema.safeParse(formData)

      if (result.success) {
        return {
          email: result.data.email,
          status: 'success',
          code: 200,
          message: 'sucess',
        } satisfies ReturnData
      }

      if (!result.success) {
        console.log(result.error.message)
        return {
          email: 'failed',
          status: 'failure',
          code: 400,
          message: result.error.message,
        } satisfies ReturnData
      }
    }
    console.log(data)
    return data as IPreRegisterUserSchema
  } catch (error) {
    console.log(error)
    return JSON.parse(JSON.stringify(error))
  }
}
