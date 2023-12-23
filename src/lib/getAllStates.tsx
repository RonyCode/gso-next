import { fetchWrapper } from '@/functions/fetch'
import { AddressProps } from '../../types'
import { stateStore } from '@/stores/Address/stateStore'

export const getAllStates = async () => {
  const res = await fetchWrapper<AddressProps[]>(
    'http://localhost:3000/api/estados',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  stateStore.setState({ states: res.result })
  return res
}
