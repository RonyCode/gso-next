import { fetchWrapper } from '@/functions/fetch'
import { type ResponseApi, type Unidade } from '@/types/index'

export const getAllUnidades = async (
  idCorporation: string,
): Promise<ResponseApi<Unidade[]>> => {
  return await fetchWrapper<ResponseApi<Unidade[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id-corporation=${idCorporation}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['unidadesFetch'] },
    },
  )
}
