import * as React from 'react'

import Logo from '../../../public/images/Logo'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { cn } from '@/lib/utils'

type CardProps = React.ComponentProps<typeof Card> & {
  title?: string
  description?: string
}
export const CardWithLogo = ({
  className,
  title,
  description,
  children,
  ...props
}: CardProps) => {
  return (
    <>
      <Card
        className={cn(
          'flex h-auto w-full flex-col items-center space-y-8  px-4 py-8 text-white md:h-auto  md:w-7/12 md:px-8',
          className,
        )}
        {...props}
      >
        <CardHeader className="flex w-full flex-col items-center justify-around  space-y-4">
          <Logo width={120} />
          <CardTitle>
            <h1 className="text-center text-2xl font-bold">{title}</h1>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>{children}</div>
        </CardContent>
        <CardFooter>
          <div className="text-center text-xs text-gray-500">
            &copy;2024 RCode All rights reserved.
          </div>
        </CardFooter>
      </Card>

      {/* <div className=" flex min-h-screen items-center justify-center bg-slate-800  md:px-8 "> */}
      {/*  <div className="flex w-full flex-col items-center space-y-8 rounded bg-slate-700 px-4 py-8 text-white md:px-8  xl:w-7/12"> */}
      {/*    <div className="flex h-full min-w-full flex-col items-center gap-8  "> */}
      {/*      <Link href="/"> */}
      {/*        <Logo width={200} /> */}
      {/*      </Link> */}
      {/*    </div> */}
      {/*    {children} */}
      {/*    <div className="text-center text-xs text-gray-500"> */}
      {/*      &copy;2024 RCode All rights reserved. */}
      {/*    </div> */}
      {/*  </div> */}
      {/* </div> */}
    </>
  )
}
