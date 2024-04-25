import '@/styles/globals.css'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="md:min-h-[calc(100vh-4rem)]">{children}</section>
}
