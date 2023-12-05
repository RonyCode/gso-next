'use client'
import { SessionProvider } from 'next-auth/react'

interface ProviderProps {
  children: React.ReactNode
}
const AuthProvider = ({ children }: ProviderProps) => {
  return (
    <>
      {' '}
      <SessionProvider>{children}</SessionProvider>
    </>
  )
}
export default AuthProvider
