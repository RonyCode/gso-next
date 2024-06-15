import { z } from 'zod'

export const MemberSchema = z
  .object({
    id: z
      .string()
      .min(1, {
        message: 'id inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    id_company: z
      .string()
      .min(1, {
        message: 'id_company inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    id_car: z
      .string()
      .min(1, {
        message: 'id_car inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    id_schedule: z
      .string()
      .min(1, {
        message: 'id_schedule inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    id_function: z
      .string()
      .min(1, {
        message: 'id_function inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    competence: z
      .string()
      .min(1, {
        message: 'competence inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    status: z
      .number()
      .min(1, {
        message: 'status inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    entry_date: z
      .string()
      .min(1, {
        message: 'entry_date inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
    excluded: z
      .number()
      .min(1, {
        message: 'excluded inválido deve conter no mínimo 1 caracteres',
      })
      .optional()
      .nullable(),
  })
  .optional()

export type IMemberSchema = z.infer<typeof MemberSchema>
