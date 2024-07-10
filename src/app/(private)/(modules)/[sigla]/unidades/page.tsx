import { type Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { LuMenuSquare } from 'react-icons/lu'

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
          {data !== null && data !== undefined && (
            <DataTableUnidades data={data} columns={columnsUnidades} />
          )}
        </div>
      </CardDefault>
    </>
  )
}
export default Unidades
