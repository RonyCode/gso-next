import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabUnidadeDetails from '../../../components/TabUnidadeDetails'

import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getAllStates } from '@/lib/getAllStates'
const MinhaUnidade = async ({
  searchParams,
}: {
  searchParams: { id_company: string }
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  if (session === null) return <> </>

  const { data } = await getAllOrganizacoes()
  const corporationFound = data?.find((corp) => {
    return corp.id === session?.id_corporation
  })

  const companyFound = corporationFound?.companies?.find((comp) => {
    return comp.id === searchParams.id_company
  })

  const states = await getAllStates()
  const imgValided = await ImageExist(companyFound?.image)
  if (imgValided.status !== 200 && companyFound?.image !== undefined) {
    companyFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
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
          <div className="md:overflow-none overflow-scroll">
            <TabUnidadeDetails
              corporations={data}
              unidade={companyFound}
              states={states}
            />
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default MinhaUnidade
