import { MemberSchema } from '@/schemas/MemberSchema'
import { z } from 'zod'

export const CarSchema = z.object({
  id: z.number().min(1, { message: 'id inválido' }),
  id_company: z.number().min(1, { message: 'id inválido' }),
  prefix: z.string().min(1, { message: 'id inválido' }),
  model: z.string().min(1, { message: 'id inválido' }),
  color: z.string().min(1, { message: 'id inválido' }),
  image: z.string().optional().nullable(),
  plate: z.string().min(1, { message: 'id inválido' }),
  local: z.string().min(1, { message: 'id inválido' }),
  type: z.string().min(1, { message: 'id inválido' }),
  condition_car: z.string().min(1, { message: 'id inválido' }),
  status: z.string().min(1, { message: 'id inválido' }),
  members: z.array(MemberSchema).optional(),
  excluded: z.number().min(1, { message: 'id inválido' }),
})

export type ICarSchema = z.infer<typeof CarSchema>
