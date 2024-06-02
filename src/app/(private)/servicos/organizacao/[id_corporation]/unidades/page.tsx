import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { getAllUnidades } from '@/lib/GetAllUnidades'

const Unidades = async ({
  params,
}: {
  params: { id_corporation: string }
}): Promise<JSX.Element> => {
  const { companies } = await getAllUnidades(params.id_corporation)
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding />}
      >
        {companies !== null && companies !== undefined && (
          <div className=" grid flex-1 items-start p-6 ">
            <DataTableUnidades
              data={companies as []}
              columns={columnsUnidades}
            />
          </div>
        )}
      </CardDefault>
    </>
  )
}
export default Unidades
