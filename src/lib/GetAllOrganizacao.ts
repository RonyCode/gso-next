import { fetchWrapper } from '@/functions/fetch'
import { type Corporation } from '@/types/index'

export const GetAllOrganizacao = async (): Promise<Corporation[]> => {
  return await fetchWrapper<Corporation[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/organizacao`,
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
