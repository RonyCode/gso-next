import { fetchWrapper } from '@/functions/fetch'
import { AddressProps } from '../../types'
import { cityStore } from '@/stores/Address/CityByStateStore'

export const getAllCitiesByState = async (
  state: string,
): Promise<AddressProps[]> => {
  const res = await fetchWrapper<AddressProps[]>(
    `${process.env.REACT_APP_NEXT_URL}/api/cidades/${state}`,
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
