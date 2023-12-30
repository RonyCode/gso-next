'use server'

import { revalidatePath } from 'next/cache'
import { PreRegisterUserSchema } from '@/app/(auth)/auth/schemas/PreRegisterUserSchema'

export const preRegisterUserServerActions = async (
  data: FormData | PreRegisterUserSchema,
) => {
  revalidatePath('/')
  try {
    if (data instanceof FormData) {
      const formData = Object.fromEntries(data.entries())
      console.log(formData)

      const result = PreRegisterUserSchema.safeParse(formData)

      if (result.success) {
        return { email: result.data.email }
      }

      if (!result.success) {
        console.log(result.error.message)
        return { email: 'failed' }
      }
    }
    return data
  } catch (error) {
    console.log(error)
    return JSON.parse(JSON.stringify(error))
  }
}
