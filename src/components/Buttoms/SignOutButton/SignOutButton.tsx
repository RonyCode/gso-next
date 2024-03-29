'use client'
import React from 'react'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import ButtonNoTheme from '@/ui/ButtonNoTheme'
import { LogOut } from 'lucide-react'

const SignOutButton = () => {
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
        <ButtonNoTheme onClick={handleClick}>
          <LogOut
            size={32}
            className=" transition duration-0 ease-in-out hover:scale-110 hover:text-slate-300 hover:duration-300"
          />
        </ButtonNoTheme>
      </div>
    </>
  )
}
export default SignOutButton
