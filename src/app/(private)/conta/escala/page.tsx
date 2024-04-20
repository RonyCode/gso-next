import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideCalendarDays } from 'lucide-react'

const MinhaEscala = () => {
  return (
    <>
      <CardDefault
        title="Escala Serviço"
        description="Horário e dias escalados para meu serviço"
        icon={<LucideCalendarDays />}
      >
        minha escala
      </CardDefault>
    </>
  )
}
export default MinhaEscala
