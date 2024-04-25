import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideBuilding2 } from 'lucide-react'

const Organizacao = () => {
  return (
    <>
      <CardDefault
        title="Organização Gestora"
        description="Serviço de Organização Gestora"
        image="/images/logopmgo.png"
        icon={<LucideBuilding2 size={28} />}
      >
        <h1>TEste</h1>
      </CardDefault>
    </>
  )
}
export default Organizacao
