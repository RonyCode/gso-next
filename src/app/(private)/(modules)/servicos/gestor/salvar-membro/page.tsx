import { type Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { LuSaveAll } from 'react-icons/lu'

import MemberForm from '@/app/(private)/(modules)/servicos/gestor/component/MemberForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const SalvarMembro = async (): Promise<ReactNode> => {
  const { data } = await getAllOrganizacoes()
  return (
    <>
      <CardDefault
        title="Salvar Membro Corporação"
        description="Gerenciar Membros"
        image={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/members.jpg' ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/members.jpg' ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        icon={<LuSaveAll size={28} />}
      >
        <div className="overflow-scroll lg:overflow-hidden">
          {data !== null && data !== undefined && (
            <MemberForm corporations={data} />
          )}
        </div>
      </CardDefault>
    </>
  )
}
export default SalvarMembro
