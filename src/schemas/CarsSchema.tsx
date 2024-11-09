import { MemberSchema } from '@/schemas/MemberSchema'
import { z } from 'zod'

const regexPlate = /[A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3}|[A-Z0-9]{7}/
const regexChassis = /[A-HJ-NPR-Z0-9]{17}/
export const CarSchema = z.object({
  id: z.string().optional().nullable(),
  id_company: z.string().optional().nullable(),
  id_corporation: z.string().optional().nullable(),
  type_vehicle: z.string().optional().nullable(),
  prefix: z.string().min(1, { message: 'id inválido' }),
  color: z.string().nullable().optional(),
  image: z.string().optional().nullable(),
  plate: z.string().toUpperCase().trim().regex(regexPlate, {
    message: 'Placa deve conter no mínimo 7 caracteres com letras e números ',
  }),
  chassi: z.string().toUpperCase().regex(regexChassis, {
    message: 'Placa deve conter no mínimo 17 caracteres com letras e números ',
  }),
  local: z.number().nullable().optional(),
  members: z.array(MemberSchema).optional(),
  excluded: z.number(),
  brand: z.string().nullable().optional(),
  model: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
  fuel_type: z.string().nullable().optional(),
  codigo: z.string().nullable().optional(),
  nome: z.string().optional().nullable(),
  id_brand: z.string().min(1, {
    message: 'Marca não pode estar vazio',
  }),
  id_model: z.string().min(1, {
    message: 'Modelo não pode estar vazio',
  }),
  id_year: z.string().min(1, {
    message: 'Ano do veiculo não pode estar vazio',
  }),
  type: z.string().min(1, {
    message: 'Categoria não pode estar vazio',
  }),
  status: z.number().optional().nullable(),
  condition: z.number().optional().nullable(),
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
  subscription: z.string().optional().nullable(),
})

export type ICarSchema = z.infer<typeof CarSchema>
