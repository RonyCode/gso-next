import React from 'react'
import { LuBuilding } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import UnidadesForm from '@/app/(private)/(modules)/organizacao/[id_corporation]/unidades/component/UnidadesForm'
import ModuleMinhaUnidade from '@/app/(private)/(modules)/organizacao/module/ModuleMinhaUnidade'
import { CardDefault } from '@/components/Cards/CardDefault'
import { columnsUnidades } from '@/components/DataTables/DataTableUnidades/columnsUnidades'
import { ImageExist } from '@/functions/ImageExist'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Unidade = async ({
  params,
}: {
  params: { id: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const { data } = await getUnidadeById(params.id_corporation, params.id)

  const result = await ImageExist(data.image)
  if (result.status === 200) {
    console.log(data.image)
  }
  return (
    <div>
      (
      <CardDefault
        title={data?.name + ' / ' + data?.companyAddress?.city}
        description={
          'CMD : ' + data?.director.competence + ' - ' + data?.director.name
        }
        image={data.image}
        imageMobile={data.image}
        icon={<LuBuilding size={28} />}
        iconDescription={<MdOutlineSupervisorAccount size={18} />}
      >
        {/* <div className="md:overflow-none overflow-scroll"> */}
        {/*  <UnidadesForm params={params} /> */}
        {/* </div> */}
        <ModuleMinhaUnidade
          idCorporation={params.id_corporation}
          idUnidade={params.id}
        />
      </CardDefault>
    </div>
  )
}
export default Unidade
