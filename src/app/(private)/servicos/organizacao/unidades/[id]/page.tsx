import { CardDefault } from '@/components/Cards/CardDefault'
import { Building2Icon } from 'lucide-react'
import UnidadesForm from '@/app/(private)/servicos/organizacao/unidades/component/UnidadesForm'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Unidade = async ({ params }: { params: { id: string } }) => {
  const unidade = await getUnidadeById('15', params.id)
  return (
    <>
      <CardDefault
        title="Unidade"
        description="Detalhes unidade"
        icon={<Building2Icon size={28} />}
      >
        <UnidadesForm unidades={unidade} />
      </CardDefault>
    </>
  )
}
export default Unidade
