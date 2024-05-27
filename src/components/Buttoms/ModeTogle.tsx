'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'
import { type ReactElement } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'

type ModeTogleProps = {
  className?: React.HTMLAttributes<HTMLButtonElement>['className']
} & React.HTMLAttributes<HTMLButtonElement>

export function ModeToggle({
  className,
  ...props
}: ModeTogleProps): ReactElement {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(' ', className)} {...props}>
        <Button variant="outline" size="icon">
          <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-muted-foreground transition-all dark:-rotate-90 dark:scale-0" />
          <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-muted-foreground transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme('light')
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('dark')
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme('system')
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
