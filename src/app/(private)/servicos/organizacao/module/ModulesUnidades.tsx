import React from 'react'

import IconBuild from '../../../../../../public/icons/IconBuild'
import IconBuildPlus from '../../../../../../public/icons/IconBuildPlus'
import IconOpenBook from '../../../../../../public/icons/IconOpenBook'

import { CardModule } from '@/components/Cards/CardModule'

const ModulesUnidades = ({
  idCorporation,
}: {
  idCorporation: string
}): JSX.Element => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <CardModule
          title="Minha Organização"
          subtitle="Detalhes da minha organização"
          link={`/servicos/organizacao/${idCorporation}/unidades`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Adicionar Unidade"
          subtitle="Unidades da minha organização"
          link={`/servicos/organizacao/${idCorporation}/unidades`}
          icon={<IconBuildPlus width={58} className="ml-1" />}
        />
        <CardModule
          title="Unidades"
          subtitle="Unidades da minha organização"
          link={`/servicos/organizacao/${idCorporation}/unidades`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Unidades"
          subtitle="Unidades da minha organização"
          link={`/servicos/organizacao/${idCorporation}/unidades`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Leis"
          subtitle="Acervo de leis "
          link="/servicos/organizacao/leis"
          icon={<IconOpenBook width={80} className="stroke-foreground/60" />}
        />{' '}
      </div>
    </>
  )
}
export default ModulesUnidades
