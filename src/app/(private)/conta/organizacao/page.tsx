import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import OrganizacaoForm from '@/app/(private)/(modules)/servicos/gestor/component/OrganizacaoForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'

const MinhaOrganizacao = async ({
  params,
}: {
  params: { sigla: string }
}): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const state = await getAllStates()
  const session = await getServerSession(authOptions)

  // eslint-disable-next-line array-callback-return
  const organizacaoFound = data?.find((item) => {
    if (item.id !== undefined && item.id !== null) {
      return item.id === session?.id_corporation
    }
  })
  return (
    <>
      {organizacaoFound !== undefined && organizacaoFound !== null && (
        <CardDefault
          title={organizacaoFound?.name}
          description={
            organizacaoFound?.short_name_corp + ' - ' + organizacaoFound?.phone
          }
          icon={<LuBuilding2 />}
        >
          <OrganizacaoForm organizacao={organizacaoFound} states={state} />
        </CardDefault>
      )}
    </>
  )
}
export default MinhaOrganizacao
