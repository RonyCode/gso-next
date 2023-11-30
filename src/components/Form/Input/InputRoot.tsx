import { InputHTMLAttributes, ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}
const InputRoot = ({ children, ...rest }: InputProps) => {
  return (
    <div className={twMerge('w-full flex flex-col', rest.className)}>
      {children}
    </div>
  );
};
export default InputRoot;
