import { getServerSession } from 'next-auth'

import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { authOptions } from '@/lib/auth'
import { getAllOrganizacoes } from '@/lib/GetAllOrganizacoes'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Members = async ({ params }: { params: { membro: string } }) => {
  const session = await getServerSession(authOptions)
  const { data } = await getAllOrganizacoes()
  const corpFounded = data?.find(
    (member) => member?.id === session?.id_corporation,
  )
  const memberFOunded = corpFounded?.members?.find(
    (member) => member?.id === params?.membro?.split('-')[1],
  )

  const imgValided = await ImageExist(memberFOunded?.image)
  if (imgValided.status !== 200 && memberFOunded?.image != null) {
    memberFOunded.image =
      process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.png'
  }

  return (
    <CardDefault
      title={memberFOunded?.competence + ' - ' + memberFOunded?.name}
      description={memberFOunded?.email ?? ''}
      image={
        memberFOunded?.image ??
        process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.png'
      }
      imageMobile={
        memberFOunded?.image ??
        process.env.NEXT_PUBLIC_API_GSO + '/public/images/avatar.png'
      }
    >
      teste
    </CardDefault>
  )
}
export default Members
