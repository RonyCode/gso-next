import { Metadata } from 'next'

import LoginFormSlice from '@/app/(auth)/auth/components/LoginFormSlice'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

export default function Page() {
  return (
    <>
      <LoginFormSlice />
    </>
  )
}
