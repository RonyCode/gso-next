import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { EditProfileForm } from '@/app/(private)/profile/edit/component/EditProfileForm'
import { getAllStates } from '@/lib/getAllStates'
import { GetUserById } from '@/lib/GetUserById'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
export const dynamic = 'force-dynamic'

const EditProfile = async () => {
  const session = await getServerSession(authOptions)
  const state = await getAllStates()
  const user = await GetUserById(session!.id!)
  return (
    <>
      <MaxWidthWrapper className="pt-8 ">
        <h1 className="mb-6 text-3xl">Editar perfil</h1>

        <EditProfileForm user={user} states={state} />
      </MaxWidthWrapper>
    </>
  )
}
export default EditProfile
