import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ModalProps = {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
} & React.ComponentProps<typeof DialogContent>

export function ModalGso({
  title,
  description,
  icon,
  className,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">x</Button>
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
            {icon}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <Button type="submit">OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
