import IconBuild from '../../../../../public/icons/IconBuild'
import IconCalendar from '../../../../../public/icons/IconCalendar'
import IconCelular from '../../../../../public/icons/IconCelular'
import IconCog from '../../../../../public/icons/IconCog'
import IconGrafico from '../../../../../public/icons/IconGrafico'
import IconRelogio from '../../../../../public/icons/IconRelogio'
import IconSirene from '../../../../../public/icons/IconSirene'

import { CardModule } from '@/components/Cards/CardModule'

const ModulesServices = async (): Promise<JSX.Element> => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <div className="group">
            <CardModule
              title="Escala"
              subtitle="Servço de escala"
              link="/servicos/escala"
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
            title="Escala"
            subtitle="Servço de escala"
            icon={<IconRelogio width={54} />}
          />{' '}
          <CardModule
            title="Área do Gestor"
            subtitle="Serviço de gestão"
            icon={<IconCog width={58} />}
          />{' '}
          <CardModule
            title="Organização"
            subtitle="Serviço de sua Organizacão"
            link="/servicos/organizacao"
            icon={<IconBuild width={54} />}
          />{' '}
        </div>
      </div>
    </>
  )
}
export default ModulesServices
