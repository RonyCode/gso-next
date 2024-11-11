import React from 'react'

import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'

const ModulesOrganizacao = ({
  organizacoes,
  params,
}: {
  organizacoes?: IOrganizacaoSchema[]
  params: { sigla: string; name_unidade: string }
}): JSX.Element => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {organizacoes?.map((corporation) => (
            <CardModule
              key={corporation?.id}
              title={corporation?.short_name_corp}
              subtitle={
                corporation?.short_name_corp + ' - ' + corporation?.phone
              }
              link={`/servicos/${corporation?.short_name_corp.toLowerCase() + '-' + corporation?.id} /`}
              icon={<IconBuild width={54} />}
            />
          ))}
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
