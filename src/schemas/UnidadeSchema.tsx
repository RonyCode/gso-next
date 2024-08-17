import { AddressSchema } from '@/schemas/AddressSchema'
import { CarSchema } from '@/schemas/CarsSchema'
import { MemberSchema } from '@/schemas/MemberSchema'
import { ScheduleSchema } from '@/schemas/ScheduleSchema'
import { z } from 'zod'

export const UnidadeSchema = z.object({
  id: z.string().min(1, { message: 'id inválido' }).optional().nullable(),
  id_corporation: z
    .string()
    .min(1, { message: 'id inválido' })
    .optional()
    .nullable(),
  short_name_corp: z.string().optional(),
  short_name_comp: z.string().optional(),
  name: z
    .string()
    .min(1, { message: 'Nome inválido deve conter no mínimo 1 caracteres' })
    .optional(),
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }).optional(),
  phone: z.string().min(3, { message: 'Telefone inválido' }).optional(),
  image: z.string().optional().nullable(),
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
    .min(1, { message: 'Sigla inválida deve conter no mínimo 1 caracteres' })
    .optional(),
  date_creation: z.string().min(10, { message: 'Data inválida' }).optional(),
  type: z
    .number()
    .min(1, { message: 'Tipo inválido deve conter no mínimo 1 caracteres' })
    .optional()
    .nullable(),
  companySchedules: z
    .array(
      z
        .object({
          schedule: ScheduleSchema,
          cars: z
            .array(
              z.object({
                car: CarSchema,
                members: z.array(MemberSchema),
              }),
            )
            .optional(),
        })
        .optional(),
    )
    .optional(),
  companyAddress: AddressSchema.optional(),
  companyMembers: z.array(MemberSchema).optional(),
  companyCars: z.array(CarSchema).optional(),
  manager: z.string().optional().nullable(),
  director: z.string().optional().nullable(),
  director_company: z.string().optional().nullable(),
  excluded: z.number().optional().nullable(),
})

export type IUnidadeSchema = z.infer<typeof UnidadeSchema>
