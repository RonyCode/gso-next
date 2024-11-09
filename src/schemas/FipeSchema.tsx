import { z } from 'zod'

export const FipeSchema = z.object({
  codigo: z.string().optional().nullable(),
  nome: z.string().optional().nullable(),
  id_brand: z.string().optional().nullable(),
  id_model: z.number().optional().nullable(),
  id_year: z.string().optional().nullable(),
  type: z.string().min(1, { message: 'id inválido' }),
  AnoModelo: z.string().optional().nullable(),
  CodigoFipe: z.string().optional().nullable(),
  Combustivel: z.string().optional().nullable(),
  Marca: z.string().optional().nullable(),
  MesReferencia: z.string().optional().nullable(),
  Modelo: z.string().optional().nullable(),
  modelos: z.array(z.object({})).optional().nullable(),
  SiglaCombustivel: z.string().optional().nullable(),
  TipoVeiculo: z.number().optional().nullable(),
  Valor: z.string().optional().nullable(),
})

export type IFipeSchema = z.infer<typeof FipeSchema>
