import { z } from 'zod'

export const UnidadeSchema = z.object({
  id: z.number().min(1, { message: 'id inválido' }).optional().nullable(),
  id_corporation: z
    .number()
    .min(1, { message: 'id inválido' })
    .optional()
    .nullable(),
  name: z.string().min(1, { message: 'id inválido' }).optional(),
  cnpj: z.string().min(1, { message: 'id inválido' }).optional(),
  phone: z.string().min(1, { message: 'id inválido' }).optional(),
  image: z.string().min(1, { message: 'id inválido' }).optional(),
  address: z.string().min(1, { message: 'id inválido' }).optional(),
  number: z.string().min(1, { message: 'id inválido' }).optional(),
  zipcode: z.string().min(1, { message: 'id inválido' }).optional(),
  complement: z.string().min(1, { message: 'id inválido' }).optional(),
  district: z.string().min(1, { message: 'id inválido' }).optional(),
  city: z.string().min(1, { message: 'id inválido' }).optional(),
  short_name: z.string().min(1, { message: 'id inválido' }).optional(),
  date_creation: z.string().min(1, { message: 'id inválido' }).optional(),
  type: z.number().min(1, { message: 'id inválido' }).optional().nullable(),
})

export type IUnidadeSchema = z.infer<typeof UnidadeSchema>
