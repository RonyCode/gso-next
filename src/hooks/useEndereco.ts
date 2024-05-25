import { type AddressProps, type CepProps } from '../../types/index'

import { fetchWrapper } from '@/functions/fetch'
import { cityStore } from '@/stores/Address/CityByStateStore'
import { stateStore } from '@/stores/Address/stateStore'
import { toast } from '@/ui/use-toast'

export const useEndereco = (): {
  getCep: (cep: string) => Promise<CepProps>
  getCidadeByState: (state: string) => Promise<AddressProps[]>
  getEstados: () => Promise<AddressProps[]>
} => {
  const getCep = async (cep: string): Promise<CepProps> => {
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
      return {
        city: '',
        cityId: '',
        complement: '',
        district: '',
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        ibge: 0,
        gia: '',
        ddd: 0,
        siafi: 0,
        districtId: '',
        ibgeId: '',
        state: '',
        stateShortname: '',
        street: '',
        zipcode: '',
        code: 0,
        error: false,
        message: '',
        unknown: '',
      } satisfies CepProps
    }
  }
  const getEstados = async (): Promise<AddressProps[]> => {
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

  const getCidadeByState = async (state: string): Promise<AddressProps[]> => {
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
