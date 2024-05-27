import { forwardRef, type InputHTMLAttributes, type LegacyRef } from 'react'

import { type InputMaskProps } from '@react-input/mask'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hasError?: string | undefined
  registerInput?: string
  mask?: string
  ref: LegacyRef<InputMaskProps> | undefined
}

// eslint-disable-next-line react/display-name
const InputContent = forwardRef<HTMLInputElement, InputProps>(
  ({ name = '', hasError = '', type = 'text', ...props }, ref) => {
    return (
      <div className=" min-w-screen flex flex-col">
        <input
          {...props}
          type={type}
          name={name}
          ref={ref}
          className={`${
            hasError.length > 0
              ? 'border-pink-500 text-pink-600  focus:border-pink-500 focus:ring-pink-500'
              : 'focus:border-sky-500 focus:outline-none focus:ring-sky-500'
          }    rounded-md  border bg-white 
                      text-sm  text-black  placeholder-slate-400 
                      shadow-sm disabled:border-slate-200
                      disabled:bg-slate-50
                      disabled:text-slate-500 disabled:shadow-none`}
        />
      </div>
    )
  },
)
export default InputContent
