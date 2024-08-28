import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import IconBuildPlus from '@/icons/IconBuildPlus'
import IconCarFrontal from '@/icons/IconCarFrontal'
import IconList from '@/icons/IconList'
import IconMembers from '@/icons/IconMembers'
import IconOpenBook from '@/icons/IconOpenBook'
import IconPrivileges from '@/icons/IconPrivileges'

const ModuloGestor = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Adicionar Unidade"
            subtitle="Add Unidade"
            link={`/servicos/gestor/salvar-unidade`}
            icon={<IconBuildPlus width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Adicionar Organização"
          subtitle="Add Organização"
          link={`/servicos/gestor/salvar-organizacao`}
          icon={<IconBuildPlus width={58} className="ml-1" />}
        />
        <CardModule
          title="Adicionar Membro"
          subtitle="Add Membro Unidade"
          link={`/servicos/gestor/salvar-membro`}
          icon={<IconMembers width={58} className="ml-1" />}
        />{' '}
        <CardModule
          title="Adicionar Veículo"
          subtitle="Add Veiculo Unidade"
          link={`/servicos/gestor/salvar-veiculo`}
          icon={<IconCarFrontal width={58} className="ml-1" />}
        />
        <CardModule
          title="Privilégios"
          subtitle="Gerenciar privilégios"
          link={`/servicos/gestor/privilegios`}
          icon={<IconPrivileges width={80} className="ml-1" />}
        />
        <CardModule
          title="Leis"
          subtitle="Acervo de leis "
          link={`/servicos/gestor/leis`}
          icon={<IconOpenBook width={80} className="stroke-foreground/60" />}
        />{' '}
      </div>
    </>
  )
}
export default ModuloGestor
