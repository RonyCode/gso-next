import * as React from 'react'

import Link from 'next/link'

import Logo from '../../../public/images/Logo'

export const CardWithLogo = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" flex min-h-screen items-center justify-center bg-slate-800  md:px-8 ">
        <div className="flex w-full flex-col items-center space-y-8 rounded bg-slate-700 px-4 py-8 text-white md:px-8  xl:w-7/12">
          <div className="flex h-full min-w-full flex-col items-center gap-8  ">
            <Link href="/">
              <Logo width={200} />
            </Link>
          </div>
          {children}
          <div className="text-center text-xs text-gray-500">
            &copy;2024 RCode All rights reserved.
          </div>
        </div>
      </div>
    </>
  )
}
