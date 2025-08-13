// src/hooks/useToast.ts - Hook para Gerenciar Toast Notifications

import { useState, useCallback } from 'react';
import { ToastState, ToastType, TOAST_DURATION } from '@/types';

interface UseToastReturn {
  toast: ToastState | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
};