import { type Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { LuSaveAll } from 'react-icons/lu'

import MemberForm from '@/app/(private)/(modules)/servicos/gestor/component/MemberForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllUserWithoutCorp } from '@/lib/GetAllUserWithoutCorp'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const SalvarMembro = async (): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  const dataUsers = await getAllUserWithoutCorp()
  return (
    <>
      <CardDefault
        title="Salvar Membro Corporação"
        description="Gerenciar Membros"
        image="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        imageMobile="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {data !== null && data !== undefined && (
            <MemberForm corporations={data} users={dataUsers?.data} />
          )}
        </div>
      </CardDefault>
    </>
  )
}
export default SalvarMembro
