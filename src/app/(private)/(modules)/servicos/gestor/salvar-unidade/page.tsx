import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { LuMenuSquare } from 'react-icons/lu'

import ModuleMinhaUnidade from '@/app/(private)/(modules)/components/module/ModuleMinhaUnidade'
import ModulesOrganizacao from '@/app/(private)/(modules)/components/module/ModulesOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { authOptions } from '@/lib/auth'
import { getAllUnidades } from '@/lib/GetAllUnidades'
import { Button } from '@/ui/button'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const Unidades = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<ReactNode> => {
  const session = await getServerSession(authOptions)

  const { data } = await getAllUnidades(params?.sigla?.split('-')[1])
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
          {/* <TabUnidadeDetails /> */}
          {data !== null && data !== undefined && (
            <DataTableUnidades data={data} columns={columnsUnidades} />
          )}
        </div>

        {/* {session?.id_corporation != null ? ( */}
        <ModuleMinhaUnidade params={params} />
        {/* ) : ( */}
        {/*  <CardWithLogo */}
        {/*    title="Usuário sem Corporação" */}
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
export default Unidades
