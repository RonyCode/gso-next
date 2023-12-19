'use client'
import Link from 'next/link'

import { LuLogOut, LuMegaphone, LuSettings, LuUser } from 'react-icons/lu'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Logo from '../../../public/images/Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { ModeToggle } from '@/ui/ModeTogle'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import {
  FaAddressBook,
  FaBars,
  FaCircleInfo,
  FaScrewdriverWrench,
} from 'react-icons/fa6'
import { DoorOpen } from 'lucide-react'

export function NavbarHome({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession()
  const [state, setState] = useState(false)
  const router = useRouter()

  const myRef = useRef(null)

  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [showTopBtn])

  const handleClick = async () => {
    deleteCookies()
    await signOut({
      redirect: false,
    })
    router.push('/')
  }

  type MenuTypes = { title: string; icon: ReactElement; path: string }
  const pathname = usePathname()

  const menus: MenuTypes[] = [
    { title: 'Serviços', icon: <FaScrewdriverWrench />, path: '/servicos' },
    { title: 'Contato', icon: <FaAddressBook />, path: '/contact' },
    { title: 'Sobre nos', icon: <FaCircleInfo />, path: '/about' },
  ]
  return (
    <header
      ref={myRef}
      className={
        showTopBtn
          ? ' fixed left-0  top-0 z-50  w-screen border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : ' fixed left-0  top-0 z-50 w-screen bg-background/95 transition  duration-500 md:bg-background/10'
      }
    >
      <nav className="container mx-auto  flex   items-center justify-between ">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/" className="hidden md:block">
            <h1 className="text-3xl font-bold text-purple-600">
              <Logo width={100} />
            </h1>
          </Link>
          <div className="md:hidden">
            <button
              className="rounded-md   p-3 outline-none focus:border focus:border-gray-400"
              onClick={() => setState(!state)}
            >
              <FaBars />
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className="items-center justify-center space-y-8 text-sm md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                <div className="flex items-center space-x-1 transition-colors hover:text-primary/80">
                  <label
                    className={
                      item.path === pathname
                        ? 'text-primary/60 hover:text-primary/80'
                        : ' hover:text-primary/80'
                    }
                  >
                    {item.icon}
                  </label>
                  <Link
                    className=" text-foreground/60 hover:text-foreground/80"
                    href={item.path}
                  >
                    {item.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {session?.user ? (
          <div
            className={`    ${
              state
                ? 'absolute  right-2 top-2 flex md:hidden'
                : 'hidden md:flex'
            } ml-auto  items-center space-x-4    `}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-14 w-14 rounded-full"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="https://avatars.githubusercontent.com/u/65975236?s=400&u=9ad183d9c5fab1003e9d60b0d0f83e8b51b70b9a&v=4"
                      alt="@shadcn"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Rony Anderson
                    </p>
                    <p className="mr-2 pr-2 text-xs leading-none text-muted-foreground">
                      {session?.user && session.user.email}
                    </p>
                  </div>
                  <div className="absolute right-2 top-2 ml-2 pl-2">
                    {' '}
                    <ModeToggle />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem className="group-hover">
                      Minha Conta
                      <DropdownMenuShortcut className="hover:scale-125">
                        <LuUser style={{ fontSize: '20px' }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>
                    Configuração
                    <DropdownMenuShortcut>
                      <LuSettings style={{ fontSize: '20px' }} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Notificações
                    <DropdownMenuShortcut>
                      <LuMegaphone style={{ fontSize: '20px' }} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleClick}>
                  Sair
                  <DropdownMenuShortcut>
                    <LuLogOut style={{ fontSize: '20px' }} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <p className="text-sm">
            <Link
              href="/auth"
              className="flex items-center space-x-1  text-foreground hover:text-primary/80"
            >
              <DoorOpen />{' '}
              <span className="hidden text-foreground  hover:text-foreground/80 md:block">
                Area de acesso
              </span>
            </Link>
          </p>
        )}
      </nav>
    </header>
  )
}
