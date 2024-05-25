import { useForm } from 'react-hook-form'

import {
  type IRegisterUserSchema,
  RegisterUserSchema,
} from '@/schemas/RegisterUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFormRegister = () => {
  const {
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IRegisterUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      data_nascimento: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      senha: '',
      confirmaSenha: '',
    },
  })

  return {
    clearErrors,
    setValue,
    errors,
    setError,
    register,
    isValid,
    dirtyFields,
  }
}
