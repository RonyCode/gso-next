import { fetchWrapper } from '@/functions/fetch'
import type { ICarSchema } from '@/schemas/CarsSchema'

export const getAllVehicles = async (query = ''): Promise<ICarSchema> => {
  return await fetchWrapper<ICarSchema>(query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Subscription-Token': process.env.NEXT_PUBLIC_KEY_FIPE ?? '',
    },

    next: { revalidate: 1, tags: ['vehiclesDetailsFetch'] },
  })
}
