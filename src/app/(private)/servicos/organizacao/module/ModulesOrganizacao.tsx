import IconBuild from '../../../../../../public/icons/IconBuild'
import IconOpenBook from '../../../../../../public/icons/IconOpenBook'

import { CardModule } from '@/components/Cards/CardModule'

const ModulesOrganizacao = (): JSX.Element => {
  return (
    <>
      <div>
        <div className=" grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <CardModule
            title="Unidades"
            subtitle="Gerenciamento Unidades"
            link="/servicos/organizacao/unidades"
            icon={<IconBuild width={54} />}
          />{' '}
          <CardModule
            title="Leis"
            subtitle="Acervo de leis "
            link="/servicos/organizacao/leis"
            icon={<IconOpenBook width={80} className="stroke-foreground/60" />}
          />{' '}
        </div>
      </div>
    </>
  )
}
export default ModulesOrganizacao
