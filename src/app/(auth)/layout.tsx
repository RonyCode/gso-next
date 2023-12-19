export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center md:container">
        {children}
      </section>
    </>
  )
}
