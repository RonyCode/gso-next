import { useForm } from 'react-hook-form'

import {
  type ISignInSchema,
  SignInSchema,
} from '@/app/(auth)/auth/schemas/SignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFormLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ISignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
  })

  return {
    setValue,
    errors,
    setError,
    register,
    handleSubmit,
  }
}
