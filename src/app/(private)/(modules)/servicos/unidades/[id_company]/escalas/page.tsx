import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import CalendarGso from '@/components/CalendarGso/CalendarGso'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllFunctions } from '@/lib/GetAllFunctions'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const EscalasUnidade = async ({
  params,
}: {
  params: { id_company: string }
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?.id === params?.id_company?.split('-')[1]) {
      return comp
    }
    return null
  })
  const imgValided = await ImageExist(companyFound?.image)
  if (imgValided.status !== 200 && companyFound?.image != null) {
    companyFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  const functions = await getAllFunctions()

  return (
    <div>
      {
        <CardDefault
          title={companyFound?.name + ' / ' + companyFound?.city}
          description={
            'CMD : ' + companyFound?.director + ' - ' + companyFound?.director
          }
          image={
            companyFound?.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            companyFound?.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div>
            {companyFound?.schedules != null && (
              <div className="p-6">
                <CalendarGso
                  unidade={companyFound}
                  functions={functions?.data}
                />
              </div>
            )}
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default EscalasUnidade
