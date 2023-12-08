import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'

import { authOptions } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BellRing, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { className } from 'postcss-selector-parser'
import Logo from '../../../public/images/Logo'
import { CardWithLogo } from '@/ui/CardWithLogo'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const notifications = [
    {
      title: 'Your call has been confirmed.',
      description: '1 hour ago',
    },
    {
      title: 'You have a new message!',
      description: '1 hour ago',
    },
    {
      title: 'Your subscription is expiring soon!',
      description: '2 hours ago',
    },
  ]
  return (
    <>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
        }}
      >
        <div className="min-w-max">
          <h1>Server Session</h1>
          <pre>{'nome; ' + session?.nome}</pre>
          <pre>{'email: ' + session?.email}</pre>
          <pre>{'image: ' + session?.image}</pre>
          <pre>{'cod_usuario: ' + session?.cod_usuario}</pre>
        </div>
      </main>
    </>
  )
}
