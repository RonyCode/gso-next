import { z } from 'zod'

export const EditUserSchema = z.object({
  nome: z.string().min(3, {
    message: 'nome inválido deve conter no mínimo 3 caracteres',
  }),
  id: z.string().min(1, { message: 'id inválido' }).nullable(),
  image: z.string().optional().nullable(),
  cpf: z
    .string()
    .min(14, {
      message: 'Cpf inválido',
    })
    .max(14, { message: 'Cpf inválido' })
    .refine((cpf: string) => {
      cpf = cpf.replace(/\D+/g, '')
      if (cpf.length !== 11 || !(cpf.match(/(\d)\1{10}/) == null)) return false
      const cpfDigits = cpf.split('').map((el) => +el)
      const rest = (count: number): number => {
        return (
          ((cpfDigits
            .slice(0, count - 12)
            .reduce((soma, el, index) => soma + el * (count - index), 0) *
            10) %
            11) %
          10
        )
      }
      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
    }, 'Cpf não existe.'),
  endereco: z.string().min(3, {
    message: 'endereço inválido deve conter no mínimo 3 caracteres',
  }),
  complemento: z.string().optional(),
  sigla: z.string().min(2, {
    message: 'endereço inválido deve conter no mínimo 2 caracteres',
  }),
  numero: z
    .string()
    .min(1, {
      message: 'número inválido deve conter no mínimo 1 caracteres',
    })
    .optional(),

  cep: z.string().min(9, {
    message: 'Cep inválido',
  }),
  cidade: z.string().min(1, {
    message: 'Cidade inválida deve conter no mínimo 1 caracteres',
  }),
  estado: z.string().min(1, {
    message: 'Estado deve conter no mínimo 1 caracteres',
  }),
  bairro: z.string().min(1, {
    message: 'Bairro deve conter no mínimo 1 caracteres',
  }),
  telefone: z.string().trim().min(14, { message: 'Telefone inválido' }).trim(),
  data_nascimento: z.string().min(10, {
    message: 'Data inválida',
  }),
  email: z.string().email({ message: 'Email inválido' }).nullable(),
})

export type IEditUserSchema = z.infer<typeof EditUserSchema>
