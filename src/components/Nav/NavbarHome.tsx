import React from 'react'
import { FaUser } from 'react-icons/fa6'

import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

import SignOutButton from '@/components/Buttoms/SignOutButton/SignOutButton'
import { authOptions } from '@/lib/auth'

import Logo from '../../../public/images/Logo'

export default async function NavbarHome() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <nav className="top-0 flex h-20 w-screen items-center justify-between bg-slate-600 text-white shadow-2xl ">
        <div className="flex w-1/2 items-center  justify-around">
          <Link href="/">
            <span className="w-150 ">
              <Logo width={160} />
            </span>
          </Link>
        </div>
        <div className="flex w-1/2 items-center justify-around ">
          <ul className="flex w-[50%] justify-evenly ">
            <Link className="hover:text-white/90" href="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-white/90" href="/contact">
              Contato
            </Link>
            <Link className="hover:text-white/90" href="/about">
              Sobre
            </Link>
          </ul>
          <div className="flex items-center">
            {session?.email ? (
              <div className=" flex items-center  ">
                <Link
                  href="/profile"
                  className=" mx-4 flex items-center  justify-center p-3  transition  duration-300 ease-in-out  hover:scale-110 hover:text-slate-300"
                >
                  {session?.image ? (
                    <Image
                      className="rounded-full "
                      src={session?.image || '/images/avatar.svg'}
                      width={48}
                      height={48}
                      object-fit={'contain'}
                      alt="img profile"
                    />
                  ) : (
                    <FaUser size={28} />
                  )}
                </Link>
                <SignOutButton />
              </div>
            ) : (
              <div className="gap-2 space-x-6">
                <Link href="/precadastro-usuario">Cadastrar</Link>
                <Link href="/auth">Login</Link>
              </div>
            )}{' '}
          </div>
        </div>
      </nav>
    </>
  )
}
