import React, { type ReactElement } from 'react'

import IconLoading from '../../../public/images/IconLoading'
import Logo from '../../../public/images/Logo'

const LoadingPage = ({ pending }: { pending: boolean }): ReactElement => {
  return (
    <>
      {pending ? (
        <div className="min-w-screen fixed bottom-0 left-0 right-0 top-0 z-100   m-auto   h-screen  min-h-screen w-screen backdrop-blur-sm">
          <div className=" flex h-full w-full flex-col items-center justify-center text-center">
            <span className="absolute  flex flex-col items-center gap-2 opacity-80">
              <Logo width={150} />
              <IconLoading />
              Carregando...
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default LoadingPage
