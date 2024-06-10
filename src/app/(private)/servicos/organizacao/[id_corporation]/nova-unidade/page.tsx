import IconBuildPlus from '../../../../../../../public/icons/IconBuildPlus'

import TabUnidadeDetails from '@/app/(private)/servicos/organizacao/[id_corporation]/unidades/component/TabUnidadeDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getAllStates } from '@/lib/getAllStates'
import { getAllUnidades } from '@/lib/GetAllUnidades'

const NovaUnidade = async ({
  params,
}: {
  params: { id: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const states = await getAllStates()

  return (
    <>
      <CardDefault
        title={'Adicionar nova Unidade'}
        description={'Insira nova unidade de sua organização'}
        icon={<IconBuildPlus width={58} className="ml-1" />}
      >
        <TabUnidadeDetails states={states} params={params} />
      </CardDefault>
    </>
  )
}

export default NovaUnidade
