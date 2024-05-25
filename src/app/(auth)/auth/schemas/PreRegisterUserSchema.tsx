import { z } from 'zod'

export const PreRegisterUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  status: z.string(),
  code: z.number(),
  message: z.string(),
})
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PreRegisterUserSchema = z.infer<typeof PreRegisterUserSchema>
