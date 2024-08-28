import { z } from 'zod'

export const SaveMemberSchema = z.object({
  id_corporation: z.string().nullable().optional(),
  id_user: z.string().nullable().optional(),
  id_company: z.string().nullable().optional(),
  excluded: z.number(),
})

export type ISaveMemberSchema = z.infer<typeof SaveMemberSchema>
