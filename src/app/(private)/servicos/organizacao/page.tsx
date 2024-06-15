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
        title="Organizações"
        description="Gerenciar organizações"
        image={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/bannerCorp.jpg'
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/bannerCorp.jpg'
        }
        icon={<LuBuilding2 size={28} />}
      >
        <ModulesOrganizacao organizacoes={data} />
      </CardDefault>
    </>
  )
}

export default Organizacao
