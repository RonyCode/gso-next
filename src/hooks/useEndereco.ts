import { type AddressProps, type CepProps } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { stateStore } from '@/stores/Address/stateStore'
import { toast } from '@/ui/use-toast'

export const useEndereco = () => {
  const getCep = async (cep: string) => {
    try {
      return await fetchWrapper<CepProps>(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cep?cep=${cep?.replace(
          /\D/g,
          '',
        )}`,

        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (error) {
      toast({
        variant: 'danger',
        title: 'Cep Incorreto! 🤯 ',
        description: 'Cep não encontrado',
      })
      return {} as CepProps
    }
  }
  const getEstados = async () => {
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

  const getCidadeByState = async (state: string) => {
    const res = await fetchWrapper<AddressProps[]>(
      `${process.env.NEXT_PUBLIC_NEXT_URL}/api/cidades/${state}`,
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

  return {
    getCep,
    getEstados,
    getCidadeByState,
  }
}
