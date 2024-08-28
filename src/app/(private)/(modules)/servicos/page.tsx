import { revalidatePath } from 'next/cache'
import React from 'react'
import { LuFolderCog } from 'react-icons/lu'
import Modules from '@/app/(private)/(modules)/components/module/Modules'
import { CardDefault } from '@/components/Cards/CardDefault'

const Page = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  revalidatePath('/')
  return (
    <>
      <CardDefault
        title="Serviços"
        description="Serviços disponíveis por modules"
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/modules.png'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/modules.png'
        }
        icon={<LuFolderCog size={28} />}
      >
        <Modules />
      </CardDefault>
    </>
  )
}
export default Page
