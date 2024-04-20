'use server'

import { revalidatePath } from 'next/cache'
import { FileSchema } from '@/schemas/FileSchema'
import { cookies } from 'next/headers'

export async function UpdatePhotoAction(payload: FileSchema) {
  revalidatePath('/')
  const token = cookies().get('token')?.value
  return fetch(`${process.env.NEXT_PUBLIC_API_GSO}/services/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file: payload.file_image }),
  })
}
