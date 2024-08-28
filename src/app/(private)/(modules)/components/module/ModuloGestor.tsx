import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '@/icons/IconBuild'
import IconCalendar from '@/icons/IconCalendar'
import IconCelular from '@/icons/IconCelular'
import IconCog from '@/icons/IconCog'
import IconGrafico from '@/icons/IconGrafico'
import IconList from '@/icons/IconList'
import IconSirene from '@/icons/IconSirene'

const ModulesServices = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <div className="group">
            <CardModule
              title="Escalas"
              subtitle="Servço de escala"
              link={`/servicos/${params?.sigla?.toLowerCase()}/escalas`}
              icon={<IconCalendar width={54} />}
            />{' '}
          </div>
          <CardModule
            title="Ocorrências"
            subtitle="Ocorrências"
            link="/servicos/ocorrencias"
            icon={<IconSirene width={58} />}
          />{' '}
          <CardModule
            title="Unidades"
            subtitle="Gerenciar unidades"
            link={`/servicos/${params?.sigla?.toLowerCase()}/unidades`}
            icon={<IconList width={58} />}
          />{' '}
          <CardModule
            title="Estatísticas"
            subtitle="Estatítiscas gerais"
            icon={<IconGrafico width={58} />}
          />{' '}
          <CardModule
            title="Aplicativo"
            subtitle="Novidades do nosso App"
            icon={<IconCelular width={60} />}
          />{' '}
          <CardModule
            title="Área do Gestor"
            subtitle="Serviço de gestão"
            icon={<IconCog width={58} />}
          />{' '}
          <CardModule
            title="Organizações"
            subtitle="Serviço de sua Organizacão"
            link={`/servicos/${params?.sigla?.toLowerCase()}/organizacao`}
            icon={<IconBuild width={54} />}
          />{' '}
        </div>
      </div>
    </>
  )
}
export default ModulesServices
