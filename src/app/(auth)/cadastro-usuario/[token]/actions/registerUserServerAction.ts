'use server'

import { IRegisterUserSchema } from '@/schemas/RegisterUserSchema'
import { type ZodError } from 'zod'

export const registerUserServerActions = async (data: FormData) => {
  try {
    return RegisterUserSchema.parse(data)
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError))
  }
}
