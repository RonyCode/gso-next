import { isValidUrl } from '@/functions/IsValidUrl'

export async function ImageExist(
  url: string | undefined | null,
): Promise<Response> {
  if (url != null && isValidUrl(url)) {
    return await fetch(url, {
      method: 'HEAD',
    })
  } else {
    return new Response(null, { status: 404 })
  }
}
