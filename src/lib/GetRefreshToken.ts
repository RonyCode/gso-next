export const getRefreshToken = async (
  tokenPayload?: string | undefined | null,
  token?: string | undefined | null,
): Promise<Response> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/refresh-token/${tokenPayload}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
