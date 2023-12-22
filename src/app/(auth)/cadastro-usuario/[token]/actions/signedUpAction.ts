'use server'

import { revalidatePath } from 'next/cache'

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema'
import { ResponseUserSigned } from '../../../../../../types/index'
import { fetchWrapper } from '@/functions/fetch'

export async function signedUpAction(formData: RegisterUserSchema) {
  try {
    if (formData) {
      revalidatePath('/')

      return fetchWrapper<ResponseUserSigned>(
        'http://localhost:3000/api/cadastrar-usuario',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData }),
        },
      )
    }
  } catch (error) {
    console.log(error)
  }
}
