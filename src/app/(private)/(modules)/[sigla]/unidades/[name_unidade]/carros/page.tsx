import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabCarsDetails from '@/app/(private)/(modules)/[sigla]/components/TabCarsDetails'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const CarsUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(
    params.sigla?.split('-')[1],
    params.name_unidade?.split('-')[1],
  )
  if (data?.image === null) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  const imgValided = await ImageExist(data?.image)
  if (imgValided.status !== 200) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
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
            data?.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            data?.image ??
            process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            {data.companyCars?.[0].id !== null ? (
              <TabCarsDetails cars={data.companyCars} />
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
