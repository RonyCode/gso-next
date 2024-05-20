import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideBuilding } from 'lucide-react'
import { getAllUnidades } from '@/lib/GetAllUnidades'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { DataTableUnidades } from '@/components/DataTables/DataTableUnidades/data-table-unidades'

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
        <DataTableUnidades data={companies as []} columns={columnsUnidades} />
      </CardDefault>
    </>
  )
}
export default Unidades
