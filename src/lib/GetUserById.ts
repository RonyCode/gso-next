import { type UserType } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'
import { useUserStore } from '@/stores/user/userStore'

export const GetUserById = async (
  id: string | null | undefined,
): Promise<UserType> => {
  const response = await fetchWrapper<UserType>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user-id?id=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response?.account?.cpf != null)
    useUserStore.getState().actions.add(response)
  return response
}
