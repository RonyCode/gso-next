import { z } from 'zod'

export const OrganizacaoSchema = z.object({
  id: z.number().min(1, { message: 'id inválido' }).optional().nullable(),
  name: z
    .string()
    .min(1, { message: 'Nome inválido deve conter no mínimo 1 caracteres' })
    .optional(),
  cnpj: z.string().min(18, { message: 'CNPJ inválido' }).optional(),
  phone: z.string().min(11, { message: 'Telefone inválido' }).optional(),
  short_name_corp: z
    .string()
    .min(1, { message: 'Sigla  inválido deve conter no mínimo 1 caracteres' })
    .optional(),
  image: z.string().optional(),
  address: z
    .string()
    .min(1, { message: 'Endereço inválido deve conter no mínimo 1 caracteres' })
    .optional(),
  number: z
    .string()
    .min(1, { message: 'Número inválido deve conter no mínimo 1 caracteres' })
    .optional(),
  zipcode: z
    .string()
    .min(9, { message: 'CEP inválido deve conter no mínimo 9 caracteres' })
    .optional(),
  complement: z.string().optional(),
  district: z
    .string()
    .min(1, { message: 'Bairro inválido deve conter no mínimo 1 caracteres' })
    .optional(),
  city: z
    .string()
    .min(1, { message: 'Cidade inválida deve conter no mínimo 1 caracteres' })
    .optional(),
  short_name: z
    .string()
    .min(1, { message: 'Estado inválida deve conter no mínimo 1 caracteres' })
    .optional(),
  excluded: z.number().optional().nullable(),
})

export type IOrganizacaoSchema = z.infer<typeof OrganizacaoSchema>
