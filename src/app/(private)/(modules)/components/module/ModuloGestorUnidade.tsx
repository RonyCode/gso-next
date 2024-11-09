import { CardModule } from '@/components/Cards/CardModule'
import IconCalendar from '@/icons/IconCalendar'
import IconCarFrontal from '@/icons/IconCarFrontal'
import IconMembers from '@/icons/IconMembers'

const ModuloGestorUnidade = async ({
  params,
}: {
  params: { name_unidade: string }
}): Promise<JSX.Element> => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        <div className="group">
          <CardModule
            title="Adicionar Membro"
            subtitle="Add Membros"
            link={`/servicos/unidades/${params?.name_unidade?.toLowerCase()}/gestor-unidade/membro-unidade-salvar`}
            icon={<IconMembers width={58} className="ml-1" />}
          />
        </div>
        <CardModule
          title="Adicionar Veículo"
          subtitle="Add veiculo"
          link={`/servicos/unidades/${params?.name_unidade?.toLowerCase()}/gestor-unidade/veiculo-unidade-salvar`}
          icon={<IconCarFrontal width={58} className="ml-1" />}
        />
        <CardModule
          title="Adicionar Escala"
          subtitle="Add Escala"
          link={`/servicos/unidades/${params?.name_unidade?.toLowerCase()}/gestor-unidade/escala-unidade-salvar`}
          icon={<IconCalendar width={58} className="ml-1" />}
        />{' '}
      </div>
    </>
  )
}
export default ModuloGestorUnidade
