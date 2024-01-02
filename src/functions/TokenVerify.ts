import { decodeJwt, JWTPayload } from 'jose'

interface ResponseType {
  message: string
  status: string
  code: number
  email?: string
}

type ResponseProps = JWTPayload & ResponseType
export const TokenVerify = async ($token: string) => {
  try {
    const payload = decodeJwt($token) as ResponseProps
    const dateExpires = payload.exp!

    const dateNowConverted = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Araguaina',
    })

    const dateExpiresCpnverted = new Date(dateExpires * 1000).toLocaleString(
      'pt-BR',
      {
        timeZone: 'America/Araguaina',
      },
    )

    if (dateExpiresCpnverted > dateNowConverted) {
      return {
        message: 'Token inválido ou expirado',
        status: 'failure',
        code: 400,
      } as ResponseProps
    }
    return payload.data as ResponseProps
  } catch (error) {
    return {
      message: 'invalid token',
      status: 'failure',
      code: 400,
    }
  }
}
