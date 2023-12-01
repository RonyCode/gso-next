'use client'
import React from 'react'

import AuthProvider from '@/providers/AuthProviders/AuthProvider'
import ToastProvider from '@/providers/ToastProvider/ToastProvider'
import { Toaster } from '@/ui/toaster'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
      <Toaster />
    </AuthProvider>
  )
}
