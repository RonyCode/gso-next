import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { EventProps } from '../../../../../types/index'

const MinhaEscala = () => {
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
      day: 21,
      month: 3,
      year: 2024,
      title: 'teste 2',
      description: 'teste description 2',
      time: '11:00',
      group: 'Bravo',
      company: 'Palmas',
    },
    {
      day: 21,
      month: 3,
      year: 2024,
      title: 'teste 3',
      description: 'teste description 3',
      time: '9:00',
      group: 'Charlie',
      company: 'Palmas',
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
