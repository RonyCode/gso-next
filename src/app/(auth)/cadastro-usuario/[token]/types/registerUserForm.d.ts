import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';

interface RegisterForm {
  handleSubmitLogin: FormData<FormDataEvent>;
  signInWithGoogle: () => Promise<void>;
  errors: z.Errors<RegisterUserSchema>;
  isLoading: boolean;
  email: string;
  nome: string;
  confirmaSenha: string;
  senha: string;
}
