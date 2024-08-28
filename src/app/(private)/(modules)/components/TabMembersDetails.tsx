'use client'
import Link from 'next/link'
import React from 'react'
import { LuListPlus } from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { type IOrganizacaoSchema } from '@/schemas/OrganizacaoSchema'
import { Button, buttonVariants } from '@/ui/button'
import { Card } from '@/ui/card'

type UserRegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  corporations?: IOrganizacaoSchema
  params?: { sigla: string; name_unidade: string }
  className?: string
}

export const TabMembersDetails = ({
  corporations,
  params,
  className,
  ...props
}: UserRegisterFormProps): JSX.Element => {
  return (
    <div className={cn('', className)} {...props}>
      <Card x-chunk="dashboard-06-chunk-0 ">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-between gap-4  space-y-2 p-6 ">
            <h1 className="ml-4 mr-auto pt-2 text-xl font-bold">Membros</h1>
            <Link href="#">
              <Button
                className={cn(buttonVariants({ variant: 'outline' }), 'group ')}
              >
                <LuListPlus
                  className="text-foreground group-hover:text-muted-foreground"
                  size={24}
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className=" md:px-28 md:py-4 "></div>
      </Card>
    </div>
  )
}
export default TabMembersDetails
