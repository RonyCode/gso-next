import { InputHTMLAttributes, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}
const InputRoot = ({ children, ...rest }: InputProps) => {
  return (
    <div className={twMerge('flex w-full flex-col', rest.className)}>
      {children}
    </div>
  )
}
export default InputRoot
