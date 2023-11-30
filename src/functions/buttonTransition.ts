'use client';
import { startTransition } from 'react';

interface ButtonTransitionProps {
  chlindren: React.ReactNode;
}
export const ButtonTransition = async ({
  chlindren
}: ButtonTransitionProps) => {
  startTransition(() => {
    {
      {
        chlindren;
      }
    }
  });
};
