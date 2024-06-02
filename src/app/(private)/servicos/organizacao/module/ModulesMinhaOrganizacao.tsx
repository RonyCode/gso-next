import React from 'react'

import IconBuild from '../../../../../../public/icons/IconBuild'
import IconBuildPlus from '../../../../../../public/icons/IconBuildPlus'
import IconOpenBook from '../../../../../../public/icons/IconOpenBook'

import { CardModule } from '@/components/Cards/CardModule'

const ModulesOrganizacao = ({
  idcorporation,
}: {
  idcorporation: string
}): JSX.Element => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <CardModule
            title={'Minha organizacao'}
            subtitle={'Visualizar detalhes'}
            link={`/servicos/organizacao/${idcorporation}/minha-organizacao`}
            icon={<IconBuild width={54} />}
          />
          <CardModule
            title="Adicionar Unidade"
            subtitle="Unidades da minha organização"
            link={`/servicos/organizacao/${idcorporation}/unidades`}
            icon={<IconBuildPlus width={58} className="ml-1" />}
          />
          <CardModule
            title="Unidades"
            subtitle="Unidades da minha organização"
            link={`/servicos/organizacao/${idcorporation}/unidades`}
            icon={<IconBuild width={54} className="ml-1" />}
          />
          <CardModule
            title="Privilégios"
            subtitle="Unidades da minha organização"
            link={'/servicos/organizacao/save'}
            icon={<IconBuild width={54} className="ml-1" />}
          />
          <CardModule
            title="Leis"
            subtitle="Acervo de leis "
            link="/servicos/organizacao/leis"
            icon={<IconOpenBook width={80} className="stroke-foreground/60" />}
          />{' '}
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
