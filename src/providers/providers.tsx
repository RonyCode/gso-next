'use client'
import React from 'react'

import AuthProvider from '@/providers/AuthProviders/AuthProvider'
import ToastProvider from '@/providers/ToastProvider/ToastProvider'
import { Toaster } from '@/ui/toaster'
import NextTopLoader from 'nextjs-toploader'

export const Providers = ({ children }: { children: React.ReactNode }) => {
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
        {children}
      </ToastProvider>
      <Toaster />
    </AuthProvider>
  )
}
