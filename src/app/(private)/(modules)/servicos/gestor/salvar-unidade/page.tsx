import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { LuMenuSquare } from 'react-icons/lu'

import TabUnidadeDetails from '@/app/(private)/(modules)/components/TabUnidadeDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'
import { type IUnidadeSchema } from '@/schemas/UnidadeSchema'
import { Button } from '@/ui/button'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const SalvarUnidade = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFound = data?.find((corp) => corp?.id === session?.id_corporation)
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
          <TabUnidadeDetails states={dataStates} corporations={data} />
          {corpFound !== null && corpFound !== undefined && (
            <DataTableUnidades
              data={corpFound as unknown as IUnidadeSchema[]}
              columns={columnsUnidades}
            />
          )}
        </div>

        {session?.id_corporation != null ? (
          <CardWithLogo
            title="Usuário com corporacao"
            description="Usuário com corporação"
          >
            <Link href="/contact">
              <Button>Solicitar inclusão</Button>
            </Link>
          </CardWithLogo>
        ) : (
          <CardWithLogo
            title="Usuário sem corporacao"
            description="É necessário solicitar inclusão em uma corporação para acessar nossos módulos"
          >
            <Link href="/contact">
              <Button>Solicitar inclusão</Button>
            </Link>
          </CardWithLogo>
        )}
      </CardDefault>
    </>
  )
}
export default SalvarUnidade
