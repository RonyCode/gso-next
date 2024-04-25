import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideBuilding2 } from 'lucide-react'
import ModulesOrganizacao from '@/app/Modules/ModulesOrganizacao'

const Organizacao = () => {
  return (
    <>
      <CardDefault
        title="Organização Gestora"
        description="Serviço de Organização Gestora"
        image="/images/bannerbm.jpg"
        imageMobile="/images/cbmto.png"
        icon={<LucideBuilding2 size={28} />}
      >
        <ModulesOrganizacao />
      </CardDefault>
    </>
  )
}
export default Organizacao
