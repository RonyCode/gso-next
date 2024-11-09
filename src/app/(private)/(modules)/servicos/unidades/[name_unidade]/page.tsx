import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import ModuleMinhaUnidade from '@/app/(private)/(modules)/components/module/ModuleMinhaUnidade'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const MinhaUnidade = async ({
  params,
}: {
  params: { name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)

  const corpFound = data?.find((corp) => {
    if (corp?.id === session?.id_corporation) {
      return corp
    }
    return null
  })

  const companyFounded = corpFound?.companies?.find((company) => {
    if (company?._id?.$oid === params?.name_unidade?.split('-')[1]) {
      return company
    }
    return null
  })

  const imgValided = await ImageExist(companyFounded?.image)
  if (imgValided.status !== 200 && companyFounded?.image != null) {
    companyFounded.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }

  const diretor = corpFound?.members?.find((member) => {
    if (member?.id === companyFounded?.director) {
      return member
    }
  })
  return (
    <div>
      {
        <CardDefault
          title={
            companyFounded?.name + ' / ' + companyFounded?.companyAddress?.city
          }
          description={'CMD : ' + diretor?.competence + ' - ' + diretor?.name}
          image={
            companyFounded?.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            companyFounded?.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="p-4">
            <ModuleMinhaUnidade params={params} />
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default MinhaUnidade
