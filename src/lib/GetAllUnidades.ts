import { fetchWrapper } from '@/functions/fetch'
import { Companies } from '../../types'

export const getAllUnidades = async (idCorporation: string) => {
  return await fetchWrapper<Companies>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id-corporation=${idCorporation}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
