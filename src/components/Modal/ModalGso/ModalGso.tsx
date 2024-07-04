import React, { type ReactElement } from 'react'

import { cn } from '@/lib/utils'
import { type ModalProps } from '@/types/index'
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
import { Separator } from '@/ui/separator'

export function ModalGso({
  title,
  description,
  icon,
  iconButton,
  nameButton,
  open,
  className,
  children,
  childrenButton,
  ...props
}: ModalProps): ReactElement {
  return (
    <Dialog open={open}>
      <DialogTrigger>
        <div className="h-full w-full">{childrenButton}</div>
      </DialogTrigger>
      <DialogContent className={cn(' h-full w-full', className)} {...props}>
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2 ">
              {icon} {title}{' '}
            </span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <Separator />
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
