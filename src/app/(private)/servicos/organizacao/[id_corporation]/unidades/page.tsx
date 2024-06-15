import React from 'react'
import { LuBuilding } from 'react-icons/lu'

import ModuleMinhaUnidade from '../../module/ModuleMinhaUnidade'

import UnidadesForm from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/UnidadesForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'
import { getAllUnidades } from '@/lib/GetAllUnidades'

const Unidades = async ({
  params,
}: {
  params: { id_corporation: string; id: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllUnidades(params.id_corporation)
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="https://www.designi.com.br/images/preview/11149946-m.jpg"
        icon={<LuBuilding />}
      >
        {data !== null && data !== undefined && (
          <div className="md:overflow-none overflow-scroll">
            <DataTableUnidades data={data} columns={columnsUnidades} />
          </div>
        )}
      </CardDefault>
    </>
  )
}
export default Unidades
