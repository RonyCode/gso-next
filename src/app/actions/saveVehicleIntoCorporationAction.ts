'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { fetchWrapper } from '@/functions/fetch'
import type { ICarSchema } from '@/schemas/CarsSchema'
import { type ResponseApi, type UserNotification } from '@/types/index'

export async function saveVehicleIntoCorporationAction(
  formData?: Partial<ICarSchema>,
): Promise<ResponseApi<UserNotification> | undefined> {
  revalidatePath('/')
  try {
    if (formData != null) {
      const subscription = cookies().get('subscription')?.value

      subscription != null
        ? (formData.subscription = JSON.parse(subscription))
        : (formData.subscription = '')

      return await fetchWrapper<ResponseApi<UserNotification>>(
        `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/vehicle/save`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          next: { revalidate: 1, tags: ['corporation'] },
        },
      )
    }
  } catch (error) {
    console.log(error)
    return {
      code: 400,
      status: 'failure',
      message: 'Erro ao salvar veículo na corporação! 🤯 ',
    }
  }
}
