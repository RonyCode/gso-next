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
              <section className=" container min-h-screen w-screen border  p-0 text-foreground">
                <header></header>
                <main className="min-h-[calc(100vh-72px)] w-full ">
                  {children}
                </main>
                <footer className="static bottom-0 h-48 border-t bg-background text-center text-sm leading-5 text-foreground ">
                  © 2024 Rcode Copyright. Todos os direitos reservados.
                </footer>
              </section>
            </Providers>{' '}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
