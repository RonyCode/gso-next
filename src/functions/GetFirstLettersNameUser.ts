'use client'
import { useSession } from 'next-auth/react'

export const GetFirstLettersNameUser = (
  name: string | null = null,
): string | undefined => {
  const { data: session } = useSession()
  const nameNavbarSession = session?.name?.split(' ')
  if (name == null) {
    if (nameNavbarSession != null && nameNavbarSession?.length > 1) {
      return (
        session?.name?.split(' ')?.shift()?.substring(0, 1)?.toUpperCase() +
        ' ' +
        session?.name?.split(' ')?.pop()?.substring(0, 1)?.toUpperCase()
      )
    }
    if (nameNavbarSession != null && nameNavbarSession?.length === 1) {
      return session?.name?.split(' ')?.shift()?.substring(0, 1)?.toUpperCase()
    }
  }
  if (name != null) {
    if (name !== '' && name?.length > 1) {
      return (
        name.split(' ')?.shift()?.substring(0, 1)?.toUpperCase() +
        ' ' +
        name.split(' ')?.pop()?.substring(0, 1)?.toUpperCase()
      )
    }
    if (nameNavbarSession != null && nameNavbarSession?.length === 1) {
      return name.split(' ')?.shift()?.substring(0, 1)?.toUpperCase()
    }
  }
}
