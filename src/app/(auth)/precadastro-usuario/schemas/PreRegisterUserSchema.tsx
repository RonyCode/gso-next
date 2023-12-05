import { z } from 'zod'

export const PreRegisterUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
})
export type PreRegisterUserSchema = z.infer<typeof PreRegisterUserSchema>
