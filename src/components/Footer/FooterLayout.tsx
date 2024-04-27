'use client'

import * as React from 'react'
import FooterNormal from '@/components/Footer/FooterNormal'
import { usePathname } from 'next/navigation'
import FooterHomePage from '@/components/Footer/FooterHomePage'

const FooterLayout = () => {
  const pathName = usePathname()

  return <>{pathName === '/' ? <FooterHomePage /> : <FooterNormal />}</>
}
export default FooterLayout
