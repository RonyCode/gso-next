import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { EditProfileForm } from '@/app/(private)/profile/edit/component/EditProfileForm'
import userStoreInitialize from '@/stores/user/userStoreInitialize'
import UserStoreInitialize from '@/stores/user/userStoreInitialize'

const EditProfile = () => {
  return (
    <>
      <MaxWidthWrapper className="pt-8 ">
        <h1 className="mb-6 text-3xl">Editar perfil</h1>
        <EditProfileForm />
      </MaxWidthWrapper>
    </>
  )
}
export default EditProfile
