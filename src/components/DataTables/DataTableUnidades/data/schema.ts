import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),

  idCorporation: z.string().optional(),
  id_corporation: z.number().optional(),
  id_company: z.number().optional(),
  idCompany: z.string().optional(),
  // name: z.string().optional(),
  // cnpj: z.string().optional(),
  // image: z.string().optional(),
  // address: z.string().optional(),
  // dateCreation: z.string().optional(),
  // date_creation: z.string().optional(),
  // phone: z.string().optional(),
  // type: z.number().optional(),
  // director: z.number().optional(),
  // manager: z.number().optional(),
  // managerCompany: z.number().optional(),
  // manager_company: z.number().optional(),
  // director_ompany: z.number().optional(),
  // directorCompany: z.number().optional(),
})

export type Task = z.infer<typeof taskSchema>
