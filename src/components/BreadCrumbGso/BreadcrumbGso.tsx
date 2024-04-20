'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'
import Link from 'next/link'
import { Slash } from 'lucide-react'
import { usePathname } from 'next/navigation'

const BreadcrumbGso = () => {
  const pathname = usePathname()
  const arrayPathname = pathname?.split('/')
  arrayPathname?.shift()
  const arrayLink: string[] = []

  return (
    <Breadcrumb>
      <BreadcrumbList className="rounded-[8px] bg-secondary p-1 shadow-lg shadow-accent">
        <BreadcrumbItem>
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
                arrayPathname[arrayPathname.length - 1] == item
                  ? 'text-foreground'
                  : ''
              }`}
            >
              <Slash size={18} />
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
