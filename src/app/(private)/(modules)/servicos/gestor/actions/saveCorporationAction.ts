'use server'

import { revalidateTag } from 'next/cache'

import { fetchWrapper } from '@/functions/fetch'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { type ResponseApi } from '@/types/index'

export async function saveCorporationAction(
  formData?: Partial<IOrganizacaoSchema>,
): Promise<ResponseApi<Partial<IOrganizacaoSchema>>> {
  revalidateTag('organizacaoFetch')
  return await fetchWrapper<ResponseApi<Partial<IOrganizacaoSchema>>>(
    `${process.env.NEXT_PUBLIC_NEXT_URL}/api/corporation-save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      cache: 'no-store',
    },
  )
}
