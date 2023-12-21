import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'
import { ModeToggle } from '@/ui/ModeTogle'

type PageCardProps = {
  title?: string
  description?: string
  icon?: React.ElementType
  children: React.ReactNode
}
const PageCard = ({
  title,
  icon: Icon,
  description,
  children,
}: PageCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between ">
            <span className="display inline-flex items-center gap-2 text-4xl font-bold ">
              {Icon && <Icon size={20} />} {title}
            </span>
            <ModeToggle />
          </CardTitle>

          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <hr />
        <CardContent>
          <Card className="mx-auto w-8/12 ">
            <CardContent>{children} </CardContent>
          </Card>
        </CardContent>
        <CardFooter>
          <p> &copy;2024 RCode All rights reserved.</p>
        </CardFooter>
      </Card>
    </>
  )
}

export default PageCard
