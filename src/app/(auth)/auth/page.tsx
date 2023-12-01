import { Metadata } from 'next'

import LoginFormSlice from '@/app/(auth)/login/components/LoginFormSlice'
import { FormShadcn } from '@/app/(auth)/login/components/FormShadcn'

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
