'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { type ReactElement } from 'react'
import { LiaChevronRightSolid } from 'react-icons/lia'
import { LuHome } from 'react-icons/lu'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'

const BreadcrumbGso = (): ReactElement => {
  const pathname = usePathname()
  const arrayPathname = pathname?.split('/')
  arrayPathname?.shift()
  const arrayLink: string[] = []

  return (
    <Breadcrumb>
      <BreadcrumbList className="rounded-b-[8px] border border-t-0  border-foreground/30 bg-secondary p-2">
        <BreadcrumbItem className="hover:text-foreground">
          <Link href="/">
            {' '}
            <LuHome />
          </Link>
        </BreadcrumbItem>

        {arrayPathname?.map((item, index) => {
          let link: string = ''
          index === 0 ? arrayLink.push('/' + item) : arrayLink.push(item)
          link = arrayLink.join('/')

          return (
            <BreadcrumbItem
              key={index}
              className={`hover:text-foreground ${
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
              <Link
                href={link}
                className="m-0 p-0 text-sm font-light md:font-medium"
              >
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
