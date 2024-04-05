import { fetchWrapper } from '@/functions/fetch'
import { useUserStore } from '@/stores/user/userStore'
import { UserType } from '../../types/index'

export const GetUserById = async (id: string) => {
  const response = await fetchWrapper<UserType>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user-id?id=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  if (response?.account?.cpf)
    useUserStore.getState().actions.add(response as UserType)
  return response
}
