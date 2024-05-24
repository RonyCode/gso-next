'use server'

import { type SignUpChema } from '@/schemas/SignUpChema'

export async function SubmitFormAction(data: SignUpChema): Promise<void> {
  console.log({ ...data })
}
