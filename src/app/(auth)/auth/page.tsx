import { Metadata } from 'next'

import LoginFormSlice from '@/app/(auth)/auth/components/LoginFormSlice'

export const metadata: Metadata = {
  title: 'GSO | Login',
  description: 'Authentication forms built using the components.',
}
export default async function Page() {
  return (
    <>
      <LoginFormSlice />
    </>
  )
}
