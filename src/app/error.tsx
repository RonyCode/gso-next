'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import PageNotFound from '@/ui/PageNotFound';

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <PageNotFound error={error} reset={reset} />;
}
