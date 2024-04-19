import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { EditProfileForm } from '@/app/(private)/profile/edit/component/EditProfileForm'
import { getAllStates } from '@/lib/getAllStates'
import { GetUserById } from '@/lib/GetUserById'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CardDefault } from '@/components/Cards/CardDefault'
import { MdAccountBox } from 'react-icons/md'

const EditProfile = async () => {
  const session = await getServerSession(authOptions)
  const state = await getAllStates()
  const user = await GetUserById(session!.id!)
  return (
    <>
      <CardDefault
        title="Editar Perfil"
        description="Atualize seus dados"
        icon={<MdAccountBox size={28} />}
      >
        <EditProfileForm user={user} states={state} />
      </CardDefault>
    </>
  )
}
export default EditProfile
