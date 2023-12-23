// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Account, Session, User, DefaultSession } from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

export interface UserType {
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
}

export interface UserRegisterError {
  errors: UserType | null
  success: boolean
}

export interface CepProps {
  city: string
  cityId: string
  complement: string
  district: string
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
  result: object
  shortName: string
}

export type ResultSignIn = {
  error: string
  ok: boolean
  status: number
  url?: string
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

declare module 'next-auth' {
  interface Session {
    cod_usuario?: string | null
    nome?: string | null
    email?: string | null
    image?: string | null
    picture?: string | null
    senha?: string | null
    token?: string | null
    access_token?: string | null
    refresh_token?: string | null
    data_expirar_token?: number | null
    expires_at?: number | null
  }

  interface User {
    cod_usuario: string
    nome: string
    email: string
    image: string
    picture: string
    senha: string
    token: string
    access_token: string
    refresh_token: string
    data_expirar_token: number
    expires_at: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    cod_usuario: string
    nome: string
    email: string
    image: string
    picture: string
    senha: string
    token: string
    access_token: string
    refresh_token: string
    data_expirar_token: number
    expires_at: number
  }
}
