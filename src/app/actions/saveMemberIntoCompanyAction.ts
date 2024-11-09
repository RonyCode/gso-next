'use server'

import { revalidatePath } from 'next/cache'

import { fetchWrapper } from '@/functions/fetch'
import { type ISaveMemberSchema } from '@/schemas/SaveMemberSchema'
import { type ResponseApi } from '@/types/index'

export async function saveMemberIntoCompanyAction(
  formData?: ISaveMemberSchema,
): Promise<ResponseApi> {
  revalidatePath('/')

  try {
    if (formData != null) {
      return await fetchWrapper<ResponseApi>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cadastrar-membro-unidade`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          next: { revalidate: 1, tags: ['membros-unidade'] },
        },
      )
    }
    return {
      code: 400,
      status: 'failure',
      message: 'Erro ao cadastrar membro em uma unidade! 🤯 ',
    }
  } catch (error) {
    console.log(error)
    return {
      code: 400,
      status: 'failure',
      message: 'Erro ao cadastrar membro em uma unidade! 🤯 ',
    }
  }
}
