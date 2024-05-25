import { type Metadata } from 'next'

import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'
import { CardWithLogo } from '@/components/Cards/CardWithLogo'
import MaxWidthWrapper from '@/components/Pages/MaxWidthWrapper'
import { TokenVerify } from '@/functions/TokenVerify'
import { getAllStates } from '@/lib/getAllStates'

export const metadata: Metadata = {
  title: 'GSO | Cadastro',
  description: 'page of signUp users.',
}

const CadastroUsuario = async ({
  params,
}: {
  params: { token: string }
}): Promise<JSX.Element> => {
  const tokenReplaced = params.token
    .replaceAll('%2B', '.')
    .replaceAll('%20', '.')

  const states = await getAllStates()

  const jwtValid = await TokenVerify(tokenReplaced)
  console.log(jwtValid)
  return (
    <>
      <MaxWidthWrapper className="mt-24 px-6 lg:mt-0 lg:w-7/12 lg:px-0 ">
        {jwtValid.code !== 400 ? (
          <UserRegisterForm params={jwtValid.email ?? ''} states={states} />
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
