import { CarSchema } from '@/schemas/CarsSchema'
import { MemberSchema } from '@/schemas/MemberSchema'
import { z } from 'zod'

export const ScheduleSchema = z.object({
  id: z.string().min(1, {
    message: 'id inválido deve conter no mínimo 1 caracteres',
  }),
  id_company: z.string().min(1, {
    message: 'id_company inválido deve conter no mínimo 1 caracteres',
  }),
  id_member_creator: z.string().min(1, {
    message: 'id_member_creator inválido deve conter no mínimo 1 caracteres',
  }),
  date: z.string().min(10, {
    message: 'date inválido deve conter no mínimo 10 caracteres',
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
  situation: z.number().min(1, {
    message: 'situação inválido deve conter no mínimo 1 caracteres',
  }),
  type: z.number().min(1, {
    message: 'type inválido deve conter no mínimo 1 caracteres',
  }),
  status: z.number().min(1, {
    message: 'status inválido deve conter no mínimo 1 caracteres',
  }),
  date_creation: z.string().min(6, {
    message: 'horário inválido deve conter no mínimo 1 caracteres',
  }),
  obs: z
    .string()
    .min(1, {
      message: 'obs inválido deve conter no mínimo 1 caracteres',
    })
    .max(400, {
      message: 'obs inválido deve conter no máximo 400 caracteres',
    }),
  cars: z
    .array(z.object({ car: CarSchema, members: z.array(MemberSchema) }))
    .optional(),
  excluded: z.number().min(1, {
    message: 'id inválido deve conter no mínimo 1 caracteres',
  }),
})

export type IScheduleSchema = z.infer<typeof ScheduleSchema>
