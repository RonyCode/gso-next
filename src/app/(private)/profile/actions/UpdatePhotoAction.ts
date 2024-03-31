'use server'

import { FileType } from '../../../../../types/index'
import { revalidatePath } from 'next/cache'
import { SignInSchema } from '@/app/(auth)/auth/schemas/SignInSchema'
import { ZodError } from 'zod'
import { FileSchema } from '@/schemas/FileSchema'
import { fetchWrapper } from '@/functions/fetch'
import { cookies } from 'next/headers'

export async function UpdatePhotoAction(payload: FileSchema) {
  revalidatePath('/')
  const token = cookies().get('token')?.value
  console.log(payload.file)
  return fetch(`${process.env.NEXT_PUBLIC_API_GSO}/services/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ file: payload.file }),
  })
}
