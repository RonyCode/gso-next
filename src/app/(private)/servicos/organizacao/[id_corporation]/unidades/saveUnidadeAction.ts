'use server'

import { revalidatePath } from 'next/cache'

import { fetchWrapper } from '@/functions/fetch'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type ResponseApi } from '@/types/index'

export async function saveUnidadeAction(
  idCorporation?: string,
  formData?: Partial<IUnidadeSchema>,
): Promise<ResponseApi<Partial<IUnidadeSchema>>> {
  revalidatePath('/')

  try {
    console.log(formData)
    if (formData != null) {
      return await fetchWrapper<ResponseApi<Partial<IUnidadeSchema>>>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cadastrar-usuario`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_corporation: idCorporation,
            company: { ...formData },
          }),
        },
      )
    }
    return {
      data: {} as Partial<IUnidadeSchema>,
      status: 'failure',
      code: 400,
      message: 'Erro ao cadastrar usuário! 🤯 ',
    }
  } catch (error) {
    console.log(error)
    return {
      data: {} as Partial<IUnidadeSchema>,
      status: 'failure',
      code: 400,
      message: 'Erro ao cadastrar usuário! 🤯 ',
    }
  }
}
