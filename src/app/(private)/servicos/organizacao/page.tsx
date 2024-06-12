import React, { type ReactNode } from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import ModulesOrganizacao from '@/app/(private)/servicos/organizacao/module/ModulesOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const Organizacao = async (): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  return (
    <>
      <CardDefault
        title="Organização Gestora"
        description="Serviço de Organização Gestora"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        imageMobile="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding2 size={28} />}
      >
        <ModulesOrganizacao organizacoes={data} />
      </CardDefault>
    </>
  )
}

export default Organizacao
