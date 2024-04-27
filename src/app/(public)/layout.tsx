import '@/styles/globals.css'
import React from 'react'
import FooterLayout from '@/components/Footer/FooterLayout'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <FooterLayout />
    </>
  )
}
