import { z } from 'zod'

export const AddressSchema = z.object({
  address: z.string().min(2, {
    message: 'endereço inválido deve conter no mínimo 3 caracteres',
  }),
  number: z.string().min(2, {
    message: 'endereço inválido deve conter no mínimo 3 caracteres',
  }),
  zipcode: z.string().min(9, {
    message: 'cep inválido deve conter no mínimo 9 caracteres',
  }),
  complement: z.string().min(2, {
    message: 'complemento  inválido deve conter no mínimo 3 caracteres',
  }),
  district: z.string().min(2, {
    message: 'bairro inválido deve conter no mínimo 3 caracteres',
  }),
  city: z.string().min(2, {
    message: 'cidade inválido deve conter no mínimo 3 caracteres',
  }),
  state: z.string().min(2, {
    message: 'estado inválido deve conter no mínimo 3 caracteres',
  }),
  short_name: z.string().min(2, {
    message: 'sigla estado inválido deve conter no mínimo 3 caracteres',
  }),
  shortNameCorp: z.string().min(2, {
    message: 'sigla estado inválido deve conter no mínimo 3 caracteres',
  }),
})

export type IAddressSchema = z.infer<typeof AddressSchema>
