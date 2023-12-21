import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm'

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
    <>
      {/* {jwtValid ? ( */}
      {/* <CardWithLogo> */}
      <div className="flex  h-full w-full">
        <UserForm />
        {/* {params.token} */}
      </div>
      {/* </CardWithLogo> */}
      {/* ) : ( */}
      {/*  <CardWithLogo */}
      {/*    title="Link expirado" */}
      {/*    description="Link expirado por favor tente novamente" */}
      {/*  ></CardWithLogo> */}
      {/* )} */}
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
