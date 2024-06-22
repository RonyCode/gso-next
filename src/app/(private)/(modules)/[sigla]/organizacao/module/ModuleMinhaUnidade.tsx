import React from 'react'

import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import IconBuildPlus from '@/icons/IconBuildPlus'
import IconCar from '@/icons/IconCar'
import IconCarFrontal from '@/icons/IconCarFrontal'
import IconList from '@/icons/IconList'
import IconMembers from '@/icons/IconMembers'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'

const ModuleMinhaUnidade = ({
  params,
}: {
  params?: { sigla: string; name_unidade: string }
  unidadeFound?: IUnidadeSchema
}): JSX.Element => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <CardModule
          title="Minha unidade"
          subtitle="Detalhes da minha unidade"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/detalhes`}
          icon={<IconBuild width={54} className="ml-1" />}
        />
        <CardModule
          title="Membros"
          subtitle="Membros da minha unidade"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/membros`}
          icon={<IconMembers width={50} className="ml-1" />}
        />
        <CardModule
          title="Carros"
          subtitle="Unidades da minha organização"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/carros`}
          icon={<IconCarFrontal width={64} className="ml-1" />}
        />
        <CardModule
          title="Escalas"
          subtitle="Unidades da minha organização"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/escalas`}
          icon={<IconList width={64} className="ml-1" />}
        />
        <CardModule
          title="Add+ Unidade"
          subtitle="Adicionar unidade"
          link={`/${params?.sigla?.toLowerCase()}/unidades/${params?.name_unidade?.toLowerCase()}/nova-unidade`}
          icon={<IconBuildPlus width={54} className="ml-1" />}
        />
      </div>
    </>
  )
}
export default ModuleMinhaUnidade
