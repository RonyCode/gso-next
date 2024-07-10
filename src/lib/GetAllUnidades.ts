import { fetchWrapper } from '@/functions/fetch'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { unidadeStore } from '@/stores/unidades/unidadeStore'
import { type ResponseApi } from '@/types/index'

export const getAllUnidades = async (
  idCorporation: string,
): Promise<ResponseApi<IUnidadeSchema[]>> => {
  const response = await fetchWrapper<ResponseApi<IUnidadeSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id-corporation=${idCorporation}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['unidadesFetch'] },
    },
  )
  if (response?.code === 200) {
    unidadeStore.getState().actions.add(response.data)
  }
  return response
}
