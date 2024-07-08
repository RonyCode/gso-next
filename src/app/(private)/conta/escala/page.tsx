import { getServerSession } from 'next-auth'
import React, { type ReactNode } from 'react'
import { LuUserCheck } from 'react-icons/lu'

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
      <CardDefault icon={<LuUserCheck size={28} />}>
        <div>
          {/* {data != null && ( */}
          <CalendarGso unidade={data} functions={functions?.data} />
          {/* )} */}
        </div>{' '}
      </CardDefault>
    </>
  )
}
export default MinhaEscala
