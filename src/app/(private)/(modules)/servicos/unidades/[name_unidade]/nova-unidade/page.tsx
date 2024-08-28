import TabUnidadeDetails from '@/app/(private)/(modules)/servicos/[sigla]/components/TabUnidadeDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import IconBuildPlus from '@/icons/IconBuildPlus'
import { getAllStates } from '@/lib/getAllStates'

const NovaUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const states = await getAllStates()

  return (
    <>
      <CardDefault
        title={'Adicionar nova Unidade'}
        description={'Insira nova unidade de sua organização'}
        icon={
          <IconBuildPlus
            width={58}
            className="ml-1 fill-foreground/60 text-foreground/60"
          />
        }
      >
        <TabUnidadeDetails states={states} params={params} />
      </CardDefault>
    </>
  )
}

export default NovaUnidade
