import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { LuCalendarDays } from 'react-icons/lu'

import SelectCompanySchedule from '@/app/(private)/(modules)/components/SelectCompanySchedule'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

export const metadata: Metadata = {
  title: 'GSO | Escalas',
  description: 'Página de escalas do site GSO.',
}

const Escala = async ({ params }: { params: { sigla: string } }) => {
  const session = await getServerSession(authOptions)
  if (session === null) return <> </>
  const { data } = await getAllOrganizacoes()
  const corporacaoFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

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
        <div className="md:p-4">
          <SelectCompanySchedule unidades={corporacaoFound?.companies} />
        </div>
      </CardDefault>
    </div>
  )
}
export default Escala
