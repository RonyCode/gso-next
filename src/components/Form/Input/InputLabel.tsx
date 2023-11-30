import React, { ElementType, InputHTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  icon?: ElementType;
}

const InputLabel = ({
  label = '',
  icon: Icon,
  htmlFor,
  ...rest
}: InputProps) => {
  return (
    <label className={twMerge(' w-full', rest.className)} htmlFor={htmlFor}>
      <div className="flex items-center  w-full gap-2 py-1  font-bold text-white">
        <span>{Icon && <Icon size={20} />}</span>
        <span>{label}</span>
      </div>
    </label>
  );
};

export default InputLabel;
