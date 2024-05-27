import { toast } from 'react-toastify'

import { fetchWrapper } from '@/functions/fetch'
import { z } from 'zod'

export const useCpf = (): {
  findPersonByCpf: (
    cpf: string,
    dataNascimento: string,
  ) => Promise<z.ZodError | Error | undefined>
} => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const findPersonByCpf = async (cpf: string, dataNascimento: string) => {
    try {
      await fetchWrapper(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/cpf`, {
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
