import '../../styles/globals.css'
import { Providers } from '@/providers'
import { ThemeProvider } from '@/ui/ThemeProvider'
import { fontSans } from '@/lib/fonts'
import { Suspense } from 'react'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { NavbarHome } from '@/components/Nav/NavbarHome'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { messageRabbit } from '@/functions/messageRabbit'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = getServerSession(authOptions)
  const data = messageRabbit('auth', 'user_logged', session?.id_message)
  console.log(data)
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          ' m-0 h-screen min-h-screen w-screen  overflow-x-hidden p-0 font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Suspense fallback={<LoadingPage pending={true} />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <NavbarHome teste="teste" />
              <main className="flex min-h-screen w-full  flex-col bg-gradient-to-t from-background to-secondary pt-[68px]">
                <div className="w-full  flex-1 flex-grow">{children}</div>
              </main>
              <footer className="relative bottom-0 z-50 h-48 border-t bg-background text-center text-sm leading-5 text-foreground ">
                © 2024 Rcode Copyright. Todos os direitos reservados.
              </footer>
            </Providers>{' '}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
