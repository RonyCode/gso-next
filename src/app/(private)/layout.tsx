import '@/styles/globals.css'
import React from 'react'

import FooterNormal from '@/components/Footer/FooterNormal'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      {children}
      <FooterNormal />
    </>
  )
}
