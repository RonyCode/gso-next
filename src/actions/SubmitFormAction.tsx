'use server'

import { type ISignUpChema } from '@/schemas/SignUpChema'

export async function SubmitFormAction(data: ISignUpChema): Promise<void> {
  console.log({ ...data })
}
