import { fetchWrapper } from '@/functions/fetch'
import { type UserType } from '@/types/index'

export const getAllUser = async (): Promise<UserType> => {
  return await fetchWrapper<UserType>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/users`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
