'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const deleteCookies = () => {
  cookies().set({
    name: 'next-auth.session-token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0
  });

  cookies().set({
    name: 'token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0
  });

  cookies().set({
    name: 'refresh_token',
    value: '',
    expires: new Date('2016-10-05'),
    path: '/',
    maxAge: 0
  });
  revalidatePath('/');
};
