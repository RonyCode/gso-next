'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

import { type IFileSchema } from '@/schemas/FileSchema'

export async function UpdatePhotoAction(
  payload: IFileSchema,
): Promise<Response> {
  revalidatePath('/')
  const token = cookies().get('token')?.value
  return await fetch(`${process.env.NEXT_PUBLIC_API_GSO}/services/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file: payload.file_image }),
  })
}
