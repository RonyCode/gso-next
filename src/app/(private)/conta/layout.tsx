import '@/styles/globals.css'
import { type Metadata } from 'next'
import React from 'react'
import {
  LuUser,
  LuBuilding2,
  LuBellDot,
  LuHome,
  LuUserCheck,
  LuCalendarDays,
} from 'react-icons/lu'

import { Sidebar } from '@/components/Sidebar/sidebar'

export const metadata: Metadata = {
  title: 'GSO | Perfil',
  description: 'pãgina da conta do usuário.',
}

const sidebarNavItems = [
  {
    titleGroup: 'Minha Conta',
    group: [
      {
        title: 'Meus Dados',
        href: '/conta',
        icon: <LuUserCheck size={20} />,
      },
      {
        title: 'Minha Escala',
        href: '/conta/escala',
        icon: <LuCalendarDays size={20} />,
      },

      {
        title: 'Notificações',
        href: '/conta/notificacoes',
        icon: <LuBellDot size={20} />,
      },
    ],
  },

  {
    titleGroup: 'Minha Unidade',
    group: [
      {
        title: 'Minha Unidade',
        href: '/conta/detalhes',
        icon: <LuHome size={20} />,
      },

      {
        title: 'Dados Unidade',
        href: '/conta/teste',
        icon: <LuBuilding2 size={20} />,
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
}): JSX.Element {
  return (
    <>
      <div className="min-h-screen border-t">
        <div className="bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <Sidebar items={sidebarNavItems} className=" lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
