import '@/styles/globals.css'
import React from 'react'
import { Sidebar } from '@/components/sidebar/sidebar'

import { Metadata } from 'next'
import {
  LucideUser,
  LucideBuilding2,
  LucideBellDot,
  LucideHome,
  LucideMapPinned,
  LucideUserRoundCog,
  LucideUserCheck,
  LucideCalendarDays,
} from 'lucide-react'

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
        icon: <LucideUserCheck size={20} />,
      },
      {
        title: 'Minha Escala',
        href: '/conta/escala',
        icon: <LucideCalendarDays size={20} />,
      },

      {
        title: 'Notificações',
        href: '/conta/notificacoes',
        icon: <LucideBellDot size={20} />,
      },
    ],
  },

  {
    titleGroup: 'Minha Unidade',
    group: [
      {
        title: 'Minha Unidade',
        href: '/conta/minha-unidade',
        icon: <LucideHome size={20} />,
      },

      {
        title: 'Dados Unidade',
        href: '/conta/teste',
        icon: <LucideBuilding2 size={20} />,
      },
      {
        title: 'Notifications',
        href: '/examples/forms/notifications',
        icon: <LucideUser size={20} />,
      },
      {
        title: 'Display',
        href: '/examples/forms/display',
        icon: <LucideUser size={20} />,
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
