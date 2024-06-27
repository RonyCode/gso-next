import { z } from 'zod'

const minimoCaracteresSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  senha: z
    .string()
    .min(8, {
      message:
        'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra',
    })
    .regex(minimoCaracteresSenha, {
      message:
        'Senha inválida deve conter no mínimo 8 caracteres com no mínimo uma letra',
    }),
  data: z.object({}).optional(),
  is_user_external: z.number().optional(),
  subscription: z.string().optional(),
  subscription_user: z.string().optional(),
  idCorporation: z.string().optional(),
  idCompany: z.string().optional(),
})

export type ISignInSchema = z.infer<typeof SignInSchema>
