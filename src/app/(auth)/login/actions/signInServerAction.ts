'use server'
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema'
import { ZodError } from 'zod'
import { revalidatePath } from 'next/cache'

export const signInServerActions = async (data: FormData | SignInSchema) => {
  revalidatePath('/')
  try {
    if (data instanceof FormData) {
      const formData = Object.fromEntries(data.entries())
      const result = SignInSchema.safeParse(formData)

      if (result.success) {
        return result.data as SignInSchema
      }

      if (!result.success) {
        console.log(result.error.message)
        return JSON.parse(JSON.stringify(result.error as ZodError))
      }
    }

    return data
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError))
  }
}
