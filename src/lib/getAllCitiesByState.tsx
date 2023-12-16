import { fetchWrapper } from '@/functions/fetch'
import { AddressProps } from '../../types'

export const getAllCitiesByState = async (
  state: string,
): Promise<AddressProps[]> => {
  return fetchWrapper<AddressProps[]>(
    'http://localhost:3000/api/cidades/' + state,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
