import Image from 'next/image'
import { Sidebar } from '@/components/Layout/sidebar/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Button } from '@/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Separator } from '@/ui/separator'
import { ScrollArea, ScrollBar } from '@/ui/scroll-area'
import React from 'react'
import { Metadata } from 'next'
import { getProfile } from '@/lib/getProfile'
import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'GSO | Perfil',
  description: 'page of signUp users.',
}

const ProfileUser = async () => {
  const session: Session | null = await getServerSession(authOptions)

  const res = await getProfile(session?.id)
  return (
    <>
      <div className="block">
        <div></div>
      </div>
    </>
  )
}
export default ProfileUser
