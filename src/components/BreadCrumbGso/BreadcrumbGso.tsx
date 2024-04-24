'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { LiaChevronRightSolid } from 'react-icons/lia'
import { LuHome } from 'react-icons/lu'

const BreadcrumbGso = () => {
  const pathname = usePathname()
  const arrayPathname = pathname?.split('/')
  arrayPathname?.shift()
  const arrayLink: string[] = []

  return (
    <Breadcrumb>
      <BreadcrumbList className="rounded-b-[8px] border border-t-0  border-foreground/60 bg-secondary p-2">
        <BreadcrumbItem>
          <LuHome />
          <Link href="/">Home</Link>
        </BreadcrumbItem>

        {arrayPathname?.map((item, index) => {
          let link: string = ''
          index === 0 ? arrayLink.push('/' + item) : arrayLink.push(item)
          link = arrayLink.join('/')

          return (
            <BreadcrumbItem
              key={index}
              className={`${
                arrayPathname[arrayPathname.length - 1] === item
                  ? 'text-foreground'
                  : ''
              }`}
            >
              <ol>
                <BreadcrumbSeparator
                  className={`${
                    arrayPathname[arrayPathname.length - 1] === item &&
                    'text-primary'
                  }`}
                >
                  <LiaChevronRightSolid />
                </BreadcrumbSeparator>
              </ol>
              <Link href={link}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default BreadcrumbGso
