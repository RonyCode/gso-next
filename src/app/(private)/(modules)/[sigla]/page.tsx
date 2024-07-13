import { revalidatePath } from 'next/cache'
import React from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import ModulesMinhaOrganizacao from '@/app/(private)/(modules)/[sigla]/organizacao/module/ModulesMinhaOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'

const Page = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const { data } = await getAllOrganizacoes()
  // eslint-disable-next-line array-callback-return
  const corporationFound = data?.find((corp) => {
    if (corp?.id?.toString() === params?.sigla?.split('-')[1]?.toString()) {
      return corp
    }
  })
  const imgValided = await ImageExist(corporationFound?.image)
  if (imgValided.status !== 200 && corporationFound?.image != null) {
    corporationFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  revalidatePath('/')
  return (
    <>
      <CardDefault
        title={corporationFound?.name}
        description={corporationFound?.city + ' - ' + corporationFound?.phone}
        image={
          corporationFound?.image ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        imageMobile={
          corporationFound?.image ??
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
        }
        icon={<LuBuilding2 size={28} />}
      >
        <ModulesMinhaOrganizacao params={params} />
      </CardDefault>
    </>
  )
}
export default Page
