import React from 'react'

import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import IconBuildPlus from '@/icons/IconBuildPlus'
import IconPrivileges from '@/icons/IconPrivileges'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'

const ModulesOrganizacao = ({
  organizacoes,
}: {
  organizacoes: IOrganizacaoSchema[]
}): JSX.Element => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {organizacoes?.map((corporation) => (
            <CardModule
              key={corporation?.id}
              title={corporation?.short_name_corp}
              subtitle={corporation?.city + ' - ' + corporation?.phone}
              link={`/servicos/${corporation?.short_name_corp.toLowerCase()}/organizacao/${corporation?.id}`}
              icon={<IconBuild width={54} />}
            />
          ))}
          <CardModule
            title="Nova Organização"
            subtitle="Adicionar nova organização"
            link={'/(modules)/organizacao/salvar'}
            icon={<IconBuildPlus width={58} className="ml-1" />}
          />
          <CardModule
            title="Privilégios"
            subtitle="Conceder privilégios"
            link={'/(modules)/organizacao/privilegios'}
            icon={<IconPrivileges width={80} />}
          />
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
