import * as React from 'react'

import { cn } from '@/lib/utils'
import { InputMask } from '@react-input/mask'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask?: string
}

const MyInputMask = React.forwardRef<HTMLInputElement, InputProps>(
  ({ mask, className, type, ...props }, ref) => {
    return (
      <InputMask
        replacement={{ _: /\d/ }}
        mask={mask}
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
MyInputMask.displayName = 'MyInputMask'

export { MyInputMask }
