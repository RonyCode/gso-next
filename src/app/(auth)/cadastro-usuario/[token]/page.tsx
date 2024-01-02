import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'
import { TokenVerify } from '@/functions/TokenVerify'
import { CardWithLogo } from '@/ui/CardWithLogo'
import { useUserStore } from '@/stores/user/userStore'
import { UserType } from '../../../../../types/index'
import { Metadata } from 'next'
import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'
import { decodeJwt } from 'jose'

export const metadata: Metadata = {
  title: 'GSO | Cadastro',
  description: 'page of signUp users.',
}

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const tokenReplaced = params.token.replaceAll('%2B', '.')

  // const jwtValid = await TokenVerify(tokenReplaced)

  const dateNowConverted = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Araguaina',
  })

  // const payload = decodeJwt(tokenReplaced)
  // const dateExpires = payload!.exp!

  const dateExpiresCpnverted = new Date(1704229070 * 1000).toLocaleString(
    'pt-BR',
    {
      timeZone: 'America/Araguaina',
    },
  )
  return (
    <>
      <div className="p-24 text-center">
        {tokenReplaced}
        <br></br>
        {dateNowConverted}
        <br></br>

        {dateExpiresCpnverted}
      </div>
      <MaxWidthWrapper className="mt-24 px-6 lg:mt-0 lg:w-7/12 lg:px-0 ">
        {dateNowConverted > dateExpiresCpnverted ? (
          <UserRegisterForm params={'jwtValid.email' || ''} />
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
