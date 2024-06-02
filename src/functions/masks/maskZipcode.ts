export const maskZipcode = (
  value: string | null | undefined,
): string | null | undefined => {
  if (value == null) return value
  value.replace(/\D/g, '')
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1')
}
