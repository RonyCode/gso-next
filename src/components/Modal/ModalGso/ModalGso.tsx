import { Button } from '@/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { cn } from '@/lib/utils'
import { Separator } from '@/ui/separator'
import React from 'react'

type ModalProps = {
  title?: string
  description?: string
  icon?: React.ReactNode
  iconButton?: React.ReactNode
  nameButton: string
  children: React.ReactNode
} & React.ComponentProps<typeof DialogContent>

export function ModalGso({
  title,
  description,
  icon,
  iconButton,
  nameButton,
  className,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <i>{iconButton}</i>
          {nameButton}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          ' m-auto h-screen w-screen bg-background md:min-h-[70vh] md:w-[80vw] md:px-16',
          className,
        )}
        {...props}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2 ">
              {icon} {title}{' '}
            </span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Separator />
        </DialogHeader>
        <div className="grid w-full gap-4 py-4">{children}</div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
