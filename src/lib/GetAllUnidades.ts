import { fetchWrapper } from '@/functions/fetch'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { type ResponseApi } from '@/types/index'

export const getAllUnidades = async (
  idCorporation: string,
): Promise<ResponseApi<IUnidadeSchema[]>> => {
  return await fetchWrapper<ResponseApi<IUnidadeSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id-corporation=${idCorporation}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['unidadesFetch'] },
    },
  )
}
