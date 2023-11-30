import Link from 'next/link';

import { UserForm } from '@/app/(auth)/cadastro-usuario/[token]/components/UserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';
import { decodeJwt } from 'jose';

const CadastroUsuario = async ({ params }: { params: { token: string } }) => {
  const tokenReplaced = params.token.replaceAll('%2B', '.');

  const payload = decodeJwt(tokenReplaced);
  let jwtValid;
  if (payload!.exp) {
    jwtValid =
      new Date(payload.exp * 1000).toLocaleString() >
      new Date().toLocaleString('pt-BR');
  }

  return (
    <>
      {jwtValid ? (
        <CardWithLogo>
          <UserForm />
        </CardWithLogo>
      ) : (
        <CardWithLogo>
          <h1 className="text-center text-2xl font-bold">Link expirado</h1>
          <Link
            className=" bg-slate-900 text-white hover:bg-slate-800 h-10 py-2 px-4 mx-1 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-bold transition-color ' +
    'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 ' +
    'disabled:pointer-events-none"
            href="/"
          >
            Clique aqui para voltar
          </Link>
        </CardWithLogo>
      )}
    </>
  );
};

export default CadastroUsuario;
