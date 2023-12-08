import { SignInSchema } from '@/app/(auth)/auth/schemas/SignInSchema'

interface LoginForm {
  handleSubmitLogin: FormData<FormDataEvent>
  signInWithGoogle: () => Promise<void>
  errors: z.Errors<SignInSchema>
  isLoading: boolean
  email: string
  senha: string
  nome: string
  image: string
  is_user_external: number
}
