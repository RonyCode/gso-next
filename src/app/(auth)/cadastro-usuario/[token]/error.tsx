'use client' // Error components must be Client Components

import { useEffect } from 'react'

import PageNotFound from '@/components/Pages/PageNotFound'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <PageNotFound error={error} reset={reset} />
}
