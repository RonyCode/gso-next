import '../../styles/globals.css'
import { Providers } from '@/providers'
import { ThemeProvider } from '@/ui/ThemeProvider'
import { fontSans } from '@/lib/fonts'
import { Suspense } from 'react'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { NavbarHome } from '@/components/Nav/NavbarHome'
import { cn } from '@/lib/utils'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          ' min-w-screen m-0 h-screen min-h-screen w-full p-0 font-sans antialiased',
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
              <NavbarHome />
              <main className="relative flex min-h-screen w-full flex-col  bg-gradient-to-t from-background to-secondary">
                <div className="flex-1 flex-grow">{children}</div>
              </main>
              <footer className="static bottom-0 h-48 border-t bg-background text-center text-sm leading-5 text-foreground ">
                © 2024 Rcode Copyright. Todos os direitos reservados.
              </footer>
            </Providers>{' '}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
