import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'
import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { Card } from '@/components/ui/card'
import { decodeJwt, jwtVerify } from 'jose'
import { TokenVerify } from '@/functions/TokenVerify'
import { CardWithLogo } from '@/ui/CardWithLogo'

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const tokenReplaced = params.token.replaceAll('%2B', '.')

  const jwtValid = await TokenVerify(tokenReplaced)

  return (
    <>
      <MaxWidthWrapper className="mt-24 px-6 lg:mt-0 lg:w-7/12 lg:px-0 ">
        {jwtValid.code !== 400 ? (
          <UserRegisterForm />
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
