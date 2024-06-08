import { fetchWrapper } from '@/functions/fetch'
import { stateStore } from '@/stores/Address/stateStore'
import { type AddressProps } from '@/types/index'

export const getAllStates = async (): Promise<AddressProps[]> => {
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
