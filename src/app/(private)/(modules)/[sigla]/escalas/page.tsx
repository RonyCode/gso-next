import { type Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'
import { LuCalendarDays } from 'react-icons/lu'

import SelectCompanyModule from '@/app/(private)/(modules)/[sigla]/components/SelectCompanyModule'
import SelectCompanySchedule from '@/app/(private)/(modules)/[sigla]/components/SelectCompanySchedule'
import SelectUnidades from '@/app/(private)/(modules)/[sigla]/escalas/SelectUnidades'
import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CardDefault } from '@/components/Cards/CardDefault'
import { authOptions } from '@/lib/auth'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getAllUnidades } from '@/lib/GetAllUnidades'
import { getUnidadeById } from '@/lib/GetUnidadeById'
import { Label } from '@/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'

// export const metadata: Metadata = {
//   title: 'GSO | Escalas',
//   description: 'Página de escalas do site GSO.',
// }

const Escala = async () => {
  const session = await getServerSession(authOptions)
  if (session === null) return <> </>
  // const { data } = await getAllUnidades(session?.id_corporation)
  const functions = await getAllFunctions()
  const unidades = await getAllUnidades(session?.id_corporation)
  const { data } = await getUnidadeById(
    session?.id_corporation,
    session?.id_company,
  )

  return (
    <div>
      <CardDefault
        title="Escalas"
        description="Serviço de escala"
        image="https://apexpublicschool.com/assets/images/calender.jpg"
        imageMobile="https://apexpublicschool.com/assets/images/calender.jpg"
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
