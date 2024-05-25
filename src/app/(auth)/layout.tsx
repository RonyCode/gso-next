import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <section className=" flex  min-h-screen flex-col justify-center  ">
        {children}
      </section>
    </>
  )
}
