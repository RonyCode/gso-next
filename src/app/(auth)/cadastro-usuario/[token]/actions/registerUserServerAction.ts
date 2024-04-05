'use server'

import { RegisterUserSchema } from '@/schemas/RegisterUserSchema'
import { ZodError } from 'zod'

export const registerUserServerActions = async (data: FormData) => {
  try {
    return RegisterUserSchema.parse(data)
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError))
  }
}
