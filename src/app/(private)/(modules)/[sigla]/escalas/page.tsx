import { type Metadata } from 'next'
import React, { type ReactNode } from 'react'
import { LuCalendarDays } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'

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
        test
      </CardDefault>
    </>
  )
}
export default Escala
