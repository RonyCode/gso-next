import { type Companies } from '../../types'

import { fetchWrapper } from '@/functions/fetch'

export const getAllUnidades = async (
  idCorporation: string,
): Promise<Companies> => {
  return await fetchWrapper<Companies>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/unidades?id-corporation=${idCorporation}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 10,
      },
    },
  )
}
