import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string().optional(),
  label: z.string().optional(),
  priority: z.string().optional(),
  day: z.number(),
  month: z.number(),
  year: z.number(),
  name: z.number(),
  description: z.string(),
  group: z.string(),
  company: z.string(),
  date: z.string(),
  start: z.string(),
  end: z.string(),
})

export type Task = z.infer<typeof taskSchema>
