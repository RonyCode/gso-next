import '@/styles/globals.css'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
