'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'
import { type ReactElement } from 'react'

import FooterHomePage from '@/components/Footer/FooterHomePage'
import FooterNormal from '@/components/Footer/FooterNormal'

const FooterLayout = (): ReactElement => {
  const pathName = usePathname()

  return <>{pathName === '/' ? <FooterHomePage /> : <FooterNormal />}</>
}
export default FooterLayout
