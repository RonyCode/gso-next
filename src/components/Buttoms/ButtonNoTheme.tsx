'use client'
import * as React from 'react'
import { type ButtonHTMLAttributes, type FC } from 'react'
import { FaSpinner } from 'react-icons/fa6'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-bold transition-color ' +
    'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 ' +
    'disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-white hover:bg-slate-800',
        defaultActive:
          'bg-[--color-default-buttons-active] text-white hover:brightness-[90%] ',
        ghost: 'bg-transparent hover:text-slate-900 hover:bg-slate-200 ',
      },
      size: {
        default: 'h-10 py-2 px-4 mx-1',
        sm: 'h-9 px-2 mx-1',
        lg: 'h-11 px-8 mx-1',
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const ButtonNoTheme: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading === true ? (
        <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {children}
    </button>
  )
}
export default ButtonNoTheme
