import { CardDefault } from '@/components/Cards/CardDefault'
import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { LucideCalendarDays } from 'lucide-react'
import { EventProps } from '../../../../../types/index'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GSO | Escalas',
  description: 'Página de escalas do site GSO.',
}

const Escala = () => {
  const event: EventProps[] = [
    {
      day: 21,
      month: 3,
      year: 2024,
      title: 'teste 1',
      description: 'teste description 1',
      time: '10:00',
      group: 'Alfa',
      company: 'Palmas',
    },
    {
      day: 3,
      month: 3,
      year: 2024,
      title: 'teste 2',
      description: 'teste description 2',
      time: '11:00',
      group: 'Bravo',
      company: 'Palmas',
    },
    {
      day: 18,
      month: 3,
      year: 2024,
      title: 'teste 3',
      description: 'teste description 3',
      time: '9:00',
      group: 'Charlie',
      company: 'Palmas',
    },
    {
      day: 29,
      month: 3,
      year: 2024,
      title: 'teste 1',
      description: 'teste description 1',
      time: '10:00',
      group: 'Alfa',
      company: 'Palmas',
    },
    {
      day: 13,
      month: 3,
      year: 2024,
      title: 'teste 2',
      description: 'teste description 2',
      time: '11:00',
      group: 'Alfa',
      company: 'Palmas',
    },
    {
      day: 7,
      month: 3,
      year: 2024,
      title: 'teste 3',
      description: 'teste description 3',
      time: '9:00',
      group: 'Delta',
      company: 'Palmas',
    },
    {
      day: 23,
      month: 3,
      year: 2024,
      title: 'teste 2',
      description: 'teste description 2',
      time: '11:00',
      group: 'Bravo',
      company: 'Palmas',
    },
    {
      day: 1,
      month: 3,
      year: 2024,
      title: 'teste 31',
      description: 'teste description 3',
      time: '19:00',
      group: 'Charlie',
      company: 'Palmas',
    },
    {
      day: 15,
      month: 3,
      year: 2024,
      title: 'teste 1',
      description: 'teste description 1',
      time: '10:00',
      group: 'Alfa',
      company: 'Palmas',
    },
    {
      day: 1,
      month: 3,
      year: 2024,
      title: 'teste 2',
      description: 'teste description 2',
      time: '11:00',
      group: 'Alfa',
      company: 'Palmas',
    },
    {
      day: 14,
      month: 3,
      year: 2024,
      title: 'teste 3',
      description: 'teste description 3',
      time: '9:00',
      group: 'Charlie',
      company: 'Palmas',
    },
    {
      day: 22,
      month: 3,
      year: 2024,
      title: 'teste 1',
      description: 'teste description 1',
      time: '10:00',
      group: 'Alfa',
      company: 'Palmas',
    },
    {
      day: 26,
      month: 3,
      year: 2024,
      title: 'teste 2',
      description: 'teste description 2',
      time: '11:00',
      group: 'Bravo',
      company: 'Palmas',
    },
    {
      day: 18,
      month: 3,
      year: 2024,
      title: 'teste 3',
      description: 'teste description 3',
      time: '9:00',
      group: 'Delta',
      company: 'Palmas',
    },
  ]
  return (
    <>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        icon={<LucideCalendarDays size={28} />}
      >
        <CalendarGso event={event} />
      </CardDefault>
    </>
  )
}
export default Escala
