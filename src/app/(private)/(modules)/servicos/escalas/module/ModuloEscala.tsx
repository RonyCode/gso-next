import { CardModule } from '@/components/Cards/CardModule'
import IconCalendar from '@/icons/IconCalendar'
import IconEditSave from '@/icons/IconEditSave'

const ModuloEscala = async ({
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
            subtitle="Salvar  Escala"
            link={`/servicos/escala/salvar`}
            icon={<IconEditSave width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Escalas"
          subtitle="Lista de Escalas"
          link={`/servicos/gestor/salvar-organizacao`}
          icon={<IconCalendar width={58} className="ml-1" />}
        />
      </div>
    </>
  )
}
export default ModuloEscala
