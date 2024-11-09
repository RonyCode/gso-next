import { z } from 'zod'

export const SaveCarCompanySchema = z.object({
  id_corporation: z.string().nullable().optional(),
  id_company: z.string().nullable().optional(),
  id_vehicle: z.string().nullable().optional(),
})

export type ISaveCarCompanySchema = z.infer<typeof SaveCarCompanySchema>
