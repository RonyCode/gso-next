import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideBuilding } from 'lucide-react'
import { getAllUnidades } from '@/lib/GetAllUnidades'
import { DataTable } from '@/components/DataTables/data-table'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'

const Unidades = async () => {
  const { companies } = await getAllUnidades('15')
  return (
    <>
      <CardDefault
        title="Unidades"
        description="Unidades da minha organização"
        image="/images/bannerbm.jpg"
        icon={<LucideBuilding />}
      >
        {/* <CardListUnidade itemUnidade={itensUnidades} /> */}
        <DataTable data={companies as []} columns={columnsUnidades} />
      </CardDefault>
    </>
  )
}
export default Unidades
