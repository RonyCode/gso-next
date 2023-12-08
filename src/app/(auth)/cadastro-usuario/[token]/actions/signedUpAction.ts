'use server'

import { revalidatePath } from 'next/cache'

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema'
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore'
import { useUserStore } from '@/stores/user/userStore'
import { UserRegisterError, UserType } from '@/types'

export async function signedUpAction(formData: RegisterUserSchema) {
  try {
    console.log(formData)
    revalidatePath('/')
  } catch (error) {
    console.log(error)
  }
}
