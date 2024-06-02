import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import ModulesMinhaOrganizacao from '@/app/(private)/servicos/organizacao/module/ModulesMinhaOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'

const Organizacao = async ({
  params,
}: {
  params: { id_corporation: string }
}): Promise<JSX.Element> => {
  return (
    <>
      <CardDefault
        title="Minha Organização"
        description="Serviço de Organização Gestora"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding />}
      >
        {params.id_corporation !== null &&
          params.id_corporation !== undefined && (
            <ModulesMinhaOrganizacao idcorporation={params.id_corporation} />
          )}
      </CardDefault>
    </>
  )
}
export default Organizacao
