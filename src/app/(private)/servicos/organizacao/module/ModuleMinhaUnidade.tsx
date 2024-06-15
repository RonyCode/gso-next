import React from 'react'

import IconBuild from '../../../../../../public/icons/IconBuild'
import IconBuildPlus from '../../../../../../public/icons/IconBuildPlus'

import { CardModule } from '@/components/Cards/CardModule'

const ModuleMinhaUnidade = ({
  idCorporation,
  idUnidade,
}: {
  idCorporation: string
  idUnidade: string
}): JSX.Element => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <CardModule
          title="Minha unidade"
          subtitle="Detalhes da minha unidade"
          link={`/servicos/organizacao/${idCorporation}/unidades/${idUnidade}/detalhes`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Membros"
          subtitle="Membros da minha unidade"
          link={`/servicos/organizacao/${idCorporation}/unidades/${idUnidade}/membros`}
          icon={<IconBuildPlus width={58} className="ml-1" />}
        />
        <CardModule
          title="Carros"
          subtitle="Unidades da minha organização"
          link={`/servicos/organizacao/${idCorporation}/unidades/${idUnidade}/carros`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Escala"
          subtitle="Unidades da minha organização"
          link={`/servicos/organizacao/${idCorporation}/unidades/${idUnidade}`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
      </div>
    </>
  )
}
export default ModuleMinhaUnidade
