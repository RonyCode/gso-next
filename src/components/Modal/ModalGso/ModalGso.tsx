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
import { ModalProps } from '../../../../types/index'

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
}: ModalProps) {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        {childrenButton || (
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
