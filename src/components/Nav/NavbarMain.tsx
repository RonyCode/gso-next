'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { type ReactElement, useEffect, useRef, useState } from 'react'
import {
  LuBuilding2,
  LuCalendarCheck,
  LuComponent,
  LuContact,
  LuDoorOpen,
  LuHeadphones,
  LuHelpCircle,
  LuLogOut,
  LuMenu,
  LuSiren,
  LuUser,
} from 'react-icons/lu'

import Logo from '../../../public/images/Logo'

import { ModeToggle } from '@/components/Buttoms/ModeTogle'
import { deleteCookies } from '@/components/Buttoms/SignOutButton/LogoutAction'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { NotificationCard } from '@/components/Notification/NotiicationCard'
import { GetFirstLettersNameUser } from '@/functions/GetFirstLettersNameUser'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
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
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from '@/ui/navigation-menu'

export function NavbarMain({
  // eslint-disable-next-line react/prop-types
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const { data: session } = useSession()

  const [state, setState] = useState(false)
  const [showNavBar, setShowNavBar] = useState(false)
  const router = useRouter()
  const myRef = useRef(null)
  const nameUser = GetFirstLettersNameUser()

  // const components: Array<{
  //   title: string
  //   href: string
  //   description: string
  // }> = [
  //   {
  //     title: 'Escala',
  //     href: `/servicos/escalas`,
  //     description: 'Serviço de escalas dos membros de cada unidade',
  //   },
  //   {
  //     title: 'Ocorrência',
  //     href: `/servicos/ocorrencias`,
  //     description: 'Serviço de ocorrência.',
  //   },
  //   {
  //     title: 'Dashboard',
  //     href: `/servicos/estatisticas`,
  //     description: 'Serviço para obter estatísticas do sistema.',
  //   },
  //   {
  //     title: 'Aplicativo',
  //     href: `/servicos/aplicativo`,
  //     description: 'Novidades de nossos aplicativos',
  //   },
  //   {
  //     title: 'Dashboard',
  //     href: `/servicos/historico`,
  //     description: 'Busque a ocorrência mais recente através do histórico .',
  //   },
  //   {
  //     title: 'Área do Gestor',
  //     href: `/servicos/gestor`,
  //     description:
  //       'Serviço para gerenciar o sistema de unidades, escalas e afins.',
  //   },
  //   {
  //     title: 'corporacao',
  //     href: `/servicos/organizacao`,
  //     description: 'Serviço para gerenciar a corporação.',
  //   },
  // ]

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowNavBar(true)
      } else {
        setShowNavBar(false)
      }
    })
  }, [session?.id_message])

  const handleClick = async (): Promise<void> => {
    await deleteCookies()
    await signOut({
      redirect: false,
    })
    router.push('/')
  }

  interface MenuTypes {
    title: string
    icon: ReactElement
    path: string
  }
  const pathname = usePathname()

  const menus: MenuTypes[] = [
    {
      title: 'Serviços',
      icon: <LuComponent />,
      path: `/servicos`,
    },
    { title: 'Contato', icon: <LuContact />, path: '/contact' },
    {
      title: 'Ocorrências',
      icon: <LuSiren />,
      path: '/(modules)/ocorrencias',
    },
  ]

  return (
    <header
      {...props}
      ref={myRef}
      className={
        'fixed left-0 top-0 z-10 w-screen border-b bg-background/95 text-foreground/70 backdrop-blur  supports-[backdrop-filter]:bg-background/60 dark:text-foreground/70 ' +
        `${
          !showNavBar &&
          ' text-[#e5e7eb]/60  dark:text-foreground/60 md:bg-background/10'
        }`
      }
    >
      <div
        className={`fixed h-screen  w-screen ${state ? 'block ' : 'hidden '}`}
        onClick={() => {
          setState(false)
        }}
      ></div>
      <nav
        className={cn(
          `${state ? 'p-4' : 'px-4'} relative mx-auto flex items-center justify-between  md:container lg:py-0`,
          className,
        )}
      >
        <div className=" flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/" className="hidden md:block">
            <Logo width={100} />
          </Link>
          <div className={`md:hidden  ${state ? 'hidden  ' : 'block '}`}>
            <button
              className="  top-0 rounded-md p-3 outline-none focus:border focus:border-gray-400 "
              onClick={() => {
                setState(!state)
              }}
            >
              <LuMenu />
            </button>
          </div>
        </div>

        <div
          className={`mt-8 flex-1 pb-3 md:mt-0 md:block md:pb-0 ${
            state ? ' block ' : ' hidden '
          }`}
        >
          <Link href="/" className=" flex w-screen justify-center  md:hidden">
            <Logo width={100} />
          </Link>
          <ul className="  md:flex  md:items-center md:justify-center md:space-x-6 md:space-y-0  ">
            {menus.map((item, idx) => (
              <li
                key={idx}
                className="text-[#e5e7eb]/60 transition-colors hover:text-[#e5e7eb]/80"
              >
                <div className="flex items-center space-x-1 transition-colors hover:text-primary/80">
                  {/* <NavigationMenu className=" m-0  p-0"> */}
                  {/*  <NavigationMenuList className=" m-0  p-0"> */}
                  {/*    <NavigationMenuItem className=" m-0  p-0"> */}
                  {/*      <NavigationMenuTrigger className="m-0 gap-1 space-x-0 bg-transparent p-0 outline-none hover:bg-transparent focus:bg-transparent md:flex md:text-sm "> */}
                  <Link
                    className="flex  items-center justify-center gap-1 text-foreground/60 hover:text-foreground/80 md:space-x-6 md:space-y-0 "
                    href={item.path}
                  >
                    <label
                      className={` hover:text-primary/80 ${item.path === pathname ? 'text-primary/60' : ''}`}
                    >
                      {item.icon}
                    </label>{' '}
                    {item.title}
                  </Link>
                  {/* </NavigationMenuTrigger> */}

                  {/* <NavigationMenuContent> */}
                  {/*  {item.title === 'Serviços' && ( */}
                  {/*    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] "> */}
                  {/*      {components.map((component) => ( */}
                  {/*        <ListItem */}
                  {/*          key={component.title} */}
                  {/*          title={component.title} */}
                  {/*          href={component.href} */}
                  {/*        > */}
                  {/*          {component.description} */}
                  {/*        </ListItem> */}
                  {/*      ))} */}
                  {/*    </ul> */}
                  {/*  )} */}
                  {/* </NavigationMenuContent> */}
                  {/*    </NavigationMenuItem> */}
                  {/*  </NavigationMenuList> */}
                  {/* </NavigationMenu> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ModeToggle
          className={`absolute  right-6  md:relative ${state ? 'absolute bottom-3' : 'relative right-28 md:right-4 '}`}
        />

        {session?.user != null ? (
          <div
            className={`absolute right-3 flex  items-center justify-center md:relative  ${
              state ? ' flex flex-col-reverse items-stretch gap-2' : ' md:flex'
            }`}
          >
            <React.Suspense fallback={<LoadingPage pending={true} />}>
              <NotificationCard />
            </React.Suspense>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full border hover:border-foreground/20 lg:h-12 lg:w-12 "
                >
                  <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                    <AvatarImage
                      src={session?.image ?? '/images/avatar.svg'}
                      alt="@shadcn"
                      style={{ objectFit: 'cover' }}
                    />
                    <AvatarFallback>{nameUser}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72" align="center" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className=" flex h-14 w-full flex-col items-start justify-center rounded-[8px] border border-primary/70 p-2">
                    <p className="text-lg leading-none">{session?.name}</p>
                    <p className=" leading-none text-muted-foreground">
                      {session.user.email}
                    </p>
                  </div>
                  <div className="absolute right-1 top-4"> </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={`/conta`}>
                    <DropdownMenuItem className="group-hover">
                      Minha Conta
                      <DropdownMenuShortcut className="hover:scale-125">
                        <LuUser style={{ fontSize: '20px' }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/conta/escala`}>
                    <DropdownMenuItem>
                      Minha Escala
                      <DropdownMenuShortcut>
                        <LuCalendarCheck style={{ fontSize: '20px' }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/conta/unidade`}>
                    <DropdownMenuItem>
                      Minha Unidade
                      <DropdownMenuShortcut>
                        <LuBuilding2 size={20} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/suporte`}>
                    <DropdownMenuItem>
                      Suporte
                      <DropdownMenuShortcut>
                        <LuHeadphones style={{ fontSize: '20px' }} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>{' '}
                  </Link>

                  <DropdownMenuItem>
                    Ajuda
                    <DropdownMenuShortcut>
                      <LuHelpCircle style={{ fontSize: '20px' }} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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
          <p className={' right-5 ' + `${state && 'hidden'}`}>
            <Link
              href="/auth"
              className="flex items-center space-x-1  text-[#e5e7eb]/60 hover:text-primary/80"
            >
              <LuDoorOpen />{' '}
              <span className="hidden text-[#e5e7eb]/60  hover:text-[#e5e7eb]/80 md:block">
                Area de acesso
              </span>
            </Link>
          </p>
        )}
      </nav>
    </header>
  )
}
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
  // eslint-disable-next-line react/prop-types
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      {/* <NavigationMenuLink asChild> */}
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
      {/* </NavigationMenuLink> */}
    </li>
  )
})
ListItem.displayName = 'ListItem'
