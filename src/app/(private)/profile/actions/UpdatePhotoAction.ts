'use server'

import { FileType } from '../../../../../types/index'
import { revalidatePath } from 'next/cache'

type UpdatePhotoActionProps = {
  file: ((false | File) & (false | File | undefined)) | null
}

export async function UpdatePhotoAction(file) {
  // if (file) {
  //   const test = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_GSO}/services/upload`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(file),
  //     },
  //   )
  //   console.log(test)
  // }
  console.log(file)
  revalidatePath('/')
  return file
}
