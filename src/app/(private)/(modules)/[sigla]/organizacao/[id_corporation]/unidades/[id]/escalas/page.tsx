import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabEscalasDetails from '@/app/(private)/(modules)/organizacao/[id_corporation]/unidades/component/TabEscalasDetails'
import TabMembersDetails from '@/app/(private)/(modules)/organizacao/[id_corporation]/unidades/component/TabMembersDetails'
import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const EscalasUnidade = async ({
  params,
}: {
  params: { id: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(params.id_corporation, params.id)

  const imgValided = await ImageExist(data.image)
  if (imgValided.status !== 200) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  return (
    <div>
      {
        <CardDefault
          title={data?.name + ' / ' + data?.companyAddress?.city}
          description={
            'CMD : ' + data?.director.competence + ' - ' + data?.director.name
          }
          image={data.image}
          imageMobile={data.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div>
            <CalendarGso event={data.companySchedules} />
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default EscalasUnidade
