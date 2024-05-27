'use server'

import { RegisterUserSchema } from '@/schemas/RegisterUserSchema'
import { type ZodError } from 'zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerUserServerActions = async (data: FormData) => {
  try {
    return RegisterUserSchema.parse(data)
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError))
  }
}
