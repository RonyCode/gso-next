import { fetchWrapper } from '@/functions/fetch'
import { CepProps } from '@/types'

export const useEstados = () => {
  const getEstados = async () => {
    return await fetchWrapper<CepProps>('/api/estados', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  return {
    getEstados,
  }
}
