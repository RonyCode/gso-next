import { fetchWrapper } from '@/functions/fetch'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { type ResponseApi } from '@/types/index'

export const getAllOrganizacoes = async (): Promise<
  ResponseApi<IOrganizacaoSchema[]>
> => {
  return await fetchWrapper<ResponseApi<IOrganizacaoSchema[]>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/organizacoes`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1, tags: ['organizacaoFetch'] },
    },
  )
}
