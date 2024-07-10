import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const EscalasUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(
    params.sigla?.split('-')[1],
    params.name_unidade?.split('-')[1],
  )

  const imgValided = await ImageExist(data.image)
  if (imgValided.status !== 200) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }

  const functions = await getAllFunctions()

  return (
    <div>
      {
        <CardDefault
          title={data?.name + ' / ' + data?.city}
          description={'CMD : ' + data?.director + ' - ' + data?.director}
          image={
            data.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            data.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div>
            {data.companySchedules != null && (
              <CalendarGso unidade={data} functions={functions?.data} />
            )}
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default EscalasUnidade
