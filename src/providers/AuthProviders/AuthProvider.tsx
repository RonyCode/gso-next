'use client'
import { SessionProvider } from 'next-auth/react'

interface ProviderProps {
  children: React.ReactNode
}
const AuthProvider = ({ children }: ProviderProps): JSX.Element => {
  return (
    <>
      {' '}
      <SessionProvider>{children}</SessionProvider>
    </>
  )
}
export default AuthProvider
