import { type Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { LuMenuSquare } from 'react-icons/lu'

import SelectCompanyModule from '@/app/(private)/(modules)/[sigla]/components/SelectCompanyModule'
import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { getAllUnidades } from '@/lib/GetAllUnidades'

export const metadata: Metadata = {
  title: 'GSO | unidades',
  description: 'Página de unidades do site GSO.',
}

const Unidades = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<ReactNode> => {
  const { data } = await getAllUnidades(String(params?.sigla?.split('-')[1]))
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Gerenciar unidades"
        image="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        imageMobile="https://dpobjetivo.com.br/images/2023/10/01/01b8947d-acf2-4c97-a67c-9e0a2e7f139e_large.png"
        icon={<LuMenuSquare size={28} />}
      >
        {/* <SelectCompanyModule unidades={data} params={params} /> */}
        <div className="overflow-scroll p-6 lg:overflow-hidden">
          <DataTableUnidades data={data} columns={columnsUnidades} />
        </div>
      </CardDefault>
    </>
  )
}
export default Unidades
