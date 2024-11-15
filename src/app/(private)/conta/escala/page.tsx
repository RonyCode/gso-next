import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuCalendarCheck } from 'react-icons/lu'

import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getMyUnidade } from '@/lib/GetMyUnidade'

const MinhaEscala = async (): Promise<ReactNode> => {
  const session = await getServerSession(authOptions)

  const functions = await getAllFunctions()
  const { data } = await getMyUnidade(
    session?.id_corporation,
    session?.id_company,
    session?.id,
  )
  return (
    <>
      <CardDefault
        title="Minha Escala"
        description={data?.name}
        image="https://apexpublicschool.com/assets/images/calender.jpg"
        imageMobile="https://apexpublicschool.com/assets/images/calender.jpg"
        icon={<LuCalendarCheck size={28} />}
      >
        <div>
          {data !== null && data !== undefined && (
            <CalendarGso unidade={data} functions={functions?.data} />
          )}
        </div>{' '}
      </CardDefault>
    </>
  )
}
export default MinhaEscala
