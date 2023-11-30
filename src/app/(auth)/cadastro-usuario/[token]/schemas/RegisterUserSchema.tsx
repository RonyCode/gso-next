import { z } from 'zod';

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const RegisterUserSchema = z
  .object({
    nome: z.string().min(3, {
      message: 'nome inválido deve conter no mínimo 3 caracteres'
    }),

    cpf: z
      .string()
      .min(14, {
        message: 'Cpf inválido'
      })
      .max(14, { message: 'Cpf inválido' })
      .refine((cpf: string) => {
        cpf = cpf.replace(/\D+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
        const cpfDigits = cpf.split('').map((el) => +el);
        const rest = (count: number): number => {
          return (
            ((cpfDigits
              .slice(0, count - 12)
              .reduce((soma, el, index) => soma + el * (count - index), 0) *
              10) %
              11) %
            10
          );
        };
        return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
      }, 'Cpf não existe.'),
    endereco: z.string().min(3, {
      message: 'endereço inválido deve conter no mínimo 3 caracteres'
    }),
    numero: z
      .string()
      .min(1, {
        message: 'número inválido deve conter no mínimo 1 caracteres'
      })
      .nullable(),
    cep: z.string().min(9, {
      message: 'Cep inválido'
    }),
    cidade: z.string().min(3, {
      message: 'Cidade inválida deve conter no mínimo 3 caracteres'
    }),
    estado: z.string().min(2, {
      message: 'Estado deve conter no mínimo 2 caracteres'
    }),
    bairro: z.string().min(3, {
      message: 'Estado deve conter no mínimo 2 caracteres'
    }),
    confirmaSenha: z.string(),
    telefone: z
      .string()
      .trim()
      .min(14, { message: 'Telefone inválido' })
      .trim(),
    data_nascimento: z.string().min(10, {
      message: 'Data inválida'
    }),
    email: z.string().email({ message: 'Email inválido' }),
    senha: z
      .string()
      .min(8, {
        message:
          'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra'
      })
      .regex(minimoCaracteresSenha, {
        message:
          'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra'
      })
  })
  .refine(({ senha, confirmaSenha }) => senha === confirmaSenha, {
    path: ['confirmaSenha'],
    message: 'Senhas não conferem'
  });

export type RegisterUserSchema = z.infer<typeof RegisterUserSchema>;
