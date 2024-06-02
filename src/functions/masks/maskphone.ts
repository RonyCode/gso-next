export const maskPhone = (
  value: string | null | undefined,
): string | null | undefined => {
  if (value == null) return value

  value.replace(/\D/g, '') // remove caracteres não numéricos

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}
