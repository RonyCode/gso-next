import { z } from 'zod'

export const SelectCorporationModuleSchema = z.object({
  id_company: z
    .string()
    .min(1, {
      message: 'id inválido deve conter no mínimo 1 caracteres',
    })
    .optional()
    .nullable(),

  id_corporation: z
    .string()
    .min(1, {
      message: 'id_corporation inválido deve conter no mínimo 1 caracteres',
    })
    .optional()
    .nullable(),

  name_unidade: z
    .string()
    .min(1, {
      message: 'name_unidade inválido deve conter no mínimo 1 caracteres',
    })
    .optional()
    .nullable(),
})

export type ISelectCorporationModuleSchema = z.infer<
  typeof SelectCorporationModuleSchema
>
