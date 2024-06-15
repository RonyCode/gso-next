import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import ModulesMinhaOrganizacao from '@/app/(private)/servicos/organizacao/module/ModulesMinhaOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const Organizacao = async ({
  params,
}: {
  params: { id_corporation: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  // eslint-disable-next-line array-callback-return
  const organizacaoFound = data?.find((item) => {
    if (
      item.id !== undefined &&
      item.id !== null &&
      params.id_corporation !== undefined
    ) {
      return item.id.toString() === params.id_corporation
    }
  })

  return (
    <>
      <CardDefault
        title={organizacaoFound?.short_name_corp}
        description={organizacaoFound?.city + ' - ' + organizacaoFound?.phone}
        image={organizacaoFound?.image}
        imageMobile={organizacaoFound?.image}
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
