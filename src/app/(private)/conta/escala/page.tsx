import { CardDefault } from '@/components/Cards/CardDefault'
import { LucideCalendarDays } from 'lucide-react'
import CalendarGso from '@/components/CalendarGso/CalendarGso'

const MinhaEscala = () => {
  return (
    <>
      <CardDefault
        title="Escala Serviço"
        description="Horário e dias escalados para meu serviço"
        icon={<LucideCalendarDays />}
      >
        <CalendarGso />{' '}
      </CardDefault>
    </>
  )
}
export default MinhaEscala
