import '@/styles/globals.css'
import NavbarPrivate from '@/components/Nav/NavbarPrivate'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
