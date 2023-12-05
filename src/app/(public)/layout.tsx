import '@/styles/globals.css'
import NavbarHome from '@/components/Nav/NavbarHome'
import { UserNav } from '@/components/Nav/UserNav'
import { MainNav } from '@/components/Nav/MainNav'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <MainNav />
      {children}
    </section>
  )
}
