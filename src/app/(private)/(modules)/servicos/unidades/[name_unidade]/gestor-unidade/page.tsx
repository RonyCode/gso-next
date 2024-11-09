import ModuleMinhaUnidade from '@/app/(private)/(modules)/components/module/ModuleMinhaUnidade'
import ModuloGestorUnidade from '@/app/(private)/(modules)/components/module/ModuloGestorUnidade'
import { CardDefault } from '@/components/Cards/CardDefault'
import IconBuildPlus from '@/icons/IconBuildPlus'

const NovaUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
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
        <ModuloGestorUnidade params={params} />
      </CardDefault>
    </>
  )
}

export default NovaUnidade
