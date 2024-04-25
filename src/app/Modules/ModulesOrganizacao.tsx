import { CardModule } from '@/components/Cards/CardModule'
import IconBuild from '../../../public/icons/IconBuild'

const ModulesOrganizacao = () => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <CardModule
            title="Unidades"
            subtitle="gerenciamento unidades"
            link="/servicos/organizacao"
            icon={<IconBuild width={54} />}
          />{' '}
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
