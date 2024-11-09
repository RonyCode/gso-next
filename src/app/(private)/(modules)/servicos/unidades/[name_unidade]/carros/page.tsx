import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabCarsDetails from '@/app/(private)/(modules)/components/TabCarsDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const CarsUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const companyFound = corpFound?.companies?.find((comp) => {
    if (comp?._id?.$oid === params?.name_unidade?.split('-')[1]) {
      return comp
    }
    return null
  })
  const imgValided = await ImageExist(companyFound?.image)
  if (imgValided.status !== 200 && companyFound?.image != null) {
    companyFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + ' / ' + companyFound?.companyAddress?.city
          }
          description={'CMD : '}
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
            {companyFound?.companyCars !== null ? (
              <TabCarsDetails cars={companyFound?.companyCars} />
            ) : (
              <div className="flex h-full w-full  items-center justify-center">
                {' '}
                <span className="flex items-center justify-center gap-1">
                  <LuSearchX size={28} className="text-primary/60" /> SEM
                  VEÍCULOS CADASTRADOS 🤯
                </span>
              </div>
            )}
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default CarsUnidade
