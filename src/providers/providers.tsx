'use client'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

import AuthProvider from '@/providers/AuthProviders/AuthProvider'
import ToastProvider from '@/providers/ToastProvider/ToastProvider'
import InitializeStores from '@/stores/initializeStores'
import { Toaster } from '@/ui/toaster'

export const Providers = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <AuthProvider>
      <ToastProvider>
        <NextTopLoader
          color="#e11d48"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #e11d48,0 0 5px #e11d48"
        />
        <InitializeStores />

        {children}
      </ToastProvider>
      <Toaster />
    </AuthProvider>
  )
}
