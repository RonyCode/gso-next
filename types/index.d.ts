// import { debounce } from 'lodash'
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import type { Account, Session, User, DefaultSession } from 'next-auth'
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import NextAuth from 'next-auth'
// export = debounce

declare module 'next-auth' {
  export interface Session {
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
    expires_at: number
  }

  export interface User {
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
    expires_at: number
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
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
    expires_at: number
  }
}

export type AddressProps = {
  id: string
  sigla: string
  nome: string
  state: string
  city: string
  shortName: string
}

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

export type ResultSignIn = {
  error: string
  ok: boolean
  status: number
  url?: string
}
