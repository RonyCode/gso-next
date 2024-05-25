import { cookies } from 'next/headers'

import { type UserType } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'

export const getProfile = async (
  idUser: string | null | undefined,
): Promise<UserType> => {
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
