import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuMenuSquare } from 'react-icons/lu'

import MemberForm from '@/app/(private)/(modules)/servicos/gestor/component/MemberForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'
import { getAllUsers } from '@/lib/GetAllUsers'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const SalvarMembro = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions)

  const { data } = await getAllOrganizacoes()
  const dataUsers = await getAllUsers()
  const corporationFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })
  const dataStates = await getAllStates()
  // console.log(dataUsers.data)
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Gerenciar unidades"
        image="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        imageMobile="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        icon={<LuMenuSquare size={28} />}
      >
        <div className="overflow-scroll p-6 lg:overflow-hidden">
          {data !== null && data !== undefined && (
            <MemberForm corporations={data} users={dataUsers?.data} />
          )}
        </div>

        {/* {session?.id_corporation != null ? ( */}
        {/* ) : ( */}
        {/*  <CardWithLogo */}
        {/*    title="Usuário sem corporacao" */}
        {/*    description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos" */}
        {/*  > */}
        {/*    <Link href="/contact"> */}
        {/*      <Button>Solicitar inclusão</Button> */}
        {/*    </Link> */}
        {/*  </CardWithLogo> */}
        {/* ) */}
        {/* } */}
      </CardDefault>
    </>
  )
}
export default SalvarMembro
