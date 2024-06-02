import { type Corporation } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'

export const GetAllOrganizacao = async (): Promise<Corporation[]> => {
  return await fetchWrapper<Corporation[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/organizacao`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
