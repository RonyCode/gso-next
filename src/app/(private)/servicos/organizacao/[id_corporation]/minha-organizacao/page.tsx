import React, { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'
import { GetAllOrganizacao } from '@/lib/GetAllOrganizacao'

const MinhaOrganizacao = async ({
  params,
}: {
  params: { id_corporation: string }
}): Promise<ReactNode> => {
  const organizacao = await GetAllOrganizacao()
  const organizacaoFound = organizacao.find(
    (item) => item.id.toString() === params.id_corporation,
  )
  return (
    <>
      {organizacaoFound !== undefined && organizacaoFound !== null && (
        <CardDefault
          title={organizacaoFound.name}
          description={organizacaoFound.city + ' - ' + organizacaoFound.phone}
          icon={<LuBuilding2 />}
        >
          <div>
            <h1>{organizacaoFound.name}</h1>
            <h1>{organizacaoFound.city}</h1>
            <h1>{organizacaoFound.phone}</h1>
          </div>
        </CardDefault>
      )}
    </>
  )
}
export default MinhaOrganizacao
