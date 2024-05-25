import { type Unidade } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'

export const getUnidadeById = async (
  idCorporation: string,
  idCompany: string,
): Promise<Unidade> => {
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
