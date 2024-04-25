import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { EventProps } from '../../../../../types/index'

const MinhaEscala = () => {
  const event: EventProps[] = [
    {
      id: 3,
      day: 14,
      month: 3,
      year: 2024,
      unity: '7',
      title: 'teste 3',
      description: 'teste description 3',
      type: 'extra',
      group: 'Extra',
      status: 'cancelado',
      company: 'Palmas',
      date: '14/03/2024',
      start: '07:00',
      end: '19:00',
    },
    {
      id: 3,
      day: 22,
      month: 3,
      year: 2024,
      unity: '7',
      title: 'teste 1',
      description: 'teste description 1',
      type: 'extra',
      group: 'Extra',
      status: 'aguardando',
      company: 'Palmas',
      date: '22/03/2024',
      start: '07:00',
      end: '19:00',
    },
    {
      id: 3,
      day: 26,
      month: 3,
      year: 2024,
      unity: '3',
      title: 'teste 2',
      description: 'teste description 2',
      type: 'extra',
      group: 'Extra',
      status: 'cancelado',
      company: 'Palmas',
      date: '26/03/2024',
      start: '07:00',
      end: '19:00',
    },
  ]
  return (
    <>
      <div className="p-6">
        <CalendarGso event={event} />{' '}
      </div>
    </>
  )
}
export default MinhaEscala
