import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import ModulesMinhaOrganizacao from '@/app/(private)/(modules)/[sigla]/organizacao/module/ModulesMinhaOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const Organizacao = async ({
  params,
}: {
  params: { sigla: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  // eslint-disable-next-line array-callback-return
  const organizacaoFound = data?.find((item) => {
    if (
      item.id !== undefined &&
      item.id !== null &&
      params.sigla !== undefined
    ) {
      return item.id.toString() === params.sigla.split('-')[1]?.toString()
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
        {params.sigla !== null && params.sigla !== undefined && (
          <ModulesMinhaOrganizacao params={params} />
        )}
      </CardDefault>
    </>
  )
}
export default Organizacao
