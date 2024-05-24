import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import UnidadesForm from '@/app/(private)/servicos/organizacao/unidades/component/UnidadesForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Unidade = async ({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  const unidade = await getUnidadeById('15', params.id)
  return (
    <div>
      <CardDefault
        title={unidade.name}
        description={
          'CMD : ' + unidade.director.competence + ' - ' + unidade.director.name
        }
        image={unidade.image}
        imageMobile={unidade.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        <UnidadesForm unidades={unidade} />
      </CardDefault>
    </div>
  )
}
export default Unidade
