import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import React from 'react'
import { LuCrown } from 'react-icons/lu'

import ModuloGestor from '../../components/module/ModuloGestor'

import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { toast } from '@/ui/use-toast'

const Page = async ({
  params,
}: {
  params: { sigla: string; id_corporation: string }
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corporationFound = data?.find((corp) => {
    if (corp?.id === session?.id_corporation) {
      return corp
    }
    return null
  })
  const imgValided = await ImageExist(corporationFound?.image)
  if (imgValided.status !== 200 && corporationFound?.image != null) {
    corporationFound.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/img.png'
  }
  if (session?.id_corporation == null) {
    toast({
      variant: 'warning',
      title:
        'Usuário ainda não pertence a uma corporação, por favor solicite sua inclusão  ! 🤯 ',
      description: 'Usuário sem corporação',
    })
    console.log('rwsdasda')
    // redirect('/')
  }
  revalidatePath('/')
  return (
    <>
      <CardDefault
        title="Gestor de Organizações"
        description="Área de Gestão"
        image={process.env.NEXT_PUBLIC_API_GSO + '/public/images/manager.jpg'}
        imageMobile={
          process.env.NEXT_PUBLIC_API_GSO + '/public/images/manager.jpg'
        }
        icon={<LuCrown size={28} />}
      >
        <div className="w-full">
          {' '}
          <ModuloGestor params={params} />
        </div>
      </CardDefault>
    </>
  )
}
export default Page
