import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import MembersCompanyForm from '@/app/(private)/(modules)/components/MembersCompanyForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import VehicleCompanyForm from '@/app/(private)/(modules)/components/VehicleCompanyForm'

const MembrosUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const companyFound = corpFound?.companies?.find((comp) => {
    return comp?.id === params?.name_unidade?.split('-')[1]
  })

  const imgValided = await ImageExist(companyFound?.image)
  if (imgValided.status !== 200 && companyFound?.image != null) {
    companyFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }

  // eslint-disable-next-line array-callback-return
  const diretor = companyFound?.companyMembers?.find((member) => {
    if (member?.id === companyFound?.director) {
      return member
    }
  })
  return (
    <div>
      {
        <CardDefault
          title={
            companyFound?.name + ' / ' + companyFound?.companyAddress?.city
          }
          description={'CMD : ' + diretor?.competence + ' - ' + diretor?.name}
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
          {companyFound?.companyMembers != null ? (
            <VehicleCompanyForm
              corporation={corpFound}
              company={companyFound}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {' '}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM VEÍCULOS
                CADASTRADOS 🤯
              </span>
            </div>
          )}
        </CardDefault>
      }
    </div>
  )
}
export default MembrosUnidade
