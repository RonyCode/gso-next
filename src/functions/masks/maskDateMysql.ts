import moment from 'moment/moment'

export const maskDateMysql = (
  value: string | null | undefined,
): string | null | undefined => {
  if (value == null) return value

  return moment(new Date(value)).format('YYYY-DD-MM')
}
