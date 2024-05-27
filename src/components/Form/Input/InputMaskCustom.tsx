'use client'

import {
  type ElementType,
  forwardRef,
  type InputHTMLAttributes,
  type LegacyRef,
} from 'react'

import { InputMask, type InputMaskProps } from '@react-input/mask'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hasError?: string
  registerInput?: string
  mask?: string
  icon?: ElementType
  ref: LegacyRef<InputMaskProps> | undefined
}

// eslint-disable-next-line react/display-name
const InputmaskCustom = forwardRef<HTMLInputElement, InputProps>(
  ({ name = '', hasError = '', type = 'text', ...props }, ref) => {
    const error = hasError.length > 0

    return (
      <div className="min-w-screen flex flex-col">
        <InputMask
          {...props}
          type={type}
          replacement={{ _: /\d/ }}
          name={name}
          disabled={false}
          ref={ref}
          className={
            `${
              error
                ? 'border-pink-500 text-pink-600  focus:border-pink-500 focus:ring-pink-500'
                : 'focus:border-sky-500 focus:outline-none focus:ring-sky-500'
            }    rounded-md  border bg-white 
                      text-sm  text-black  placeholder-slate-400 
                      shadow-sm disabled:border-slate-200
                      disabled:bg-slate-50
                      disabled:text-slate-500 disabled:shadow-none ` +
            twMerge(' w-full', props.className)
          }
        />
      </div>
    )
  },
)
export default InputmaskCustom
