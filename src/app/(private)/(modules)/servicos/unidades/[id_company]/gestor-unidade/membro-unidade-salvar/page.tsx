import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import MembersCompanyForm from '@/app/(private)/(modules)/components/MembersCompanyForm'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const MembrosUnidade = async ({
  params,
}: {
  params: { sigla: string; id_company: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)
  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })

  const companyFound = corpFound?.companies?.find((comp) => {
    return comp?.id === params?.id_company?.split('-')[1]
  })

  const imgValided = await ImageExist(companyFound?.image)
  if (imgValided.status !== 200 && companyFound?.image != null) {
    companyFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }

  // eslint-disable-next-line array-callback-return
  const diretor = companyFound?.members?.find((member) => {
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
          <MembersCompanyForm corporation={corpFound} company={companyFound} />
        </CardDefault>
      }
    </div>
  )
}
export default MembrosUnidade
