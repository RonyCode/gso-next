import moment from 'moment'

export const maskDateBr = (
  value: string | null | undefined,
): string | null | undefined => {
  if (value == null) return value

  value.replace(/(\d{8})(\d+?)/, '$1')

  return moment(value).format('DD/MM/YYYY')
}
