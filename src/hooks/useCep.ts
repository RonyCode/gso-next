import { fetchWrapper } from '@/functions/fetch'
import { CepProps } from '../../types/index'
import { toast } from '@/ui/use-toast'

export const useCep = () => {
  const findCep = async (cep: string) => {
    try {
      return fetchWrapper<CepProps>(
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

  return {
    findCep,
  }
}
