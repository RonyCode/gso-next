import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { LuCalendarDays } from 'react-icons/lu'

import SelectCompanySchedule from '@/app/(private)/(modules)/[sigla]/components/SelectCompanySchedule'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getAllUnidades } from '@/lib/GetAllUnidades'

export const metadata: Metadata = {
  title: 'GSO | Escalas',
  description: 'Página de escalas do site GSO.',
}

const Escala = async ({ params }: { params: { sigla: string } }) => {
  const session = await getServerSession(authOptions)
  if (session === null) return <> </>
  // const { data } = await getAllUnidades(session?.id_corporation)
  const functions = await getAllFunctions()
  const unidades = await getAllUnidades(params?.sigla?.split('-')[1])

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
          <SelectCompanySchedule
            unidades={unidades?.data}
            functions={functions?.data}
          />
        </div>
      </CardDefault>
    </div>
  )
}
export default Escala
