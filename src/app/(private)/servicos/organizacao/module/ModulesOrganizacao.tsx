import React from 'react'

import IconBuild from '../../../../../../public/icons/IconBuild'
import IconBuildPlus from '../../../../../../public/icons/IconBuildPlus'
import { type Corporation } from '../../../../../../types/index'

import { CardModule } from '@/components/Cards/CardModule'

const ModulesOrganizacao = ({
  organizacao,
}: {
  organizacao: Corporation[]
}): JSX.Element => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {organizacao.map((corporation) => (
            <CardModule
              key={corporation.id}
              title={corporation.name}
              subtitle={corporation.phone}
              link={`/servicos/organizacao/${corporation.id}`}
              icon={<IconBuild width={54} />}
            />
          ))}
          <CardModule
            title="Adicionar Organizações"
            subtitle="Unidades da minha organização"
            link={'/servicos/organizacao/save'}
            icon={<IconBuildPlus width={58} className="ml-1" />}
          />
          <CardModule
            title="Privilégios"
            subtitle="Unidades da minha organização"
            link={'/servicos/organizacao/save'}
            icon={<IconBuild width={54} className="ml-1" />}
          />
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
