import { fetchWrapper } from '@/functions/fetch'
import { type ResponseApi, type UserType } from '@/types/index'

export const getAllUsers = async (): Promise<ResponseApi<UserType[]>> => {
  return await fetchWrapper<ResponseApi<UserType[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/users`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['userFetch'] },
    },
  )
}
