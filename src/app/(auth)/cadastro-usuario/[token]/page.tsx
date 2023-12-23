import { UserRegisterForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserRegisterForm'
import MaxWidthWrapper from '@/components/Layout/MaxWidthWrapper'

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  // const tokenReplaced = params.token.replaceAll('%2B', '.')

  // const payload = decodeJwt(tokenReplaced)
  // let jwtValid
  // if (payload!.exp) {
  //   jwtValid =
  //     new Date(payload.exp * 1000).toLocaleString() >
  //     new Date().toLocaleString('pt-BR')
  // }
  return (
    <MaxWidthWrapper className="mt-24 px-6 lg:mt-0 lg:w-7/12 lg:px-0 ">
      <UserRegisterForm />
      {/* {params.token} */}
    </MaxWidthWrapper>
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
