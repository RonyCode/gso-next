import { FC } from 'react';

import PreRegisterUserForm from '@/app/(auth)/precadastro-usuario/components/PreRegisterUserForm';
import { CardWithLogo } from '@/ui/CardWithLogo';

const PreCadastroUsuario: FC = async () => {
  return (
    <>
      <CardWithLogo>
        <PreRegisterUserForm />
      </CardWithLogo>
    </>
  );
};

export default PreCadastroUsuario;
