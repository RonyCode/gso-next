import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'
import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { TokenVerify } from '@/functions/TokenVerify'
import { CardWithLogo } from '@/ui/CardWithLogo'
import { useUserStore } from '@/stores/user/userStore'
import { undefined } from 'zod'
import { UserType } from '../../../../../types/index'

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const tokenReplaced = params.token.replaceAll('%2B', '.')

  const jwtValid = await TokenVerify(tokenReplaced)
  useUserStore.setState({
    state: { user: { email: jwtValid!.email! as string } as UserType },
  })
  const email = useUserStore.getState().state.user.email
  return (
    <>
      <MaxWidthWrapper className="mt-24 px-6 lg:mt-0 lg:w-7/12 lg:px-0 ">
        {jwtValid.code! !== 400 ? (
          <UserRegisterForm params={email || ''} />
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

export async function generateStaticParams() {
  const test = ['OQAoB5aPxE4FYUtdPMpvFl26By8']

  return test.map((token) => {
    return {
      token,
    }
  })
}
