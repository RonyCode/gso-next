export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className=" flex  min-h-screen flex-col justify-center  ">
        {children}
      </section>
    </>
  )
}
