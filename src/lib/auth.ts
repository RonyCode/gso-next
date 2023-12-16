import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

function getGoogleCredentials() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!googleClientId || !googleClientSecret) {
    throw new Error('Missing Google credentials')
  }

  return {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  }
}

export const confereLogado = async (payload: {
  email: string
  senha: string
  is_user_external: number
}) => {
  const res = await fetch(`${process.env.API_NEXT}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.ok) {
    return await res.json()
  } else {
    return null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),

    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'exemplo@email.com',
        },
        senha: { label: 'Senha', type: 'password' },
        is_user_external: { label: 'User Externo', type: 'text' },
      },

      async authorize(credentials) {
        const payload = {
          email: credentials!.email,
          senha: credentials!.senha,
          is_user_external: 0,
        }

        if (!payload.email || !payload.senha) {
          throw new Error('Email ou senha inválido! 🤯')
        }

        const user = await confereLogado(payload)

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: '/images/logo.png',
  },

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth',
  },

  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    jwt: async function ({ token, user, account, trigger, session }) {
      if (account && user) {
        if (account.provider === 'google') {
          const payload = {
            email: token.email!,
            senha: String(token.sub) + 'a',
            is_user_external: 1,
          }

          const userGoogle = await confereLogado(payload)

          if (userGoogle == null) return token
          // Save the access token and refresh token in the JWT on the initial login
          cookies().set({
            name: 'token',
            value: userGoogle?.token,
            httpOnly: true,
            maxAge: 1000,
            path: '/',
          })

          cookies().set({
            name: 'refresh_token',
            value: userGoogle?.refresh_token,
            httpOnly: true,
            maxAge: 900,
            path: '/',
          })
          // =====================================================================
          return {
            ...token,
            cod_usuario: userGoogle?.cod_usuario,
            email: userGoogle?.email,
            senha: userGoogle?.senha,
            token: userGoogle?.token,
            access_token: userGoogle?.token,
            refresh_token: userGoogle?.refresh_token,
            data_expirar_token: userGoogle?.data_expirar_token,
            expires_at: userGoogle?.data_expirar_token,
          }
        } else {
          // Save the access token and refresh token in the JWT on the initial login
          cookies().set({
            name: 'token',
            value: user?.token,
            httpOnly: true,
            maxAge: 1000,
            path: '/',
          })

          cookies().set({
            name: 'refresh_token',
            value: user?.refresh_token,
            httpOnly: true,
            maxAge: 900,
            path: '/',
          })
          //= ====================================================================
          return {
            ...token,
            cod_usuario: user?.cod_usuario,
            email: user?.email,
            senha: user?.senha,
            token: user?.token,
            access_token: user?.token,
            refresh_token: user?.refresh_token,
            data_expirar_token: user?.data_expirar_token,
            expires_at: user?.data_expirar_token,
          }
        }
      }

      if (trigger === 'update') {
        return token
      }
      return token
    },

    async session({ session, token }) {
      session.cod_usuario = token?.cod_usuario
      session.email = token?.email
      session.senha = token?.senha
      session.token = token?.token
      session.access_token = token?.access_token
      session.refresh_token = token?.refresh_token
      session.data_expirar_token = token?.data_expirar_token
      session.expires_at = token?.expires_at
      return session
    },
  },
}
