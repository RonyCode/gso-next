import { useForm } from 'react-hook-form';

import { RegisterUserSchema } from '@/app/(auth)/cadastro-usuario/[token]/schemas/RegisterUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormRegister = () => {
  const {
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isValid, dirtyFields }
  } = useForm<RegisterUserSchema>({
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
      confirmaSenha: ''
    }
  });

  return {
    clearErrors,
    setValue,
    errors,
    setError,
    register,
    isValid,
    dirtyFields
  };
};
