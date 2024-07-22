import { CarSchema } from '@/schemas/CarsSchema'
import { MemberSchema } from '@/schemas/MemberSchema'
import { ScheduleSchema } from '@/schemas/ScheduleSchema'
import { z } from 'zod'

export const ScheduleSchemas = z.object({
  schedule: z.array(z.object({ ScheduleSchema }).optional()).optional(),
  cars: z
    .array(
      z.object({ car: CarSchema, members: z.array(MemberSchema).optional() }),
    )
    .optional(),
  excluded: z.number().optional(),
})

export type IScheduleSchemas = z.infer<typeof ScheduleSchemas>
