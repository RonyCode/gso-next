import '@/styles/globals.css'
import React from 'react'
import { Sidebar } from '@/components/Layout/sidebar/sidebar'
import {
  LuBell,
  LuBellDot,
  LuBuilding2,
  LuMapPin,
  LuSettings,
  LuUser,
  LuUserCog,
  LuUserCog2,
} from 'react-icons/lu'
import { Metadata } from 'next'
import {
  LucideBuilding2,
  LucideHome,
  LucideMapPinned,
  LucideSquareUserRound,
  LucideUserRoundCog,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'GSO | Perfil',
  description: 'page of signUp users.',
}

const sidebarNavItems = [
  {
    titleGroup: 'Perfil',
    group: [
      {
        title: 'Perfil',
        href: '/profile',
        icon: <LucideSquareUserRound size={20} />,
      },
      {
        title: 'Editar Perfil',
        href: '/profile/edit',
        icon: <LucideUserRoundCog size={20} />,
      },
      {
        title: 'Endereço',
        href: '/profile/settings',
        icon: <LucideMapPinned size={20} />,
      },
      {
        title: 'Notificações',
        href: '/examples/forms/notifications',
        icon: <LuBellDot size={20} />,
      },
    ],
  },

  {
    titleGroup: 'Minha Unidade',
    group: [
      {
        title: 'Minha Unidade',
        href: '/profile/minha-unidade',
        icon: <LucideHome size={20} />,
      },

      {
        title: 'Dados Unidade',
        href: '/profile/teste',
        icon: <LucideBuilding2 size={20} />,
      },
      {
        title: 'Notifications',
        href: '/examples/forms/notifications',
        icon: <LuUser size={20} />,
      },
      {
        title: 'Display',
        href: '/examples/forms/display',
        icon: <LuUser size={20} />,
      },
    ],
  },
]

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="border-t">
        <div className="bg-background px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <Sidebar items={sidebarNavItems} className=" lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="min-h-screen  md:mt-24 lg:px-8 ">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
