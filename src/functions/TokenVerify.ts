import { decodeJwt, JWTPayload } from 'jose'

interface ResponseType {
  message: string
  status: string
  code: number
}
export const TokenVerify = async ($token: string) => {
  try {
    const payload: ResponseType | JWTPayload = decodeJwt($token)
    const dateExpires = payload!.exp!
    if (
      new Date(dateExpires * 1000).toLocaleString() <
      new Date().toLocaleString('pt-BR')
    ) {
      return {
        message: 'Token inválido ou expirado',
        status: 'failure',
        code: 400,
      }
    }

    return decodeJwt($token)
  } catch (error) {
    return {
      message: 'invalid token',
      status: 'failure',
      code: 400,
    }
  }
}
