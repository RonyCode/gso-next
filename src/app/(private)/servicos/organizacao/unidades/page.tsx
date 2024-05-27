import { revalidatePath } from 'next/cache'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import UnidadesForm from '@/app/(private)/servicos/organizacao/unidades/component/UnidadesForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { getAllUnidades } from '@/lib/GetAllUnidades'

const Unidades = async (): Promise<JSX.Element> => {
  const { companies } = await getAllUnidades('15')
  revalidatePath('/')
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding />}
      >
        <div className=" grid flex-1 items-start p-6 ">
          <DataTableUnidades data={companies as []} columns={columnsUnidades} />
        </div>
      </CardDefault>
    </>
  )
}
export default Unidades
