import './IconEditSave.css'
import './../../styles/globals.css'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { LuPlusCircle } from 'react-icons/lu'

type SVGProps = {
  width?: number
  className?: string
} & React.SVGProps<SVGSVGElement> &
  React.HTMLAttributes<HTMLDivElement>

export default function IconEditSave({
                                       width,
                                       className,
                                       ...props
                                     }: SVGProps): JSX.Element {
  return (
    <div>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 512}
        viewBox="0 0 494.936 494.936"
        preserveAspectRatio="xMidYMid meet"
        className={cn(' ', className)}
        {...props}
      >
        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          >
          <path id="pencil" d="M4703 5106 c-22 -7 -56 -24 -75 -36 -18 -13 -498 -487 -1066 -1054
l-1034 -1031 -164 -327 c-90 -181 -164 -337 -164 -348 0 -53 57 -110 110 -110
11 0 167 74 348 164 l327 164 1041 1044 c840 842 1046 1053 1065 1093 34 72
33 190 -1 260 -31 64 -101 134 -164 164 -59 29 -162 37 -223 17z m158 -227
c15 -11 33 -35 39 -54 17 -51 -3 -84 -135 -215 l-115 -115 -77 78 -78 77 115
115 c63 63 128 121 145 130 34 17 67 12 106 -16z m-441 -464 l75 -75 -815
-816 -815 -815 -158 -80 -157 -79 76 152 76 153 816 818 c449 449 819 817 822
817 3 0 39 -34 80 -75z" />
          <path d="M0 2345 l0 -2345 1975 0 1975 0 0 1286 c0 1425 4 1335 -65 1368 -41
20 -49 20 -90 0 -69 -32 -65 46 -65 -1263 l0 -1181 -1757 2 -1758 3 -3 2133
-2 2132 1461 0 1461 0 34 34 c37 37 44 74 22 121 -26 58 69 55 -1628 55
l-1560 0 0 -2345z" />
          <path  id="plus" d="M1164 4254 l-34 -35 -2 -267 -3 -267 -267 -5 c-251 -5 -268 -6 -295
-26 -59 -44 -63 -142 -7 -195 25 -24 26 -24 297 -29 l272 -5 3 -263 c3 -288 4
-297 63 -328 57 -29 151 -6 176 44 4 9 10 136 13 282 l5 265 265 5 c146 3 273
9 282 13 50 25 74 123 42 176 -32 54 -39 56 -324 61 l-265 5 -5 265 c-3 181
-9 272 -17 286 -21 36 -59 54 -114 54 -46 0 -55 -4 -85 -36z" />
        </g>
      </svg>


    </div>
  )
}
