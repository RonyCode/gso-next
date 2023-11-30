import { useForm } from 'react-hook-form';

import { PreRegisterUserSchema } from '@/app/(auth)/precadastro-usuario/schemas/PreRegisterUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useFormPreRegister = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PreRegisterUserSchema>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(PreRegisterUserSchema),
    defaultValues: {
      email: ''
    }
  });

  return {
    errors,
    setError,
    register,
    handleSubmit
  };
};
