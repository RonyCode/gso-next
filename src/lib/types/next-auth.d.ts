// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Account, Session, User, DefaultSession } from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
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
