import React, { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import OrganizacaoForm from '@/app/(private)/(modules)/[sigla]/organizacao/salvar/component/OrganizacaoForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'

const MinhaOrganizacao = async ({
  params,
}: {
  params: { sigla: string }
}): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const state = await getAllStates()
  // eslint-disable-next-line array-callback-return
  const organizacaoFound = data?.find((item) => {
    if (
      item.id !== undefined &&
      item.id !== null &&
      params?.sigla !== undefined
    ) {
      return item.id.toString() === params.sigla.split('-')[1].toString()
    }
  })
  return (
    <>
      {organizacaoFound !== undefined && organizacaoFound !== null && (
        <CardDefault
          title={organizacaoFound?.name}
          description={organizacaoFound?.city + ' - ' + organizacaoFound?.phone}
          icon={<LuBuilding2 />}
        >
          <OrganizacaoForm organizacao={organizacaoFound} states={state} />
        </CardDefault>
      )}
    </>
  )
}
export default MinhaOrganizacao
