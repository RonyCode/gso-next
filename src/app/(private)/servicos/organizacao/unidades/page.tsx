import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { getAllUnidades } from '@/lib/GetAllUnidades'

const Unidades = async () => {
  const { companies } = await getAllUnidades('15')
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding />}
      >
        <DataTableUnidades data={companies as []} columns={columnsUnidades} />
      </CardDefault>
    </>
  )
}
export default Unidades
