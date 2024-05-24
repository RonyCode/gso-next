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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-land-plot"
        >
          <path d="m12 8 6-3-6-3v10" />
          <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
          <path d="m6.49 12.85 11.02 6.3" />
          <path d="M17.51 12.85 6.5 19.15" />
        </svg>
        <UnidadesForm unidades={unidade} />
      </CardDefault>
    </div>
  )
}
export default Unidade
