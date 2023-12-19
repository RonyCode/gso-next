export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="mt-10 flex h-screen min-h-screen flex-col items-center justify-center md:container">
        {children}
      </section>
    </>
  )
}
