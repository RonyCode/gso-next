import Link from 'next/link'
import { cn } from '@/lib/utils'
import * as React from 'react'

type FooterLayoutProps = React.HTMLAttributes<HTMLDivElement>
const FooterHomePage = ({ className, ...props }: FooterLayoutProps) => {
  return (
    <footer
      className={cn('  relative bg-secondary pb-6 pt-8', className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center md:w-4/12">
            <div className="py-1 text-sm font-semibold text-foreground">
              Copyright © <span id="get-current-year">2024</span>
              <Link
                href="https://github.com/RonyCode/gso-next"
                className="text-foreground hover:text-primary/60"
                target="_blank"
              >
                {' '}
                GSO{' '}
              </Link>
              Desenvolvido por{' '}
              <Link
                href="https://github.com/RonyCode"
                className="text-foreground hover:text-primary/60"
              >
                Ronycod
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default FooterHomePage
