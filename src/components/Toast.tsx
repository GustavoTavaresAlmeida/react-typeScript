// src/components/Toast.tsx - Componente de Notificação

import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: string;
  onClose: () => void;
}

const TOAST_DURATION = 3000;

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = (): string => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <span>{getIcon()}</span>
      <span>{message}</span>
      <button 
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;