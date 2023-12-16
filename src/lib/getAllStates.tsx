import { fetchWrapper } from '@/functions/fetch'
import { AddressProps } from '../../types'

export const getAllStates = async () => {
  return fetchWrapper<AddressProps[]>('http://localhost:3000/api/estados', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
