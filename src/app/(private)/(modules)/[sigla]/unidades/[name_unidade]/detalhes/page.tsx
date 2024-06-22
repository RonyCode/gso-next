import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabUnidadeDetails from '@/app/(private)/(modules)/[sigla]/organizacao/[id_corporation]/unidades/component/TabUnidadeDetails'
import ModuleMinhaUnidade from '@/app/(private)/(modules)/[sigla]/organizacao/module/ModuleMinhaUnidade'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getAllStates } from '@/lib/getAllStates'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const MinhaUnidade = async ({
  params,
  searchParams,
}: {
  params: { sigla: string; name_unidade: string }
  searchParams: { id_unidade: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(
    params.sigla?.split('-')[1],
    params.name_unidade?.split('-')[1],
  )
  const states = await getAllStates()
  const imgValided = await ImageExist(data.image)
  if (imgValided.status !== 200) {
    data.image = process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  return (
    <div>
      {
        <CardDefault
          title={data?.name + ' / ' + data?.city}
          description={'CMD : ' + data?.director + ' - ' + data?.director}
          image={data.image}
          imageMobile={data.image}
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            <TabUnidadeDetails unidade={data} states={states} params={params} />
          </div>
        </CardDefault>
      }
    </div>
  )
}
export default MinhaUnidade
