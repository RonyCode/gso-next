import '@/styles/globals.css'
import React from 'react'
import { Sidebar } from '@/components/Layout/sidebar/sidebar'
import { LuBell, LuMapPin, LuSettings, LuUser } from 'react-icons/lu'

const sidebarNavItems = [
  {
    titleGroup: 'Perfil',
    group: [
      {
        title: 'Perfil',
        href: '/profile',
        icon: <LuUser size={20} />,
      },
      {
        title: 'Editar Perfil',
        href: '/profile/settings',
        icon: <LuSettings size={20} />,
      },
      {
        title: 'Endereço',
        href: '/profile/edit',
        icon: <LuMapPin size={20} />,
      },
      {
        title: 'Notificações',
        href: '/examples/forms/notifications',
        icon: <LuBell size={20} />,
      },
    ],
  },

  {
    titleGroup: 'Minha Unidade',
    group: [
      {
        title: 'Minha Unidade',
        href: '/profile',
        icon: <LuUser size={20} />,
      },
      {
        title: 'Endereço',
        href: '/profile/unidade',
        icon: <LuUser size={20} />,
      },
      {
        title: 'Dados Unidade',
        href: '/profile/teste',
        icon: <LuUser size={20} />,
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
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar items={sidebarNavItems} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-screen  lg:px-8 ">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
