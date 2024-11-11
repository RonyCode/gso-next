import { CardDefault } from '@/components/Cards/CardDefault'
import { ImageExist } from '@/functions/ImageExist'
import { getUnidadeById } from '@/lib/GetUnidadeById'

const Members = async ({
  params,
}: {
  params: { sigla: string; name_unidade: string; membro: string }
}) => {
  const { data } = await getUnidadeById(
    params.sigla?.split('-')[1],
    params.name_unidade?.split('-')[1],
  )
  const memberFOunded = data?.members?.find(
    (member) =>
      member?.id_user?.toString() === params?.membro?.split('-')[1].toString(),
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
