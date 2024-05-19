import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),

  idCorporation: z.string(),
  idCompany: z.string(),
  name: z.string(),
  cnpj: z.string(),
  image: z.string(),
  address: z.string(),
  dateCreation: z.string(),
  phone: z.string(),
  type: z.number(),
  director: z.number(),
  manager: z.number(),
  managerCompany: z.number(),
  directorCompany: z.number(),
})

export type Task = z.infer<typeof taskSchema>
