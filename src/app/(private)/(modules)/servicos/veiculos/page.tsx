import { getServerSession } from 'next-auth'
import React from 'react'
import { LuBuilding, LuSearchX } from 'react-icons/lu'
import { MdOutlineSupervisorAccount } from 'react-icons/md'

import TabCarsDetails from '../../components/TabCarsDetails'

import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const CarsUnidade = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  const session = await getServerSession(authOptions)

  const corpFound = data?.find((corp) => {
    return corp?.id === session?.id_corporation
  })
  return (
    <div>
      {
        <CardDefault
          title={corpFound?.name + ' / ' + corpFound?.address?.city}
          description={'CMD '}
          image={
            corpFound?.image != null
              ? process.env.NEXT_PUBLIC_API_GSO + corpFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          imageMobile={
            corpFound?.image != null
              ? process.env.NEXT_PUBLIC_API_GSO + corpFound?.image
              : process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
          }
          icon={<LuBuilding size={28} />}
          iconDescription={<MdOutlineSupervisorAccount size={18} />}
        >
          <div className="md:overflow-none overflow-scroll">
            {corpFound !== null ? (
              <TabCarsDetails cars={corpFound?.vehicles} />
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
