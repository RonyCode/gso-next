import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'

const EditProfile = () => {
  return (
    <>
      <MaxWidthWrapper className="pt-8">
        <h1 className="text-3xl">Editar perfil</h1>
        <UserRegisterForm params="" />
      </MaxWidthWrapper>
    </>
  )
}
export default EditProfile
