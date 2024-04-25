import '../../styles/globals.css'
import { Providers } from '@/providers'
import { ThemeProvider } from '@/providers/ThemeProvider/ThemeProvider'
import { fontSans } from '@/lib/fonts'
import { Suspense } from 'react'
import LoadingPage from '@/components/Loadings/LoadingPage'
import { NavbarHome } from '@/components/Nav/NavbarHome'
import { cn } from '@/lib/utils'
import { Metadata, Viewport } from 'next'
import FooterLayout from '@/components/Footer/FooterLayout'

const APP_NAME = 'GSO'
const APP_DEFAULT_TITLE = 'My GSO PWA App'
const APP_TITLE_TEMPLATE = '%s'
const APP_DESCRIPTION = 'Best PWA app in the world!'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
              <NavbarHome />
              <main className="flex min-h-screen w-full  flex-col bg-gradient-to-t from-background to-secondary pt-[68px]">
                <section className="min-h-screen w-full flex-1 flex-grow ">
                  {children}
                </section>
              </main>
              <FooterLayout />
            </Providers>{' '}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
