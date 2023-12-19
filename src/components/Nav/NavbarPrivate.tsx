import React from 'react'

import Link from 'next/link'

import SignOutButton from '@/components/Buttoms/SignOutButton/SignOutButton'

import Logo from '../../../public/images/Logo'

export default async function NavbarPrivate() {
  // const session = await getServerSession(authOptions)

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="max-w-screen container mx-auto items-center  p-0 md:flex">
          <Link className=" w-auto" href="/">
            <Logo width={120} />
          </Link>

          <div className="flex  flex-row justify-around ">
            <div className="mr-6"></div>
            <SignOutButton />
          </div>
        </nav>
      </header>
    </>
  )
}
