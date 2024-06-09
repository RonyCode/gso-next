import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import UnidadesForm from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/UnidadesForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Unidade = async ({
  params,
}: {
  params: { id: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(params.id_corporation, params.id)
  return (
    <div>
      {data !== null && data !== undefined && (
        <CardDefault
          title={data?.name + ' / ' + data?.companyAddress?.city}
          description={
            'CMD : ' + data?.director.competence + ' - ' + data?.director.name
          }
          image={data.image}
          imageMobile={data.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className=" grid flex-1 items-start p-6 ">
            <UnidadesForm params={params} />
          </div>
        </CardDefault>
      )}
    </div>
  )
}
export default Unidade
