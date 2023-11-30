import '@/styles/globals.css'
import NavbarPrivate from '@/components/Nav/NavbarPrivate'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <NavbarPrivate />
      {children}
    </section>
  )
}
