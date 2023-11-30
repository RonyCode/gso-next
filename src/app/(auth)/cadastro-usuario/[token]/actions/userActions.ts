'use server';

import { revalidatePath } from 'next/cache';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
import { userErrorRegisterStore } from '@/stores/user/userErrorRegisterStore';
import { useUserStore } from '@/stores/user/userStore';
import { UserRegisterError, UserType } from '@/types';

export async function submitUserForm(formData: FormData) {
  try {
    const formaDataEntries = Object.fromEntries(formData.entries());
    const result = RegisterUserSchema.safeParse(formaDataEntries);

    if (result.success) {
      useUserStore.getState().actions.add(result.data as UserType);
    }

    let zodErros: UserType;
    let resultParse: UserRegisterError = { errors: null, success: true };
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErros = {
          ...zodErros,
          [issue.path[0]]: issue.message
        };

        resultParse = { errors: zodErros, success: false };
      });
      userErrorRegisterStore.getState().add(resultParse.errors as UserType);
    }

    revalidatePath('/');

    return resultParse;
  } catch (error) {
    console.log(error);
  }
}
