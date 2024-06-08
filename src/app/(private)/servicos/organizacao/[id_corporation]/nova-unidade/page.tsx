import IconBuildPlus from '../../../../../../../public/icons/IconBuildPlus'

import TabUnidadeDetails from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/TabUnidadeDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllStates } from '@/lib/getAllStates'
import { getAllUnidades } from '@/lib/GetAllUnidades'

const NovaUnidade = async ({
  params,
}: {
  params: { id_corporation: string }
}): Promise<JSX.Element> => {
  const states = await getAllStates()
  const { data } = await getAllUnidades()

  return (
    <>
      <CardDefault
        title={'Adicionar nova Unidade'}
        description={'Insira nova unidade de sua organização'}
        icon={<IconBuildPlus width={58} className="ml-1" />}
      >
        <TabUnidadeDetails unidades={data} states={states} params={params} />
      </CardDefault>
    </>
  )
}

export default NovaUnidade
