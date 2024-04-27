// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Session, User, DefaultSession } from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
import React from 'react'
import { DialogContent } from '@/ui/dialog'

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

export type EventProps = {
  id: number
  day: number
  month: number
  year: number
  unity: string
  title: string
  description: string
  group: string
  type: string
  status: string
  company: string
  date: string
  start: string
  end: string
}

export type EscalaProps = {
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
  zipCode: string
  complement: string
  district: string
  city: string
  state: string
  shortName: string
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

export type ResultSignIn = {
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

export type ResultError = {
  error: string
  ok: boolean
  status: number
  data: null
}

export type DataUserRegistered = {
  id: number
  email: string
  nome: string
  token: string
  refresh_token: string
  date_criation_token: number
  date_expires_token: number
}

export type ResponseUserSigned = {
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

export type ResultUserRegistered = {
  data: DataUserRegistered | null
  code: number
  status: string
  message: string
}

declare module 'next-auth' {
  interface Session {
    id?: string | null
    id_message?: string | null
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
