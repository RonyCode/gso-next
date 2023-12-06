import '../../styles/globals.css'
import { Providers } from '@/providers'
import { ThemeProvider } from '@/ui/ThemeProvider'
import { cn } from '@/lib/ultis'
import { fontSans } from '@/lib/fonts'
import { Suspense } from 'react'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { MainNav } from '@/components/Nav/MainNav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
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
              <MainNav />
              <section className=" container h-auto w-screen border bg-secondary p-0 text-foreground">
                {children}
              </section>
              <footer className="static bottom-0 h-48 border-t bg-background text-center text-sm leading-5 text-foreground ">
                © 2024 Copyright. Todos os direitos reservados.
              </footer>
            </Providers>{' '}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
