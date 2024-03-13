'use server'

import { UserNotification } from '../../types/index'

export async function getUserNotification(data: UserNotification) {
  console.log({ ...data })
}
