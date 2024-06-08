import { type AddressProps } from '../../types'

import { fetchWrapper } from '@/functions/fetch'
import { cityStore } from '@/stores/Address/CityByStateStore'

export const getAllCities = async (): Promise<AddressProps[]> => {
  const res = await fetchWrapper<AddressProps[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cidades`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  cityStore.setState({ cities: res })
  return res
}
