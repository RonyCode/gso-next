import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import ModuleMinhaUnidade from '@/app/(private)/(modules)/[sigla]/organizacao/module/ModuleMinhaUnidade'
import { CardDefault } from '@/components/Cards/CardDefault'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Unidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(
    params?.sigla?.split('-')[1],
    params?.name_unidade?.split('-')[1],
  )

  return (
    <div>
      (
      <CardDefault
        title={data?.name + ' / ' + data?.companyAddress?.city}
        description={'CMD '}
        image={data.image}
        imageMobile={data.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        {/* <div className="md:overflow-none overflow-scroll"> */}
        {/*  <UnidadesForm params={params} /> */}
        {/* </div> */}
        <ModuleMinhaUnidade params={params} />
      </CardDefault>
    </div>
  )
}
export default Unidade
