import { fetchWrapper } from '@/functions/fetch'
import { cookies } from 'next/headers'
import { UserType } from '../../types/index'

export const getProfile = async (idUser: string | null | undefined) => {
  const token = cookies().get('token')?.value
  return await fetchWrapper<UserType>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/profile/${idUser}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
