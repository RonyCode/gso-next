import { revalidatePath } from 'next/cache'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import UnidadesForm from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/UnidadesForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllStates } from '@/lib/getAllStates'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Unidade = async ({
  params,
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  const unidade = await getUnidadeById('15', params.id)
  const states = await getAllStates()
  revalidatePath('/')
  return (
    <div>
      <CardDefault
        title={unidade.name + ' / ' + unidade?.companyAddress?.city}
        description={
          'CMD : ' + unidade.director.competence + ' - ' + unidade.director.name
        }
        image={unidade.image}
        imageMobile={unidade.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        <div className=" grid flex-1 items-start p-6 ">
          <UnidadesForm unidades={unidade} states={states} />
        </div>
      </CardDefault>
    </div>
  )
}
export default Unidade
