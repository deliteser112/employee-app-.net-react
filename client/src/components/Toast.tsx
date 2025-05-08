import React from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'error' }) => (
  <div className={`fixed bottom-5 right-5 px-4 py-2 text-white rounded-md ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
    {message}
  </div>
);

export default Toast;