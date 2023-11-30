'use server'

import { SignUpChema } from '@/schemas/SignUpChema'

export async function SubmitFormAction(data: SignUpChema) {
  console.log({ ...data })
}
