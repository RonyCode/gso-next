import { fetchWrapper } from '@/functions/fetch'
import { CepProps } from '../../types/index'

export const getCep = async (cep: string): Promise<CepProps> => {
  return await fetchWrapper<CepProps>(
    '/api/cep?cep=' + cep?.replace(/\D/g, ''),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
