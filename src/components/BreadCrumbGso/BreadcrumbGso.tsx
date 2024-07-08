'use client'
import Link from 'next/link'
import React, { type ReactElement, useEffect, useState } from 'react'
import { LiaChevronRightSolid } from 'react-icons/lia'
import { LuHome } from 'react-icons/lu'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'

const BreadcrumbGso = (): ReactElement => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null)
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])
  const arrayPathname = currentUrl?.split('/')

  arrayPathname?.splice(0, 3)

  const arrayLink: string[] = []
  let link = ''

  return (
    <Breadcrumb>
      <BreadcrumbList className="rounded-b-[8px] border border-t-0  border-foreground/30 bg-secondary p-2">
        <BreadcrumbItem className="hover:text-foreground">
          <Link href="/">
            {' '}
            <LuHome />
          </Link>
        </BreadcrumbItem>

        {arrayPathname?.map((path, index) => {
          index === 0 ? arrayLink.push('/' + path) : arrayLink.push(path)
          link = arrayLink.join('/')
          // setCurrentUrl(link)
          return (
            <BreadcrumbItem
              key={index}
              className={`hover:text-foreground ${
                arrayPathname[arrayPathname.length - 1] === path
                  ? 'text-foreground'
                  : ''
              }`}
            >
              <ol>
                <BreadcrumbSeparator
                  className={`${
                    arrayPathname[arrayPathname.length - 1] === path &&
                    'text-primary'
                  }`}
                >
                  <LiaChevronRightSolid />
                </BreadcrumbSeparator>
              </ol>
              <Link
                href={link}
                className="m-0 p-0 text-[.825rem] font-light md:font-medium"
              >
                {path.charAt(0).toUpperCase() +
                  decodeURI(
                    path
                      .slice(1)
                      .toLowerCase()
                      .replace(/#.*$/, '')
                      .replace(/\/&.*$/, '')
                      .replace(/\?.*$/, '')
                      .replace(/-.*$/, '')
                      .split('/')[0],
                  )}
              </Link>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default BreadcrumbGso
