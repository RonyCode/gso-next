import { fetchWrapper } from '@/functions/fetch'
import { type ResponseApi, type UserType } from '@/types/index'

export const getAllUserWithoutCorp = async (): Promise<
  ResponseApi<UserType[]>
> => {
  return await fetchWrapper<ResponseApi<UserType[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/users-without-corp`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['userFetch'] },
    },
  )
}
