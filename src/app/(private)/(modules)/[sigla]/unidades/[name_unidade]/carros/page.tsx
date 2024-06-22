import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabCarsDetails from '@/app/(private)/(modules)/[sigla]/organizacao/[id_corporation]/unidades/component/TabCarsDetails'
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

  const imgValided = await ImageExist(data.image)
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
          image={data.image}
          imageMobile={data.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            <TabCarsDetails cars={data.companyCars} />
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default CarsUnidade
