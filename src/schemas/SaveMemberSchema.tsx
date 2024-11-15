import { z } from 'zod'

export const SaveMemberSchema = z.object({
  id_corporation: z.string().nullable().optional(),
  id_company: z.string().nullable().optional(),
  id_user: z.string().nullable().optional(),
  id_member: z.string().nullable().optional(),
  termo_busca: z.string().nullable().optional(),
})

export type ISaveMemberSchema = z.infer<typeof SaveMemberSchema>
