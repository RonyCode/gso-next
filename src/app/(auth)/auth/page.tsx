import { Metadata } from 'next'

import LoginFormSlice from '@/app/(auth)/auth/components/LoginFormSlice'

export const metadata: Metadata = {
  title: 'GSO | Login',
  description: 'Authentication forms built using the components.',
}

export const runtime = 'edge'
export default function Page() {
  return (
    <div className="w-screen lg:container">
      {process.env.NODE_ENV} {''}
      <br />
      {process.env.NEXT_PUBLIC_API_GSO}
      <br />
      {process.env.NEXT_PUBLIC_NEXT_URL}
      <LoginFormSlice />
    </div>
  )
}
