import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabMembersDetails from '@/app/(private)/(modules)/[sigla]/organizacao/[id_corporation]/unidades/component/TabMembersDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const MembrosUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(
    params.sigla?.split('-')[1],
    params.name_unidade?.split('-')[1],
  )

  const imgValided = await ImageExist(data?.image)
  if (imgValided.status !== 200) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.png'
  }

  // eslint-disable-next-line array-callback-return
  const diretor = data?.companyMembers?.find((member) => {
    if (member?.id === data?.director) {
      return member
    }
  })

  return (
    <div>
      {
        <CardDefault
          title={data?.name + ' / ' + data?.companyAddress?.city}
          description={'CMD : ' + diretor?.competence + ' - ' + diretor?.name}
          image={
            data.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.png'
          }
          imageMobile={
            data.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          {data?.companyMembers?.[0]?.id !== null ? (
            <TabMembersDetails members={data.companyMembers} params={params} />
          ) : (
            <div className="flex h-full w-full  items-center justify-center">
              {' '}
              <span className="flex items-center justify-center gap-1">
                <LuSearchX size={28} className="text-primary/60" /> SEM EFETIVO
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
