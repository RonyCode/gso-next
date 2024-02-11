'use client'
import React from 'react'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { Button } from '@/ui/button'

const SignOutButtonDefault = () => {
  const router = useRouter()
  const handleClick = async () => {
    deleteCookies()
    await signOut({
      redirect: false,
    })
    router.push('/')
  }

  return (
    <>
      <div>
        <Button onClick={handleClick}>Ok</Button>
      </div>
    </>
  )
}
export default SignOutButtonDefault
