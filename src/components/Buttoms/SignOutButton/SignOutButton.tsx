'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { type ReactElement } from 'react'
import { LuLogOut } from 'react-icons/lu'

import ButtonNoTheme from '@/components/Buttoms/ButtonNoTheme'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'

const SignOutButton = (): ReactElement => {
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
        <ButtonNoTheme onClick={handleClick}>
          <LuLogOut
            size={32}
            className=" transition duration-0 ease-in-out hover:scale-110 hover:text-slate-300 hover:duration-300"
          />
        </ButtonNoTheme>
      </div>
    </>
  )
}
export default SignOutButton
