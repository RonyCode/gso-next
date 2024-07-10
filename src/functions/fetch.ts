import { isValidJSON } from '@/functions/isValidJson'
export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
): Promise<T> {
  const data = await fetch(input, init)
  return (await isValidJSON(data)) as T
}
