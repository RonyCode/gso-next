import { z } from 'zod'

export const OrganizacaoSchema = z.object({
  id: z.number().min(1, { message: 'id inválido' }),
  name: z
    .string()
    .min(1, { message: 'Nome inválido deve conter no mínimo 1 caracteres' }),
  cnpj: z.string().min(18, { message: 'CNPJ inválido' }),
  phone: z.string().min(11, { message: 'Telefone inválido' }),
  short_name_corp: z
    .string()
    .min(1, { message: 'Sigla  inválido deve conter no mínimo 1 caracteres' }),
  image: z.string(),
  address: z.string().min(1, {
    message: 'Endereço inválido deve conter no mínimo 1 caracteres',
  }),
  number: z
    .string()
    .min(1, { message: 'Número inválido deve conter no mínimo 1 caracteres' }),
  zipcode: z
    .string()
    .min(9, { message: 'CEP inválido deve conter no mínimo 9 caracteres' }),
  complement: z.string().optional(),
  district: z
    .string()
    .min(1, { message: 'Bairro inválido deve conter no mínimo 1 caracteres' }),
  city: z
    .string()
    .min(1, { message: 'Cidade inválida deve conter no mínimo 1 caracteres' }),
  short_name: z
    .string()
    .min(1, { message: 'Estado inválida deve conter no mínimo 1 caracteres' }),
  excluded: z.number(),
})

export type IOrganizacaoSchema = z.infer<typeof OrganizacaoSchema>
