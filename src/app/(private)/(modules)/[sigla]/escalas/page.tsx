import { type Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { LuCalendarDays } from 'react-icons/lu'

import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CardDefault } from '@/components/Cards/CardDefault'
import { type CarsUnity, type EventProps, type Member } from '@/types/index'

export const metadata: Metadata = {
  title: 'GSO | Escalas',
  description: 'Página de escalas do site GSO.',
}

const Escala = ({ params }: { params: { sigla: string } }): ReactNode => {
  return (
    <>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        image="https://apexpublicschool.com/assets/images/calender.jpg"
        imageMobile="https://apexpublicschool.com/assets/images/calender.jpg"
        icon={<LuCalendarDays size={28} />}
      >
        <CalendarGso event={event} />
      </CardDefault>
    </>
  )
}
export default Escala
