import './IconGrafico.css'
import * as React from 'react'
import { cn } from '@/lib/utils'

type SVGProps = {
  width?: number
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>
export default function IconGrafico({ width, className, ...props }: SVGProps) {
  return (
    <svg
      version="1.1"
      id="seta"
      data-name="Camada 1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 32 32"
      className={cn(' ', className)}
      {...props}
    >
      <path
        id="bar1"
        d="M8.5,28.9v-7c0-0.3-0.2-0.5-0.5-0.5H4.7c-0.3,0-0.5,0.2-0.5,0.5v7h1.1v-6.5h2.2v6.5H8.5L8.5,28.9z"
      />
      <path
        id="bar2"
        d="M14.9,28.9V15.5c0-0.3-0.2-0.5-0.5-0.5h-3.2c-0.3,0-0.5,0.2-0.5,0.5v13.5h1.1V16h2.2v12.9H14.9L14.9,28.9z"
      />
      <path
        id="bar3"
        d="M21.4,28.9V17.6c0-0.3-0.2-0.5-0.5-0.5h-3.2c-0.3,0-0.5,0.2-0.5,0.5v11.3h1.1V18.2h2.2v10.8H21.4L21.4,28.9z"
      />
      <g id="setaPath">
        <path d="M12.5,9.1l5.3,2.7L26,5.5l-0.7-0.9l-7.7,5.9l-5.2-2.7l-8.3,5l0.6,0.9l0.5-0.3L12.5,9.1z" />
        <path d="M26.4,4.5l-0.7,4.3l-1.1-0.2l0.5-3.2L22,4.9l0.2-1.1L26.4,4.5z" />
      </g>

      <path
        id="bar4"
        d="M27.8,28.9V12.2c0-0.3-0.2-0.5-0.5-0.5h-3.2c-0.3,0-0.5,0.2-0.5,0.5v16.7h1.1V12.8h2.2v16.1H27.8L27.8,28.9z"
      />
      <path d="M3.1,27.8h25.8v1.1H3.1C3.1,28.9,3.1,27.8,3.1,27.8z" />
    </svg>
  )
}
