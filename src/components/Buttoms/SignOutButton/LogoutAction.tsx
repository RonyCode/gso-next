'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteCookies = () => {
  cookies().set({
    name: 'next-auth.session-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: '__Secure-next-auth.session-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: 'next-auth.csrf-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: '__Host-next-auth.csrf-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: 'next-auth.callback-url',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: '__Secure-next-auth.callback-url',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: 'token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })

  cookies().set({
    name: 'refresh_token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0,
  })
  revalidatePath('/')
}
