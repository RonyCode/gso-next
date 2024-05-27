import './IconRelogio.css'
import * as React from 'react'
import { cn } from '@/lib/utils'

type SVGProps = {
  width?: number
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>

export default function IconRelogio({ width, className, ...props }: SVGProps) {
  return (
    <svg
      id="relogio"
      width={width}
      data-name="Camada 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 670.3 681.4"
      className={cn(' ', className)}
      {...props}
    >
      <path d="M335.1,0C150.1,0,0,152.6,0,340.7s150.1,340.7,335.1,340.7,335.1-152.6,335.1-340.7S520.2,0,335.1,0Zm0,636c-160.4,0-290.5-132.2-290.5-295.3S174.7,45.4,335.1,45.4s290.5,132.2,290.5,295.3-130,295.3-290.5,295.3Z" />
      <rect
        id="ponteiroMenor"
        x="178.2"
        y="316.7"
        width="179.9"
        height="48.1"
        rx="24.1"
        ry="24.1"
      />
      <rect
        id="ponteiroMaior"
        x="312.9"
        y="92"
        width="44.5"
        height="270.3"
        rx="22.2"
        ry="22.2"
      />
    </svg>
  )
}
