import { fetchWrapper } from '@/functions/fetch'
import { AddressProps } from '../../types'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { stateStore } from '@/stores/Address/stateStore'

export const getAllCitiesByState = async (
  state: string,
): Promise<AddressProps[]> => {
  const res = await fetchWrapper<AddressProps[]>(
    'http://localhost:3000/api/cidades/' + state,
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
