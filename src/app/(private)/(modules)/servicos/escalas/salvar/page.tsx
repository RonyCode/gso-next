import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { LuCalendarDays } from 'react-icons/lu'

import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getAllUnidades } from '@/lib/GetAllUnidades'
import TabEscalasDetails from '@/app/(private)/(modules)/components/TabEscalasDetails'

export const metadata: Metadata = {
  title: 'GSO | Escalas',
  description: 'Página de escalas do site GSO.',
}

const SalvarEscala = async ({ params }: { params: { sigla: string } }) => {
  const session = await getServerSession(authOptions)
  if (session === null) return <> </>
  // const { data } = await getAllUnidades(session?.id_corporation)

  return (
    <div>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/calendar.jpg'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/calendar.jpg'
        }
        icon={<LuCalendarDays size={28} />}
      >
        <div>
          <TabEscalasDetails />
        </div>
      </CardDefault>
    </div>
  )
}
export default SalvarEscala
