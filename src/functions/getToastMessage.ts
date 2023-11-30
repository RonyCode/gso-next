'use client';
import { toast } from 'react-toastify';

export const getToastMessage = (message: string) => {
  toast.success(message);
};
