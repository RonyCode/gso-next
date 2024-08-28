import { z } from 'zod'

export const AddressSchema = z.object({
  address: z.string().min(2, {
    message: 'endereço inválido deve conter no mínimo 3 caracteres',
  }),
  number: z.string().min(2, {
    message: 'endereço inválido deve conter no mínimo 3 caracteres',
  }),
  zipcode: z.string().min(8, {
    message: 'cep inválido deve conter no mínimo 8 caracteres',
  }),
  complement: z.string().optional(),
  district: z.string().min(2, {
    message: 'bairro inválido deve conter no mínimo 3 caracteres',
  }),
  city: z.string().min(2, {
    message: 'cidade inválido deve conter no mínimo 3 caracteres',
  }),
  short_name: z.string().min(2, {
    message: 'sigla estado inválido deve conter no mínimo 3 caracteres',
  }),
  sigla: z.string().optional(),
  shortNameCorp: z
    .string()
    .min(2, {
      message: 'sigla estado inválido deve conter no mínimo 3 caracteres',
    })
    .optional(),
})

export type IAddressSchema = z.infer<typeof AddressSchema>
