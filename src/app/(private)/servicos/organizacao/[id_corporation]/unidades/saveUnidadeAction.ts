'use server'

import { revalidatePath } from 'next/cache'

import { fetchWrapper } from '@/functions/fetch'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type ResponseApi } from '@/types/index'

export async function saveUnidadeAction(
  formData?: Partial<IUnidadeSchema>,
): Promise<ResponseApi<Partial<IUnidadeSchema>>> {
  revalidatePath('/')

  try {
    const rest = await fetchWrapper<ResponseApi<Partial<IUnidadeSchema>>>(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidade-save`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store',
      },
    )
    console.log(rest)
    if (rest?.code != 202) {
      return {
        data: {} as Partial<IUnidadeSchema>,
        status: 'failure',
        code: 400,
        message: 'Erro ao cadastrar unidade! 🤯 ',
      }
    }
    return rest
  } catch (error) {
    console.log(error)
    return {
      data: {} as Partial<IUnidadeSchema>,
      status: 'failure',
      code: 400,
      message: 'Erro ao cadastrar unidade! 🤯 ',
    }
  }
}
