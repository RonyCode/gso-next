import { isValidUrl } from '@/functions/IsValidUrl'

export async function ImageExist(url: string | undefined): Promise<Response> {
  if (isValidUrl(url)) {
    return await fetch(url, {
      method: 'HEAD',
    })
  } else {
    return new Response(null, { status: 404 })
  }
}
