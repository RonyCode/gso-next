import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import ModulesUnidades from '@/app/(private)/servicos/organizacao/module/ModulesUnidades'
import { CardDefault } from '@/components/Cards/CardDefault'

const Organizacao = async ({
  params,
}: {
  params: { id_corporation: string }
}): Promise<JSX.Element> => {
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding />}
      >
        <ModulesUnidades idCorporation={params.id_corporation} />
      </CardDefault>
    </>
  )
}
export default Organizacao
