// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Session, User, DefaultSession } from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
import type React from 'react'

import { type DialogContent } from '@/ui/dialog'

export interface UserAuth {
  email: string
  password: string
  isUserExternal: number
  dateCriation: string
}

export type ModalProps = {
  title?: string
  description?: string
  icon?: React.ReactNode
  iconButton?: React.ReactNode
  nameButton?: string
  open?: boolean
  children?: React.ReactNode
  childrenButton?: React.ReactNode
} & React.ComponentProps<typeof DialogContent> &
  React.HTMLAttributes<HTMLDivElement>

export interface FileType {
  file: ((false | File) & (false | File | undefined)) | null
  lastModified: string
  lastModifiedDate: object
  name: string
  size: string
  type: string
  webkitRelativePath: string
}

export interface Account {
  image: string
  name: string
  cpf: string
  phone: string
  birthday: string
  file: FileType | null
}
export interface Schedule {
  id: number
  id_company: number
  id_member_creator: number
  date: string
  hour_start: string
  hour_finish: string
  team: number
  situation: number
  type: number
  status: number
  date_creation: string
  obs: string
  excluded: number
}
export interface Member {
  id: number
  id_company: number
  id_car: number
  id_schedule: number
  id_function: number
  name: string
  competence: string
  status: number
  entry_date: string
  excluded: number
  email: string
  function: string
  imageMember: string
}

export interface Car {
  id: number
  id_company: number
  prefix: number
  model: number
  color: number
  image: number
  plate: number
  local: number
  type: number
  condition_car: number
  status: number
  excluded: number
}
export interface CarsUnity {
  nameCar: string
  members: Member[]
  imageCar: string
}

export interface EventProps {
  id: number
  day: number
  month: number
  year: number
  unity: string
  title: string
  description: string
  group: string
  cars: CarsUnity[] | null
  imgUnity: string
  type: string
  status: string
  company: string
  date: string
  start: string
  end: string
}

export interface EscalaProps {
  dayEvent: EventProps[]
  dayName: string
  year: number
  month: number
  dayWeek: number
  dayShortName: string
  day: number
}

export interface Address {
  address: string
  number: string
  zipcode: string
  complement: string
  district: string
  city: string
  state: string
  short_name: string
}

export interface Profile {
  role: string
  dateGranted: string
  dateExpires: string
  grantedByIdUser: number
}

export interface TokenUser {
  token: string
  refreshToken: string
  dateCriation: number
  dateExpires: number
}

export interface Corporation {
  id: number
  name: string
  short_name_corp: string
  cnpj: string
  phone: string
  director: number
  manager: number
  image: string
  address: string
  number: null
  zipcode: string
  complement: string
  district: string
  city: string
  state: string
}
export interface Unidades {
  companies: Unidade[]
}
export interface Unidade {
  id: number
  id_corporation: number
  id_company: number
  name: string
  cnpj: string
  image: string
  date_creation: string
  phone: string
  type: number
  director: Member
  manager: Member
  manager_company: Unidade
  director_company: Unidade
  companyAddress: Address
  companyMembers: Member[]
  companyCars: Car[]
  companySchedules: Schedule[]
  companyMaterials: []
  excluded: number
}

export interface UserType {
  userAuth: UserAuth | null
  account: Account | null
  address: Address | null
  profile: Profile | null
  tokenUser: TokenUser | null
  nome: string
  email: string
  cpf: string
  data_nascimento: string
  telefone: string
  cep: string
  endereco: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  senha: string
  confirmaSenha: string
  id: number
  excluded: number
}

export interface NotificationMessage {
  title: string
  id_message: string
  email: boolean
  message: string
  url: string
}

export interface UserNotification {
  messages: NotificationMessage[]
  id: string
  title: string
  type: string
  qtd: number
  status: string
  code: number
}

export interface CepProps {
  city: string
  cityId: string
  complement: string
  district: string
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: number
  gia: string
  ddd: number
  siafi: number
  districtId: string
  ibgeId: string
  state: string
  stateShortname: string
  street: string
  zipcode: string
  code: number
  error: boolean
  message: string
  unknown: string
}

export interface AddressProps {
  id: string
  sigla: string
  nome: string
  state: string
  city: string
  name: string
  shortName: string
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: number
  gia: string
  ddd: number
  siafi: number
}

export interface ResultSignIn {
  error: string
  ok: boolean
  status: number
  url?: string
  id: number
  id_message: string
  email: string
  image: string
  name: string
  token: string
  refresh_token: string
  date_creation_token: number
  date_expires_token: number
}

export interface ResponseApi<T> {
  data: T
  status: string
  code: number
  message: string
}

export interface DataUserRegistered {
  id: number
  email: string
  nome: string
  token: string
  refresh_token: string
  date_criation_token: number
  date_expires_token: number
}

export interface ResponseUserSigned {
  data: boolean
  id: number
  id_account: number
  id_address: number
  id_profile: number
  id_user_auth: number
  error: string
  ok: boolean
  status: string
  code: number
  message: string
  url?: string
}

export interface ResponseFetchFailed {
  data: boolean
  status: string
  code: number
  message: string
}

export interface ResultUserRegistered {
  data: DataUserRegistered | null
  code: number
  status: string
  message: string
}

declare module 'next-auth' {
  interface Session {
    id?: string | null
    id_message?: string | null
    id_corporation: string
    id_company: string
    nome?: string | null
    name?: string | null
    email?: string | null
    image?: string | null
    picture?: string | null
    senha?: string | null
    token?: string | null
    access_token?: string | null
    refresh_token?: string | null
    date_expires_token?: number | null
    date_creation_token: number
    expires_at?: number | null
  }

  interface User {
    id: string
    id_message: string
    id_corporation: string
    id_company: string
    nome: string
    name: string
    email: string
    image: string
    picture: string
    senha: string
    token: string
    access_token: string
    refresh_token: string
    date_expires_token: number
    date_creation_token: number
    expires_at: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    id_message: string
    id_corporation: string
    id_company: string
    nome: string
    name: string
    email: string
    image: string
    picture: string
    senha: string
    token: string
    access_token: string
    refresh_token: string
    date_expires_token: number
    date_creation_token: number
    expires_at: number
  }
}
