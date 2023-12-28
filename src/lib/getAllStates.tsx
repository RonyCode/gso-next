import { fetchWrapper } from '@/functions/fetch'
import { AddressProps } from '../../types'
import { stateStore } from '@/stores/Address/stateStore'

export const getAllStates = async () => {
  const res = await fetchWrapper<AddressProps[]>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/estados`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  stateStore.setState({ states: res })
  return res
}
