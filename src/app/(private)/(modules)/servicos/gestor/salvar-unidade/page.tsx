import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuMenuSquare } from 'react-icons/lu'

import TabUnidadeDetails from '@/app/(private)/(modules)/components/TabUnidadeDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'
import { getAllUnidades } from '@/lib/GetAllUnidades'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const SalvarUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<ReactNode> => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllUnidades(session?.id_corporation)
  const dataCorporations = await getAllOrganizacoes()
  const dataStates = await getAllStates()
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Gerenciar unidades"
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/manager1.jpg'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/manager1.jpg'
        }
        icon={<LuMenuSquare size={28} />}
      >
        <div className="overflow-scroll p-6 lg:overflow-hidden">
          <TabUnidadeDetails
            states={dataStates}
            corporations={dataCorporations.data}
          />
          {data !== null && data !== undefined && (
            <DataTableUnidades data={data} columns={columnsUnidades} />
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
export default SalvarUnidade
