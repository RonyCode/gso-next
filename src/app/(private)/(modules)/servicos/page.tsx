import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React from 'react'
import { LuBuilding2 } from 'react-icons/lu'

import ModulesMinhaOrganizacao from '@/app/(private)/(modules)/components/module/ModulesMinhaOrganizacao'
import { CardDefault } from '@/components/Cards/CardDefault'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import { Button } from '@/components/ui/button'
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
  // eslint-disable-next-line array-callback-return
  const corporationFound = data?.find((corp) => {
    if (corp?.id === session?.id_corporation) {
      return corp
    }
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
        {session?.id_corporation != null ? (
          <ModulesMinhaOrganizacao params={params} />
        ) : (
          <CardWithLogo
            title="Usuário sem organização"
            description="É necessário solicitar inclusão em uma organização para acessar nossos módulos"
          >
            <Link href="/contact">
              <Button>Solicitar inclusão</Button>
            </Link>
          </CardWithLogo>
        )}
      </CardDefault>
    </>
  )
}
export default Page
