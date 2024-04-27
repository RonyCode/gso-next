import FooterHomePage from '@/components/Footer/FooterHomePage'
import React from 'react'
import FooterNormal from '@/components/Footer/FooterNormal'

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
