import React, { type ReactElement } from 'react'

import { cn } from '@/lib/utils'

interface maxWidthWrapperTypes {
  children: React.ReactNode
  className?: string
}

const MaxWidthWrapper = ({
  className,
  children,
}: maxWidthWrapperTypes): ReactElement => {
  return (
    <div>
      <div className={cn('m-auto h-auto w-screen  md:w-[80vw] ', className)}>
        {children}
      </div>
    </div>
  )
}
export default MaxWidthWrapper
