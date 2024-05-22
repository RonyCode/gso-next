import { fetchWrapper } from '@/functions/fetch'
import { Unidade } from '../../types/index'

export const getUnidadeById = async (
  idCorporation: string,
  idCompany: string,
) => {
  return await fetchWrapper<Unidade>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidade?id-corporation=${idCorporation}&id-company=${idCompany}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
