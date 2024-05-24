import Image from 'next/image'
import React from 'react'

import BreadcrumbGso from '@/components/BreadCrumbGso/BreadcrumbGso'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import getBase64 from '@/lib/getLocalBase64'
import { cn } from '@/lib/utils'
import { Separator } from '@/ui/separator'

type CardProps = {
  title: string
  description: string
  icon: React.ReactNode
  iconDescription?: React.ReactNode
  image?: string
  imageMobile?: string
  className?: Element
  children: React.ReactNode
} & React.ComponentProps<typeof Card>

export async function CardDefault({
  title,
  description,
  icon,
  iconDescription,
  image,
  imageMobile,
  className,
  children,
  ...props
}: CardProps): Promise<JSX.Element> {
  const [myBlurDataUrl, myBlurDataUrlMobile] = await Promise.all([
    getBase64(image),
    getBase64(imageMobile),
  ])

  return (
    <Card
      className={cn(
        '   m-0 mx-auto min-h-screen w-screen bg-background p-0 md:min-h-[calc(100vh-4rem)] md:w-[80vw] md:p-6',
        className,
      )}
      {...props}
    >
      <div className="grid h-32 w-full grid-cols-12 rounded-[8px] rounded-b-none border border-b-0 border-foreground/30 p-0 ">
        <div className=" text-md col-start-1  col-end-7 md:col-start-1  md:col-end-4  md:text-2xl ">
          <CardTitle>
            <div className="flex flex-col items-start p-3 md:p-6 ">
              <div className="mb-2  flex items-center gap-1">
                <i>{icon}</i>
                <span>{title}</span>
              </div>
              <CardDescription>
                <div className="flex  items-center gap-1  ">
                  <span>{iconDescription}</span>
                  {description}
                </div>
              </CardDescription>
            </div>
          </CardTitle>
        </div>
        <div className="relative hidden h-32 cursor-pointer p-0 transition-all duration-700 ease-in-out hover:h-72 md:col-start-4 md:col-end-13 md:block ">
          {image != null && (
            <Image
              src={image}
              fill
              sizes="100"
              priority={true}
              blurDataURL={myBlurDataUrl}
              placeholder="blur"
              alt="image"
              className="block  rounded-[8px]  object-cover object-center brightness-[80%]"
            />
          )}
        </div>

        <div className=" relative col-start-7 col-end-13 h-32 p-0 md:col-start-4 md:hidden ">
          {imageMobile != null && (
            <Image
              src={imageMobile}
              fill
              sizes="100"
              placeholder="blur"
              blurDataURL={myBlurDataUrlMobile}
              priority={true}
              alt="image"
              className=" block rounded-[8px] object-cover brightness-[80%]"
            />
          )}
        </div>
      </div>
      <BreadcrumbGso />
      <Separator />
      <CardContent className=" mt-4 grid h-auto  w-full rounded-[5px] p-0 md:min-h-[calc(100vh-18rem)] md:border md:border-foreground/30">
        {children}
      </CardContent>
    </Card>
  )
}
