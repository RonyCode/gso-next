import { fetchWrapper } from '@/functions/fetch'
import { type ResponseApi, type Unidade } from '@/types/index'

export const getUnidadeById = async (
  idCorporation: string,
  idCompany: string,
): Promise<ResponseApi<Unidade>> => {
  return await fetchWrapper<ResponseApi<Unidade>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidade?id-corporation=${idCorporation}&id-company=${idCompany}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 1,
      },
    },
  )
}
