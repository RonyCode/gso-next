import { fetchWrapper } from '@/functions/fetch'
import { type FunctionsMembers, type ResponseApi } from '@/types/index'

export const getAllFunctions = async (): Promise<
  ResponseApi<FunctionsMembers[]>
> => {
  return await fetchWrapper<ResponseApi<FunctionsMembers[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/functions`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['functionsFetch'] },
    },
  )
}
