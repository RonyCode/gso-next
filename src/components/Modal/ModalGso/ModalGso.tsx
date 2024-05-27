import React, { type ReactElement } from 'react'

import { type ModalProps } from '../../../../types/index'

import { cn } from '@/lib/utils'
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
      <DialogTrigger asChild>
        {childrenButton ?? (
          <Button variant="ghost">
            <i>{iconButton}</i>
            {nameButton}
          </Button>
        )}
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
