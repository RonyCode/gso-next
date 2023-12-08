import { toast } from 'react-toastify'

import { fetchWrapper } from '@/functions/fetch'
import { z } from 'zod'

export const useCpf = () => {
  const findPersonByCpf = async (cpf: string, dataNascimento: string) => {
    try {
      await fetchWrapper('/api/cpf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, dataNascimento }),
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error
      }
      if (error instanceof Error) {
        return error
      }
      toast.error('Something went wrong with your login.')
    }
  }

  return {
    findPersonByCpf,
  }
}
