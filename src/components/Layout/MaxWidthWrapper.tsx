import { cn } from '@/lib/utils'

type maxWidthWrapperTypes = {
  children: React.ReactNode
  className?: string
}

const MaxWidthWrapper = ({ className, children }: maxWidthWrapperTypes) => {
  return (
    <div>
      <div className={cn('max-w-screen mx-auto px-2.5 md:px-20 ', className)}>
        {children}
      </div>
    </div>
  )
}
export default MaxWidthWrapper
