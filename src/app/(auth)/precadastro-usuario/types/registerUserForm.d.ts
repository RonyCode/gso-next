import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';

interface RegisterForm {
  handleSubmitLogin: FormData<FormDataEvent>;
  signInWithGoogle: () => Promise<void>;
  errors: z.Errors<PreRegisterUserSchema>;
  isLoading: boolean;
  email: string;
}

interface ResponsePreRegisterUser {
  data: boolean;
  status: string;
  code: number;
  message: string;
}
