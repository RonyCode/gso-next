import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import IconBuildPlus from '@/icons/IconBuildPlus'
import IconCarFrontal from '@/icons/IconCarFrontal'
import IconList from '@/icons/IconList'
import IconMembers from '@/icons/IconMembers'
import IconOpenBook from '@/icons/IconOpenBook'
import IconPrivileges from '@/icons/IconPrivileges'
import IconCalendar from '@/icons/IconCalendar'
import IconEditSave from '@/icons/IconEditSave'

const ModuloOcorrencia = async ({
  params,
}: {
  params?: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Editar / Salvar"
            subtitle="Salvar  Ocorrência"
            link={`/servicos/ocorrencias/salvar`}
            icon={<IconEditSave width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Ocorrências"
          subtitle="Lista de Ocorrências"
          link={`/servicos/ocorrencias/lista`}
          icon={<IconList width={58} className="ml-1" />}
        />
      </div>
    </>
  )
}
export default ModuloOcorrencia
