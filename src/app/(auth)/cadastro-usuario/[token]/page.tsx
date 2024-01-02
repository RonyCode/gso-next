import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { TokenVerify } from '@/functions/TokenVerify'
import { CardWithLogo } from '@/ui/CardWithLogo'
import { useUserStore } from '@/stores/user/userStore'
import { UserType } from '../../../../../types/index'
import { Metadata } from 'next'
import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'

export const metadata: Metadata = {
  title: 'GSO | Cadastro',
  description: 'page of signUp users.',
}

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const tokenReplaced = params.token.replaceAll('%2B', '.')

  const jwtValid = await TokenVerify(tokenReplaced)
  useUserStore.setState({
    state: { user: { email: tokenReplaced as string } as UserType },
  })
  console.log(jwtValid)
  return (
    <>
      <MaxWidthWrapper className="mt-24 px-6 lg:mt-0 lg:w-7/12 lg:px-0 ">
        {jwtValid.code !== 400 ? (
          <UserRegisterForm params={jwtValid.email || ''} />
        ) : (
          <CardWithLogo>
            Token inválido ou expirado por favor tente novamente
          </CardWithLogo>
        )}
      </MaxWidthWrapper>
    </>
  )
}
export default CadastroUsuario
