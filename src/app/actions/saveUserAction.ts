'use server'

import { revalidatePath } from 'next/cache'

import { ResultUserRegistered } from '../../../types/index'
import { fetchWrapper } from '@/functions/fetch'
import { EditUserSchema } from '@/schemas/EditUserSchema'
import { RegisterUserSchema } from '@/schemas/RegisterUserSchema'

export async function saveUserAction(
  formData?: EditUserSchema | RegisterUserSchema,
) {
  revalidatePath('/')

  try {
    if (formData) {
      return await fetchWrapper<ResultUserRegistered>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cadastrar-usuario`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData }),
        },
      )
    }
    return {
      code: 400,
      status: 'failure',
      data: null,
      message: 'Erro ao cadastrar usuário! 🤯 ',
    }
  } catch (error) {
    console.log(error)
    return {
      code: 400,
      status: 'failure',
      data: null,
      message: 'Erro ao cadastrar usuário! 🤯 ',
    }
  }
}
