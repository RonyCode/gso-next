import { CarSchema } from '@/schemas/CarsSchema'
import { MemberSchema } from '@/schemas/MemberSchema'
import { z } from 'zod'

export const ScheduleFormSave = z.object({
  id: z.string().nullable().optional(),
  id_company: z.string().min(1, {
    message: 'id_company inválido deve conter no mínimo 1 caracteres',
  }),
  id_cmt_sos: z.number().min(1, {
    message: 'id_company inválido deve conter no mínimo 1 caracteres',
  }),
  id_member_comunication: z.string().min(1, {
    message: 'id_company inválido deve conter no mínimo 1 caracteres',
  }),
  id_member_creator: z.string().min(1, {
    message: 'id_member_creator inválido deve conter no mínimo 1 caracteres',
  }),
  hour_start: z.string().min(6, {
    message: 'horário inválido deve conter no mínimo 1 caracteres',
  }),
  hour_finish: z.string().min(6, {
    message: 'horário inválido deve conter no mínimo 1 caracteres',
  }),
  team: z.number().min(1, {
    message: 'equipe inválido deve conter no mínimo 1 caracteres',
  }),
  situation: z.number().nullable(),
  type: z.number().min(1, {
    message: 'type inválido deve conter no mínimo 1 caracteres',
  }),
  status: z.number().nullable(),
  date_creation: z.string(),
  date_start: z.string().optional(),
  date_finish: z.string().optional(),
  obs: z
    .string()
    .min(1, {
      message: 'obs inválido deve conter no mínimo 1 caracteres',
    })
    .max(400, {
      message: 'obs inválido deve conter no máximo 400 caracteres',
    }),
  short_name_corp: z.string().optional(),
  short_name_comp: z.string().optional(),
  vehicles: z
    .array(
      z.object({
        vehicles: CarSchema,
        members: z.array(MemberSchema).optional(),
      }),
    )
    .optional(),
  excluded: z.number().optional(),
})

export type IScheduleFormSave = z.infer<typeof ScheduleFormSave>
