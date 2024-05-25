import { z } from 'zod'

export const PreRegisterUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  status: z.string().optional(),
  code: z.number().optional(),
  message: z.string().optional(),
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type IPreRegisterUserSchema = z.infer<typeof PreRegisterUserSchema>
