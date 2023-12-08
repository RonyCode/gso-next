import Link from 'next/link'

import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm'
import { CardWithLogo } from '@/ui/CardWithLogo'
import { decodeJwt } from 'jose'

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const tokenReplaced = params.token.replaceAll('%2B', '.')

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
