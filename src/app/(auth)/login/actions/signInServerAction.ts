'use server';
import { SignInSchema } from '@/app/(auth)/login/schemas/SignInSchema';
import { ZodError } from 'zod';

export const signInServerActions = async (data: FormData) => {
  try {
    const formData = Object.fromEntries(data.entries());
    const result = SignInSchema.safeParse(formData);
    if (result.success) {
      return result.data;
    }
    if (!result.success) {
      console.log(result.error.message);
      return JSON.parse(JSON.stringify(result.error as ZodError));
    }
  } catch (error) {
    return JSON.parse(JSON.stringify(error as ZodError));
  }
};
