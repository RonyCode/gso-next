import { fetchWrapper } from '@/functions/fetch'
import { CepProps } from '@/types'
import { toast } from '@/ui/use-toast'

export const useEndereco = () => {
  const findCep = async (cep: string) => {
    try {
      return fetchWrapper<CepProps>('/api/cep?cep=' + cep?.replace(/\D/g, ''), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
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
    return await fetchWrapper<CepProps>('/api/estados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const getCidades = async (shortName: string) => {
    return await fetchWrapper('/api/cidades?short-name=' + shortName, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return {
    findCep,
    getEstados,
    getCidades,
  }
}
