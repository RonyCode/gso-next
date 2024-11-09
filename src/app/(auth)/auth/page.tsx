import { type Metadata } from 'next'

import LoginFormSlice from '@/app/(auth)/auth/components/LoginFormSlice'

export const metadata: Metadata = {
  title: 'GSO | Login',
  description: 'Authentication forms built using the components.',
}

export default function Page(): JSX.Element {
  return (
    <div className="w-screen lg:container">
      <LoginFormSlice />
    </div>
  )
}
