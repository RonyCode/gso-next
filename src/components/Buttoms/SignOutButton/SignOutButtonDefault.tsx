'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { type ReactElement } from 'react'

import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { Button } from '@/ui/button'

const SignOutButtonDefault = (): ReactElement => {
  const router = useRouter()
  const handleClick = async (): Promise<void> => {
    await deleteCookies()
    await signOut({
      redirect: false,
    })
    router.push('/')
  }

  return (
    <>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={handleClick}>Ok</Button>
      </div>
    </>
  )
}
export default SignOutButtonDefault
