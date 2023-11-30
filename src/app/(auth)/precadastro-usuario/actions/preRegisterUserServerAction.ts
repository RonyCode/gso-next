'use server';

import { revalidatePath } from 'next/cache';

import { usePreRegister } from '@/app/(auth)/precadastro-usuario/hooks/usePreRegister/usePreRegister';
import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';

export const preRegisterUserServerActions = async (data: FormData) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { preRegisterUser } = usePreRegister();
  revalidatePath('/');

  try {
    const formData = Object.fromEntries(data.entries());
    const result = PreRegisterUserSchema.safeParse(formData);

    if (result.success) {
      await preRegisterUser(result.data as PreRegisterUserSchema);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
