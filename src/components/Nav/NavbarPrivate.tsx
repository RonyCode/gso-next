import React from 'react'

import Link from 'next/link'

import SignOutButton from '@/components/Buttoms/SignOutButton/SignOutButton'

import Logo from '../../../public/images/Logo'

export default async function NavbarPrivate() {
  return (
    <>
      <nav className="flex h-20 w-screen items-center justify-around bg-slate-600 text-white shadow-2xl">
        <Link className=" w-auto" href="/">
          <Logo width={160} />
        </Link>

        <div className="flex  flex-row justify-around ">
          <div className="mr-6"></div>
          <SignOutButton />
        </div>
      </nav>
    </>
  )
}
